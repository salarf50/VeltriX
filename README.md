# VeltriX — Precision Injection Molds

VeltriX is a multilingual, mobile-first landing page for precision plastic injection mold design and manufacturing. The primary public address is [veltrixmold-auto.pages.dev](https://veltrixmold-auto.pages.dev/).

## Current production setup

The site is a static HTML/CSS/JavaScript website. The canonical production host is Cloudflare Pages, and the deployment is connected to the `main` branch of the [salarf50/VeltriX repository](https://github.com/salarf50/VeltriX). GitHub Pages remains available as a backup at [salarf50.github.io/VeltriX](https://salarf50.github.io/VeltriX/).

The website supports Persian, English, Turkish, Arabic, and Azerbaijani through the client-side language switcher. The primary conversion paths are WhatsApp, Instagram, and the project-review section. The contact form does not store submissions on a server; it formats the entered details and opens a WhatsApp conversation.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main landing page, multilingual content, SEO metadata, structured data, form behavior, and analytics events |
| `assets/veltrix-logo.jpg` | Official brand logo |
| `robots.txt` | Search-engine crawling rules and sitemap location |
| `sitemap.xml` | Canonical URL discovery for search engines |
| `llms.txt` | Machine-readable company and service summary |
| `security.txt` | Public security contact and canonical site information |
| `CONTENT-PLAN-30-DAY.md` | Thirty-day Instagram and lead-generation content plan |

## SEO and analytics

The page includes a canonical URL, Open Graph metadata, Twitter card metadata, five language alternates plus `x-default`, Google Search Console verification, organization and FAQ structured data, `robots.txt`, and a sitemap. Google Analytics 4 uses measurement ID `G-JQX7HOV8PP`.

The following events are sent when Analytics is available: `whatsapp_click`, `instagram_click`, `language_select`, and `lead_form_submit`. These events should be marked as conversions in Google Analytics after enough traffic has accumulated to confirm that the event names are appearing correctly.

## Local checks

Use the following commands after editing the site:

```bash
python3 /home/ubuntu/veltrix_audit.py
curl -A 'Mozilla/5.0' -I https://veltrixmold-auto.pages.dev/
```

For a new change, commit it to `main` and push it to GitHub. Cloudflare Pages should then deploy the updated static files automatically. Always verify the production URL and the three SEO endpoints after deployment:

```text
https://veltrixmold-auto.pages.dev/
https://veltrixmold-auto.pages.dev/robots.txt
https://veltrixmold-auto.pages.dev/sitemap.xml
```

## Pending content requirement

The portfolio currently uses branded visual cards rather than verified project photography. Replace these cards only after receiving real project photos and the accompanying project facts, such as industry, mold type, material, cavity count, and delivery status. Do not present an illustrative card as a completed customer project.
