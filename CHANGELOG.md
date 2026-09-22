# Changelog

## 1.56.0

- Add the internal keto classification needed before keto choices are exposed to users.
- Make explicit recipe allergen metadata participate in safety filtering while retaining legacy ingredient detection.
- Preserve dietary and allergen metadata when built-in recipe content is refreshed from local storage.
- Add regression coverage for keto classification, explicit dietary tags, and allergen filtering.

## 1.55.0

- Visually and verbally distinguish potentially dangerous food allergies from digestive intolerances.
- Reconcile saved Autopilot day portions with the current family size while preserving intentional per-day overrides.
- Add one consistent history-aware Back action to every internal screen, with safe route-specific fallbacks.

## 1.54.0

- Remove the globally visible version footer and keep the app version as quiet technical information at the bottom of Help.
- Let the homepage hero use the available screen height so removing the footer does not leave an empty gap above mobile navigation.

## 1.53.0

- Replace the homepage meal close-up with a warm multigenerational family-table photo.
- Preserve the full scene across mobile and desktop with a responsive 16:9 image ratio.

## 1.52.0

- Remove the redundant homepage “More options” section while keeping every destination available through the persistent or secondary navigation.
- Keep the homepage focused on Autopilot, the meal preview, family preferences, and Help.

## 1.51.0

- Replaced the duplicated homepage weekly-menu action with a clear Autopilot entry point.
- Added an optimized, appetizing family-meal photo to the homepage hero.
- Reduced the visual weight of the collapsed additional-options control.

## 1.50.0

- Add a dedicated Weekly menu action to the center of the persistent mobile navigation.
- Keep Weekly plan available as a separate direct route to Autopilot planning without changing the homepage.

## 1.49.0

- Add a persistent four-item bottom navigation on mobile for Home, Recipes, Weekly plan, and Shopping list.
- Move family preferences, budget, Help, and recipe management into the secondary mobile menu.
- Keep account and sign-in access visible in the mobile header while leaving desktop navigation unchanged.
- Remove the planner-only floating shopping button now that Shopping list is always one tap away.
- Respect the iPhone safe area and keep page content clear of the fixed navigation.

## 1.48.0

- Put recipe search and the category row first on mobile so users can start browsing immediately.
- Keep categories in one horizontally scrollable row instead of wrapping them into a tall control block.
- Combine quick meals, favourites, sorting, and recipe management in one collapsed “Filter and sort” section.
- Show a small active-filter count and provide one clear action for resetting secondary filters.
- Preserve all recipe data, favourites, links, categories, sorting modes, and planner navigation.

## 1.47.0

- Replace the tall, multi-choice mobile homepage with a compact introduction and one clear weekly-menu action.
- Show “Create weekly menu” to new users and “Open weekly menu” with a saved-plan summary to returning users.
- Remove repeated branding and explanatory copy from the homepage hero while keeping family preferences and Help directly available.
- Keep recipe categories, budget, favourites guidance, and feature shortcuts available behind one collapsed “More options” section.
- Add unit and browser regression coverage for the simplified new-user and returning-user homepage states.

## 1.46.0

- Put the actual shopping list before optional manual-entry tools so the core task is immediately visible on mobile.
- Move personal items and notes into one accessible secondary section without changing their storage or synchronization.
- Add a compact checked/remaining summary and larger, labelled item controls for easier one-handed shopping.
- Keep empty-list users able to add a personal item directly while preserving weekly and daily list views.
- Add unit and browser regression coverage for the list-first layout, progress feedback, and saved personal data.

## 1.45.0

- Replace the seven permanently expanded Autopilot day cards with compact, accessible day summaries that open one day at a time for editing.
- Fit all six weekly priorities into a shorter two-column mobile layout while preserving every existing goal and setting.
- Remove the floating generation panel that covered mobile content and keep one clear, full-width generation action in the normal page flow.
- Simplify the bilingual Autopilot guidance around saved defaults without changing menu generation, family preferences, saved plans, shopping lists, authentication, or sync.
- Add unit and browser regression coverage for compact day editing and the non-floating primary action.

