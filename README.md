# Royal Professional Salon — mobile-first website

Luxury black-and-gold, mobile-first website using the supplied salon logo and photos. Includes Home, Services, About, Style Gallery, Customer Reviews, Offers & Discounts, WhatsApp contact, phone call link, and Google Maps link.

## Deploy to Netlify
1. Create a GitHub repository and upload the contents of this folder (not the ZIP file itself).
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository. Netlify detects `netlify.toml`; publish directory is `public`.
3. In Netlify site settings, add an environment variable named `ADMIN_KEY` with a strong private value. Redeploy after adding it.
4. In the website's Offers & Discounts section, open **Owner: Update Offers**, enter the `ADMIN_KEY`, edit the offer and publish. Reviews and offers are stored using Netlify Blobs after deployment.

## Before launch
- The Google Maps button currently opens a search for “Royal Professional Salon”. Replace its `href` in `public/index.html` with the exact Google Maps share link / location code when you provide it.
- WhatsApp and mobile call buttons use `+91 9637883043`.
- Reviews are public and submitted reviews are displayed publicly. Avoid collecting sensitive personal information.
- The admin key is not included in the source. Keep it private and never commit it to GitHub.

## Local preview
Open `public/index.html` in a browser for a static preview. Netlify Functions and persistent cloud saving work when deployed on Netlify; local file preview uses a local-browser fallback for reviews.
