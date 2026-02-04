# Samson Kirigua Portfolio

Clean, professional portfolio site built with HTML and CSS.

## Structure

```
portfolio-site/
├── index.html                      # Homepage with case study listings
├── about.html                      # About page
├── resume.html                     # Resume/experience page
├── contact.html                    # Contact page
├── case-study-inventory.html       # Shop Inventory App case study
├── case-study-storefront.html      # Seller Storefront case study
├── case-study-bank-transfer.html   # Pay by Bank Transfer case study
├── case-study-verification.html    # User Verification Platform case study
├── case-study-aunty-jane.html      # Aunty Jane Website case study
├── styles.css                      # Global styles
└── README.md                       # This file
```

## Local Development

1. Open any HTML file in your browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

## Deployment to Cloudflare Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio`
3. Make it public
4. Don't initialize with README (we have files ready)
5. Click "Create repository"

### Step 2: Push Files to GitHub

In your terminal, navigate to the portfolio-site folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio site"

# Add your GitHub repository as remote
git remote add origin https://github.com/samuthomi/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Cloudflare Pages

1. Log into Cloudflare dashboard
2. Go to **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git**
4. Select your GitHub account and the `portfolio` repository
5. Configure build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
6. Click **Save and Deploy**

Your site will be live at: `portfolio.pages.dev`

### Step 4: Add Custom Domain (samsonkirigua.com)

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `samsonkirigua.com`
4. Cloudflare will automatically create DNS records
5. Also add: `www.samsonkirigua.com` (will auto-redirect to apex)

### Step 5: Redirect Secondary Domain (samsonmuthomi.com)

#### Option A: Bulk Redirects (Recommended)

1. Go to Cloudflare account → **Manage Account** → **Bulk Redirects**
2. Create new list with these redirects:
   - Source: `samsonmuthomi.com/*` → Target: `https://samsonkirigua.com/$1` (Status: 301)
   - Source: `www.samsonmuthomi.com/*` → Target: `https://samsonkirigua.com/$1` (Status: 301)
3. Enable the list

#### Option B: Page Rules (Alternative)

1. In samsonmuthomi.com dashboard → **Rules** → **Page Rules**
2. Create rule:
   - URL: `*samsonmuthomi.com/*`
   - Setting: **Forwarding URL**
   - Status: **301 - Permanent Redirect**
   - Destination: `https://samsonkirigua.com/$2`

### Step 6: SEO Migration

1. Add both domains to Google Search Console
2. In samsonmuthomi.com property, submit change of address to samsonkirigua.com
3. Update all external links (LinkedIn, email signature, etc.) to use samsonkirigua.com

## Making Updates

After initial setup, updating your site is simple:

```bash
# Make your changes to HTML/CSS files
# Then commit and push:

git add .
git commit -m "Update case study content"
git push

# Cloudflare Pages automatically deploys changes
```

## Customization

### Update Social Links

Find and replace in all HTML files:
- LinkedIn: `https://linkedin.com/in/samsonmuthomi`
- X/Twitter: `https://x.com/samuthomi`

### Update Contact Email

In `contact.html`, update:
```html
<a href="mailto:hello@samsonkirigua.com" class="contact-email">hello@samsonkirigua.com</a>
```

### Add Project Images

Images should be added to an `images/` folder:
```bash
mkdir images
# Add your images
git add images/
git commit -m "Add project images"
git push
```

Then reference in HTML:
```html
<img src="images/project-screenshot.png" alt="Description">
```

### Modify Colors/Fonts

All design system variables are in `styles.css` under `:root`:
```css
:root {
    --color-accent: #0066ff;  /* Change accent color */
    --font-sans: ...;          /* Change font */
}
```

## Performance

The site is optimized for:
- Fast loading (minimal CSS, no JavaScript)
- Mobile-first responsive design
- SEO-friendly semantic HTML
- Accessibility standards

## Cost

Everything is free:
- GitHub: Free
- Cloudflare Pages: Free (unlimited sites, unlimited bandwidth)
- SSL/CDN: Free (included with Cloudflare)

Total monthly cost: $0

## Support

If you run into issues:
1. Check Cloudflare Pages deployment logs
2. Verify DNS settings in Cloudflare dashboard
3. Test locally first before pushing changes

## License

Personal portfolio site - all rights reserved.
