import type { DeviceKey } from "./specs.ts";

/**
 * Geometry of a device's bezel PNGs in assets/: the image and the transparent
 * screen cutout inside it, both in the source PNG's own pixels. Every variant
 * of a device shares its geometry, and every PNG is trimmed to the device
 * itself, so a layout's `widthRatio` means the same size on every device.
 * Measured from the alpha channel; re-measure if custom bezel art is used
 * instead. Layouts built on it live in layouts.ts.
 */
export type FrameGeometry = {
  width: number;
  height: number;
  screen: { x: number; y: number; width: number; height: number };
  /**
   * Corner radius of the screen cutout. The bezel ring is thinner than this
   * radius, so square screen content would poke past the device's outer corner;
   * the compositor clips the content with the scaled radius instead.
   */
  screenRadius: number;
};

/** The 17-pro-* variants. */
const IPHONE_FRAME: FrameGeometry = {
  width: 606,
  height: 1252,
  screen: { x: 24, y: 21, width: 557, height: 1210 },
  screenRadius: 82,
};

/**
 * The android device's bundled bezel art and its geometry: the Pixel 10 Pro
 * emulator skin's `back.webp` from the Android SDK, with the display punched
 * transparent. The image box and screen cutout come from the skin's own
 * `layout` file (display 1280x2856 at 59,60); the cutout radius is measured
 * from the punched alpha. A config's `android.frame` overrides it.
 */
export const ANDROID_FRAME = {
  /** The art's file name in goldie's own assets/. */
  file: "pixel-10-pro.webp",
  geom: {
    width: 1410,
    height: 2968,
    screen: { x: 59, y: 60, width: 1280, height: 2856 },
    screenRadius: 178,
  },
} as const;

/**
 * Pixel 9 Pro Fold bezels, from the emulator skin's `default` (open) and
 * `closed` folders: `back.webp` with the skin's `mask.webp` (rounded display
 * corners and the camera hole) laid over the display rect, which the
 * `layout` files place at 62,62 and 94,70. The radius is measured from the
 * mask's alpha.
 */
const FOLD_FRAMES = {
  outer: {
    file: "pixel-9-pro-fold-outer.webp",
    geom: {
      width: 1236,
      height: 2554,
      screen: { x: 94, y: 70, width: 1080, height: 2424 },
      screenRadius: 121,
    },
  },
  inner: {
    file: "pixel-9-pro-fold-inner.webp",
    geom: {
      width: 2204,
      height: 2274,
      screen: { x: 62, y: 62, width: 2076, height: 2152 },
      screenRadius: 93,
    },
  },
} as const;

/** Bundled bezel art per android device key. */
export const ANDROID_FRAMES: Partial<Record<DeviceKey, { file: string; geom: FrameGeometry }>> = {
  "pixel-10-pro": ANDROID_FRAME,
  "pixel-9-pro-fold-outer": FOLD_FRAMES.outer,
  "pixel-9-pro-fold-inner": FOLD_FRAMES.inner,
};

export const FRAMES: Record<DeviceKey, FrameGeometry> = {
  "iphone-6.9": IPHONE_FRAME,
  /** The ipad-pro-13-* variants. */
  "ipad-13": {
    width: 2247,
    height: 2932,
    screen: { x: 98, y: 104, width: 2046, height: 2730 },
    screenRadius: 36,
  },
  "pixel-10-pro": ANDROID_FRAME.geom,
  "pixel-9-pro-fold-outer": FOLD_FRAMES.outer.geom,
  "pixel-9-pro-fold-inner": FOLD_FRAMES.inner.geom,
  // No bezel art: only the screen box is used (screenOnly devices).
  "iphone-duo-outer": bareScreen(1398, 2034, 90),
  "iphone-duo-inner": bareScreen(2007, 2853, 90),
};

function bareScreen(width: number, height: number, screenRadius: number): FrameGeometry {
  return { width, height, screen: { x: 0, y: 0, width, height }, screenRadius };
}

/** The iPhone geometry, which compose() uses when no device is given. */
export const FRAME = FRAMES["iphone-6.9"];
