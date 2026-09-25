import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '@/App';

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState({}, '', '/');
});

describe('audited recipe timing', () => {
  it('separates active preparation from overnight waiting without inventing cooking time', () => {
    localStorage.clear();
    window.history.replaceState({}, '', '/recipes/breakfast-3');
    render(<App />);

    expect(screen.getByText('Előkészítés:')).toBeInTheDocument();
    expect(screen.getByText('Pihentetés:')).toBeInTheDocument();
    expect(screen.getByText('6 óra')).toBeInTheDocument();
    expect(screen.getByText('Teljes idő:')).toBeInTheDocument();
    expect(screen.getByText('6 óra 10 perc')).toBeInTheDocument();
    expect(screen.queryByText('Főzés:')).not.toBeInTheDocument();
  });
});
