import { additionalStewEnglishInstructions } from '@/data/additionalStews';
import { dietaryRecipePackOneEnglishInstructions } from '@/data/dietaryRecipePackOne';
import { dietaryRecipePackTwoEnglishInstructions } from '@/data/dietaryRecipePackTwo';
import { dietaryRecipePackThreeEnglishInstructions } from '@/data/dietaryRecipePackThree';
import { dietaryRecipePackFourEnglishInstructions } from '@/data/dietaryRecipePackFour';
import { dietaryRecipePackFiveEnglishInstructions } from '@/data/dietaryRecipePackFive';
import { breakfastRecipeEnglishInstructions } from '@/data/breakfastRecipes';

export const ENGLISH_INSTRUCTIONS: Record<string, string> = {
  ...breakfastRecipeEnglishInstructions,
  ...additionalStewEnglishInstructions,
  ...dietaryRecipePackOneEnglishInstructions,
  ...dietaryRecipePackTwoEnglishInstructions,
  ...dietaryRecipePackThreeEnglishInstructions,
  ...dietaryRecipePackFourEnglishInstructions,
  ...dietaryRecipePackFiveEnglishInstructions,
  'soup-1': `1. Put the chicken thighs in a large pot, add 2.2 litres of cold water, and heat over medium. Skim off the grey foam as it rises.

2. Peel the carrots, parsley root, and celeriac. Add them with the whole onion, salt, and pepper.

3. Once boiling, reduce the heat until the soup barely simmers. Cook partly covered for 90 minutes; a hard boil will make the broth cloudy.

4. Remove the meat and vegetables, then carefully strain the broth into a clean pot. The chicken is ready when it pulls easily from the bone.

5. Cook the noodles separately in salted water according to the package. Place noodles, vegetables, and chicken in each bowl and ladle over the hot broth.

Caution: Wash your hands, knife, and cutting board thoroughly after handling raw chicken.`,
  'soup-2': `1. Cut the beef into 2 cm cubes. Chop the onion and garlic; peel and cut the carrots and potatoes into bite-sized pieces.

2. Heat the oil in a large pot. Cook the onion for 6–8 minutes, then brown the beef for 5–7 minutes.

3. REMOVE THE POT FROM THE HEAT before stirring in the paprika. After 10 seconds, immediately add about 1.5 litres of water so the paprika cannot burn and turn bitter.

4. Add the tomato, pepper, garlic, caraway, and half the salt. Simmer partly covered for 60 minutes, then add the carrots and potatoes and cook 30–40 minutes more.

5. For csipetke, knead 1 egg, a pinch of salt, and about 100 g flour into a firm, non-sticky dough. Pinch off pea-sized pieces with floured fingers.

6. Add the csipetke for the final 8–10 minutes and stir once so they do not stick together. They are ready when they float and no longer have a floury centre.`,
  'soup-3': `1. The night before, cover the beans with at least three times their volume of cold water. Drain and rinse them before cooking.

2. Put the beans and smoked pork hock in a large pot with about 2.5 litres of cold water. Simmer for 60 minutes; do not add salt yet because the meat is salty.

3. Add the sliced roots, whole onion, garlic, and bay leaf. Simmer 30–45 minutes, until a bean crushes easily between two fingers.

4. Whisk the sour cream and flour until smooth. Temper it with two ladlefuls of hot soup, then slowly stir it back into the pot.

5. Boil gently for 3–4 minutes. Mix the paprika with a little warm broth before adding it, then remove the hock, cut up the meat, and return it to the soup.`,
  'soup-4': `1. Soak the beans overnight in plenty of cold water, then drain. Put them in a pot with the pork hock, bay leaf, and 2.5 litres of fresh water.

2. Simmer for 60 minutes. Add the sliced carrots and parsley root, the whole onion, and the garlic. Cook for another 30–45 minutes, adding the sliced sausage for the final 15 minutes. The beans should be tender; season with salt only at the end.

3. For csipetke, knead 1 egg, a pinch of salt, and 80–100 g flour into a firm dough. Pinch off pea-sized pieces and simmer them for 8–10 minutes.

4. Whisk the sour cream, flour, and two ladlefuls of hot soup until smooth. Slowly stir this mixture into the pot and boil for 3 minutes.

5. Mix the paprika with warm broth before adding it. Remove and chop the meat, return it to the soup, then taste before adding any salt.`,
  'soup-5': `1. Rinse the red lentils in a sieve until the water is almost clear. Chop the onion and garlic and slice the carrot.

2. Heat the oil and cook the onion for 5 minutes. Add the garlic for 30 seconds, then add the carrot, lentils, and bay leaf.

3. Add about 1.5 litres of water. Simmer for 20–25 minutes, stirring occasionally, until the lentils are completely soft.

4. Temper the sour cream with a ladleful of hot soup, slowly stir it into the pot, and simmer for 2 minutes.

5. Remove the bay leaf. Add salt and sugar first, then add vinegar half a tablespoon at a time, tasting after each addition.`,
  'soup-6': `1. Sort and rinse the split peas, then soak them in cold water for at least 4 hours, preferably overnight. Drain before cooking.

2. Chop the onion and slice the carrot. Cook the onion in oil for 5 minutes, then add the carrot, peas, and bay leaf.

3. Add about 1.5 litres of water. Simmer partly covered for 45–60 minutes, stirring often so the peas do not stick.

4. Add the sliced sausage when the peas are nearly tender and cook for another 10–15 minutes. Add hot water if the soup becomes too thick.

5. Season only at the end because the sausage is salty. The soup is ready when the peas have cooked to a creamy texture.`,
  'soup-7': `1. Peel the carrots, celeriac, parsley root, and kohlrabi. Cut them into even 1 cm pieces and break the cauliflower into small florets.

2. Put the firm vegetables in a pot with about 1.8 litres of water and the salt. Bring to a boil.

3. Simmer for 15 minutes. Add the cauliflower and peas and cook for another 8–10 minutes, until tender but not falling apart.

4. Cook the noodles separately in salted water according to the package, then drain. This keeps leftovers from becoming soggy.

5. Taste and adjust the salt. Add the noodles to each bowl and finish with chopped parsley.`,
  'soup-8': `1. Remove the cauliflower leaves, divide the head into small florets, and rinse. Put it in a pot with about 1.5 litres of water and salt.

2. Simmer for 10–12 minutes, until a fork enters the thick stems but the florets still hold their shape.

3. Melt the butter in a small saucepan. Stir in the flour and cook for 1 minute without browning.

4. Gradually whisk in two or three ladlefuls of hot soup until smooth. Stir this mixture into the pot and boil for 3 minutes.

5. Temper the sour cream with warm soup and add it over low heat. Do not boil hard after this or it may split; season and add parsley.`,
  'soup-9': `1. Chop the onion. Peel and cube the potato, and divide the broccoli into florets; peel and dice the tender centre of the stem.

2. Melt the butter and cook the onion for 5 minutes. Add the potato, broccoli stem, and about 1.2 litres of water.

3. Simmer for 10 minutes, then add the florets and cook for 6–8 minutes more, until everything is tender.

4. Remove from the heat. Blend until smooth, keeping the blender head under the liquid to prevent hot splashes.

5. Stir in the cream, salt, pepper, and nutmeg. Warm gently for 2–3 minutes without a hard boil.`,
  'soup-10': `1. Chop the onion, cube the peeled potatoes, and slice the carrots.

2. Cook the onion in oil for 5–6 minutes. REMOVE THE POT FROM THE HEAT, stir in the paprika, and immediately add about 1.5 litres of water.

3. Add the potatoes, carrots, bay leaf, and salt. Simmer for 20–25 minutes, until the potatoes are easily pierced with a fork.

4. Whisk the sour cream and flour smooth, then gradually whisk in two ladlefuls of hot soup. Slowly stir it back into the pot.

5. Boil gently for 3 minutes to cook the flour. Remove the bay leaf, taste, and adjust the seasoning.`,
  'soup-11': `1. Wipe the mushrooms clean, trim the dry stem ends, and slice them. Finely chop the onion.

2. Melt the butter and cook the onion for 5 minutes. Add the mushrooms and a little salt; cook 8–10 minutes until most of their liquid evaporates.

3. Sprinkle in the flour and stir for 1 minute. Gradually add about 1.5 litres of water, stirring until smooth.

4. Simmer for 15 minutes. Temper the sour cream with a ladleful of hot soup, then slowly stir it into the pot.

5. Heat gently for 2 minutes without a hard boil. Add pepper, taste for salt, and serve with chopped parsley.`,
  'soup-12': `1. Chop the onion and garlic and roughly cut the tomatoes. Cook the onion in oil for 5 minutes, then add the garlic for 30 seconds.

2. Add the tomatoes, salt, and about 500 ml water. Simmer for 20 minutes, until the tomatoes are completely soft.

3. Remove from the heat and blend smooth. For an extra-smooth soup, press it through a sieve into a clean pot.

4. Add sugar gradually to taste. Bring back to a boil, add the egg barley, and cook for the package time, usually 10–12 minutes, stirring often.

5. Serve the sour cream separately, or temper it with a little warm soup before stirring it in.`,
  'soup-13': `1. Heat the oil in a pot over medium-low heat. Add the caraway and stir for 20–30 seconds, until fragrant; do not let it burn.

2. Stir in the flour and cook the pale roux for 1–2 minutes. Remove the pot from the heat, mix in the paprika, then gradually whisk in 1.5 litres of cold water until smooth.

3. Return to the heat, add the salt and pepper, and bring to a boil. Simmer for 5 minutes so the flour cooks through.

4. Beat two eggs in a bowl. Stir the gently simmering soup slowly while drizzling in the eggs to form fine ribbons.

5. Crack each remaining egg into a separate cup, then gently slide it into the soup. Do not stir. Simmer for 4–5 minutes, until the whites are completely set; cook 1–2 minutes longer for firm yolks.

6. Add only half the vinegar at first. Taste, then add more if you enjoy a brighter, pleasantly sour soup.`,
  'soup-14': `1. Cut the chicken into 2 cm cubes. Peel and slice the carrots and slice the mushrooms.

2. Melt half the butter. Cook the chicken for 4–5 minutes, until all sides turn white, then add the carrots and mushrooms for 3 minutes.

3. Add about 1.5 litres of water and salt. Simmer for 15 minutes, add the peas, and cook 8–10 minutes more; the chicken must not be pink inside.

4. Melt the remaining butter in a small pan, stir in the flour, and cook for 1 minute. Gradually whisk in hot soup until smooth.

5. Stir the mixture into the pot and boil for 3 minutes. Temper and add the sour cream, then heat gently without boiling hard.`,
  'soup-15': `1. Cut the chicken into bite-sized pieces, or leave bone-in thighs whole. Peel and slice the carrots and parsley root.

2. Put the chicken and vegetables in a pot with about 1.8 litres of water, salt, and half the dried tarragon. Simmer for 40–50 minutes.

3. Whisk the sour cream and flour smooth. Gradually add two ladlefuls of hot soup, then slowly stir the mixture into the pot.

4. Boil gently for 3 minutes and add the remaining tarragon. Add vinegar only at the end, half a teaspoon at a time, tasting as you go.

5. If using whole thighs, remove them, discard the bones, cut up the meat, and return it to the soup.`,
  'soup-16': `1. Cut the cleaned fish into 2–3 cm slices, salt lightly, and refrigerate. Slice the onion and chop the peppers and tomatoes.

2. Put the fish head, tail, and bony pieces in a pot with the vegetables and 1.5 litres of water. Simmer for 45 minutes.

3. Strain the broth through a fine sieve into a clean pot. Carefully pick any usable meat from the cooked fish, checking for bones.

4. Bring the broth back to a boil. Mix the paprika with a ladleful of warm broth before adding it so it does not clump or burn.

5. Add the fish slices and simmer firmly for 12–15 minutes. Do not stir with a spoon; gently rock the pot. Warn diners that bones may remain.`,
  'soup-17': `1. If the sauerkraut is very sour or salty, rinse it once in cold water and squeeze it dry. Chop the onion and slice the sausage.

2. Cook the onion in oil for 5 minutes. Remove the pot from the heat, stir in the paprika, and immediately add 200 ml water.

3. Add the sauerkraut and about 1.2 litres of water. Simmer for 25 minutes, then add the sausage and cook for 15 minutes more.

4. Whisk the sour cream, flour, and a ladleful of hot soup until smooth. Slowly stir it into the pot and boil for 3 minutes.

5. Taste before adding salt because both the sauerkraut and sausage may already be salty.`,
  'soup-18': `1. Peel the potatoes and cut them into even 2 cm cubes, then finely chop the onion.

2. Heat the oil in a pot and cook the onion for 5 minutes. Add the potatoes, bay leaf, salt, and about 1.5 litres of water. Bring to a boil, then simmer for 18–22 minutes, until the potatoes are tender but still hold their shape.

3. Whisk the sour cream and flour smooth. Gradually add two ladlefuls of hot soup to temper it.

4. Slowly stir the mixture into the pot and boil gently for 3 minutes so the flour cooks through.

5. Remove the bay leaf. Add vinegar a little at a time, tasting after each addition, and adjust the salt.`,
  'soup-19': `1. Drain the corn, chop the onion, and peel and cube the potato.

2. Melt the butter and cook the onion for 5 minutes. Add the potato, corn, and about 1 litre of water.

3. Simmer for 15–20 minutes, until the potato is completely tender.

4. Remove from the heat and blend smooth. Keep the blender head below the liquid to avoid hot splashes.

5. Stir in the cream, salt, and pepper. Warm gently for 2–3 minutes; do not let the cream boil hard.`,
  'soup-20': `1. Peel the garlic and potatoes and cut the potatoes into small cubes. Cut the bread into cubes for croutons.

2. Melt half the butter, add the garlic, and cook over low heat for 1 minute without browning it.

3. Add the potatoes and about 1.2 litres of water. Simmer for 15–20 minutes, until the potatoes are very soft.

4. Blend smooth, stir in the cream, salt, and pepper, and warm gently without a hard boil.

5. Fry the bread cubes in the remaining butter until golden and crisp. Add them only when serving so they stay crunchy.`,
  'soup-21': `1. Cut the pork into 2 cm cubes, chop the onion and garlic, cut the potatoes into bite-sized pieces, and cut the green beans into 3–4 cm lengths.

2. Cook the onion in oil for 5 minutes. Remove the pot from the heat, stir in the paprika, and immediately add 100 ml water so the paprika does not burn.

3. Immediately add water, then add the garlic and salt. Simmer partly covered for about 45 minutes.

4. Add the green beans and potatoes and cook for another 20–25 minutes, until the meat and vegetables are tender.

5. Whisk the sour cream and flour with hot soup, stir it into the pot, boil for 3 minutes, and finish with dill.`,
  'soup-22': `1. Remove the tough centre from the savoy cabbage and slice the leaves. Cube the potatoes and slice the wieners.

2. Cook the chopped onion in oil for 5 minutes. Remove from the heat, add paprika, then immediately add water.

3. Add the cabbage, potatoes, garlic, marjoram, and salt. Simmer for about 20 minutes.

4. Add the wieners and cook for another 5 minutes. They only need to heat through.

5. Whisk the sour cream and flour with hot soup, stir it in, and boil gently for 3 minutes. Taste before serving.`,
  'soup-23': `1. Peel the squash and potato and cut them into 2 cm cubes, then chop the onion and garlic.

2. Melt the butter and cook the onion for 5 minutes. Add the garlic for 30 seconds, then add the squash and potato.

3. Add about 1.2 litres of water, salt, and pepper. Simmer for about 20 minutes, until everything is easily pierced with a fork.

4. Remove from the heat and blend until completely smooth, keeping the blender head under the liquid.

5. Stir in the cream, salt, pepper, and nutmeg. Warm gently for 2 minutes without boiling hard.`,
  'soup-24': `1. Chop the onion and peel and cube the potato. Frozen peas do not need to be thawed.

2. Melt the butter and cook the onion over medium heat for 5 minutes.

3. Add the potato and about 1 litre of water. Simmer for 10 minutes, then add the peas and cook for another 6–8 minutes.

4. Remove from the heat and blend smooth. For a thinner soup, add a little hot water.

5. Stir in the cream, salt, and pepper and warm gently. Do not keep cooking or the peas will lose their bright colour.`,
  'soup-25': `1. Dice the bacon and potatoes, chop the onion, and break the lebbencs noodles into large pieces.

2. Render the bacon in a pot and remove the crisp pieces. Brown the noodles lightly in the bacon fat.

3. Add the onion and cook until soft. Remove from the heat, stir in the paprika, and immediately add water.

4. Add the potatoes, caraway, and salt. Simmer for about 20 minutes, until both the potatoes and noodles are tender.

5. Taste for seasoning and serve with the reserved crisp bacon on top.`,
  'soup-26': `1. Rinse the sauerkraut once if it is very sour, then squeeze it dry. Chop the onion and garlic and slice the sausage.

2. Cook the onion in oil until soft. Remove from the heat, stir in the paprika, then immediately add a little water.

3. Add the sauerkraut, sausage, garlic, bay leaf, and enough water for a thick soup. Simmer for 35–40 minutes.

4. Whisk the sour cream and flour with a ladleful of hot soup until smooth. Slowly stir it back into the pot.

5. Boil gently for 3 minutes. Taste before adding salt because the sausage and sauerkraut are already salty.`,
  'soup-27': `1. Rinse the beef bones and put them in a large pot with cold water. Bring up to a gentle simmer and skim off the foam.

2. Peel the vegetables and add them whole with the onion, peppercorns, and salt.

3. Simmer very gently, partly covered, for 3–4 hours. Do not let it boil hard or the broth will become cloudy.

4. Remove the bones and vegetables and carefully strain the broth into a clean pot. Taste and adjust the salt.

5. Cook the noodles separately according to the package and add them to each bowl when serving.`,
  'soup-28': `1. Peel and slice the carrot and parsley root. Simmer them in 1.5 litres of lightly salted water for 20 minutes.

2. Finely chop the onion and cook it in the oil for 5 minutes. Clean the chicken liver and chop it very finely or mince it.

3. Mix the liver, onion, egg, marjoram, pepper, parsley, and 70 g breadcrumbs. Rest for 10 minutes; if the mixture is too soft, add more breadcrumbs.

4. With wet hands, shape small walnut-sized dumplings. Simmer one test dumpling in the broth; if it falls apart, add more breadcrumbs to the mixture.

5. Simmer the dumplings gently for 12–15 minutes. Cut one open; the centre must be fully cooked and no longer raw or bloody.`,
  'soup-29': `1. Put the pitted sour cherries in a pot with water, sugar, cinnamon, cloves, lemon peel, and vanilla sugar.

2. Bring to a boil, then simmer for 8–10 minutes; the cherries should soften but not fall apart.

3. Whisk the sour cream and flour until smooth. Gradually whisk in two ladlefuls of hot soup.

4. Slowly stir the mixture into the pot and simmer for 2–3 minutes. Taste and adjust the sugar or lemon.

5. Divide the soup among two or three shallow containers so it cools quickly. Refrigerate within 2 hours, then chill for at least 2 hours. Stir before serving.`,
  'soup-30': `1. Wash the spinach, chop the onion and garlic, and peel and cube the potato.

2. Melt the butter and cook the onion for 5 minutes. Add the garlic for 30 seconds, then add the potato and water.

3. Simmer for 12–15 minutes, add the spinach, and cook for 3–4 minutes, until wilted and tender.

4. Remove from the heat and blend smooth, keeping the blender head under the liquid to prevent splashing.

5. Stir in the cream, salt, pepper, and nutmeg. Warm gently without boiling hard.`,
  'main-1': `1. Cut the chicken breast into 1–1.5 cm slices. Place them between two sheets of plastic wrap and gently pound them to an even thickness of about 8 mm. Salt both sides.

2. Set up three shallow dishes: flour, beaten eggs, and breadcrumbs. Coat each piece in that order, shaking off the excess at every stage.

3. Heat 1–1.5 cm oil in a frying pan over medium heat. Test it with a breadcrumb; it should sizzle immediately without burning.

4. Fry in batches for 3–4 minutes per side, until golden. Do not crowd the pan. The chicken must be white throughout, with no pink centre.

5. Peel and cube the potatoes. Cook them in salted water for 15–20 minutes, until easily pierced with a fork, then drain and serve with the chicken.

6. Drain the chicken briefly on paper towel. Wash your hands and all utensils after handling raw chicken, and discard any coating ingredients that touched it.`,
  'main-2': `1. Place the pork slices between two sheets of plastic wrap and pound them to an even thickness of about 8 mm. Make two or three small cuts around the fatty edge so the meat does not curl, then salt both sides.

2. Set up three shallow dishes with flour, beaten eggs, and breadcrumbs. Coat each piece in that order; do not press the crumbs on firmly.

3. Heat 1–1.5 cm oil over medium heat. A breadcrumb should sizzle gently; smoking oil is too hot.

4. Fry in batches for 4–5 minutes per side, until golden. Turn each piece only once and avoid crowding the pan.

5. Peel and cube the potatoes. Cook them in salted water for 15–20 minutes, until tender, then drain and serve with the pork.

6. Drain the cutlets briefly on paper towel. Cut into the thickest one to check that the centre is fully cooked and no longer raw or pink.`,
  'main-3': `1. Cut the cheese into slices about 1.5 cm thick and pat them completely dry. Set out flour, beaten eggs, and breadcrumbs in separate dishes.

2. Coat each slice in flour, egg, and breadcrumbs, then repeat the egg and breadcrumb layers. Seal every edge; the double coating holds in the melting cheese.

3. Refrigerate the coated cheese for 15 minutes. Meanwhile, heat 1–1.5 cm oil over medium heat.

4. Fry in batches for about 1–1.5 minutes per side, only until golden. Use a spatula rather than a fork so the cheese does not leak.

5. Rinse the rice, add 600 ml water and a little salt, cover, and cook over low heat for 12–15 minutes. Turn off the heat, rest for 5 minutes, then fluff with a fork.

6. Lift the cheese out with a spatula, drain briefly on paper towel, and serve immediately with the rice and tartar sauce.`,
  'main-4': `1. Chop the onion and cut the pepper and tomato. Pat the chicken thighs dry and season with salt.

2. Cook the onion in oil for 6–8 minutes. Remove the pot from the heat, stir in the paprika, and immediately add 100 ml water so the paprika does not burn.

3. Add the chicken, pepper, tomato, and salt. Cover and simmer gently for 45–55 minutes, adding a little water if needed. The meat must not be pink beside the bone.

4. Whisk the sour cream with a little hot sauce, then stir it into the pot over low heat. Do not boil hard.

5. For the nokedli, mix 400 g flour, 2 eggs, 1 teaspoon salt, and about 250 ml water without overworking. Drop into gently boiling salted water; once the dumplings rise, cook for 1 minute, then drain.`,
  'main-5': `1. Cut the pork into 2 cm cubes and finely chop the onion, pepper, and tomato.

2. Cook the onion in oil until soft. Remove from the heat, stir in paprika, and immediately add a splash of water.

3. Add the pork, pepper, tomato, and salt. Cook covered over low heat, adding only a little water when needed.

4. Simmer for 60–75 minutes, until the pork is fork-tender and the sauce is thick.

5. Prepare nokedli in boiling salted water, drain, and serve with the hot stew.`,
  'main-6': `1. Cut the beef into even 2 cm cubes and finely chop the onion, pepper, and tomato.

2. Cook the onion in oil until soft. Remove from the heat before stirring in paprika, then immediately add a little water.

3. Add the beef, pepper, tomato, and salt. Cover and simmer gently, adding small amounts of hot water as needed.

4. Cook for 2–2.5 hours, until the beef is very tender and the sauce is rich and thick.

5. Prepare the nokedli, drain well, and serve. Taste the stew before adding more salt.`,
  'main-7': `1. Cut the beef into thin strips, dice the bacon, slice the mushrooms, and chop the onion.

2. Render the bacon, then cook the onion in the fat. Add the beef and brown it in batches.

3. Add pepper and a little water. Cover and simmer gently for 60–90 minutes, until the beef is tender.

4. Add the mushrooms for the final 15 minutes. Stir in tempered sour cream over low heat.

5. Prepare nokedli separately and serve with the tokány. Salt only after tasting because the bacon is salty.`,
  'main-8': `1. Put the unpeeled potatoes in cold salted water and cook for 20–25 minutes from the boil. Cook the eggs separately for 10 minutes, then cool them. Peel and slice both, and slice the sausage.

2. Heat the oven to 180°C and butter a baking dish about 25 × 35 cm.

3. Add one-third of the potatoes, season lightly, then layer in eggs, sausage, and a few spoonfuls of sour cream. Repeat, finishing with potatoes.

4. Spread over the remaining sour cream and bake for 30–35 minutes, until bubbling at the edges and lightly browned.

5. Rest for 10 minutes before serving so the layers hold together and are not dangerously hot.`,
  'main-9': `1. Rinse the rice, then cook it covered in twice its volume of lightly salted water for 12–15 minutes. Rinse the sauerkraut once if it is very salty.

2. Cook the chopped onion in oil for 5 minutes. Add the ground pork and break it up while cooking for 8–10 minutes. Remove from the heat, then stir in the paprika and salt.

3. Heat the oven to 180°C. Layer half the sauerkraut, the rice, the meat, and then the remaining sauerkraut in a baking dish.

4. Spread the sour cream over the top, cover with foil, and bake for 40 minutes. Remove the foil and bake for another 15–20 minutes.

5. It is ready when the centre is piping hot and the top is lightly browned. Rest for 10 minutes before serving.`,
  'main-10': `1. Rinse the rice, then mix it with the ground pork, egg, chopped onion, salt, and paprika. The rice does not need to be precooked.

2. Lay out one sauerkraut leaf, place 1–2 tablespoons of filling near the lower edge, fold in the sides, and roll loosely because the rice expands.

3. Line a large pot with shredded sauerkraut and some smoked ribs. Arrange the rolls on top, add the remaining ribs between them, and cover with the rest of the sauerkraut.

4. Add enough water to almost cover. Bring to a boil, then cover and cook over low heat for 90 minutes. Do not stir; gently shake the pot instead.

5. Cut one roll open: the meat must not be pink and the rice must be tender. Serve with sour cream.`,
  'main-11': `1. Rinse the rice, precook it for 8 minutes, then drain. Cut the tops from the peppers and remove the seeds.

2. Mix the ground pork, precooked rice, egg, chopped onion, and salt. Fill the peppers only three-quarters full because the rice continues to expand.

3. Put the tomato sauce in a large pot, add about 300 ml water and half the sugar, then stand the peppers in the sauce.

4. Bring to a boil, then cover and cook over low heat for 40–45 minutes, carefully turning the peppers halfway through.

5. Cut one pepper open to confirm the meat is fully cooked. Taste the sauce, then add only as much of the remaining sugar and salt as it needs.`,
  'main-12': `1. Slice the peppers, tomatoes, onion, and sausage. Heat the oil in a wide pan.

2. Cook the onion for 5 minutes, add the peppers, and cook covered for 10 minutes.

3. Add the tomatoes, sausage, salt, and a small pinch of sugar. Simmer uncovered for 10–15 minutes.

4. Beat the eggs, pour them in, and stir for 2–3 minutes until just set. Do not cook them dry.

5. Taste and serve hot with fresh bread.`,
  'main-13': `1. Cut the pork and potatoes into even 2 cm cubes. Finely chop the onion and garlic.

2. Pat the pork dry. Brown it in two or three batches in a little hot oil so it sears instead of steaming, then set aside.

3. Cook the onion in the same pan for 4 minutes, then add the garlic for 30 seconds. Return the pork, add salt, pepper, marjoram, and 100 ml water, then cover and cook for 35–45 minutes, until tender.

4. Fry the potatoes separately in hot oil until golden and tender inside, then drain well.

5. Mix the pork and potatoes only just before serving so the potatoes stay crisp. Offer pickles to taste—about 1–2 per person, depending on their size.`,
  'main-14': `1. Soak the bread rolls in water for 5 minutes, then squeeze them very dry with both hands. Finely chop the onion and garlic.

2. Mix the pork, bread, egg, onion, garlic, salt, and pepper until even, then rest the mixture for 10 minutes.

3. With wet hands, shape eight equal, slightly flattened patties so their centres cook through reliably.

4. Heat about 1 cm oil over medium heat. Fry the patties for 4–5 minutes per side, until browned.

5. Cut one patty open to check that no pink meat remains. Drain on paper towel and serve with the separately selected side dish.`,
  'main-15': `1. Put three eggs in cold water, boil for 10 minutes from the boil, then cool and peel them. Soak the bread rolls and squeeze them very dry.

2. Mix the ground pork with the bread, two raw eggs, chopped onion, salt, and pepper.

3. Heat the oven to 180°C. Flatten the meat mixture into a rectangle on baking paper, line up the boiled eggs in the centre, and close the meat around them.

4. Form a compact loaf with the seam underneath. Bake for 50–60 minutes, until browned and the centre reaches 72°C.

5. Meanwhile, peel and cube the potatoes and cook them in salted water for 15–20 minutes. Rest the meatloaf for 10 minutes before slicing, then serve with the potatoes.`,
  'main-16': `1. Heat the oven to 200°C. Pat the chicken thighs dry with paper towel.

2. Mix the oil, paprika, crushed garlic, salt, and pepper. Rub it over the chicken. Peel the potatoes, cut them into wedges, spread them in the roasting pan, and place the thighs on top skin-side up.

3. Roast for 40–50 minutes. Baste with the pan juices halfway through, keeping the skin side facing up.

4. The chicken is ready when the thickest part, away from the bone, reaches 74°C, or the juices run clear and the meat is no longer pink.

5. Check that the potatoes are tender and browned. Rest the chicken for 5 minutes before serving, and wash anything that touched the raw chicken straight away.`,
  'main-17': `1. Heat the oven to 160°C. Cut the ribs into pieces of two or three bones and pat them dry.

2. Mix the crushed garlic, paprika, caraway, mustard, honey, and salt. Rub the mixture all over the meat.

3. Put the ribs in a roasting pan, add 100 ml water, cover tightly with foil, and roast for 2 hours.

4. Remove the foil, raise the oven to 210°C, and roast for another 15–20 minutes until browned. Keep an eye on the glaze because the honey can burn quickly.

5. The ribs are ready when the meat pulls easily from the bone. Rest them for 10 minutes and serve with the bread.`,
  'main-18': `1. Heat the oven to 190°C. Put the sausages in a roasting pan, prick each only two or three times, and add half a glass of water.

2. Roast for 30–35 minutes, turning halfway. They should be browned and piping hot inside without becoming dry.

3. Meanwhile, peel the potatoes, cut them into even cubes, cover with cold salted water, and boil for 15–20 minutes from the boil.

4. Drain and let the steam escape for half a minute, then mash. Mix in the butter and gradually add the warm milk. Do not use a stick blender or the mash can turn gluey.

5. Taste the mash, add salt if needed, and serve with the sausages and mustard.`,
  'main-19': `1. Finely chop the onion, peel and cut the potatoes into 2–3 cm cubes, slice the sausage, and chop the pepper and tomato.

2. Cook the onion in the oil over medium heat for 6 minutes. Take the pan off the heat, stir in the paprika, and immediately add 100 ml water so it cannot burn.

3. Add the potatoes, pepper, tomato, sausage, and salt. Pour in enough water to almost cover everything.

4. Bring to the boil, then simmer partly covered for 20–25 minutes, stirring gently from time to time.

5. It is ready when the potatoes are easily pierced but not falling apart and the sauce is rich rather than watery.`,
  'main-20': `1. Bring a large pot of salted water to the boil. Cook the csusza noodles for the time on the package. Reserve half a mug of cooking water before draining.

2. Cut the bacon into small cubes. Start it in a cold pan over medium heat and fry until golden and crisp. Lift it out, leaving the rendered fat in the pan.

3. Toss the drained noodles with one or two tablespoons of bacon fat. Mix in the crumbled cottage cheese and most of the sour cream.

4. If it seems dry, loosen it with a little reserved cooking water. Fold in half the bacon and taste before adding salt.

5. Serve with the remaining sour cream and crisp bacon on top.`,
  'main-21': `1. Quarter the cabbage, remove the core, then grate or finely shred it. Mix with the salt, rest for 20 minutes, and squeeze out the liquid by hand.

2. Heat the oil in a large pan, add the sugar, and let it turn light brown over medium heat. Do not let it burn dark.

3. Carefully add the cabbage—it may spit—and cook for 25–35 minutes, stirring often, until tender and golden brown.

4. Meanwhile, cook the noodles in salted water according to the package, then drain.

5. Toss the noodles with the cabbage. Taste and add pepper as you like; this dish can be served sweet or peppery.`,
  'main-22': `1. Cut the pork into 2 cm cubes and finely chop the onion. If the sauerkraut is very salty or sour, rinse it once and squeeze it out.

2. Cook the onion in the oil for 6 minutes. Take the pan off the heat, stir in the paprika, and immediately add half a glass of water.

3. Add the pork and salt. Cover and simmer over low heat for 35–45 minutes, topping up with a little water if needed.

4. Add the sauerkraut and about 300 ml water. Cook for another 35–40 minutes, until both the pork and cabbage are tender.

5. Mix the sour cream and flour until smooth, temper with a little hot sauce, then stir it back in. Boil for 3 minutes and only then taste for more salt.`,
  'main-23': `1. Finely shred the cabbage and chop the onion. Rinse the rice and cook it separately in lightly salted water.

2. Cook the onion in half the oil for 5 minutes. Add the ground meat and cook for 8–10 minutes, breaking it into crumbs. Take the pan off the heat and stir in the paprika and half the salt.

3. In a second pot, toss the cabbage with the remaining oil for 3 minutes. Add the tomato sauce and about 200 ml water.

4. Cover and simmer over low heat for 25–30 minutes until the cabbage is tender. Stir in the meat and cook together for another 5 minutes.

5. Taste, add more salt if needed, and serve with the cooked rice.`,
  'main-24': `1. Cook the green beans in lightly salted water until tender. Soak and squeeze the bread roll for the meat patties.

2. Mix the ground meat, bread, egg, half the onion, garlic, and salt; shape patties and fry 5–6 minutes per side.

3. Cook the remaining onion, sprinkle with flour, and stir for 1 minute. Gradually whisk in some bean cooking liquid.

4. Add the beans, tempered sour cream, parsley, a little sugar, and vinegar. Simmer for 3 minutes.

5. Taste for sweet-sour balance and serve with the fully cooked meat patties.`,
  'main-25': `1. Cut the pork into cubes and chop the onion. Cook the onion in oil until soft.

2. Remove from the heat, stir in paprika, add the pork and a little water, then simmer until tender.

3. Cook the peas separately in lightly salted water until tender.

4. Whisk the sour cream and flour with some hot pea liquid, stir it into the peas, and simmer for 3 minutes. Add sugar to taste.

5. Serve the pea stew with the pork pörkölt on top.`,
  'main-26': `1. Rinse the lentils and soak them for several hours if the package recommends it. Simmer with bay leaf until tender.

2. Season the pork loin and sear it in oil on both sides, then cook gently until the centre is fully done.

3. Cook the chopped onion in a little oil, add flour, and stir for 1 minute.

4. Gradually add lentil cooking liquid, then add the lentils. Simmer for 3 minutes and season with vinegar, sugar, and salt.

5. Slice the rested pork and serve it with the lentil stew.`,
  'main-27': `1. Grate or shred the squash, salt lightly, rest for 10 minutes, then squeeze gently. Soak and squeeze the bread roll.

2. Mix the ground meat, bread, egg, and salt; shape patties and fry for 5–6 minutes per side until fully cooked.

3. Cook the squash with dill and a little water for 8–10 minutes.

4. Whisk the sour cream and flour with hot liquid, stir it into the squash, and simmer for 3 minutes.

5. Balance the flavour with vinegar, sugar, and salt, then serve with the meat patties.`,
  'main-28': `1. Rinse the rice in a sieve. Finely chop the onion and cut the chicken into 2 cm cubes.

2. Soften the onion in half the butter for 4 minutes. Add the rice and stir for 1 minute, then pour in 600 ml water and add half the salt.

3. Bring to the boil, cover, and cook over the lowest heat for 12 minutes. Add the peas, cook for 5 more minutes, then turn off the heat and rest, covered, for 5 minutes.

4. Meanwhile, cook the chicken in the remaining butter over medium-high heat for 7–9 minutes. The centre of each piece should be completely white.

5. Fluff the rice with a fork and gently fold in the chicken.`,
  'main-29': `1. Thaw the fish completely, pat it dry, check carefully for bones, and salt both sides. Leave it for 10 minutes.

2. Coat the fish lightly with flour and shake off the excess. Heat about 1 cm oil in a pan over medium heat.

3. Add the pieces without crowding the pan. Fry for 3–4 minutes per side until golden.

4. The fish is ready when opaque and it flakes easily with a fork. Avoid overcooking it so it stays moist.

5. Rinse the rice, add 600 ml water and a little salt, then cover and cook over low heat for 12–15 minutes. Rest for 5 minutes and serve with the fish and lemon. Let diners know that an occasional bone can remain even in fillets.`,
  'main-30': `1. Pat the fish dry, feel carefully for bones, cut it into portions, and season with salt. Set out separate plates of flour, beaten egg, and breadcrumbs.

2. Coat each piece first in flour, then egg, then breadcrumbs, shaking off the excess at every stage.

3. Heat 1–1.5 cm oil over medium heat. A breadcrumb should sizzle immediately without turning black.

4. Fry the fish for 3–4 minutes per side until golden. The centre should be opaque and flake easily.

5. Meanwhile, peel and cube the potatoes and boil in salted water for 15–20 minutes until tender. Drain, let the steam escape for half a minute, then mash with the butter and gradually added warm milk.

6. Drain the fish on paper towel and serve at once with the creamy mash. Let diners know that an occasional bone can remain even after careful checking.`,
  'main-31': `1. For the crêpe batter, whisk 200 g flour, 2 eggs, 300 ml milk, a pinch of salt, and about 150 ml water until smooth. Rest for 15 minutes, then cook 8 thin crêpes in a lightly oiled pan. After the first one, loosen the batter with a little water if needed.

2. Cook the chopped onion in oil for 5 minutes. Take the pan off the heat, stir in the paprika and a little water, then add the diced chicken and salt.

3. Cover and cook for 15–20 minutes until the chicken is fully done. Lift out the meat, chop it finely, and mix it with two or three spoonfuls of sauce.

4. Fill the crêpes, fold in both sides, and roll them up. Arrange them in a baking dish.

5. Mix the remaining sauce smoothly with the sour cream, pour it over the crêpes, and bake at 180°C for 15–20 minutes until piping hot in the centre.`,
  'main-32': `1. Cut the chicken into even slices, slice the mushrooms, and finely chop the onion. Season both sides of the chicken with salt and pepper.

2. Cook the chicken in half the butter over medium-high heat for 3–4 minutes per side. Work in batches and set it aside.

3. Soften the onion in the remaining butter for 4 minutes, then add the mushrooms and cook for 8 minutes until most of their liquid evaporates.

4. Pour in the cream, return the chicken, and simmer gently for 6–8 minutes.

5. Cut into the thickest piece—the centre should be completely white. Taste the sauce and serve with rice.`,
  'main-33': `1. Cut the pork loin into slices, pound them lightly, and season with salt. Finely chop the onion, slice the mushrooms, and dice the pepper.

2. Brown the pork in hot oil for 2–3 minutes per side, then set aside. Soften the onion in the same pan for 5 minutes.

3. Take the pan off the heat, stir in the paprika and a little water. Add the mushrooms, pepper, and pork, then cover and simmer over low heat for 25–30 minutes.

4. Mix the sour cream and flour until smooth, temper with a little hot sauce, then stir it back in and boil for 3 minutes.

5. For the nokedli, mix 400 g flour, 2 eggs, 1 teaspoon salt, and about 250 ml water. Drop into gently boiling salted water; once they rise, cook for 1 more minute and drain. Serve with the tender pork.`,
  'main-34': `1. Pound the pork slices to about 8 mm thick and season both sides with salt. Coat in flour, beaten egg, then breadcrumbs.

2. Fry in batches in 1–1.5 cm medium-hot oil for 4–5 minutes per side until golden. Drain on paper towel; no pink meat should remain inside.

3. Cook the spaghetti in salted water according to the package and drain. Meanwhile, finely chop the onion, slice the mushrooms, and cut the ham into thin strips.

4. Soften the onion in 1 tablespoon oil in a large pan for 4 minutes. Add the mushrooms and cook for 6–8 minutes until their liquid evaporates, then fold in the ham.

5. Add the tomato sauce and oregano and simmer over low heat for 8–10 minutes. Taste before adding salt because the ham is already salty. Toss with the spaghetti.

6. Serve the Milanese spaghetti beside the breaded pork and finish with grated cheese, keeping the crisp coating out of the sauce.`,
  'main-35': `1. Finely chop the onion, garlic, and carrot. Heat the olive oil in a large pan.

2. Cook the onion and carrot for 6–8 minutes, then add the garlic for 30 seconds. Add the ground beef and cook for 8–10 minutes, breaking it apart, until browned with no pink meat and the excess liquid has evaporated.

3. Add the tomato sauce, salt, and pepper. Simmer partly covered over low heat for 30 minutes, stirring occasionally. Add a little water if it becomes too thick.

4. Cook the spaghetti in salted water according to the package. Reserve half a mug of cooking water before draining.

5. Toss the pasta with the sauce, loosening it with a little cooking water if needed. Taste, then serve at once with Parmesan.`,
  'main-36': `1. Heat the oven to 210°C. Cut the potatoes into wedges, toss with 1 tablespoon oil and a little salt, and roast for 35–40 minutes, turning halfway.

2. Cut the pork shoulder into four equal slices, pound lightly, and season both sides with salt and pepper. Mix the garlic with the remaining oil, rub it over the meat, and rest for 15 minutes.

3. Score the bacon slices and fry until crisp. Set them aside with the rendered fat.

4. Cook the pork over medium-high heat for 4–5 minutes per side, until no longer pink inside.

5. Take the pan off the heat before dusting the pork with paprika so it cannot turn bitter. Top with the crisp bacon and serve with the roast potatoes.`,
  'main-37': `1. Pound the pork slices to about 5 mm and salt both sides. Peel and grate the potatoes, then squeeze out their liquid.

2. Mix the potato with eggs and half the flour. Coat the pork in the remaining flour.

3. Press an even layer of potato mixture onto both sides of each pork slice.

4. Fry in batches in 1–1.5 cm moderately hot oil for 5–6 minutes per side. Keep the heat moderate so the pork cooks before the coating burns.

5. Cut into the thickest slice to check that no pink meat remains. Drain on paper towel, spread with garlic sour cream, and sprinkle with grated cheese.`,
  'main-38': `1. Cut the beef into large slices and the root vegetables into rounds. Put them in a pot with onion, bay leaf, salt, and enough water to cover.

2. Simmer gently for 2–2.5 hours, until the beef is fork-tender. Remove the meat and bay leaf.

3. Remove the tender beef and bay leaves. Blend the vegetables and cooking liquid smooth, then stir in the sour cream and mustard. Add the sugar and lemon juice gradually, tasting for a pleasantly sweet-sour balance.

4. For the dumplings, combine the cubed bread rolls, eggs, flour, half a teaspoon salt, and a little water. Shape equal dumplings with wet hands.

5. Simmer the dumplings in salted water for 10–12 minutes and serve with the sliced beef and sauce.`,
  'main-39': `1. Put the pork hock in a pot, cover with water, add 1 teaspoon salt, and simmer for 90–105 minutes, until almost tender.

2. Cut the potatoes into large wedges and the onions into quarters; leave the garlic cloves whole.

3. Put the vegetables in a roasting pan with oil, salt, pepper, and caraway. Place the drained hock on top.

4. Add 200 ml cooking liquid and roast at 190 °C for 60 minutes, basting twice.

5. Baste twice while roasting. It is ready when the skin is browned, the meat yields easily to a fork, and the potatoes are tender. Rest for 10 minutes before serving.`,
  'main-40': `1. Cook the rice for 12 minutes until half done. Blanch the savoy cabbage leaves in salted water for 5 minutes, then drain.

2. Cook the chopped onion in oil for 5 minutes. Take it off the heat, stir in the paprika, then immediately add the ground pork.

3. Return to the heat, season with salt, and cook for 8–10 minutes until no pink meat remains.

4. In a greased baking dish, layer the cabbage, rice, pork, and sour cream twice, finishing with cabbage and sour cream.

5. Cover and bake at 180°C for 25 minutes. Uncover and brown for 10 more minutes, then rest for 10 minutes before cutting.`,
  'main-41': `1. Break the cauliflower into florets and cook in salted water until just tender. Cook the rice until half done.

2. Chop the onion and cook in oil. Remove from the heat, add paprika, then brown the ground pork.

3. Mix the pork with the rice. Layer cauliflower, meat mixture, and sour cream in a baking dish.

4. Repeat the layers and bake at 180°C for 30–35 minutes, until bubbling and lightly golden.

5. Rest for 10 minutes before serving.`,
  'main-42': `1. Cut the pork into 2 cm cubes and chop the onion, pepper, and tomato.

2. Cook the onion in oil until soft. Remove from the heat, stir in paprika, then immediately add a little water.

3. Add the pork, pepper, tomato, and salt. Simmer covered over low heat for 45–55 minutes until almost tender, topping up with a little water if needed.

4. Brown the egg barley in a separate dry pan, then stir it into the pork with 600 ml hot water. Cover and cook on low for 15–18 minutes.

5. When the meat and egg barley are tender, turn off the heat and rest covered for 10 minutes.`,
  'main-43': `1. Cut the pork into cubes and chop the onion, pepper, and tomato. Rinse the rice.

2. Cook the onion in oil, remove from heat, stir in paprika, then add the pork and brown it.

3. Add the pepper, tomato, salt, and a little water. Cover and simmer over low heat for 45–55 minutes, until the pork is almost tender.

4. Stir in the rice and 500 ml hot water. If plenty of sauce remains under the pork, start with only 400 ml. Cover and cook on low for 15–18 minutes.

5. Turn off the heat and rest covered for 10 minutes before fluffing and serving.`,
  'main-44': `1. Brown the egg barley in oil, stirring often. Dice the potatoes and sausage and chop the onion and pepper.

2. Add the onion and cook until soft. Remove from heat before stirring in the paprika.

3. Immediately add a little water, then add the potatoes, sausage, pepper, and salt.

4. Add enough hot water to cook the egg barley, cover, and simmer for about 20 minutes.

5. Rest covered for 5 minutes. The potatoes and egg barley should both be tender.`,
  'main-45': `1. Dice the bacon and potatoes, chop the onion, and break the lebbencs noodles into large pieces.

2. Render the bacon, reserve the crisp pieces, and brown the noodles in the fat.

3. Add the onion. Once soft, remove from the heat, stir in paprika, and add a little water.

4. Add the potatoes, salt, and enough water to just cover. Cook gently for about 20 minutes.

5. Cook uncovered for another 10–15 minutes, until the liquid evaporates and the bottom browns in places. Turn it carefully a few times instead of stirring, then serve with the crisp bacon.`,
  'main-46': `1. Mix 400 ml water with vinegar, sugar, and a pinch of salt. Wash the lettuce but add it to the dressing only just before serving.

2. Bring a large pot of salted water to a boil. Mix flour, four eggs, salt, and enough water for a soft, sticky dough.

3. Press the dough through a nokedli maker into simmering water. When the dumplings rise, cook 1 minute more and drain.

4. Heat oil in a pan and add the nokedli. Beat the remaining eggs with salt and pour them over.

5. Stir for 2–3 minutes, until the eggs are set but still moist. Serve immediately with the dressed lettuce.`,
  'main-47': `1. Peel and dice the potatoes and finely chop the onion.

2. Cook the onion in oil for 5 minutes. Remove from the heat, stir in paprika, and immediately add 50 ml water.

3. Add the potatoes, salt, and enough water to just cover. Simmer for 15–20 minutes, until soft.

4. Cook the square noodles in salted water according to the package and drain.

5. Mash the potatoes roughly in their liquid, toss with the noodles, and finish with black pepper.`,
  'main-48': `1. Shred the cabbage, mix with salt, rest for 15 minutes, then squeeze out the liquid.

2. Heat oil in a wide pan, add the sugar, and let it caramelize to light brown.

3. Carefully add the cabbage and cook for 25–30 minutes, stirring often, until browned.

4. Cook the square noodles in salted water according to the package and drain well.

5. Toss together, season generously with pepper, and taste before adding more salt.`,
  'main-49': `1. Dice the bacon and fry until crisp. Remove the pieces and reserve the fat.

2. Peel and finely grate the raw potatoes. Mix with egg, salt, and enough flour to make a thick, sticky dough.

3. Press the dough through a nokedli maker into simmering salted water. Cook for 2 minutes after it rises.

4. Drain and immediately toss with the sheep cheese, sour cream, and two tablespoons bacon fat.

5. Top with the crisp bacon and serve at once.`,
  'main-50': `1. Peel and cube the potatoes. Cook in salted water that just covers them until very soft.

2. Do not drain. Mash the potatoes in their cooking water, then gradually work in the flour over low heat.

3. Stir firmly for 5–8 minutes, until the very thick dough pulls from the side of the pot.

4. Slice the onions and fry in oil until golden. Use an oiled spoon to drop portions of dough into the pan.

5. Brown the pieces for 8–10 minutes. Serve with the soft golden onions and sour cream to taste.`,
  'main-51': `1. Slice the potatoes and simmer with bay leaves and salt in just enough water to cover for about 15 minutes.

2. Soak and squeeze the bread roll. Mix it with ground pork, egg, half the chopped onion, and salt.

3. Shape flat patties and fry in medium-hot oil for 5–6 minutes per side, until fully cooked.

4. Whisk sour cream and flour with a ladleful of potato liquid, then slowly stir it into the pot.

5. Simmer for 3 minutes, thin with water if needed, remove the bay leaves, and serve with the patties.`,
  'main-52': `1. Soak the beans overnight in plenty of cold water. Drain, rinse, and cover with fresh water.

2. Add bay leaves and garlic and simmer for 60–80 minutes, until the beans are tender.

3. Add the sliced sausage for the final 15 minutes. Salt only after this because the sausage is salty.

4. Whisk the sour cream, flour, paprika, and a ladleful of hot cooking liquid until smooth.

5. Stir into the beans and simmer for 3–4 minutes. Taste and adjust the seasoning.`,
  'main-53': `1. Tear the bread rolls into pieces and soak them in half the milk for 10 minutes, then mash with a fork.

2. Heat oil, stir in flour, and cook for 1 minute. Add crushed garlic for 20 seconds.

3. Gradually whisk in the remaining milk until smooth. Add the spinach and soaked bread.

4. Cook on low for 8–10 minutes, stirring often, and season with salt.

5. Fry four eggs until the whites are set and place one on each serving.`,
  'main-54': `1. Wash and roughly chop the sorrel. Hard-boil the eggs, cool, and peel them.

2. Wilt the sorrel in a little oil for 3–4 minutes.

3. Sprinkle in flour, stir for 1 minute, then gradually whisk in milk until smooth.

4. Stir in tempered sour cream and simmer gently for 3 minutes. Balance the tartness with sugar and salt.

5. Halve the boiled eggs and serve them on top.`,
  'main-55': `1. Peel and cut the kohlrabi into small cubes. Mix the ground pork with egg, rice, and salt and form small meatballs.

2. Simmer the kohlrabi in lightly salted water for 10 minutes.

3. Add the meatballs and simmer gently for 20 minutes, until their centres are fully cooked.

4. Whisk the sour cream and flour with hot cooking liquid, then slowly stir it into the pot.

5. Boil for 3 minutes, add dill, and taste for salt.`,
  'main-56': `1. Remove the thick core from the cabbage and slice the leaves. Cube the potatoes and chop the garlic.

2. Simmer the cabbage and potatoes with caraway and salt for about 20 minutes.

3. Soak and squeeze the bread roll, mix with ground pork, egg, and salt, then shape patties.

4. Fry the patties for 5–6 minutes per side until fully cooked. Thicken the cabbage with flour mixed smoothly into hot liquid.

5. Add garlic, simmer for 3 minutes, taste, and serve with the patties.`,
  'main-57': `1. Break the cauliflower into even florets and blanch in salted water for 4–5 minutes. Drain and cool completely.

2. Coat each dry floret in flour, beaten egg, and breadcrumbs.

3. Fry in batches in medium-hot oil for 4–5 minutes, until golden on all sides. Do not crowd the pan; drain well.

4. Boil the potatoes in salted water until tender, drain, and toss with chopped parsley.

5. Serve the cauliflower immediately with the parsley potatoes.`,
  'main-58': `1. Heat the oven to 180 °C. Pat the chicken dry inside and out and season with salt and pepper.

2. Soak and squeeze the bread rolls. Cook the chopped onion and liver in half the butter for 5 minutes and cool until lukewarm, then mix with bread, egg, and parsley.

3. Loosely fill the chicken cavity; do not pack it tightly. Secure the opening and rub the skin with the remaining butter.

4. Roast for 90–105 minutes, basting once. The thickest part of the thigh and the centre of the stuffing must both reach 74 °C.

5. Rest for 15 minutes before carving, then serve the chicken with its hot stuffing.`,
  'main-59': `1. Prick the duck skin in a few places without piercing the meat and season both sides with salt. Heat the oven to 170 °C.

2. Place the legs skin-side up in a roasting dish, add 100 ml water, cover, and roast for 90 minutes, until the meat yields easily to a fork.

3. Shred the red cabbage and slice the onion and apple. Cook the onion, then add cabbage, apple, caraway, sugar, and salt.

4. Cover and braise for 35–40 minutes, adding vinegar near the end. Taste for sweet-sour balance.

5. Uncover, raise the oven to 210 °C, and roast for another 15–20 minutes until the skin is crisp. Rest for 10 minutes, then serve with the cabbage.`,
  'main-60': `1. Check the catfish fillet for bones, cut it into 3 cm pieces, and season lightly. Chop the onion and dice the bacon.

2. Cook the onion in oil, remove from the heat, stir in paprika, and immediately add a little water.

3. Add the fish and simmer gently for 8–10 minutes. Do not stir hard or the pieces will break.

4. Temper 150 ml sour cream with hot sauce and stir it in gently. Heat for 2 minutes without a hard boil.

5. Fry the bacon until crisp. Cook and drain the csusza noodles, then toss with the dry cottage cheese, the remaining 150 ml sour cream, and the bacon. Serve with the catfish paprikash.`,
  'main-61': `1. Slice the potatoes and parboil them in salted water for 8 minutes, then drain. Check the carp fillets carefully for bones and season them.

2. Slice the onion, peppers, and tomatoes. Heat the oven to 190 °C and arrange the potatoes in the bottom of a baking dish.

3. Spread the vegetables over the potatoes and place the carp on top. Mix the sour cream with paprika and 2 tablespoons water, then spread it over the fish.

4. Cover and bake for 25 minutes, then uncover and bake for another 15–20 minutes, until lightly browned.

5. It is ready when the fish is opaque and flakes easily and the potatoes are tender. Warn diners that small bones may remain even after careful checking.`,
  'main-62': `1. Pound the pork slices lightly and season. Slice the peppers, tomatoes, onion, and bacon.

2. Render the bacon and brown the pork on both sides, then set it aside.

3. Cook the onion in the pan, remove from heat, add paprika, then add peppers and tomatoes.

4. Return the pork, cover, and simmer for 25–30 minutes, until tender and fully cooked.

5. It is ready when the pork is fully cooked and easily pierced. Taste the sauce and serve with a side of your choice.`,
  'main-63': `1. Cut the pork and ham into thin strips, slice the pickles, and chop the onion.

2. Cook the onion in oil, add the pork, and brown well. Season with pepper.

3. Add tomato paste and 200 ml water. Cover and simmer for 45–55 minutes, until tender, adding a little hot water if needed.

4. Add the ham, pickles, and mustard and cook uncovered for another 5–8 minutes.

5. Taste before salting because the ham and pickles are salty, then serve hot.`,
  'main-64': `1. Trim the chicken livers, halve them, and pat them dry. Slice the onions and cube the potatoes.

2. Boil the potatoes in salted water until tender and keep warm.

3. Cook the onions in oil for 10 minutes, until soft and light golden. Remove the pan from the heat and stir in the paprika.

4. Add the livers, pepper, and marjoram. Cook in a wide pan, in two batches if needed, for 8–10 minutes, turning the pieces.

5. The centre of the largest liver piece must reach 74 °C; colour alone is not a reliable check. Salt and taste at the end, then serve with the potatoes.`,
  'main-65': `1. Rinse the pre-cooked tripe and cut it into strips. Finely chop the onion, garlic, pepper, and tomato.

2. Cook the onion in lard until soft. Remove from the heat, stir in paprika, then immediately add water.

3. Add the tripe, garlic, caraway, pepper, tomato, and salt. Bring to a gentle simmer.

4. Cook partly covered for 2–2.5 hours, stirring occasionally and adding hot water as needed.

5. It is ready when the tripe is tender and the sauce thick. Taste, rest for 10 minutes, and serve with a side of your choice.`,
  'main-66': `1. Ask the butcher to split the pork feet. Rinse them thoroughly and chop the onion, garlic, pepper, and tomato.

2. Cook the onion in lard, remove from heat, stir in paprika, then immediately add a little water.

3. Add the pork feet, garlic, vegetables, caraway, and salt. Add enough water to come halfway up the meat.

4. Cover and simmer gently for 3–3.5 hours, turning occasionally and adding only a little water as needed, until the meat slips from the bones.

5. Taste the sticky, thick sauce and rest for 10 minutes. Serve carefully, warning diners that small bone pieces may remain.`,
  'main-67': `1. Pat the rooster pieces dry and chop the onion, pepper, and tomato.

2. Cook the onion in lard until soft. Remove from the heat, stir in paprika, and immediately add a little water.

3. Add the rooster and vegetables, season with some of the measured salt, cover, and simmer very gently for 2.5–3 hours, adding a little hot water as needed.

4. The meat is ready when fork-tender and pulling from the bone. Taste and adjust the salt.

5. Make nokedli from flour, egg, about 250 ml water, and some of the measured salt. Cook in salted simmering water until they rise plus 1 minute, then serve with the stew.`,
  'main-68': `1. Slice the chicken breast evenly, season, and brown it briefly in oil. Place in a baking dish.

2. Break the cauliflower into florets and boil in salted water until just tender, then drain well.

3. Melt the butter, stir in flour for 1 minute, then gradually whisk in milk to make a smooth, thick sauce.

4. Place cauliflower over the chicken, spoon on the sauce, and sprinkle with grated cheese.

5. Bake at 200 °C for 20–25 minutes, until golden and the chicken is fully cooked.`,
  'main-69': `1. Pound the pork slices lightly and season. Chop the onion and trim the green beans.

2. Brown the pork in oil and set aside. Cook the onion, remove from heat, and stir in paprika.

3. Add the green beans, pork, and a little water. Cover and simmer for 25–30 minutes.

4. Whisk the sour cream and flour with hot sauce, then stir it into the pan.

5. Simmer for 3 minutes, check that the pork is tender, taste for salt, and serve with a side of your choice.`,
  'main-70': `1. Pat the goose legs dry, prick the skin in a few places without piercing the meat, season both sides with salt, and heat the oven to 160 °C.

2. Place skin-side up in a roasting dish, add 100 ml water, cover, and roast for 2 hours, until the meat pulls easily from the bone with a fork.

3. Shred the red cabbage and slice the onion and apple. Cook the onion, then add cabbage, apple, caraway, sugar, and salt.

4. Cover and braise for 35–40 minutes. Add vinegar near the end and adjust the sweet-sour balance.

5. Uncover, raise the oven to 210 °C, and roast for another 15–20 minutes until the skin is crisp. Rest for 10 minutes, then serve with the cabbage.`,
  'side-1': `1. Peel the potatoes and cut them into even pieces.\n\n2. Cover with cold salted water and bring to a boil.\n\n3. Simmer for 15–20 minutes, until easily pierced with a fork.\n\n4. Drain well and let the steam escape for 1 minute.\n\n5. Toss gently with butter and chopped parsley, then taste for salt.`,
  'side-2': `1. Peel and cube the potatoes evenly.\n\n2. Cover with cold salted water and simmer for 15–20 minutes, until very soft.\n\n3. Drain thoroughly and return to the warm pot for 1 minute.\n\n4. Mash until smooth, then gradually beat in warm milk and butter.\n\n5. Taste for salt and serve immediately; do not use a blender or the potatoes may turn gluey.`,
  'side-3': `1. Rinse the rice until the water is mostly clear and drain well.\n\n2. Warm the oil in a pot and stir the rice for 1 minute.\n\n3. Add the measured water and salt and bring to a boil.\n\n4. Cover tightly and cook on the lowest heat for 12 minutes without lifting the lid.\n\n5. Turn off the heat, rest covered for 10 minutes, then fluff with a fork.`,
  'side-4': `1. Bring a large pot of salted water to a boil.\n\n2. Mix flour, egg, salt, and water into a soft, sticky dough; do not overmix.\n\n3. Press the dough through a nokedli maker into gently boiling water in batches.\n\n4. When the dumplings rise, cook for 1 minute more, then remove with a slotted spoon.\n\n5. Drain and toss with a little oil or butter so they do not stick.`,
  'side-5': `1. Heat the oil and add the egg barley.\n\n2. Stir over medium heat until evenly golden; do not let it burn.\n\n3. Carefully add the measured hot water and salt because it may splatter.\n\n4. Cover and cook over low heat for 12–15 minutes, until tender.\n\n5. Rest covered for 5 minutes, then fluff with a fork.`,
  'side-6': `1. Peel and cube the potatoes and slice the onion.\n\n2. Boil the potatoes in salted water for 15–20 minutes, until soft.\n\n3. Cook the onion in oil over medium heat until deep golden.\n\n4. Drain the potatoes and crush them roughly; they should not be completely smooth.\n\n5. Fold in the onion and its oil and taste for salt.`,
  'side-7': `1. Heat the oven to 210 °C and line a baking sheet.\n\n2. Cut the potatoes into equal wedges and dry them well.\n\n3. Toss with oil, paprika, and salt, then spread in one layer.\n\n4. Roast for 35–45 minutes, turning once halfway.\n\n5. Serve when crisp outside and easily pierced inside.`,
  'side-8': `1. Peel and slice the carrots and divide the broccoli into even florets.\n\n2. Put the carrots in a steamer over simmering water and cover.\n\n3. After 5 minutes add the broccoli and peas.\n\n4. Steam for another 5–7 minutes, until tender but still colourful.\n\n5. Toss with butter and salt just before serving.`,
  'side-9': `1. Shred the red cabbage and slice the apple.\n\n2. Heat the oil, add the cabbage and salt, and cook for 5 minutes.\n\n3. Add the apple, sugar, and a small splash of water.\n\n4. Cover and braise for 30–40 minutes, stirring occasionally.\n\n5. Add vinegar gradually at the end and adjust the sweet-sour balance.`,
  'side-10': `1. Rinse and drain the rice and drain the corn.\n\n2. Melt the butter and stir the rice for 1 minute.\n\n3. Add the measured water and salt and bring to a boil.\n\n4. Cover and cook on the lowest heat for 12 minutes; add the corn for the final 3 minutes.\n\n5. Rest covered for 10 minutes, then fluff gently.`,
  'pickle-1': `1. Open the jar and use a clean fork to remove the pickles.\n\n2. Allow excess brine to drain.\n\n3. Slice them if preferred.\n\n4. Place in a separate serving dish.\n\n5. Refrigerate the opened jar and follow its storage directions.`,
  'pickle-2': `1. Open the jar with clean hands and utensils.\n\n2. Remove only the amount needed.\n\n3. Drain excess brine.\n\n4. Arrange the mixed pickles in a serving dish.\n\n5. Close the jar and refrigerate it promptly.`,
  'pickle-3': `1. Open the jar and use a clean utensil.\n\n2. Remove the desired amount of csalamádé.\n\n3. Drain excess brine without squeezing.\n\n4. Serve chilled in a small side dish.\n\n5. Refrigerate the remaining jar.`,
  'pickle-4': `1. Open the jar carefully and use a clean fork.\n\n2. Remove the peppers and let excess brine drain.\n\n3. Leave whole or cut into smaller pieces.\n\n4. Serve separately beside the main dish.\n\n5. Refrigerate the opened jar.`,
  'pickle-5': `1. Open the jar and remove the beets with a clean utensil.\n\n2. Drain excess brine.\n\n3. Cut large slices into bite-sized pieces if needed.\n\n4. Serve chilled in a separate dish.\n\n5. Refrigerate leftovers promptly because beet juice stains easily.`,
  'pickle-6': `1. Remove the fermented pickles with a clean fork.\n\n2. Drain briefly without rinsing away the flavour.\n\n3. Trim the ends and slice lengthwise if desired.\n\n4. Serve cold beside the meal.\n\n5. Keep the remaining pickles refrigerated in their liquid.`,
  'pickle-7': `1. Taste the sauerkraut; rinse once only if it is extremely sour or salty.\n\n2. Drain and squeeze it lightly.\n\n3. Loosen the strands with a fork.\n\n4. Toss with a small amount of oil.\n\n5. Serve chilled and refrigerate leftovers.`,
  'pickle-8': `1. Open the jar and use a clean utensil.\n\n2. Remove the pearl onions and drain excess brine.\n\n3. Leave them whole for serving.\n\n4. Place in a small separate dish.\n\n5. Refrigerate the opened jar promptly.`,
  'salad-1': `1. Cut the chicken into even strips, season, and cook in a lightly oiled pan until fully white inside. Let it rest.\n\n2. Wash and dry the romaine and tear it into bite-sized pieces.\n\n3. Mix yogurt, lemon, crushed garlic, oil, and salt for the dressing.\n\n4. Toss the lettuce with dressing, then add sliced chicken, croutons, and Parmesan.\n\n5. Pack dressing separately if taking the salad to work so it stays crisp.`,
  'salad-2': `1. Wash and dry all vegetables.\n\n2. Cut the tomatoes, cucumber, and pepper into bite-sized pieces and thinly slice the red onion.\n\n3. Add the olives and crumbled feta.\n\n4. Whisk olive oil, lemon, and oregano and pour over the salad.\n\n5. Toss gently and serve immediately.`,
  'salad-3': `1. Drain the tuna and corn thoroughly.\n\n2. Wash and dry the lettuce, tomato, and cucumber and cut into bite-sized pieces.\n\n3. Mix yogurt, lemon, and salt for the dressing.\n\n4. Combine the vegetables, tuna, and corn gently.\n\n5. Add the dressing just before serving or pack it separately.`,
  'salad-4': `1. Cut the chicken into strips, season, and cook until fully white inside. Rest for 5 minutes.\n\n2. Wash and dry the greens, tomatoes, and cucumber.\n\n3. Cut the avocado last and coat it with lime juice to slow browning.\n\n4. Combine the vegetables and sliced chicken and drizzle with olive oil.\n\n5. Season with salt and pepper and serve promptly.`,
  'salad-5': `1. Hard-boil the eggs for 9–10 minutes, cool in cold water, peel, and quarter.\n\n2. Wash and dry the greens, radishes, cucumber, and green onion.\n\n3. Mix yogurt, mustard, lemon, and salt for the dressing.\n\n4. Toss the vegetables with the dressing.\n\n5. Arrange the eggs on top so they do not break apart.`,
  'salad-6': `1. Wash and dry the tomatoes and basil.\n\n2. Slice the tomatoes and mozzarella evenly.\n\n3. Alternate them on a plate and tuck in basil leaves.\n\n4. Drizzle with olive oil and balsamic vinegar.\n\n5. Season with salt and pepper just before serving.`,
  'salad-7': `1. Cut the chicken into strips, season, and cook until fully white inside. Cool slightly.\n\n2. Wash and dry the salad greens and celery.\n\n3. Dice the apple and coat it with lemon juice; chop the walnuts.\n\n4. Mix yogurt and a pinch of salt, then combine all ingredients gently.\n\n5. Keep chilled and pack in a sealed container for work.`,
  'salad-8': `1. Put the couscous in a heatproof bowl with salt and pour over the measured boiling water.\n\n2. Cover for 8–10 minutes, then fluff with a fork and cool.\n\n3. Dice the pepper and cucumber and halve the tomatoes.\n\n4. Combine with parsley, lemon, olive oil, and the cooled couscous.\n\n5. Taste for salt and refrigerate until needed.`,
  'salad-9': `1. Drain and rinse the beans and drain the corn.\n\n2. Dice the pepper, red onion, and tomatoes.\n\n3. Whisk lime juice, olive oil, and salt.\n\n4. Combine everything gently and add chopped parsley.\n\n5. Chill for 10 minutes or pack in a sealed container.`,
  'salad-10': `1. Cook the pasta in salted water according to the package, drain, and cool completely.\n\n2. Dice the ham, cheese, and cucumber and drain the corn.\n\n3. Mix yogurt, mustard, and salt for the dressing.\n\n4. Combine all ingredients and coat evenly with the dressing.\n\n5. Keep refrigerated and use an insulated lunch bag when taking it to work.`,
  'dessert-1': `1. Whisk the flour, eggs, milk, and sugar into a smooth, thin batter. Rest for 15 minutes.\n\n2. Heat a non-stick pan over medium heat and brush it lightly with oil.\n\n3. Pour in a small ladleful and tilt the pan to make a thin layer.\n\n4. Cook for about 1 minute, flip, and cook the other side for 20–30 seconds.\n\n5. Fill with jam, roll or fold, and dust with icing sugar.`,
  'dessert-2': `1. Make a smooth batter from flour, eggs, and milk and rest it for 15 minutes.\n\n2. Cook thin pancakes in a lightly oiled pan and keep them covered.\n\n3. Mix the dry cottage cheese, sour cream, sugar, vanilla sugar, and raisins.\n\n4. Place filling in each pancake and fold or roll securely.\n\n5. Serve immediately, or warm at 180 °C for 10 minutes.`,
  'dessert-3': `1. Dissolve the yeast in lukewarm milk with a little sugar; wait until foamy.\n\n2. Knead with flour, egg, remaining sugar, and melted butter. Cover and let rise until doubled.\n\n3. Cut small pieces, dip in butter, and roll in chopped walnuts and sugar.\n\n4. Layer loosely in a buttered dish, rise 20 minutes, then bake at 180 °C for 30–35 minutes.\n\n5. Prepare the vanilla custard according to its package and serve warm.`,
  'dessert-4': `1. Slice the crescent rolls and place them in a large bowl.\n\n2. Warm the milk with butter and vanilla sugar; do not let it boil over.\n\n3. Pour over the rolls gradually, turning gently so they soften without becoming mushy.\n\n4. Mix the ground poppy seeds with sugar and fold them through the rolls.\n\n5. Serve warm, or bake at 180 °C for 10–15 minutes for a crisp top.`,
  'dessert-5': `1. Prepare the vanilla custard with milk and sugar, then cool with a cover touching the surface.\n\n2. Toast and chop the walnuts, soak the raisins in rum, and chop the chocolate.\n\n3. Layer pieces of sponge cake with custard, walnuts, raisins, and a little rum.\n\n4. Cover and refrigerate for at least 2 hours.\n\n5. Spoon into bowls and finish with whipped cream and melted chocolate.`,
  'dessert-6': `1. Separate the eggs. Beat the whites with some sugar to firm, glossy peaks.\n\n2. Heat the milk with vanilla sugar until steaming, not rapidly boiling.\n\n3. Poach spoonfuls of egg white for 30 seconds per side and remove carefully.\n\n4. Whisk the yolks with remaining sugar, temper with hot milk, then stir over low heat until slightly thickened. Do not boil.\n\n5. Cool the custard, place the poached whites on top, and refrigerate.`,
  'dessert-7': `1. Rinse the rice and simmer it gently in milk with vanilla sugar until very soft. Cool until lukewarm.\n\n2. Heat the oven to 180 °C, butter a baking dish, and separate the eggs.\n\n3. Mix the yolks, sugar, lemon zest, and butter into the rice.\n\n4. Beat the whites to firm peaks and fold them in gently.\n\n5. Bake for 35–40 minutes, until golden and set. Rest 10 minutes before cutting.`,
  'dessert-8': `1. Bring the milk just to a simmer in a saucepan.\n\n2. Sprinkle in the semolina slowly while whisking constantly.\n\n3. Cook on low for 5–7 minutes, stirring, until thick and smooth.\n\n4. Stir in sugar, butter, and vanilla sugar.\n\n5. Spoon into bowls and serve warm with jam.`,
  'dessert-9': `1. Mix flour, baking powder, sugar, butter, and egg into a smooth dough. Chill for 20 minutes.\n\n2. Peel, core, and grate the apples, squeeze out excess juice, and mix with cinnamon.\n\n3. Press half the dough into a lined baking pan and spread the apple evenly over it.\n\n4. Cover with the remaining dough and prick the top with a fork.\n\n5. Bake at 180 °C for 35–40 minutes. Cool before dusting with icing sugar.`,
  'dessert-10': `1. Heat the oven to 180 °C and line a baking pan. Drain and pit the sour cherries if needed.\n\n2. Cream the butter and sugar, then beat in the eggs one at a time.\n\n3. Fold in the flour and baking powder just until combined.\n\n4. Spread the batter in the pan and scatter the well-drained cherries on top.\n\n5. Bake for 30–35 minutes. Cool before dusting with icing sugar.`,
  'dessert-11': `1. Dissolve the yeast in lukewarm milk with a little sugar and wait until foamy.\n\n2. Knead with flour, egg, remaining sugar, and some butter until smooth. Let rise until doubled.\n\n3. Roll into a rectangle, spread with soft butter, and sprinkle with cocoa and sugar.\n\n4. Roll tightly, cut into slices, place on a lined pan, and rise for 20 minutes.\n\n5. Bake at 180 °C for 20–25 minutes and dust with icing sugar when cool.`,
  'dessert-12': `1. Mix the dry cottage cheese, semolina, eggs, and sugar. Refrigerate for at least 30 minutes.\n\n2. Toast the breadcrumbs in butter until golden and set aside.\n\n3. With wet hands, shape equal dumplings.\n\n4. Lower them into gently simmering water and cook for 8–10 minutes after they rise.\n\n5. Drain, roll in toasted crumbs, and serve with sour cream and icing sugar.`,
  'dessert-13': `1. Dissolve the yeast in lukewarm milk with a little sugar and wait until foamy.\n\n2. Knead with flour, egg, remaining sugar, and melted butter. Let rise until doubled.\n\n3. Roll out and cut into squares. Place a small spoonful of thick jam in each centre.\n\n4. Seal firmly, place seam-side down in a buttered pan, and rise for 20 minutes.\n\n5. Bake at 180 °C for 25–30 minutes, cool slightly, and dust with icing sugar.`,
  'dessert-14': `1. Beat eggs and sugar until pale and thick, then gently fold in flour. Bake thin, equal layers at 180 °C and cool.\n\n2. Melt the chocolate, cool slightly, then beat with butter and sugar into a smooth cream.\n\n3. Stack the cake layers with thin, even layers of chocolate cream.\n\n4. Make a golden caramel from sugar and spread it over the reserved top layer. Hot caramel can cause severe burns.\n\n5. Score portions before the caramel hardens, then place the top on the cake and chill before cutting.`,
  'dessert-15': `1. Warm the honey, sugar, and butter gently until combined, then cool to lukewarm.\n\n2. Mix flour, baking soda, cinnamon, cloves, and ginger. Add the honey mixture and egg.\n\n3. Knead into a smooth dough, wrap, and chill for at least 1 hour.\n\n4. Roll to about 5 mm, cut shapes, and place on a lined pan.\n\n5. Bake at 175 °C for 8–10 minutes. Remove while still slightly soft and cool on the pan.`,
  'dessert-16': `1. Dissolve the yeast in lukewarm milk. Mix with flour, butter, and sugar to form a soft dough, then divide into four parts.\n\n2. Roll the first layer into a lined pan, spread with apricot jam, and sprinkle with ground walnuts and sugar.\n\n3. Repeat the layers, finishing with plain dough, and rest for 30 minutes.\n\n4. Prick the top and bake at 180 °C for 35–40 minutes. Cool completely.\n\n5. Melt the dark chocolate gently, spread over the top, and let it set before cutting.`,
  'dessert-17': `1. Mix flour, butter, egg yolk, and sugar into a smooth dough. Press into a lined pan and pre-bake at 180 °C for 12 minutes.\n\n2. Mix the dry cottage cheese, sour cream, sugar, egg yolks, and lemon zest.\n\n3. Spread apricot jam on the base, add the cheese filling, and bake for 25 minutes.\n\n4. Beat the egg whites with sugar to stiff peaks and pipe or spread a lattice over the cake.\n\n5. Bake at 150 °C for 10–15 minutes, until the meringue is dry but not brown.`,
  'dessert-18': `1. Bring water and butter to a boil. Add all the flour and stir until the dough forms a ball and leaves a film on the pot.\n\n2. Cool for 10 minutes, then beat in the eggs one at a time until glossy.\n\n3. Pipe mounds onto a lined pan. Bake at 200 °C for 20 minutes, then 170 °C for 10 minutes; do not open the oven early.\n\n4. Prepare and cool the vanilla custard, then fold in whipped cream.\n\n5. Cut the cooled puffs, fill with cream, and refrigerate.`,
  'dessert-19': `1. Boil the potatoes in their skins until tender, peel, mash completely, and cool.\n\n2. Mix with flour and egg just until a soft dough forms; do not overwork it.\n\n3. Roll out, cut into squares, and wrap each pitted plum with cinnamon sugar inside. Seal well.\n\n4. Simmer until the dumplings rise, then cook for 3–5 minutes more.\n\n5. Toast breadcrumbs in butter, roll the drained dumplings in them, and serve with cinnamon sugar.`,
  'dessert-20': `1. Slice the crescent rolls and gradually soak them with warm milk so they soften without becoming mushy.\n\n2. Peel and slice the apples and cook briefly with cinnamon and a little sugar.\n\n3. Layer the rolls and apples in a buttered dish, adding small spoonfuls of apricot jam.\n\n4. Bake at 180 °C for 20 minutes. Beat the egg whites with sugar to stiff peaks and spread over the top.\n\n5. Bake at 150 °C for 10–15 minutes, until the meringue is set. Rest before serving.`,
};
