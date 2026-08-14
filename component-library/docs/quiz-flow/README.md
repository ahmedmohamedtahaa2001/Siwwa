# Scent quiz / finder

## Purpose
Guides a customer from "I don't know what I want" to a specific product.

**Why it exists:** `BENCHMARK.md` Part 1 §3.5 records this as **the largest missing feature** —
every Tier 1 and Tier 2 competitor has a scent finder and Siwa has none.

## Variants

| # | Name | When to use |
|---|---|---|
| 1 | Simple form | 5–7 questions, progress bar, radio options. |
| 2 | Visual picker | Image cards per answer. Best for scent families. |
| 3 | Persona archetype | Answers map to an archetype, then to a product line. |
| 4 | Scoring | Skylar-style — a core scent plus an optional layering pair. |
| 5 | Deep finder | 15+ questions, note preferences, three ranked matches. |

## ⚠ Questions and answers are blocks, never a fixed loop

Development Law 3. Every question is a schema block; every answer is a nested setting on it. A
merchant adds, removes and reorders questions without a developer.

## ⚠ The scorer can fail, and says so

Each answer carries an `answer_value` — a tag or scent family. The scorer counts values and
resolves the winner against `result_collection`. When nothing clears the threshold it falls back to
`fallback_collection` **rather than asserting a match**. A quiz that always produces a confident
answer is a quiz that is lying.

The scoring is deliberately simple and inspectable — a plain tally. A weighted model would imply
preference data nobody has collected.

## ⚠ The Persona system is a hint, not a spec

`07-COPY-CONTENT.md` finds Persona language already present in some product copy, but **there is no
defined archetype set**. The `persona` variant reads archetypes from blocks; nobody has authored
them yet. Define them before shipping that variant.

## Settings

| Setting ID | Type | Label | Default |
|---|---|---|---|
| `quiz_style` | select | Style | `form` |
| `result_type` | select | Result | `single-product` |
| `result_collection` | collection | Match against | — |
| `fallback_collection` | collection | Fallback | — |
| `blocks` | array | Questions (blocks) | — |

Per question block: `question_text`, `question_text_ar`, `question_type`,
`answer_1..4_label` / `_value` / `_image`.

## Accessibility
- Each question is a `<fieldset>` with a `<legend>`, so the question is announced with its options.
- Inactive steps use `hidden`, keeping them out of the tab order.
- The progress bar is a `role="progressbar"` **and** a text step counter — a bar alone says nothing.
- On completion focus moves to the result, which is `aria-live="polite"`. Without that a keyboard
  user is stranded at the bottom of a now-hidden form.
- A `<noscript>` fallback points to the full collection.

## Integration
On completion the module dispatches `siwa:quiz:complete` with `{ winner, collection, type }`. The
Phase 4 section decides what to do with it — render results via the Section Rendering API, or hand
the pair to the layering picker's `quiz` variant.
