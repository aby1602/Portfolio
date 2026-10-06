# Abikumar.com — Website Change Log & Build Notes

This file is the working change log for **abikumar.com**.

- Repository: `aby1602/Portfolio`
- Hosting: GitHub Pages
- Custom domain: `www.abikumar.com`
- Primary branch: `main`
- Log timezone: **Australia/Melbourne (AEDT, UTC+11 when applicable)**
- Maintainer: Abhishek Kumar

> Purpose: keep a permanent record of website changes, design decisions, redirects, privacy fixes, deployment notes, and planned improvements.

---

## Current Website Structure

| Page | Current URL | Notes |
|---|---|---|
| Home | `https://www.abikumar.com/` | Main portfolio |
| Projects | `https://www.abikumar.com/projects/` | Clean URL route |
| Research | `https://www.abikumar.com/research/` | Clean URL route |
| Contact | `https://www.abikumar.com/contact/` | Clean URL route |
| Resume | `https://www.abikumar.com/resume/` | Privacy-safe web resume |

### Legacy redirects

- `project.html` → `/projects/`
- `research.html` → `/research/`
- `contact.html` → `/contact/`
- `design.html` → `/projects/`

---

# 2026-10-06 — Portfolio Refresh

## 19:27 AEDT — Repository publishing & README
**Status:** Done

Commit:
- `40930d1` — Add portfolio README and deployment guide

Changes:
- Confirmed the full portfolio source is stored in the public GitHub repository.
- Confirmed GitHub Pages deployment is active.
- Added a professional `README.md` to the repository.
- Added the live website URL.
- Added links to Home, Projects, Research, Contact, and Resume.
- Documented the tech stack.
- Documented key website features.
- Added a repository structure overview.
- Added local run instructions.
- Added GitHub Pages deployment notes.
- Linked the permanent website changelog from the README.

Public website:
- `https://www.abikumar.com/`

Source repository:
- `https://github.com/aby1602/Portfolio`

Reason:
The site was already deployed and source-controlled, but the repository needed a clear project landing page so it can be shared professionally alongside the live portfolio.

---

## 18:58 AEDT — Skills & Interests heading polish
**Status:** Done

Commit:
- `f568d8d` — Polish skills and interests headings

Changes:
- Upgraded the Skills and Interests headings without changing the section layout.
- Added small contextual labels:
  - `Toolkit` above Skills
  - `Focus Areas` above Interests
- Added subtle Font Awesome icons.
- Increased heading size and hierarchy.
- Added a fading blue divider line beside each heading.
- Kept the styling consistent with the dark cyber-security theme.

Reason:
The new cards looked stronger than the original headings. This change brings the section titles up to the same visual quality without over-designing the page.

---

## 18:55 AEDT — Skills & Interests card redesign
**Status:** Done

Commit:
- `e3c02ca` — Redesign skills and interests section

Changes:
- Replaced the old plain Skills and Interests lists on the homepage.
- Kept the overall two-column layout so the section still matches the existing site.
- Added four compact Skills capability blocks:
  - Security Operations
  - Security Tools
  - Engineering
  - Cloud & Infrastructure
- Added six Interests cards with icons:
  - Cyber Threat Intelligence
  - Security Engineering
  - Cloud Security
  - AI & Automation
  - IoT Security
  - Travel · Gaming · Music
- Added subtle hover lift, blue border emphasis, and cyber-panel styling.
- Added responsive behaviour so the blocks collapse cleanly to one column on mobile.
- Avoided skill percentages, progress bars, and oversized technology logos.

Reason:
The previous section looked more like a resume list. The new version is easier to scan, more visually balanced, and better aligned with the cybersecurity portfolio style.

---

## 18:45 AEDT — Cyber background cache refresh
**Status:** Done

Commits:
- `0d95c51` — Force-refresh cyber background assets
- `e260479` — Force-refresh cyber background assets
- `08ae3b6` — Force-refresh cyber background assets
- `3147e9c` — Force-refresh cyber background assets
- `8f600dc` — Force-refresh cyber background assets
- `0d6da21` — Increase cyber background visibility

Changes:
- Increased visibility of the cyber grid.
- Increased connected-node/network line visibility.
- Increased homepage node brightness.
- Made content panels slightly more transparent so the background remains visible.
- Strengthened the subtle scan-line effect.
- Added stylesheet cache-busting using `?v=cyber3`.
- Applied the refreshed stylesheet reference to Home, Projects, Research, Contact, and Resume.
- Kept reduced-motion accessibility support.

