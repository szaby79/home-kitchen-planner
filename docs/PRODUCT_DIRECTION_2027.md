# Plan & Pan product direction — January 2027

## Launch target

January 2027 is not an MVP milestone. The target is a stable, polished and trustworthy Plan & Pan v1.0 that can be launched to paying users without developer assistance.

Plan & Pan is not a recipe app. It is the operating system for a household's weekly meal planning. Its core job is to answer:

> What should we eat this week so that the household will eat it, the plan fits the budget and available time, ingredients at home are used where practical, food waste is reduced, and planning does not consume hours?

The system may be complex internally. The user experience must remain simple. Complexity belongs to Plan & Pan, not to the household.

## Product promise

A successful household should feel:

> It knows what we need, saves me time, helps me control spending, and makes planning the week easier.

The main success signal is repeated weekly use: households should naturally want to plan the next week too. Recipe count, feature count and the number of visible AI capabilities are not primary success metrics.

## Product rules

### Extreme simplicity

Ask only for information that materially improves the plan: household members, servings, preferences, dislikes, allergies or intolerances, relevant diets, weekly food budget, available cooking time and important schedule constraints. After setup, the main action should be close to **Plan my week**.

Avoid repeated data entry, unnecessary forms and settings. Infer safe defaults, remember prior decisions and use progressive disclosure.

### Budget is a core input

Budget must change the generated plan rather than appear as a decorative field. Planning should support realistic expected cost, cheaper substitutions, budget-aware meal replacement and adjustment of the remaining week. The objective is the best realistic household plan within the selected budget, not always the cheapest plan.

Use local store prices only when the data is reliable enough to earn user trust.

### Household-first personalization

Optimize for the household, not an abstract individual. Respect allergies, diets, dislikes, changing daily schedules, preferred dishes, rejected dishes, portion history and leftovers. Learn recurring patterns without forcing users to maintain them manually.

### Recipe quality is non-negotiable

Every launch recipe must pass a structured audit covering:

1. realistic preparation, cooking and total time for a normal home cook;
2. realistic portions and ingredient quantities;
3. correct order, heat, temperature and duration;
4. critical details that prevent common failures;
5. beginner-friendly clarity and readable length;
6. removal of vague, unsafe or unnecessary AI-generated text;
7. confirmation that the ingredients and method produce the promised result;
8. correct diet and allergen metadata.

Prefer roughly 6–10 short, logical steps when that fits the dish. Do not force an artificial step count. Written recipes remain the source of truth; 30–90 second videos may later reduce uncertainty but must not replace or contradict the recipe.

### Minimal household administration

Pantry and leftover features are useful only when their maintenance cost stays low. Prefer quick selection, purchase history, suggested pantry items, appropriate photo input, reliable automatic deductions and lightweight leftover tracking. Do not require a detailed manual inventory.

### Learning and dynamic weekly plans

The system should learn from repeated choices, replacements, rejected ingredients, portion outcomes and schedule patterns. A weekly plan must remain easy to adjust when time, budget, guests, eating-out plans or leftovers change. Re-plan the affected remainder without forcing the household to rebuild the whole week.

## January 2027 release requirements

The following areas are launch gates, not optional polish:

- authentication and persistent sessions;
- data integrity and cross-device synchronization;
- reliable iPhone/PWA navigation and reopening;
- audited recipes, allergy handling and dietary tags;
- predictable weekly planning, portions, budget and replacements;
- correct shopping-list aggregation, scaling, editing and sync;
- privacy controls, global logout and permanent deletion;
- automated coverage of critical flows and previous regressions;
- clear failure states and recovery from interrupted requests;
- production error detection and traceability;
- acceptable mobile performance with the full recipe catalogue;
- consistent, low-friction UX with no duplicate actions.

## Development priority until launch

1. Stability and data integrity
2. Core weekly-planning quality
3. Budget accuracy
4. Recipe quality
5. Household personalization
6. Shopping-list reliability
7. Mobile UX
8. Automated testing
9. Privacy and account safety
10. Monitoring and production readiness
11. High-value enhancements
12. Nice-to-have features

Secondary features must not delay launch-critical reliability work.

## Decision filter

Before a meaningful feature, architectural change or major pull request, answer:

1. Does it reduce planning work?
2. Does it save meaningful time or money?
3. Does it improve plan accuracy?
4. Does it improve household personalization?
5. Does it reduce food waste?
6. Does it improve trust?
7. Can the same value be delivered more simply?
8. Will a normal user understand it without explanation?
9. Does it improve weekly retention?
10. Does it support the Plan & Pan product promise?
11. Does it move the product closer to January 2027 production readiness?
12. Does it introduce unnecessary technical or UX risk before launch?

If most answers are **no**, do not build it.

## Market direction

Hungary is the first market. Initial planning, recipes, pricing assumptions and shopping behavior should reflect Hungarian households and food culture. Keep data models and architecture capable of later Central and Eastern European localization without weakening the Hungarian launch experience.

