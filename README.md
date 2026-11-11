# Shavim Photography: plain HTML/CSS/JS site (no build needed)

Files: index.html (page), style.css (design), script.js (photos, testimonials, form), robots.txt, sitemap.xml, images/ (your photos)

## 1. Upload to GitHub
1. Sign in at github.com, click **+ > New repository**. Name it `YOURUSERNAME.github.io` (your exact GitHub username), set **Public**, click **Create repository**.
2. Click **uploading an existing file**. Drag in index.html, style.css, script.js, robots.txt, sitemap.xml and the whole **images** folder. Click **Commit changes**.
3. Go to **Settings > Pages**. Under Source choose **Deploy from a branch**, Branch **main**, folder **/ (root)**, then Save.
4. Wait 1-2 minutes. Your site is live at https://YOURUSERNAME.github.io

## 2. Add your photos
1. Resize photos first (about 1600px wide, under 500 KB) with squoosh.app or tinypng.com. Use lowercase names with dashes, e.g. `wildlife-lion-ngorongoro.jpg`.
2. In the repo open the **images** folder > **Add file > Upload files** > Commit.
3. Open **script.js** > pencil icon > add or edit a line in the IMAGES list with the exact file name, category, title and a short description (alt). Commit. The site updates in about a minute.
4. To remove a photo, delete its line (and the file). To reorder, move lines.
Special files: `hero.jpg` (top of homepage), `wildlife-cover.jpg`, `corporate-cover.jpg`, `fashion-cover.jpg` (cards and section backgrounds), `photographer-portrait.jpg` (About). Missing files show an elegant placeholder.

## 3. Make the booking form work
Create a free form at formspree.io (or web3forms.com), copy its URL, and paste it into `formEndpoint` in script.js. Also fill in whatsapp and email.

## 4. Before you finish
- Replace every `YOURUSERNAME` in index.html, robots.txt and sitemap.xml with your GitHub username (or your custom domain).
- Replace the [Edit: ...] text in About and the testimonials with real content.
- Optional custom domain: Settings > Pages > Custom domain.