Reason:
The first cyber background deployment was technically successful but visually too subtle and could be hidden by browser CSS caching.

---

## 18:40–18:42 AEDT — Cybersecurity background system
**Status:** Done

Commits:
- `90541d9` — Upgrade homepage cyber network background
- `ca2b111` — Add cyber grid background across portfolio

Changes:
- Removed reliance on the old repeating visual texture for the primary background.
- Added an original dark navy/black CSS cyber grid.
- Added layered blue, green, and violet ambient glows.
- Added slow-moving grid drift.
- Added subtle vertical scan movement.
- Added animated connected network nodes to the homepage.
- Added light mouse interaction to the network-node effect.
- Added glass-style transparency to navbar and content panels.
- Kept the overall website structure unchanged.
- Avoided Matrix-style rain, hacker masks, heavy neon, and gaming-style effects.

Design direction:
**Modern SOC / network security interface**, not a stereotypical hacker theme.

---

## 18:36 AEDT — Clean URL structure
**Status:** Done

Commits:
- `fe7ea97` — Redirect design URL to clean projects route
- `607bd16` — Update resume research link
- `98a16c0` — Update contact navigation for clean URLs
- `2fd43fd` — Redirect legacy research URL
- `9835008` — Redirect legacy project URL
- `3082354` — Add clean research route
- `0706f9b` — Add clean projects route
- `ee0ba3f` — Use clean project and research URLs

Changes:
- Created `/projects/`.
- Created `/research/`.
- Updated homepage navigation and education buttons.
- Updated Contact navigation.
- Updated Resume links.
- Preserved old URLs as redirects.
- Redirected the unused Design page to Projects.

Final URL strategy:
- `/`
- `/projects/`
- `/research/`
- `/contact/`
- `/resume/`

---

## 18:34 AEDT — Resume privacy cleanup
**Status:** Done

Commits:
- `0ff65bd` — Remove public resume PDF with private contact details
- `9a15da6` — Add privacy-safe web resume

Changes:
- Removed the old public `resume.pdf`.
- Removed exposure of detailed private residential/contact information.
- Added a web-based resume at `/resume/`.
- Public location is now limited to **Geelong, Victoria, Australia**.
- Added browser Print / Save PDF support.
- Resume contains:
  - Profile
  - Experience
  - Education
  - Skills
  - Research link
  - Public professional contact details

---

## 18:33–18:34 AEDT — Supporting page cleanup
**Status:** Done

Commits:
- `b7528d7` — Redirect unused design page to projects
- `45675c5` — Redirect legacy contact URL
- `1991b9b` — Add clean contact route
- `e2792f1` — Unify research page styling
- `6b766d2` — Upgrade projects page with real work links

### Projects
- Updated the Projects page to match the homepage design.
- Added real public GitHub links where available.
- Promoted stronger/current projects.
- Included:
  - Stock Market Simulation Dashboard
  - File Encryption Service
  - Gym Workout Tracker
  - Live COVID Tracker
  - Movie Recommendation System
  - Abikumar.com
- Added technology tags.
- Removed the feeling of disconnected Bootstrap cards from a separate template.

### Research
- Matched homepage styling.
- Simplified descriptions.
- Preserved ResearchGate links.
- Kept three research items:
  - Handwritten Character Recognition using CNN
  - Smart Road Architectures
  - Era of E-Commerce: Crypto vs Stock

### Contact
- Added clean `/contact/` route.
- Fixed incorrect Projects navigation.
- Removed publicly displayed phone number.
- Kept location at city/region level.
- Kept email and LinkedIn.
- Fixed the old placeholder form redirect.
- Old `contact.html` now redirects safely.

### Design
- Removed Design from the main navigation because there was no finished content.
- Redirected `design.html` to Projects.

---

## 18:32 AEDT — Homepage polish
**Status:** Done

Commits:
- `db80982` — Polish homepage and simplify navigation
- `ada939d` — Add shared site styling

Changes:
- Kept the original homepage architecture.
- Reduced navbar complexity.
- Navigation is now:
  - Home
  - Projects
  - Research
  - Contact
