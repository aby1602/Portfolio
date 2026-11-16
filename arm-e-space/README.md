# South Geelong automatic review dashboard

Public dashboard: https://www.abikumar.com/arm-e-space/

A minimal, read-only daily review dashboard for Grill'd South Geelong showing public Google, Uber Eats and DoorDash ratings, an unofficial weighted score out of 100, historical chart and daily history. There is **no manual rating entry** on the website.

## How the automatic updates work

The ChatGPT automation **South Geelong Daily Review Auto-Update** is enabled for 8:00 AM Australia/Melbourne every day.

The daily monitor is instructed to:
1. Check the public rating for each of the three exact South Geelong platform listings.
2. Only when all three values are verifiable that day, fetch `arm-e-space/ratings.csv` in `aby1602/Portfolio` from GitHub and append/update the row for the current Melbourne date via the GitHub connector.
3. Send the user a daily notification confirming either **Website updated** after an actual GitHub commit or **Website not updated** with the reason. Missing/inaccessible ratings must never be copied from previous days or fabricated.

The dashboard fetches `./ratings.csv` on load and refreshes every 15 minutes while the page is open. GitHub Pages deployment/caching can introduce a delay after a commit.

**Important limitation:** The automation is configured, but its ability to publish through the connected GitHub account on future scheduled runs has not yet been tested. Some public services may restrict review visibility. If the ratings cannot all be verified, or the GitHub connector cannot write during a run, the website continues to show the last verified recorded snapshot and the daily notification reports the failure. Do not treat blank days or unchanged ratings as proof no reviews arrived.

## Scoring

Unofficial Customer Pulse Score = round((Google × 0.5 + Uber Eats × 0.3 + DoorDash × 0.2) × 20). The weights are editorial dashboard choices. The score is **not** an official Grill'd store performance metric.

## Source data

The single public data source is `ratings.csv` with headings `date,google,uber_eats,doordash`. Only dated public observations may be added. Do not publish confidential Grill'd data in this public repo.

## Troubleshooting

- If the last recorded date is old, check the latest daily monitoring notification for its status.
- If the automation reports a successful GitHub commit but the page still shows old numbers, reload after GitHub Pages deployment.
- A static GitHub Pages website cannot securely fetch unrestricted platform reviews on its own: the scheduled monitor is responsible for obtaining verified data and committing them.
