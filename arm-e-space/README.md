# ARM-E Space — South Geelong

An **unofficial personal dashboard** for Grill'd South Geelong, hosted on the existing GitHub Pages portfolio.

**Public dashboard:** https://www.abikumar.com/arm-e-space/

## Features

- **Daily Customer Pulse Score** (0–100) calculated from verified public rating snapshots.
- Google, Uber Eats and DoorDash rating comparisons; public source links.
- Verified-history chart with 7-day, 30-day and all-time filters (no invented trend data).
- Review radar of selected, clearly labelled historical or newly verifiable feedback.
- Personal daily checklist, shift scorecard, notes and local backup export.

## Score

Customer Pulse = round((Google × 0.50 + Uber Eats × 0.30 + DoorDash × 0.20) × 20).

This is a **custom reputation indicator**, not an official Grill'd store score. The weights are a dashboard choice, not official statistical or company guidance. Counts such as 470+ are approximate, and the platforms do not have comparable respondent populations.

Shift journal ratings are **manual self-assessments**, completely separate from public reviews.

## Public data and privacy

The repository and GitHub Pages URL are public. **Do not commit staff details, internal KPIs, schedules or confidential restaurant information.** The browser stores shift journal content in localStorage, so it does not sync across devices and can be lost if browser storage is cleared. Export backup using the button in Shift journal.

## Data format

Edit only data/reviews.json for public review updates. Each snapshots entry contains:

- date (YYYY-MM-DD, Australia/Melbourne)
- checkedAt (offset-aware ISO 8601)
- ratings.google, ratings.uberEats, ratings.doorDash with 0–5 rating, count and countLabel
- reviewCheck.performed, reviewCheck.verifiedNew, reviewCheck.coverage, reviewCheck.note
- provenance for the observed sources

Snapshots should be **append-only by calendar day**, except correcting the current day's entry on a later authenticated check. Never invent historical values, repeat stale values as a new observation, fabricate review counts, or imply missing platform reviews are complete. For a platform whose rating is not verifiable, omit that rating and allow the page to show a missing score (do not carry forward an old score under a new date). Written reviews go into highlights with unique id, platform, date, author if public, summary, source URL, tone and isNew accurately flagged.

## Monitoring and publishing

There is an existing 8 AM Australia/Melbourne ChatGPT review-watch automation. It can deliver daily monitoring summaries. If that automated workflow has authorized GitHub access, it can update **only** this data JSON after verifying each platform; otherwise, the notification continues but someone must update the JSON manually. The dashboard reads the latest committed snapshots when the page loads. GitHub Pages is deployed by the parent Portfolio repository's existing main-branch publishing workflow.

**Important:** A recurring ChatGPT reminder does not by itself guarantee that GitHub is updated; verify the dashboard's displayed "Last rating check" timestamp.

## Run locally

From the repository root, run: python3 -m http.server 8000

Open http://localhost:8000/arm-e-space/.

No build tools, server or API keys required for displaying snapshots.
