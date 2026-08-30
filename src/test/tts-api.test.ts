import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '../../api/tts';

const fetchMock = vi.fn<typeof fetch>();
const request = (text: string, language?: unknown) => new Request('https://example.test/api/tts', { method: 'POST', body: JSON.stringify({ text, language, recipeId: 'soup-2' }) });

beforeEach(() => {
  vi.stubEnv('ELEVENLABS_API_KEY', 'test-only-fake-key');
  vi.stubEnv('ELEVENLABS_VOICE_ID', 'test-only-voice');
  vi.stubEnv('ELEVENLABS_VOICE_ID_HU', 'test-only-hungarian-voice');
  fetchMock.mockReset().mockResolvedValue(new Response('test audio', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe('language-specific Hungarian/English voice endpoint', () => {
  it.each([undefined, null, '', 'soup-1', 'side-1', 'custom-test', 2])('rejects disabled or missing recipe ID %j without spending credits', async recipeId => {
    const response = await handler(new Request('https://example.test/api/tts', {
      method: 'POST', body: JSON.stringify({ text: 'Read this.', language: 'hu', recipeId }),
    }));
    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    { text: 'Vágjuk apróra a vöröshagymát.', language: 'hu', voice: 'test-only-hungarian-voice' },
    { text: 'Chop the onion.', language: 'en', voice: 'test-only-voice' },
    { text: 'Older client.', language: undefined, voice: 'test-only-voice' },
  ])('uses the configured voice and unchanged delivery for $language', async ({ text, language, voice }) => {
    const response = await handler(request(text, language));
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.text()).toBe('test audio');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`);
    expect(JSON.parse(String(init?.body))).toEqual({ text: `[warmly] [gently] ${text}`, model_id: 'eleven_v3' });
    expect(init?.headers).toEqual({ 'xi-api-key': 'test-only-fake-key', 'Content-Type': 'application/json' });
  });

  it.each(['de', '', null, 42, {}, ['hu']])('rejects invalid language %j before calling the provider', async language => {
    expect((await handler(request('Read this.', language))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not silently use the English voice if Hungarian configuration is missing', async () => {
    vi.stubEnv('ELEVENLABS_VOICE_ID_HU', '');
    expect((await handler(request('Szia.', 'hu'))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
    expect((await handler(request('Hello.', 'en'))).status).toBe(200);
  });

  it('does not require the English voice for Hungarian playback', async () => {
    vi.stubEnv('ELEVENLABS_VOICE_ID', '');
    expect((await handler(request('Hello.', 'en'))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
    expect((await handler(request('Szia.', 'hu'))).status).toBe(200);
  });

  it('never accepts a client-supplied voice ID', async () => {
    const response = await handler(new Request('https://example.test/api/tts', {
      method: 'POST', body: JSON.stringify({ text: 'Szia.', language: 'hu', recipeId: 'soup-2', voiceId: 'untrusted-voice' }),
    }));
    expect(response.status).toBe(200);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/test-only-hungarian-voice?');
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
