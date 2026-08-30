import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '../../api/tts';

const fetchMock = vi.fn<typeof fetch>();
const request = (text: string) => new Request('https://example.test/api/tts', { method: 'POST', body: JSON.stringify({ text }) });

beforeEach(() => {
  vi.stubEnv('ELEVENLABS_API_KEY', 'test-only-fake-key');
  vi.stubEnv('ELEVENLABS_VOICE_ID', 'test-only-voice');
  fetchMock.mockReset().mockResolvedValue(new Response('test audio', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe('shared Hungarian/English voice endpoint', () => {
  it.each(['Vágjuk apróra a vöröshagymát.', 'Chop the onion.'])('uses the configured voice and unchanged warm delivery for %s', async text => {
    const response = await handler(request(text));
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.text()).toBe('test audio');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.elevenlabs.io/v1/text-to-speech/test-only-voice?output_format=mp3_44100_128');
    expect(JSON.parse(String(init?.body))).toEqual({ text: `[warmly] [gently] ${text}`, model_id: 'eleven_v3' });
    expect(init?.headers).toEqual({ 'xi-api-key': 'test-only-fake-key', 'Content-Type': 'application/json' });
  });

  it('rejects GET, invalid JSON, empty text and oversized text without calling the provider', async () => {
    expect((await handler(new Request('https://example.test/api/tts'))).status).toBe(405);
    expect((await handler(new Request('https://example.test/api/tts', { method: 'POST', body: 'invalid' }))).status).toBe(400);
    expect((await handler(request('  '))).status).toBe(400);
    expect((await handler(request('a'.repeat(1201)))).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a generic error if configuration is missing', async () => {
    vi.stubEnv('ELEVENLABS_API_KEY', '');
    expect((await handler(request('Szia.'))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not leak provider errors or credentials', async () => {
    fetchMock.mockResolvedValue(new Response('private provider detail test-only-fake-key', { status: 401 }));
    const response = await handler(request('Szia.'));
    expect(response.status).toBe(502);
    const text = await response.text();
    expect(text).not.toContain('private provider detail');
    expect(text).not.toContain('test-only-fake-key');
  });
});
