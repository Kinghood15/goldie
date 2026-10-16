/**
 * Store asset specifications.
 * iOS: App Store Connect, developer.apple.com/help/app-store-connect/reference/
 *   screenshot-specifications | app-preview-specifications. Verified 2026-08-24.
 * Android: Play Console help, "Add preview assets". Phone screenshots are
 *   PNG/JPEG, 16:9 or 9:16, each side 320-3840px for promotional eligibility.
 *   Play accepts no video uploads: the promo video is a YouTube link, so the
 *   android preview renders at a YouTube-friendly size for the user to post
 *   themselves, with no store constraints enforced.
 */

export type DeviceKey =
  | "iphone-6.9"
  | "iphone-duo-outer"
  | "iphone-duo-inner"
  | "ipad-13"
  | "pixel-10-pro"
  | "pixel-9-pro-fold-outer"
  | "pixel-9-pro-fold-inner";

/**
 * The studio's device-type tabs. Finer than the platform: iPhones and iPads
 * share the App Store pipeline but are shown apart.
 */
export type DeviceType = "iphone" | "iphone-foldable" | "android-foldable" | "ipad" | "android";

export type DeviceSpec = {
  /**
   * Display label for the studio and logs. Output paths use the DeviceKey,
   * so raw/, screenshots/ and previews/ all share one naming scheme.
   */
  label: string;
  platform: "ios" | "android";
  type: DeviceType;
  /**
   * `xcrun simctl` device type name; the toolkit picks the newest runtime that
   * has it. iOS only - android resolves a running emulator's adb serial instead.
   */
  simulatorName?: string;
  /**
   * Accepted AVD hardware profiles (`hw.device.name` in the AVD's config.ini),
   * in boot-preference order. Android only - a running emulator qualifies only
   * when its profile is listed, so captures always come from the intended
   * screen geometry. Every profile in the list must share that geometry.
   */
  avdDeviceNames?: string[];
  /**
   * Native capture resolution, portrait. null accepts the device's native
   * capture size as-is (Android emulators vary).
   */
  native: { width: number; height: number } | null;
  /** Required screenshot upload size, portrait. */
  screenshot: { width: number; height: number };
  /**
   * Preview video render size, portrait. On iOS this is the upload size Apple
   * requires; on android it is the size of the YouTube video the user posts
   * themselves (Play takes no video uploads). null: no preview pipeline.
   */
  preview: { width: number; height: number } | null;
  /**
   * Foldable simulators: the posture to fold to before capturing. "closed"
   * shows the outer display, "open" the inner one; both keys share one
   * simulator or emulator.
   */
  fold?: "closed" | "open";
  /** Render bare screens with the drop shadow instead of a bezel. */
  screenOnly?: true;
  /**
   * Headline and subhead size relative to the reference column's type. A tile
   * much wider than the 6.9" reference composes in a narrow column, whose type
   * reads small across the full tile. Default 1.
   */
  copyScale?: number;
};

export const DEVICES: Record<DeviceKey, DeviceSpec> = {
  "iphone-6.9": {
    label: "6.9",
    platform: "ios",
    type: "iphone",
    simulatorName: "iPhone 17 Pro Max",
    native: { width: 1320, height: 2868 },
    screenshot: { width: 1320, height: 2868 },
    preview: { width: 886, height: 1920 },
  },
  // The iPhone Duo has no bundled bezel art, so both displays render bare.
  // Sizes: App Store Connect screenshot specifications, iPhone Duo.
  "iphone-duo-outer": {
    label: "Duo outer",
    platform: "ios",
    type: "iphone-foldable",
    simulatorName: "iPhone Duo",
    fold: "closed",
    screenOnly: true,
    native: { width: 1398, height: 2034 },
    screenshot: { width: 1398, height: 2034 },
    preview: { width: 1398, height: 2034 },
  },
  "iphone-duo-inner": {
    label: "Duo inner",
    platform: "ios",
    type: "iphone-foldable",
    simulatorName: "iPhone Duo",
    fold: "open",
    screenOnly: true,
    copyScale: 1.3,
    native: { width: 2007, height: 2853 },
    screenshot: { width: 2007, height: 2853 },
    preview: { width: 2007, height: 2853 },
  },
  "ipad-13": {
    label: "13",
    platform: "ios",
    type: "ipad",
    simulatorName: "iPad Pro 13-inch (M4)",
    copyScale: 1.3,
    native: { width: 2064, height: 2752 },
    screenshot: { width: 2064, height: 2752 },
    preview: { width: 1200, height: 1600 },
  },
  // Framed with the bundled Pixel 10 Pro art (src/frame.ts), not the config's
  // frame variant, which is iPhone art with iPhone geometry. The Pixel 9 Pro
  // shares the 1280x2856 screen, so its emulator captures compose identically.
  "pixel-10-pro": {
    label: "Play phone",
    platform: "android",
    type: "android",
    avdDeviceNames: ["pixel_10_pro", "pixel_9_pro"],
    native: null,
    screenshot: { width: 1080, height: 1920 },
    // Near the 1280x2856 Pixel screen's aspect, so the cover-crop trims only a
    // sliver; YouTube accepts any portrait size.
    preview: { width: 1080, height: 2400 },
  },
  // Pixel 9 Pro Fold: one AVD, two displays (fold closed = outer, open =
  // inner), each with its own emulator-skin bezel (src/frame.ts). Tiles are
  // 9:16 so Play accepts them; the inner display is near-square.
  "pixel-9-pro-fold-outer": {
    label: "Play fold outer",
    platform: "android",
    type: "android-foldable",
    avdDeviceNames: ["pixel_9_pro_fold"],
    fold: "closed",
    native: null,
    screenshot: { width: 1080, height: 1920 },
    preview: { width: 1080, height: 2424 },
  },
  "pixel-9-pro-fold-inner": {
    label: "Play fold inner",
    platform: "android",
    type: "android-foldable",
    avdDeviceNames: ["pixel_9_pro_fold"],
    fold: "open",
    copyScale: 1.3,
    native: null,
    screenshot: { width: 2160, height: 3840 },
    preview: { width: 2076, height: 2152 },
  },
};