## 1.44.0

- Show an existing weekly menu before generation and household setup controls on mobile.
- Keep plan creation fully visible when no weekly menu exists, while moving regeneration behind an accessible secondary control for saved plans.
- Collapse plan setup automatically after successful generation without changing saved meals, portions, sync, shopping lists, authentication, or RLS.
- Reconcile the application version with PR #44 and source the visible footer version directly from package metadata.
- Require future pull requests to use the matching `1.<PR number>.0` package version before GitHub quality checks can pass.


## 1.40.0

- Replace magic-link-first authentication with an in-app email OTP verification flow.
- Keep browser and installed-PWA sessions persistent while session restoration is resolved.
- Add bilingual OTP, resend cooldown, invalid-code, and email-rate-limit states.
- Preserve existing Supabase users, profiles, family settings, weekly plans, and shopping lists.
- Add automated authentication regression coverage and manual Supabase template instructions.


## 1.39.0

- Refresh only the homepage hero copy and typography with a warmer, more focused bilingual message.
- Preserve the existing homepage layout, controls, navigation, cards, colors, and application behavior.


## 1.38.0

- Add a complete Plan & Pan web-app identity for iOS and Android home screens.
- Add an installable bilingual web-app manifest with the owner-selected full promotional artwork as the application icon.
- Replace the legacy browser and Apple touch icon references with Plan & Pan branding.
- Preserve the existing application behavior, Vercel deployment, Supabase integration, guest mode, and social-sharing preview.


## 1.37.0

- Remove the Lovable-only build tagger and its unused transitive lockfile entries while preserving the React/Vite application.
- Replace generated Lovable page metadata with bilingual Plan & Pan title, description, author, and social metadata without adding an unverified sharing image.
- Keep Vercel routing, Supabase authentication and cloud storage, guest mode, the Help Centre, and existing application behavior unchanged.
- Document the owner-controlled post-merge sequence: verify production first, then separately revoke GitHub App access or archive the external project only with explicit approval.

## 1.36.0

- Add a prominent bilingual Help Centre with accurate guides for Autopilot, planning, weekly and daily shopping views, guest/account storage, cloud saving, privacy controls, and troubleshooting.
- Add accessible contextual help beside the most easily misunderstood controls, plus a clearly visible first-visit guide link on the home page.
- Restore a clean automated baseline by updating stale route and language tests to match the current application flow.
- Make the existing two- and three-day batch-cooking preference effective for consecutive, compatible days while keeping partial regeneration and shopping quantities accurate.
- Add a free GitHub Actions pull-request gate for type-checking, linting, the complete test suite, and the production build.
- Add a durable manual release checklist, including the still-pending PR #34 shopping-list multi-device checks and PR #35 destructive account checks.

## 1.35.0

- Add a responsive bilingual Account and Privacy screen with account metadata, cloud status, current-user storage counts, and a concise free-beta privacy summary.
- Add a human-readable UTF-8 JSON export containing safe account metadata, privacy-acceptance history, family settings, weekly plans, and linked shopping-list state—never sessions, tokens, passwords, or credentials.
- Add deliberately confirmed deletion of the signed-in user's saved application data while keeping the account, clearing pending sync state, and preventing stale offline queues from recreating deleted records.
- Add separate current-device and all-device sign-out controls, plus a strongly confirmed permanent-account deletion flow through an authenticated server-only endpoint.
- Preserve privacy-notice acceptance history in a new owner-readable RLS table and update the beta notice to `beta-2026-09-v2` without silently accepting it for existing users.
- Keep guest mode available and add a scoped local-data reset that only removes Plan & Pan browser-storage keys.

## 1.34.0

