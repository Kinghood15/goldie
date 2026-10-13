import type { StoreManifest } from "@/manifest";

const LABELS: Record<string, string> = {
  header: "Product page header · 21:9",
  search: "Search results · 3:2",
  universal: "Universal · 16:9",
  "event-card": "Event card · 16:9",
  "event-details": "Event details · 9:16",
};

/** The finished creative assets for a locale, as `goldie creative` wrote them. */
export function CreativeGallery({
  assets,
}: {
  assets: NonNullable<StoreManifest["creative"]>[string];
}) {
  return (
    <div className="grid w-full max-w-[1400px] grid-cols-2 items-start gap-6">
      {assets.map(({ key, kind, url, bytes }) => (
        <figure key={url} className="flex flex-col gap-2">
          {kind === "video" ? (
            <video
              src={url}
              controls
              muted
              loop
              className="w-full rounded-lg border border-border"
            />
          ) : (
            <img src={url} alt={key} className="w-full rounded-lg border border-border" />
          )}
          <figcaption className="text-xs text-muted-foreground">
            {LABELS[key] ?? key} · {kind} · {(bytes / 1e6).toFixed(1)} MB
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
