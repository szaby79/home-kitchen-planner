import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '@/App';
import { createEmptyWeekPlan } from '@/types/recipe';
import { defaultRecipes } from '@/data/recipes';

beforeEach(() => { localStorage.clear(); });

describe('saved menu navigation', () => {
  function seedPlan() {
    const recipe = defaultRecipes.find(item => item.category === 'main')!;
    const plan = createEmptyWeekPlan();
    plan.Hétfő.lunch = recipe.id;
    plan.Hétfő.lunchServings = 7;
    localStorage.setItem('plan-pan-weekplan', JSON.stringify(plan));
    return recipe;
  }

  it('opens an existing menu without generating again', () => {
    seedPlan();
    window.history.pushState({}, '', '/planner');
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Heti menü megnyitása' }));
    expect(window.location.pathname).toBe('/planner/week');
    expect(screen.getByTestId('mobile-planner')).toHaveTextContent('7 adag');
  });

  it('carries saved servings to the recipe and returns to the menu without changing the plan', () => {
    const recipe = seedPlan();
    const original = localStorage.getItem('plan-pan-weekplan');
    window.history.pushState({}, '', '/planner/week');
    render(<App />);
    const mobile = screen.getByTestId('mobile-planner');
    fireEvent.click(within(mobile).getByRole('link', { name: new RegExp(recipe.name) }));
    expect(window.location.search).toContain('servings=7');
    expect(screen.getByText('7', { selector: 'span' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Vissza' }));
    expect(window.location.pathname).toBe('/planner/week');
    expect(localStorage.getItem('plan-pan-weekplan')).toBe(original);
  });

  it('returns from shopping to the saved menu', () => {
    seedPlan();
    window.history.pushState({}, '', '/shopping');
    render(<App />);
    expect(screen.getByRole('link', { name: /Vissza a menühöz/ })).toHaveAttribute('href', '/planner/week');
  });
});