export const DEVICE_KEYS = Object.keys(DEVICES) as DeviceKey[];

export function isDeviceKey(key: string): key is DeviceKey {
  return key in DEVICES;
}

/**
 * Preview constraints Apple enforces at upload time. Both platforms encode
 * with these settings; the duration and file-size bounds apply on iOS only
 * (the android video goes to YouTube, which imposes none that matter here).
 */
export const PREVIEW = {
  fps: 30,
  minSeconds: 15,
  maxSeconds: 30,
  /** Apple asks for 10-12 Mbps VBR on H.264. */
  videoBitrate: "11M",
  audioBitrate: "256k",
  audioSampleRate: 48000,
  maxBytes: 500 * 1024 * 1024,
} as const;

/**
 * Product page creative assets (iOS 27+): opaque stills, 500 MB max. The
 * universal asset serves both placements: the App Store crops it to 21:9 for
 * the header and 3:2 for search, so copy and device stay inside the area both
 * crops share (see SAFE_AREA).
 */
export type CreativeKey = "header" | "search" | "universal" | "event-card" | "event-details";
export const CREATIVE: Record<CreativeKey, { width: number; height: number; format: string }> = {
  header: { width: 3840, height: 1646, format: "21:9" },
  search: { width: 3840, height: 2560, format: "3:2" },
  universal: { width: 5244, height: 2950, format: "16:9" },
  // In-app event media: card is 16:9, details page 9:16. Smallest accepted size.
  "event-card": { width: 1920, height: 1080, format: "16:9" },
  "event-details": { width: 1080, height: 1920, format: "9:16" },
};
/** Placements that also take a video (mp4, 30 fps), with Apple's length window in seconds. */
export const CREATIVE_VIDEO: Partial<
  Record<CreativeKey, { minSeconds: number; maxSeconds: number }>
> = {
  header: { minSeconds: 5, maxSeconds: 30 },
  search: { minSeconds: 5, maxSeconds: 30 },
  "event-card": { minSeconds: 15, maxSeconds: 30 },
  "event-details": { minSeconds: 15, maxSeconds: 30 },
};
export const CREATIVE_KEYS = Object.keys(CREATIVE) as CreativeKey[];

/** The universal asset's region both crops keep: 3:2's width by 21:9's height, centred. */
export const SAFE_AREA = (() => {
  const u = CREATIVE.universal;
  const width = u.height * (3 / 2);
  const height = u.width * (1646 / 3840);
  return { left: (u.width - width) / 2, top: (u.height - height) / 2, width, height };
})();

/**
 * Where a placement's copy and device may sit. The iPhone product page shows
 * the 21:9 header cropped to about 3:2 around its centre, so the header keeps
 * to a centred 3:2 band; the universal asset keeps to SAFE_AREA; the rest use
 * the whole canvas.
 */
export function creativeArea(key: CreativeKey) {
  const { width, height } = CREATIVE[key];
  if (key === "universal") return SAFE_AREA;
  if (key !== "header") return { left: 0, top: 0, width, height };
  const band = height * 1.5;
  return { left: (width - band) / 2, top: 0, width: band, height };
}

/** Screenshots may not carry an alpha channel. */
export const SCREENSHOT_PIXEL_FORMAT = "rgb24";
