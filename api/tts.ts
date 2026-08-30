export const config = { runtime: 'edge' };

const MAX_LENGTH = 1200;
const MODEL_ID = 'eleven_v3';

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  let text = '';
  let language: 'hu' | 'en' = 'en';
  try {
    const body = (await request.json()) as { text?: unknown; language?: unknown; recipeId?: unknown };
    // Fail closed for other recipes and older app tabs that omit the ID.
    if (body?.recipeId !== 'soup-2') {
      return json({ error: 'Voice testing is only enabled for Gulyásleves.' }, 403);
    }
    if (typeof body?.text === 'string') text = body.text.trim();
    // Preserve the legacy voice for older clients that omit the language.
    if (body?.language !== undefined) {
      if (body.language !== 'hu' && body.language !== 'en') {
        return json({ error: 'Unsupported language.' }, 400);
      }
      language = body.language;
    }
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  if (!text) return json({ error: 'No text to read aloud.' }, 400);
  if (text.length > MAX_LENGTH) return json({ error: 'This step is too long to read aloud.' }, 413);

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = language === 'hu'
    ? process.env.ELEVENLABS_VOICE_ID_HU
    : process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) {
    return json({ error: 'Voice guidance is not available right now.' }, 503);
  }

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `[warmly] [gently] ${text}`, model_id: MODEL_ID }),
      },
    );

    if (!upstream.ok || !upstream.body) {
      return json({ error: 'Could not prepare the voice guidance. Please try again.' }, 502);
    }

    return new Response(upstream.body, {
      status: 200,
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' },
    });
  } catch {
    return json({ error: 'Could not prepare the voice guidance. Please try again.' }, 502);
  }
}
