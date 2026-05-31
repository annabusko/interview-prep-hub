export const getCategoryAccent = (categoryId: string): { dot: string; border: string } => {
  if (categoryId === "javascript") return { dot: "bg-amber-300", border: "border-l-[3px] border-amber-200" };
  if (categoryId === "typescript") return { dot: "bg-blue-300", border: "border-l-[3px] border-blue-200" };
  if (categoryId === "react") return { dot: "bg-teal-300", border: "border-l-[3px] border-teal-200" };
  return { dot: "bg-slate-400", border: "border-l-[3px] border-slate-200" };
};
