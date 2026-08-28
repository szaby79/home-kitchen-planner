import { Recipe } from '@/types/recipe';

const SIDE_WITH_FORMS: Record<string, string> = {
  'side-1': 'petrezselymes burgonyával',
  'side-2': 'burgonyapürével',
  'side-3': 'párolt rizzsel',
  'side-4': 'nokedlivel',
  'side-5': 'pirított tarhonyával',
  'side-6': 'hagymás tört burgonyával',
  'side-7': 'sütőben sült burgonyával',
  'side-8': 'párolt zöldségkörettel',
  'side-9': 'párolt lilakáposztával',
  'side-10': 'kukoricás rizzsel',
};

export function formatMealName(main?: Recipe, side?: Recipe, english = false) {
  if (!main) return '';
  if (!side) return main.name;
  if (english) return `${main.name} with ${side.name}`;
  return `${main.name} ${SIDE_WITH_FORMS[side.id] || `+ ${side.name}`}`;
}
