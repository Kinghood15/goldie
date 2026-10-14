import type { Theme } from "./config.ts";

type Preset = Pick<
  Theme,
  | "background"
  | "headlineColor"
  | "subheadColor"
  | "fontFamily"
  | "copyHeightRatio"
  | "deviceWidthRatio"
  | "template"
>;

const font = (family: string) => `"${family}", -apple-system, system-ui, sans-serif`;
const base = { copyHeightRatio: 0.24, deviceWidthRatio: 0.84 } as const;

/**
 * Ready-made looks: spread one into `theme` and override any field after it,
 * e.g. `theme: { ...themePreset("aurora"), template: "dynamic" }`. Colors are
 * picked for text contrast at store-gallery size; fonts are bundled families.
 */
export const THEME_PRESETS = {
  /** Deep indigo-to-violet night sky; premium, good for productivity, finance, AI. */
  aurora: {
    ...base,
    background: "linear-gradient(160deg, #0B1020 0%, #1B2559 55%, #3B1E6E 100%)",
    headlineColor: "#FFFFFF",
    subheadColor: "#C7D2FE",
    fontFamily: font("Montserrat"),
    template: "showcase",
  },
  /** Airy white and ice blue; the safe default for utilities and business apps. */
  clean: {
    ...base,
    background: "linear-gradient(160deg, #E8F1FF 0%, #F7FAFF 55%, #FFFFFF 100%)",
    headlineColor: "#0E1B2A",
    subheadColor: "#5A6A7D",
    fontFamily: font("DM Sans"),
    template: "editorial",
  },
  /** Warm orange to coral; energetic, for food, fitness, social and marketplaces. */
  sunrise: {
    ...base,
    background: "linear-gradient(160deg, #FFB27A 0%, #FF6B6B 55%, #C2410C 100%)",
    headlineColor: "#FFFFFF",
    subheadColor: "#FFF1E6",
    fontFamily: font("Montserrat"),
    template: "dynamic",
  },
  /** Fresh mint greens; calm, for health, wellness, sustainability and finance. */
  mint: {
    ...base,
    background: "linear-gradient(160deg, #D1FAE5 0%, #A7F3D0 50%, #6EE7B7 100%)",
    headlineColor: "#064E3B",
    subheadColor: "#166534",
    fontFamily: font("Lato"),
    template: "magazine",
  },
  /** Near-black with soft grey copy; sleek, for pro tools, photo, music and games. */
  noir: {
    ...base,
    background: "linear-gradient(160deg, #18181B 0%, #09090B 100%)",
    headlineColor: "#FAFAFA",
    subheadColor: "#A1A1AA",
    fontFamily: font("DM Sans"),
    template: "showcase",
  },
  /** Pink to violet; playful, for creative, dating, kids and entertainment apps. */
  candy: {
    ...base,
    background: "linear-gradient(160deg, #F472B6 0%, #8B5CF6 100%)",
    headlineColor: "#FFFFFF",
    subheadColor: "#FCE7F3",
    fontFamily: font("Montserrat"),
    template: "dynamic",
  },
  /** Sky to cobalt; trustworthy, for banking, insurance, health and travel. */
  trust: {
    ...base,
    background: "linear-gradient(160deg, #0EA5E9 0%, #1D4ED8 100%)",
    headlineColor: "#FFFFFF",
    subheadColor: "#DBEAFE",
    fontFamily: font("Lato"),
    template: "editorial",
  },
  /** Cream paper with a serif headline; editorial, for reading, journaling and learning. */
  paper: {
    ...base,
    background: "linear-gradient(160deg, #FAF5EB 0%, #F1E7D3 100%)",
    headlineColor: "#2B2118",
    subheadColor: "#6B5B4B",
    fontFamily: font("Merriweather"),
    template: "storyboard",
  },
} satisfies Record<string, Preset>;

export type ThemePresetKey = keyof typeof THEME_PRESETS;
export const THEME_PRESET_KEYS = Object.keys(THEME_PRESETS) as ThemePresetKey[];

export function themePreset(key: ThemePresetKey): Preset {
  const preset = THEME_PRESETS[key];
  if (!preset)
    throw new Error(`Unknown theme preset "${key}". Available: ${THEME_PRESET_KEYS.join(", ")}`);
  return { ...preset };
}