- Improved spacing and visual consistency.
- Increased profile photo size slightly.
- Improved borders, shadows, contrast, and card presentation.
- Shortened homepage introduction.
- Added **Outside work** label above personal-interest icons.
- Reduced experience entries to stronger, shorter bullets.
- Updated education buttons to meaningful Research and Projects links.
- Updated copyright to 2026.
- Added shared stylesheet for consistency across pages.

---

## 18:23 AEDT — Original layout restored
**Status:** Done

Commit:
- `847d62d` — Restore original portfolio layout with light polish

Decision:
A full visual redesign was tested, but the original portfolio structure was preferred.

Changes retained:
- Original two-column profile introduction.
- Existing Education → Experience → Skills/Interests flow.
- Dark visual identity.
- Light visual polish only.
- Corrected name spelling to **Abhishek Kumar**.

---

## 18:18 AEDT — V2 concept experiment
**Status:** Reverted

Commit:
- `a93452c` — Rebuild portfolio homepage as V2

Experiment included:
- Large editorial hero.
- Bento project layout.
- Security console.
- Work-first portfolio structure.
- Larger typography.
- More modern product-portfolio presentation.

Outcome:
The design was considered too different from the original website. It was reverted in favour of smaller, incremental improvements.

Lesson:
**Preserve the personal character of the existing site and improve it gradually rather than replacing it with a generic premium portfolio template.**

---

# Historical Repository Notes

The repository also contains older work from 2025, including:
- Initial portfolio homepage development.
- Project page creation and updates.
- Research page creation and updates.
- Daily Workout page creation and updates.

These older commits remain in Git history and are not rewritten here individually unless needed for future documentation.

---

# Pending / Recommended Improvements

## Skills & Interests section
**Status:** Implemented at 18:55 AEDT
**Added to notes:** 2026-10-06

### Current issue
The current Skills section is useful but reads like a compact resume list, while Interests partly repeats technical skills.

### Recommended direction

Use two visually balanced columns but make their roles clearer:

### Skills
Group skills by **professional capability**, rather than generic technology category.

Suggested content:

**Security Operations**
- SIEM Monitoring
- Incident Response
- Threat Intelligence
- Log Analysis

**Security Tools**
- Splunk
- CrowdStrike Falcon
- Wireshark
- Security Onion

**Engineering**
- Python
- SQL
- C/C++
- Flask
- MQTT

**Cloud & Infrastructure**
- Azure
- GCP
- Docker
- Kubernetes
- IAM

Why:
This communicates what Abhishek can actually *do*, rather than only listing software names.

### Interests
Interests should communicate future direction and professional curiosity.

Suggested content:

**Security Engineering**
Building secure systems and defensive tooling.

**AI × Cybersecurity**
Using ML/AI for detection, automation, and adaptive security.

**Cloud & Infrastructure Security**
Identity, secure architecture, monitoring, and resilience.

**IoT & Emerging Systems**
Security research around connected devices and ambient environments.

Optional personal line underneath:
`Outside the terminal: travel · fitness · gaming · music`

### Visual recommendation
Instead of plain bullet lists:
- Keep two columns.
- Add 4 compact skill groups.
- Use small muted uppercase category labels.
- Use simple text/chips below each category.
- Avoid progress bars or percentage-based skill ratings.
- Avoid oversized technology logos.
- Keep the blue accent only for headings/category labels.

---

# Future Change Log Template

Use this format for every future change:

## YYYY-MM-DD HH:MM TZ — Change title
**Status:** Done / Reverted / Planned

**Commit(s):**
- `SHA` — Commit message

**Changes:**
- Change 1
- Change 2
- Change 3

**Reason:**
Why the change was made.

**Notes:**
Anything useful for future maintenance.

---

_Last documented update: 2026-10-06 19:27 AEDT_

## 2026-10-06 19:41 AEDT — Gym Workout Tracker live link
- Kept the existing project name **Gym Workout Tracker**.
- Updated the project description to better explain the daily training plan, set/rep/weight logging, rest timers and calorie tracking features.
- Changed the project CTA to **Live site ↗** and linked it to `https://aby1602.github.io/dailyworkout/`.
- Updated the project tag from `UX` to `Fitness UX` for clearer context.

## 2026-10-06 19:45 AEDT — Gym Workout Tracker Medium article
- Added a **Blog Post ↗** button beside **Open Project ↗** on the **Gym Workout Tracker** project card.
- Linked it to the Medium article **Body Lab: A Personal Workout Tracker Built Around the Way You Actually Train**.
- Kept the existing project name, description and live project link unchanged.
