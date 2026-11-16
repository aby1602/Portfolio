# South Geelong — Daily Reviews

Simple public review dashboard for Grill'd South Geelong.

Website: https://www.abikumar.com/arm-e-space/

## Update the dashboard

1. Open [ratings.csv](https://github.com/aby1602/Portfolio/edit/main/arm-e-space/ratings.csv) on GitHub and use **Edit**.
2. Add one row per day: `YYYY-MM-DD,Google,Uber Eats,DoorDash` (example `2026-11-18,4.0,3.9,4.6`). Enter only observed ratings; do not guess.
3. Commit the change. The graph and score update after GitHub Pages republishes. You may need to refresh the webpage.

Or use the downloadable Excel template from ChatGPT for private/offline entry. Editing the local Excel file does **not** update the website until corresponding rows are entered into the GitHub CSV.

The unofficial customer score is `ROUND((Google*0.5 + UberEats*0.3 + DoorDash*0.2) * 20)` out of 100, **not** an official Grill'd KPI. Historic chart data includes only the days recorded in the CSV.
