# VeltriX Telegram Bot

This Worker receives Telegram webhook updates and runs the VeltriX lead-capture flow. It is designed for Telegram only; WhatsApp is intentionally not included.

## Included behavior

The bot supports Persian, English, Turkish, Arabic, and Azerbaijani. It detects the language from the message, presents a service menu, collects project information, forwards lead notifications to an administrator chat, and optionally posts structured leads to a Google Sheets webhook. If the Cloudflare AI binding is configured, free-form technical questions receive a constrained AI reply; the bot must not promise exact prices, delivery dates, certifications, or final engineering approval.

## Required Worker secrets and bindings

| Name | Type | Purpose |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Secret | Token created by BotFather |
| `WEBHOOK_SECRET` | Secret text | Random URL secret for Telegram webhook protection |
| `ADMIN_CHAT_ID` | Secret text | Your Telegram chat ID for lead notifications |
| `SHEETS_WEBHOOK_URL` | Secret text | Optional Google Apps Script web-app URL for Sheets storage |
| `LEADS_KV` | KV namespace binding | Optional persistent lead archive |
| `AI` | Workers AI binding | Optional controlled AI fallback |

Never commit any token, access key, or webhook URL to GitHub.

## Telegram webhook

After deployment, set the webhook once using the Worker URL:

```text
https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<WORKER_HOST>/telegram/<WEBHOOK_SECRET>&secret_token=<WEBHOOK_SECRET>
```

The Worker also exposes `GET /health` for a basic availability check.

## Google Sheets

The Worker expects `SHEETS_WEBHOOK_URL` to accept a JSON POST. The endpoint should append fields such as date, name, username, language, text, chat ID, and channel to a spreadsheet. A Google Apps Script web app is a practical lightweight endpoint; deploy it with access restricted as far as the chosen workflow allows, and keep the URL in a Cloudflare Secret.

## Human-safety rules

The bot is a lead intake and first-response assistant. Human review is required for pricing, delivery commitments, material specifications, certifications, contract terms, and final engineering decisions.
