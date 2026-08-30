# Changelog

## 1.22.0

- Temporarily restrict voice guidance to Gulyásleves (soup-2), in HU and EN. Other built-in and custom recipes keep written instructions but no voice player.
- Require soup-2 recipe ID at the TTS endpoint; reject other/missing IDs before contacting ElevenLabs, including older open app tabs. Reload after deployment.
- Keep voices, speed and automatic continuation. Disclose credit usage and lack of permanent audio storage.
- This recipe-ID gate is not authentication or comprehensive abuse protection. It does not fix the reported provider/playback error or replenish credits.
- Tests use a mocked provider, with no paid generation. Production merge requires owner approval.

## 1.21.0

- After Play, narration automatically advances through the remaining recipe steps in both Hungarian and English; the last step stops and displays a completion message.
- Reuse the same audio element and request only the next step when the current recording ends. Cached steps are reused. Opening a recipe still generates nothing; subsequent uncached steps consume the normal provider credits.
- Pause suspends continuation; resume continues it. Stop cancels pending next-step loading. Recipe/language changes, manual navigation and stale/duplicate end events cannot start an obsolete step.
- Provider or playback errors stop the sequence at the affected step for manual retry, without skipping instructions or falling back to a system voice.
- Existing voices, language selection, model, warmth tags and playback speed remain unchanged. No new environment variables.

### Acceptance check (Vercel, phone and desktop)

1. Open any recipe in HU and press Play once. Each completed step should advance its text and audio automatically, then stop after the last step. Repeat in EN.
2. Pause mid-step, wait, then Continue: no step should advance during the pause. Stop during next-step loading: no late audio should start.
3. Try repeat, previous/next, rewind, changing language and leaving the recipe. Verify no old audio continues or extra steps are skipped.
4. Next-step generation can cause a short loading gap; this release does not promise gapless playback. If a mobile browser blocks playback, use Play to retry the current cached step. Check this on a real iPhone before accepting the release.

Automated tests use simulated audio/provider responses, not paid ElevenLabs requests. Merge/production deployment requires separate owner approval.

## 1.20.0

- Hungarian narration uses a dedicated server-side `ELEVENLABS_VOICE_ID_HU`; English continues to use the existing `ELEVENLABS_VOICE_ID`.
- The player sends the selected UI language (`hu` or `en`) with each step. Unsupported language values return 400; older clients without a language retain the legacy voice.
- Voice identifiers and API credentials stay in server environment variables, not in public source or browser code. Client-supplied voice IDs are not used.
- Missing Hungarian configuration returns the existing friendly error rather than silently using the old English voice. English remains usable independently.
- Model (`eleven_v3`), `[warmly] [gently]` tags, playback speed, audio format, caching and manual step controls are unchanged. A different voice may have its own natural rhythm; identical delivery to a single preview recording is not guaranteed.

### Setup before merge / acceptance check

1. In the Vercel project's Environment Variables, add `ELEVENLABS_VOICE_ID_HU` with the owner-selected Hungarian voice ID. Enable Production and Preview where the voice is to be tested. Do not replace the existing English voice variable or API key.
2. Redeploy the preview after saving the variable. Open a recipe in Hungarian and press Play; compare the result with the approved ElevenLabs sample.
3. Switch to English and verify the original English voice remains. Switch during playback/loading and check no old-language audio continues.
4. No audio is requested on recipe open. Check repeat, pause/resume, stop and step navigation. Test on phone and desktop with the same text.

The code/build tests use a simulated provider and do not consume credits or verify the real voice's accessibility. Real playback needs the Vercel configuration and uses ElevenLabs credits. Production merge requires separate owner approval.

## 1.19.0

- Enable on-demand cooking guidance on every recipe detail page with directions, removing the Gulyásleves-only restriction. All 148 built-in recipes reuse their existing Hungarian and English instructions; no recipe content is rewritten.
- Split both single-newline and blank-line numbered instructions into individual spoken steps, including side dishes and pickles. Preserve trailing cautions and introductory text.
- Reuse the existing ElevenLabs voice, model, server endpoint and credentials. No generation on page open; playback, repeat, pause, stop and manual step navigation are unchanged.
- Key the narrator by recipe ID so navigation cannot retain another recipe's player or pending audio. Hide the player when a custom recipe has no directions.
- Automated catalogue checks cover every HU/EN direction and the 1,200-character server limit; route tests verify on-demand playback for every built-in recipe in both languages, using a simulated provider (no paid API calls).
- No menu, shopping list, secret or deployment changes. Automatic step continuation remains a separate task. Merge requires owner approval.

