export const isAnswerCorrect = (selectedIds: string[], correctAnswerIds: string[]): boolean =>
  [...selectedIds].sort((a, b) => a.localeCompare(b)).join(",") ===
  [...correctAnswerIds].sort((a, b) => a.localeCompare(b)).join(",");
