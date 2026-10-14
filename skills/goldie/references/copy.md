# Store copy that converts

Use when writing or rewriting `headline`, `subhead`, badges and the `store`
block. Screenshots are read as a strip at thumbnail size: the first two or
three decide whether anyone scrolls, so the copy has to work in under a second.

## Before writing: gather the facts

From the repo, website, README and onboarding text, answer in one line each:

1. Who is the user, and what job do they hire the app for?
2. The single strongest outcome (time saved, money saved, feeling gained).
3. Proof you can state truthfully: a number, a rating, an award, a user count.
4. What it replaces or beats (the alternative the user has today).

Never invent proof. A number or award goes on a tile only if the repo, store
listing or user supplied it. If proof is missing, leave a visible
`[NEED: <what proof>]` note in your reply instead of writing the claim.

## The strip is a story

Order the scenes as an argument, one claim per tile:

| Tile | Job | Headline pattern |
|------|-----|------------------|
| 1 | Hook: the core outcome | `<Verb> <outcome>` ("Plan your week in seconds") |
| 2 | Differentiator: why this app | The thing competitors lack |
| 3 | Key feature, shown concretely | `<Feature as benefit>` |
| 4 | Proof or ease | Social proof, speed, "no sign-up" |
| 5 | Closer: low-risk next step | Offer, free tier, privacy, sync |

## Headline rules

- 2 to 5 words, one idea, sentence case. Fits two lines at store size.
- Lead with a verb or the outcome: *Save*, *Track*, *Find*, *Finish*, *Never miss*.
- Benefit over feature: "Never miss a deadline", not "Reminders screen".
- Concrete beats vague: "Cook dinner in 15 minutes", not "Easy recipes".
- Specific numbers lift conversion when true: "3x faster", "2 min setup".
- One line of tension is allowed ("Stop paying for 5 apps"), never clickbait.
- Plain words: "use" not "utilize"; active voice; drop "very", "really",
  "seamless", "powerful"; no exclamation marks. Rewrite any line that would
  work unchanged on a competitor's listing.
- Avoid AI tells: "It's not X, it's Y", "No X, no Y, no Z" lists, "Unlock the
  power of", "Say goodbye to", em dashes.
- Test: the headline should pass "Now you can ..." (it names something the
  user can newly do).
- No store-policy bait: no "#1", "best", "free" claims you cannot back, no
  prices, no competitor names, no references to other platforms.

## Subhead rules

One sentence, 6 to 12 words, adds the *how* or the proof the headline lacks.
Drop it when the headline stands alone. Never repeat the headline's words.

## Store limits that shape the copy

| Field | App Store | Google Play |
|-------|-----------|-------------|
| Title | 30 chars | 30 chars, no emoji, no ALL CAPS, no "best", "#1", "free" |
| Subtitle / short description | 30 chars | 80 chars |
| Keyword field | 100 bytes, hidden, comma-separated, no spaces | none |
| Description | 4,000 chars, not indexed | 4,000 chars, indexed (natural keyword use, no stuffing) |

Apple indexes each word once across title, subtitle and keyword field, so do
not repeat a word between them. Apple has indexed screenshot captions since
June 2025 (as stated by the marketingskills `aso` skill, not verified against
Apple), so the headline is a keyword surface too. Only the first 3 screenshots
show in search; put the core value there. Play wants 4+ screenshots per device
for large-format promotion and alt text of 140 chars or fewer per screenshot.

## Keywords (ASO)

Put the main search phrase in the app name and subtitle (`store.name`,
`store.subtitle`, under 30 characters) and write `store.description` with the
phrases real users search, in natural sentences. Keep the screenshot headline
for persuasion first, keywords second, and let it echo the same words the user searched so the
listing feels like the answer.

## Localization

Rewrite, do not translate literally: keep the benefit, change the idiom, and
check that each locale's line still fits two lines. Longer languages (German,
Vietnamese, Finnish) need shorter source copy. Vietnamese keeps full
diacritics.

## Quick check before shipping

- [ ] Tile 1 alone tells a stranger what the app does and why they want it.
- [ ] No two tiles make the same claim.
- [ ] Every number and award is real and sourced.
- [ ] Each headline is 5 words or fewer and reads at thumbnail size.
- [ ] The strip reads as a story left to right, ending on a low-risk close.

## Sources

Principles adapted from the `aso` and `copywriting` skills in
github.com/coreyhaines31/marketingskills and the clustering/intent workflow in
github.com/AgriciDaniel/claude-seo (web SEO, so used here only as method:
group keywords by search intent, one intent per caption). Store limits come
from those skills and Google Play Console help; check Apple's and Google's
current pages before relying on a number.
