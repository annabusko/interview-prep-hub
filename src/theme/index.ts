// ─── Theme contract ───────────────────────────────────────────────────────────
// Primary access point for all semantic style values.
// Components and pages should import `currentTheme` for style tokens.
// Raw token constants (FOCUS_RING_CLASS, TEXT_*, etc.) are internal to this
// folder and are NOT part of the public API.
export type { ThemeContract } from "./themeContract";
export { currentTheme } from "./themeContract";

// ─── Badge ────────────────────────────────────────────────────────────────────
export type { BadgeVariant } from "./badgeVariants";
export { getBadgeClassName } from "./badgeVariants";

// ─── Button ───────────────────────────────────────────────────────────────────
export type { ButtonVariant, ButtonSize } from "./buttonVariants";
export { getButtonClassName } from "./buttonVariants";

// ─── Surface ──────────────────────────────────────────────────────────────────
export type { SurfaceVariant, SurfaceRadius, SurfacePadding } from "./surfaceVariants";
export { getSurfaceClassName } from "./surfaceVariants";
