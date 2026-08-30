# Changelog

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
