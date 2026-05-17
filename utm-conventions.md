# UTM naming conventions

This document is the single source of truth for how UTM parameters get named across all geodstudio.net marketing campaigns. **Use the campaign builder at `/campaign-builder.html` rather than typing URLs by hand** — it normalizes input automatically and prevents the most common mistakes.

## The golden rules

1. **All lowercase.** `tiktok`, never `TikTok` or `TIKTOK`.
2. **Underscores between words.** `paid_social`, never `paid-social` or `paid social`.
3. **No special characters.** Alphanumeric and underscore only. No commas, periods, parentheses, ampersands.
4. **No leading or trailing underscores.** `summer_sale_2026`, not `_summer_sale_2026_`.
5. **Stay short and structured.** A campaign value should be readable at a glance.

Inconsistencies fragment the data. Steam treats `TikTok`, `tiktok`, and `tik_tok` as three separate sources — you'll spend more time cleaning your reports than reading them.

## The five UTM parameters

### `utm_source` — the platform

What platform sent the click? Always the lowercase brand name as written by the company itself.

Standard values:

- `tiktok`
- `youtube`
- `reddit`
- `twitter`
- `facebook`
- `instagram`
- `discord`
- `newsletter` — your own email blasts
- `streamer` — content creators (use `utm_content` for the streamer's name)
- `website` — referrals from your own properties (rare)

### `utm_medium` — type of placement

How was the link placed?

Standard values:

- `paid_social` — paid TikTok / Reddit / Facebook ads
- `organic_social` — your own social media posts (no paid promotion)
- `paid_search` — Google Ads, Microsoft Ads
- `display` — banner ads on third-party sites
- `email` — anything in an email body
- `referral` — backlinks from other websites
- `influencer` — sponsored content from streamers / YouTubers (paid)
- `press` — coverage from gaming press (Kotaku, IGN, etc.)

### `utm_campaign` — the campaign identifier

What initiative is this part of? Group multiple ads under one campaign name so you can roll up performance.

Naming pattern: `<theme>_<period>` — short, datable, evergreen-friendly.

Examples:

- `launch_q2_2026` — generic launch push, Q2 2026
- `vr_motion_q2_2026` — Q2 push focused on VR motion controls
- `mario_3d_evergreen` — always-on Mario-themed campaign
- `summer_sale_2026` — Steam summer sale 2026 push
- `winter_sale_2026` — Steam winter sale 2026 push
- `mm2_motion_q4_2025` — Mega Man 2 specifically, Q4 2025

Group rules of thumb:

- One campaign name covers **all variants of the same advertising push**, even across multiple platforms (the platform is in `utm_source`, not `utm_campaign`)
- If a campaign runs longer than a quarter, give it the `_evergreen` suffix
- Sales tied to Steam events use `<season>_sale_<year>` regardless of which Steam sale
- Hard rule: never reuse a campaign name from a prior period. `summer_sale_2025` and `summer_sale_2026` are distinct.

### `utm_content` — the specific creative

Which exact ad / image / video is this? Use it to A/B test creatives within the same campaign.

Naming pattern: `<subject>_<format>_<duration_or_size>`

Examples:

- `mario_pipes_15s` — Mario pipes voxelization video, 15 seconds
- `zelda_diorama_9s` — Zelda Hyrule diorama, 9-second clip
- `punchout_tyson_30s` — Punch-Out!! Mike Tyson motion controls, 30 seconds
- `mm2_motion_30s` — Mega Man 2 motion controls clip, 30 seconds
- `compare_static_1080x1080` — 2D-vs-3D comparison image, square format
- `compare_animated_9x16` — animated comparison, vertical TikTok format

Rule: if you change the creative, change the `utm_content`. Even a small re-edit warrants a new value. If you don't track variants separately, you can't tell which creative is working.

### `utm_term` — the audience or keyword

What audience or interest segment was targeted? Often optional on social ads (where the platform's own audience targeting handles it), but useful for paid search and audience-based ad buys.

Standard values:

- `retro_gaming` — broad retro / classic gaming audience
- `nes_nostalgia` — specifically NES nostalgia angle
- `vr_users` — VR headset owners
- `indie_dev` — indie game development community
- `emulator_users` — existing emulator users (NES, SNES, etc.)
- `pc_gaming_general` — broad PC gaming audience

## Worked examples

A TikTok ad showing Mario's pipes in 3D, part of a 2026 launch push, targeting retro gaming fans:

```
utm_source=tiktok
utm_medium=paid_social
utm_campaign=launch_q2_2026
utm_content=mario_pipes_15s
utm_term=retro_gaming
```

A sponsored YouTube video from a retro-gaming creator covering the VR motion-control feature:

```
utm_source=youtube
utm_medium=influencer
utm_campaign=vr_motion_q2_2026
utm_content=metalgamer_review_review_8min
utm_term=vr_users
```

Your own organic Reddit post in r/emulation:

```
utm_source=reddit
utm_medium=organic_social
utm_campaign=evergreen_demo
utm_content=excitebike_thread
```

A press release link in a Rock Paper Shotgun article:

```
utm_source=rps
utm_medium=press
utm_campaign=launch_q2_2026
utm_content=article_link
```

(Yes, `utm_source` can be `rps` rather than a platform — when the source IS a specific publication, name it directly. The rule is: it has to be a stable, well-known identifier, not a one-off.)

## Where conversions get measured

After a campaign runs:

1. **Site traffic** — visible in the browser's own dev tools and (eventually) via privacy-friendly analytics if you add it later. Not currently tracked separately from the rest of the site.

2. **Wishlists and purchases on Steam** — visible in **Steamworks → Marketing & Visibility → UTM Analytics** for the 3dSen PC and 3dSen VR product pages, separately. Steam attributes wishlists and purchases within a 3-day window after a UTM-tagged click. Only attributes for users logged into Steam in the same browser session. Updates daily, 24-hour lag.

## When something breaks the convention

If you find old campaign URLs in the wild with inconsistent naming, **don't try to retroactively fix them.** They've been sent. The reports will have a small amount of split data. The fix is to follow the convention going forward.

If you need to retire a campaign name, simply stop using it. There's no need to "delete" it from Steam's dashboard — it'll just stop appearing once no UTM-tagged clicks reference it.

## Updating this document

When you start running campaigns and discover new patterns (new platforms, new audience segments, new campaign types), update the standard values lists above so future campaigns use the same names.
