# 🧠 Brain Bugs — Deployment Guide

Your site is ready to go live. Here's how to get it on **brainbugs.net** with a visual editor where you can write and publish articles from a dashboard.

---

## Step 1: Create a GitHub Account (free)

1. Go to **github.com** and sign up (if you don't have one)
2. Create a **new repository** called `brainbugs`
3. Make it **public**
4. Upload all the files from this project folder to that repository

**Quick way to upload:** On the GitHub repo page, click "uploading an existing file" and drag the entire project folder contents in.

---

## Step 2: Deploy on Netlify (free)

1. Go to **netlify.com** and sign up with your GitHub account
2. Click **"Add new site" → "Import an existing project"**
3. Connect your GitHub and select the `brainbugs` repository
4. Netlify will auto-detect the settings (from `netlify.toml`):
   - Build command: `npm install && npm run build`
   - Publish directory: `_site`
5. Click **"Deploy site"**
6. Your site will be live at a random Netlify URL within ~60 seconds

---

## Step 3: Connect brainbugs.net

1. In Netlify, go to **Site settings → Domain management → Add custom domain**
2. Type in `brainbugs.net`
3. Netlify will give you **DNS settings** (nameservers or a CNAME record)
4. Go to your **Squarespace domain settings** for brainbugs.net
5. Under **DNS Settings**, update your DNS to point to Netlify:
   - Either change nameservers to Netlify's nameservers
   - Or add a CNAME record pointing to your Netlify site URL
6. Wait 10-30 minutes for DNS to propagate
7. Back in Netlify, enable **HTTPS** (free, automatic)

---

## Step 4: Enable the Visual Editor (Decap CMS)

This gives you a dashboard at `brainbugs.net/admin` where you can write posts visually.

1. In Netlify, go to **Site settings → Identity → Enable Identity**
2. Under **Registration**, set to **Invite only**
3. Go to **Identity → Invite users** and invite your email address
4. Go to **Site settings → Identity → Services → Git Gateway → Enable**
5. Visit `brainbugs.net/admin` and log in with your email
6. You'll see a visual editor where you can **create, edit, and publish articles!**

---

## How to Write a New Article

### Option A: Visual Editor (recommended)
1. Go to `brainbugs.net/admin`
2. Click **"Blog Posts" → "New Blog Posts"**
3. Fill in:
   - **Title**: Your article headline
   - **Excerpt**: 1-2 sentence teaser (shown on homepage card)
   - **Date**: When to publish
   - **Category**: Bias, Syndrome, Effect, or Trap
   - **Body**: Write your article with the visual editor (supports headings, bold, links, images, quotes)
4. Click **"Publish"**
5. The site auto-rebuilds in ~30 seconds. Your post is live.

### Option B: Markdown files (for power users)
1. Create a `.md` file in `src/posts/` with this format at the top:

```
---
title: "Your Article Title"
excerpt: "A 1-2 sentence teaser."
date: 2025-03-01
author: Kasra
category: bias
layout: layouts/post.njk
---

Your article content in Markdown here...
```

2. Push to GitHub. Netlify auto-deploys.

---

## Project Structure

```
brainbugs/
├── .eleventy.js          ← Site builder config
├── netlify.toml          ← Netlify deploy settings
├── package.json          ← Dependencies
├── src/
│   ├── index.njk         ← Homepage template
│   ├── css/
│   │   └── style.css     ← All styles
│   ├── posts/            ← YOUR ARTICLES LIVE HERE
│   │   ├── sunk-cost-trap.md
│   │   ├── confirmation-bias.md
│   │   └── impostor-syndrome.md
│   ├── admin/            ← Visual CMS dashboard
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/
│   │   └── uploads/      ← Images uploaded via CMS
│   └── _includes/
│       └── layouts/
│           ├── base.njk  ← Shared layout (nav + footer)
│           └── post.njk  ← Article page layout
└── _site/                ← Generated site (don't edit)
```

---

## Customization

- **Your photo**: Replace the placeholder in `src/index.njk` (About section) or upload via CMS
- **Social links**: Update footer links in `src/_includes/layouts/base.njk`
- **Bio text**: Edit the About section in `src/index.njk`
- **Newsletter**: To make the signup actually work, connect a service like Mailchimp, ConvertKit, or Buttondown — replace the form action in the templates
- **Colors/fonts**: Edit variables at the top of `src/css/style.css`

---

## Need Help?

Come back to Claude anytime to:
- Add new article pages
- Customize the design
- Set up newsletter integration (Mailchimp, ConvertKit, etc.)
- Add a YouTube embed section
- Create landing pages for the book launch
