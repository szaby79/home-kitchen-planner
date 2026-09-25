# Breakfast recipe quality audit

Audit date: 2026-09-25

Scope: all 23 built-in breakfast recipes (`breakfast-1` through `breakfast-23`). This is a code and culinary plausibility review, not a claim that the recipes have been cooked in a test kitchen.

## Standard applied

Each breakfast was checked for:

- realistic ingredient quantities and four-person servings;
- agreement between ingredients and directions;
- preparation, cooking, resting and total elapsed time for a normal home cook;
- beginner-friendly heat, equipment, sequencing and doneness cues;
- short failure-prevention guidance where it changes the outcome;
- egg and chilled-food safety where relevant;
- equivalent Hungarian and English directions;
- dietary and allergen metadata;
- warm, direct language without filler.

## Systemic corrections

- No-cook recipes now use `0` cooking minutes instead of a fabricated one-minute cooking time.
- Required chilling, batter resting, proofing and cooling are stored separately and included in total elapsed time.
- Audited recipe pages can show preparation, cooking, resting and total time without exposing unaudited catalogue timing.
- The overnight oats and chia pudding now include their real 6-hour and 4-hour chilling periods.
- The rice pudding now allows 40 minutes of cooking instead of an unrealistic 30-minute total process.
- The cottage-cheese parcels and cheese scones now include proofing, second resting, oven preheating and cooling.
- The two yeast pastries are marked medium difficulty instead of easy.
- Directions now include pan heat, oven mode, batch size, doneness cues and common recovery guidance where useful.

## Recipe ledger

| ID | Recipe | Code review | Kitchen verification | Main audit outcome |
| --- | --- | --- | --- | --- |
| breakfast-1 | Rántotta zöldségekkel | Complete | Pending | Gentler heat and clear set-but-soft cue |
| breakfast-2 | Almás-fahéjas zabkása | Complete | Pending | Realistic prep and anti-scorch guidance |
| breakfast-3 | Bogyós éjszakai zabkása | Complete | Pending | Six-hour chill included; false cooking time removed |
| breakfast-4 | Gyümölcsös chia puding | Complete | Priority | Chia ratio corrected; four-hour chill included |
| breakfast-5 | Görög joghurt granolával és gyümölccsel | Complete | Pending | False five-minute claim removed |
| breakfast-6 | Avokádós pirítós főtt tojással | Complete | Pending | Complete egg timing and realistic total |
| breakfast-7 | Sonkás-sajtos melegszendvics | Complete | Pending | Previously unused salt assigned correctly |
| breakfast-8 | Zöldséges tojásmuffin | Complete | Pending | Fill level, doneness and resting clarified |
| breakfast-9 | Körözött friss zöldségekkel | Complete | Pending | False cooking time removed; chilling included |
| breakfast-10 | Banános zabpalacsinta | Complete | Priority | Turning cue and heat recovery clarified |
| breakfast-11 | Sajtos-gombás omlett | Complete | Pending | Two-batch method and realistic 18-minute cook time |
| breakfast-12 | Tofurántotta zöldségekkel | Complete | Pending | Moisture evaporation and doneness cues added |
| breakfast-13 | Tükörtojás szalonnával | Complete | Pending | Crowded-pan problem removed; egg safety clarified |
| breakfast-14 | Bundás kenyér | Complete | Pending | Egg coating and heat control clarified |
| breakfast-15 | Lecsós tojás kolbásszal | Complete | Pending | Paprika protection and excess-liquid recovery added |
| breakfast-16 | Tojáskrém friss paprikával | Complete | Pending | Chilling and safe return to refrigeration included |
| breakfast-17 | Tepertőkrém lilahagymával | Complete | Pending | False cooking time removed; salt and texture cues added |
| breakfast-18 | Virslis-tojásos serpenyő | Complete | Pending | Product-label heating boundary made explicit |
| breakfast-19 | Kakaós tejbegríz | Complete | Priority | Semolina reduced for a creamy result; lump prevention added |
| breakfast-20 | Fahéjas-almás tejberizs | Complete | Priority | Cooking time corrected and staged milk method clarified |
| breakfast-21 | Túrós batyu | Complete | Priority | Filling stabilized; proofing and cooling restored |
| breakfast-22 | Sajtos pogácsa | Complete | Priority | Cheese allocation, second rest and shaping clarified |
| breakfast-23 | Magyaros reggelizőtál | Complete | Pending | Ready-to-eat meat boundary and portions corrected |

## Safety references

- Nébih: [Élelmiszerbiztonsági jótanácsok tojásos ételek készítéséhez](https://portal.nebih.gov.hu/-/elelmiszerbiztonsagi-jotanacsok-tojasos-etelek-keszitesehez)
- Nébih: [Élelmiszerek okozta megbetegedések megelőzése](https://portal.nebih.gov.hu/-/elelmiszerek-okozta-megbetegedesek-megelozese)
- FoodSafety.gov: [Safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)

## Remaining evidence

All recipes remain `code-reviewed`, not `kitchen-verified`. The priority recipes above should be cooked first because their texture or dough behavior cannot be proven by automated tests or text review alone.