- Automatically save and restore each signed-in user's exact weekly menu, portions, replacements, and linked shopping-list state through Supabase.
- Add compact bilingual saved-week navigation and require confirmation before replacing an existing plan in both weekly-planner flows.
- Keep guest menus and shopping lists device-local, migrate a valid matching local week only when no cloud row exists, and restore the separate guest state immediately after sign-out.
- Debounce cloud writes, retain failed changes in user-and-week-scoped pending storage, and show bilingual loading, saving, saved, pending, and offline states.
- Add a one-row-per-user/week `weekly_plans` migration with stable recipe IDs, UUID ownership, timestamps, idempotent uniqueness, history indexing, and strict CRUD Row Level Security.
- Preserve unavailable recipe IDs and show a safe fallback message instead of silently substituting or crashing.

## 1.33.0

- Securely synchronize the complete existing family-settings state for signed-in users while keeping guest settings device-local.
- Migrate valid local settings on first sign-in only when the account has no cloud record; existing cloud settings remain authoritative.
- Debounce writes, retain failed changes in user-scoped pending storage, and show bilingual loading, saving, saved, retry, and friendly error states.
- Add a one-row-per-user `family_settings` migration with UUID ownership, timestamps, automatic `updated_at`, and strict select/insert/update/delete Row Level Security policies.
- Clear authenticated settings from in-memory UI state on sign-out and restore the separate guest profile without changing menu-generation behavior.

## 1.32.0

- Audit and correct recipe photography across the built-in catalogue.
- Replace mismatched vegetable-stew images with recipe-specific images for all 20 newly added stews.
- Replace the shared placeholder-style side-dish and pickle images with individual recipe-specific images for all 10 sides and 8 pickles.
- Keep the existing recipe IDs and image-path contract unchanged so saved menus and catalogue migrations remain compatible.

## 1.31.0

- Add optional passwordless Supabase email authentication while preserving unrestricted guest mode.
- Restore authenticated sessions after refresh and create a minimal user profile automatically.
- Add strict Row Level Security policies and a repository-managed profile migration.
- Add bilingual account states and a bilingual beta privacy notice with explicit acceptance.
- Document safe Supabase and Vercel setup without committing credentials.

## 1.30.0

- Fix saved recipe migration so existing users see 60 main dishes and 30 vegetable stews after updating.
- Refresh the category of every built-in recipe from the current catalogue while preserving user-created recipes.

## 1.29.0

- Add a separate Főzelékek / Vegetable stews recipe category.
- Move all 30 főzelék meals out of Főételek while keeping them available for lunch planning.
- Update category filters, homepage counts, recipe forms, sorting, saved-catalogue migration, and the visible version number.

## 1.28.0

- Add 20 new Hungarian főzelék meals with traditional toppings, bringing the built-in főzelék selection to 30.
- Each new meal includes four-person ingredient quantities, five clear cooking steps, English directions, shopping-list support, calorie and budget estimates, and a bundled image.
- Refresh saved catalogues so the new meals appear automatically without changing user-created recipes.

## 1.23.0

- Improve readability without changing the cream, terracotta and sage brand palette, recipe content or app behavior.
- Darken secondary text in light mode and brighten it in dark mode; native input/textarea placeholders use the same opaque, readable color.
- Increase small supporting text to 14px in menu preferences, weekly meal metadata, recipe calories, shopping notes, voice guidance and the footer. Add medium weight and more line spacing to supporting copy on these screens and the homepage.
- Fix the pale voice-test badge: use dark text on its tinted background. Disabled controls retain their distinct appearance and behavior.
- Add contrast regression tests for secondary text on standard and tinted surfaces. This is a targeted readability improvement, not a full accessibility audit.
- No new audio generation, provider changes or credit usage. Voice guidance remains limited to Gulyásleves. No new environment variables.

### Compare before approval

Open production (v1.22) and this branch's Vercel preview (v1.23) on the same phone. Compare homepage card descriptions, expanded family-preference hints/placeholders, generated meal calories, saved-menu message, shopping notes and the Gulyásleves voice badge. Repeat in EN and check narrow screens. Do not press Play for this visual check: live voice generation still consumes credits. Merge only after owner approval.

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