### Acceptance check (Vercel preview)

1. Open recipes from all six categories: soup, main, side, pickle, salad and dessert. Each should show cooking guidance without starting audio.
2. Try Húsleves, Rántott csirkemell and Burgonyapüré in HU and EN. Press Play; verify the selected voice reads that recipe's displayed step.
3. Test next/previous, repeat, pause/resume and stop. Single-line numbered recipes must expose separate steps, not one long recording.
4. Navigate away during loading/playback and open another recipe. Old audio must stop and the new player must start idle at its first step.
5. A custom recipe with directions also has a player; a blank description does not. Custom text is read as stored, not automatically translated.

The preview needs the existing server environment variables; no new API key or voice ID is needed. Real voice quality must be checked manually on Vercel.

## 1.18.0

- Hungarian cooking guidance now uses the same server-side ElevenLabs voice as English, replacing the browser's Hungarian system voice.
- Reuse the existing `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID`. The server's `eleven_v3` model, `[warmly] [gently]` delivery tags, and English request text/settings are unchanged.
- Both languages have Play/Pause/Continue, Stop, step navigation, cached repeat, and an actual ten-second rewind. No speech is generated just by opening a recipe.
- Stop, language/recipe changes and unmount cancel pending requests and prevent stale audio from playing. Object URLs are released; errors never fall back to the old system voice.
- Playback remains per-step, like the existing English player. Automatic continuation and further voice-warmth tuning are not part of this release.

### Voice acceptance check (Vercel preview)

1. Open Gulyásleves in Hungarian. No audio/request should start before pressing **Lejátszás**.
2. Press **Lejátszás**; check **Készítem…**, then the approved custom voice reading Hungarian. Test pause/continue, rewind, repeat, stop and next/previous step.
3. Repeat the current step: it should reuse the session cache, without another generation request.
4. Switch to English: old Hungarian playback stops; English playback uses the same previously configured voice and settings.
5. Test Stop and switching language while audio is loading. A late response must not start the previous audio.
6. If the service fails, a localized retry message appears, without a browser-voice fallback.

`/api/tts` runs on Vercel, not the standalone Vite dev server. Existing environment variables must be available to the preview deployment. No new credentials are needed. Merge requires separate owner approval.

## 1.17.0

- Generating a menu replaces the active plan with only the selected lunch/dinner slots. A lunch includes its soup, main, side, pickles and dessert where applicable.
- Ask for confirmation before replacing an existing plan; changing the selection or cancelling does not change the saved plan.
- Recalculate groceries from the replacement plan, including serving sizes and selected-day batches. Preserve manually added shopping items and personal notes.
- Validate all selected meals before committing the new plan. If suitable recipes are unavailable, retain the old plan and groceries and show a HU/EN error.
- Show the active day/meal count, omit inactive days from the plan overview, and open the first planned day on mobile, including after reload.
- Keep single-dish replacement separate from whole-plan generation. Clear stale dish-undo state after generating a new plan.
- No narration, API credentials or deployment configuration changes.

### Acceptance check

1. Generate a full week (14 meals).
2. Select Saturday and Sunday lunch/dinner (4 meals), or use **Today through Sunday** on a Saturday.
3. Check that selection alone leaves the active plan unchanged. Cancel the replacement once and verify the same.
4. Confirm **Create new plan**. Only the weekend remains, with 2 days / 4 meals shown. No manual **Clear** is needed.
5. Open the shopping list: weekday-only ingredients and their quantities are gone. Personal items and notes remain.
6. Reload and verify the same weekend plan and shopping list. Replace one dish and change its servings: other meals remain and groceries update.
7. Repeat in Hungarian and English, on desktop and mobile. Test single-day, dinner-only and nonconsecutive selections too.

Release is prepared on a separate branch for review; merging to `main` requires owner approval.
