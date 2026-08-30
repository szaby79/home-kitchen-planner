// Keep the displayed instructions and spoken steps sourced from the same text.
// Trailing cautions remain attached to the final step and are read aloud too.
export function splitRecipeSteps(description: string): string[] {
  const matches = [...description.matchAll(/(?:^|\n)[ \t]*\d+\.[ \t]+([\s\S]*?)(?=\n[ \t]*\d+\.[ \t]+|$)/g)];
  if (!matches.length) return [description.trim()];
  const introduction = description.slice(0, matches[0].index).trim();
  return [...(introduction ? [introduction] : []), ...matches.map(match => match[1].trim())];
}
