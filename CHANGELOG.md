# Changelog

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
