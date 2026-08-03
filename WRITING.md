# CanoSoftware Writing Guide

Companion to [BRAND.md](BRAND.md) §2 (Voice & Tone). Where that section says *what* the voice is, this doc is a checklist of *tells* that copy was generated rather than written by TJ — patterns to actively strip out of anything before it ships, whether a human or an AI drafted it first.

## Why this exists

AI-drafted copy has a recognizable accent even when it's factually accurate and well-organized. CanoSoftware's whole pitch is "one person built this, and talks to you like one" — copy that reads like a committee (or a model) undercuts that on contact, regardless of what it says.

## Banned patterns

**The false-contrast construction.** *"It's not just a tracker — it's a system for remembering what matters."* Delete the setup, keep the claim: "It tracks what matters." If a sentence's whole job is to negate a strawman nobody was claiming, cut the strawman.

**Rule-of-three padding.** *"Fast, reliable, and easy to use."* Adjective triplets are a tell. Say the one specific thing that's actually true. If you need three, they should each carry different information, not be synonyms for "good."

**Throat-clearing openers.** *"In today's fast-paced world..." "As technology continues to evolve..."* Cut the sentence. Start with the actual point.

**Corporate warmth.** *"We're thrilled to announce," "We're excited to share," "We can't wait for you to try."* CanoSoftware is one person, not a brand voice with feelings about a release. State what shipped.

**Inflated verbs.** *Leverage, utilize, empower, unlock, elevate, supercharge, seamless, effortless, cutting-edge, game-changing, revolutionary.* Use the plain verb: use, help, do, work. If a feature is good, describe what it does and let that carry it.

**Hedge-stacking.** *"This could potentially help you may want to consider..."* One hedge, not three. Usually zero — say the thing.

**Listicle reflex.** Converting a paragraph into three bullet points when nothing about the content is actually a list. Prose stays prose unless the content is genuinely enumerable (steps, a menu of options).

**Title-Case Everything.** Headers and buttons in sentence case ("New apps, when there are new apps"), not Every Word Capitalized, matching the site's existing copy.

**Symmetry for its own sake.** Three parallel sentence structures in a row, each the same length, each starting the same way. Real writing has variable rhythm. If every sentence in a paragraph is the same shape, break one.

**Manufactured specificity.** Invented statistics, fake precision ("94% of users..."), or specific numbers with no source. CanoSoftware has no analytics SDK in most apps — don't imply data that doesn't exist. If a number is real (e.g. actual pricing, actual trial length), use it; otherwise don't gesture at false rigor.

**Summary-of-a-summary endings.** A closing paragraph that just restates the opening paragraph in different words. If a page doesn't need a "so, in conclusion," don't add one to feel complete.

**The em dash crutch.** One or two per page is fine — this doc uses them. A paragraph that leans on em dashes to link every other clause instead of committing to sentence boundaries reads as generated. Vary with periods and commas.

**Emoji as punctuation.** No emoji in marketing/support copy. This isn't a Slack message.

## What to do instead

Reread [BRAND.md §2](BRAND.md#2-voice--tone) before drafting: first person, plain, honest about price, short sentences, low jargon, confident without exclamation points. When in doubt, write the sentence the way TJ would say it out loud explaining the app to a neighbor — not the way a press release would.

**Before / after, using real site copy as the target register:**

| Generated | Actual CanoSoftware voice |
|---|---|
| "Onward isn't just a habit tracker — it's your partner in building a better you, one day at a time." | "Habits, running totals, and goals with a deadline." |
| "We're passionate about helping families stay organized and connected." | "Chores, calendar, and meals on a wall-mounted iPad." |
| "Your data's security and privacy are our top priority." | "No app I make has an account system, an analytics package, or an advertising SDK. Your data lives on your device." |
| "Unlock powerful insights into your progress with our advanced analytics dashboard." | "Onward Pro... adds the Insights dashboard, weekly review, timed habits..." |

The right column is shorter, more specific, and has zero adjectives doing the selling — the facts do the selling.

## Applying this

- **New marketing copy** (Claude Design sessions): paste this file's content, or link it, into the design session alongside BRAND.md so new pages are drafted against both from the start — not visually correct copy that still needs a rewrite pass after.
- **Existing copy**: reread current site copy against the checklist above during any redesign pass rather than as a separate cleanup project — it mostly already holds up (see the "actual voice" column, pulled straight from the live site), so this is about not regressing it, not fixing something broken.
- **App Store metadata / in-app copy**: same rules apply, though that's out of scope for this doc's authorship — flag it for whoever's writing ASC listings.
