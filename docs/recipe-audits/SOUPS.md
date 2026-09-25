# Soup recipe quality audit

Audit date: 2026-09-25

Scope: all 39 built-in soup recipes (`soup-1` through `soup-39`). This is a code and culinary plausibility review, not a claim that the recipes have been cooked in a test kitchen.

## Standard applied

Each soup was checked for realistic four-person quantities, ingredient-direction agreement, preparation/cooking/waiting time, safe handling, beginner clarity, common failure points, Hungarian-English parity, allergens, and a warm but concise tone.

## Systemic corrections

- Every soup now has preparation, cooking, resting and total elapsed time based on a normal home cook.
- Overnight bean/split-pea soaking and cold-soup chilling are included instead of being hidden.
- The no-cook avocado-cucumber soup now has zero cooking time and a separate 30-minute chill.
- All 39 soups have explicit allergen metadata; fish, nuts, egg, gluten, milk and lactose are covered where relevant.
- The Hungarian egg soup was rebuilt as a real roux-, caraway- and egg-based soup instead of floury egg dumplings in seasoned water.
- The Jókai bean soup now includes the onion, garlic and smoked sausage named by the method and expected from the dish.
- Dried tarragon is identified and measured in teaspoons, preventing the former ambiguous two-tablespoon dose.
- Fish-soup and chicken-soup liquid ratios were tightened so four servings are not unnecessarily diluted.
- The cold sour-cherry soup now uses rapid shallow-container cooling and refrigeration within two hours.
- Exact speed claims that did not match the complete process were removed.

## Recipe ledger

| Range | Recipes | Code review | Kitchen verification | Main outcome |
| --- | --- | --- | --- | --- |
| soup-1–4 | Broths, goulash and bean soups | Complete | Priority | Liquid ratios, long cooking, soaking and csipetke corrected |
| soup-5–12 | Legume, vegetable and cream soups | Complete | Pending | Thickening, acid timing, scorching and blending clarified |
| soup-13 | Hungarian egg soup | Complete | Priority | Recipe rebuilt to match the named dish |
| soup-14–20 | Chicken, fish, cabbage and cream soups | Complete | Priority for soup-16 | Poultry/fish doneness, tarragon dose and texture corrected |
| soup-21–26 | Hearty Hungarian soups | Complete | Pending | Meat timing, paprika safety and oversized portions corrected |
| soup-27 | Beef bone broth | Complete | Priority | Real three-hour gentle cooking retained in total time |
| soup-28 | Liver dumpling soup | Complete | Priority | Test dumpling and fully cooked centre required |
| soup-29 | Cold sour-cherry soup | Complete | Priority | Safe rapid cooling and full chilling time added |
| soup-30–35 | Vegetable and vegan cream soups | Complete | Pending | Realistic timing, colour and dairy/coconut handling clarified |
| soup-36 | Avocado-cucumber cold soup | Complete | Priority | False cooking time removed; chilling recorded separately |
| soup-37–39 | Asparagus, fennel and almond soups | Complete | Pending | Timing, texture and nut allergen coverage confirmed |

## Safety references

- Nébih: [Élelmiszerek okozta megbetegedések megelőzése](https://portal.nebih.gov.hu/-/elelmiszerek-okozta-megbetegedesek-megelozese)
- Nébih: [Élelmiszerbiztonsági jótanácsok tojásos ételek készítéséhez](https://portal.nebih.gov.hu/-/elelmiszerbiztonsagi-jotanacsok-tojasos-etelek-keszitesehez)
- FoodSafety.gov: [Safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)

## Remaining evidence

All soups remain `code-reviewed`, not `kitchen-verified`. Priority recipes should be cooked first because broth concentration, dumpling structure, fish handling, chilling rate and final texture cannot be proven by automated tests or text review alone.
