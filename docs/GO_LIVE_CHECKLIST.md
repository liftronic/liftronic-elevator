# 🚀 Liftronic Elevators - Go Live Checklist

**Project:** Liftronic Elevator Website  
**Framework:** Next.js 15.5.2 + React 19.1.0  
**Deployment:** Cloudflare Pages  
**Date:** October 20, 2025  

---

## 🔴 CRITICAL - Must Fix Before Launch

### 1. Email Template Logo URL
**File:** `src/lib/email-template.ts` (Line 3)

**Current Issue:**
```typescript
const LOGO_URL = "https://liftronic-elevator.vercel.app/_next/image?url=%2Fliftronic.png&w=96&q=75";
```

**Problem:** Hardcoded to Vercel preview domain. Will break in production.

**Solution:**
```typescript
const LOGO_URL = process.env.NEXT_PUBLIC_SITE_URL 
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/liftronic.png`
  : "https://your-actual-domain.com/liftronic.png";
```

**Action Required:**
- [ ] Update `LOGO_URL` to use production domain
- [ ] Test email template with new URL
- [ ] Verify logo appears in received emails

---

### 2. Production Environment Variables
**Location:** Cloudflare Pages Environment Variables Settings

**Required Variables:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

**Action Required:**
- [ ] Set `NEXT_PUBLIC_SITE_URL` to actual production domain (NOT localhost or Vercel)
- [ ] Verify Sanity project ID is correct
- [ ] Confirm using `production` dataset (not `development`)
- [ ] Update API version if needed
- [ ] Test all environment variables after deployment

**Testing Command:**
```bash
# Build locally with production env
pnpm build
pnpm start
# Visit http://localhost:3000 and check console for env vars
```

---

### 3. Email Configuration in Sanity CMS
**Location:** Sanity Studio → Home Page Settings → Email Config

**Required Fields:**
```typescript
emailConfig: {
  host: "smtp.gmail.com",           // Your SMTP host
  port: 587,                        // 587 for TLS, 465 for SSL
  secure: false,                    // false for port 587, true for 465
  user: "your-email@gmail.com",     // Sending email address
  password: "your-app-password",    // App-specific password (NOT regular password)
  recipientEmail: "info@yourcompany.com",  // Where form submissions go
  fromName: "Liftronic Elevators"   // Display name in emails
}
```

**Problem:** If missing, both contact and catalog forms will submit successfully but NO emails will be sent (fails silently).

**Action Required:**
- [ ] Configure SMTP settings in Sanity Studio (`/studio`)
- [ ] Generate app-specific password for Gmail (if using Gmail)
- [ ] Test contact form submission
- [ ] Verify email arrives at `recipientEmail`
- [ ] Test catalog form submission
- [ ] Verify catalog download email arrives
- [ ] Check spam folder if emails don't arrive

**Gmail App Password Setup:**
1. Go to Google Account → Security → 2-Step Verification
2. Scroll down to "App passwords"
3. Generate new app password for "Mail"
4. Use this password in Sanity (NOT your regular Gmail password)

---

### 4. Google Sheets Integration
**Location:** Sanity Studio → Home Page Settings

**Required Fields:**
```typescript
contactFormGoogleSheetUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
catalogFormGoogleSheetUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

**Problem:** Forms work but data won't be logged to Google Sheets if not configured.

**Action Required:**
- [ ] Set up Google Apps Script (see `src/lib/google-sheets.ts` for instructions)
- [ ] Deploy script as web app
- [ ] Copy deployment URL
- [ ] Add URLs to Sanity Studio
- [ ] Test contact form → Check Google Sheet for new row
- [ ] Test catalog form → Check Google Sheet for new row

**Setup Instructions:**
1. Create new Google Sheet for form submissions
2. Open Extensions → Apps Script
3. Copy code from `src/lib/google-sheets.ts` comments
4. Deploy as web app (Execute as: Me, Access: Anyone)
5. Copy the deployment URL
6. Add to Sanity Studio

---

### 5. Catalog PDF Upload
**Location:** Sanity Studio → Home Page Settings → Catalog PDF

**Problem:** Download button appears but fails with "Catalog file not available" if PDF not uploaded.

**Action Required:**
- [ ] Upload company catalog PDF to Sanity Studio
- [ ] Verify PDF is accessible (check URL in Sanity)
- [ ] Test catalog download functionality
- [ ] Try downloading on mobile device
- [ ] Verify PDF opens correctly

---

### 6. WhatsApp Phone Number
**Location:** Sanity Studio → Home Page Settings → Contact Info

**Current Check Required:**
- [ ] Phone number includes country code (e.g., `+91` for India)
- [ ] Format: `+919876543210` (no spaces or special characters)
- [ ] Test WhatsApp button on desktop
- [ ] Test WhatsApp button on mobile
- [ ] Verify it opens WhatsApp (not just phone dialer)

**Testing:**
- Desktop: Should open WhatsApp Web or desktop app
- Mobile: Should open WhatsApp app directly

---

## 🟠 HIGH PRIORITY - Verify Before Launch

### 7. Sanity CMS Content Completeness

**About Us Page** (`/aboutus`)
- [ ] Company info is fully populated in Sanity
- [ ] Timeline events are added (not using fallback data)
- [ ] "Why Choose Us" sections are complete
- [ ] Vision/Mission/Values are set
- [ ] Team members have photos and bios
- [ ] Certificates are uploaded and visible

**Fallback Data Location:** `src/app/(main)/aboutus/page.tsx` (Lines 62-126)

**Action:** If fallbacks are showing, populate data in Sanity Studio.

---

### 8. Product Data Verification

**Products Page** (`/products`)
- [ ] All products have high-quality images
- [ ] Product summaries are compelling and complete
- [ ] Technical specifications are accurate
- [ ] Tags are relevant and consistent
- [ ] Product slugs are SEO-friendly

**Product Options Verification:**
Current options (from `src/sanity/utils/getHomePageSettings.ts`):
1. Passenger Elevator
2. Freight Elevator
3. Home Elevator
4. Hospital Elevator
5. Capsule Elevator
6. Escalator
7. Moving Walkway
8. Other

**Action Required:**
- [ ] Verify these match your actual offerings
- [ ] Check if any products are missing
- [ ] Ensure consistency across website

---

### 9. Location-Based SEO Content (CRITICAL FOR SEO)

**Pattern:** `/products/[slug]/[city]`  
**Example:** `/products/passenger-elevator/mumbai`

**Requirement:** Each location page needs **500+ words** of unique content

**Files to Check:**
- `src/sanity/schemaTypes/products.ts` (validation rules)
- Each product's location-specific content in Sanity

**Action Required:**
- [ ] List all products with location variations
- [ ] Check word count for each location page
- [ ] Ensure content is unique (not duplicated across cities)
- [ ] Verify content includes city-specific information
- [ ] Test at least 3 different location URLs

**Cities to Verify (if applicable):**
- [ ] Mumbai
- [ ] Delhi
- [ ] Bangalore
- [ ] Chennai
- [ ] Hyderabad
- [ ] Pune
- [ ] (Add your target cities)

---

### 10. Homepage SEO Content Sections

**Requirement:** Each section needs **300+ words**

**Location:** Sanity Studio → Home Page Settings → SEO Content Sections

**Action Required:**
- [ ] Check word count in each section
- [ ] Ensure content is meaningful (not keyword stuffing)
- [ ] Verify headings are properly structured
- [ ] Test how content appears on live site

**Validation:** Build error will show if content is too short.

---

### 11. Image Optimization

**Current Limit:** 300KB per image (see `src/sanity/lib/imageValidation.ts`)

**Action Required:**
- [ ] Check all product images are under 300KB
- [ ] Verify image quality is still acceptable
- [ ] Compress large images if needed (use TinyPNG, Squoosh, etc.)
- [ ] Consider increasing limit if needed for high-quality product photos
- [ ] Test image loading speed on slow connection

**Images to Check:**
- [ ] Product images
- [ ] Team member photos
- [ ] Certificate images
- [ ] Blog post images
- [ ] Media gallery images

---

## 🟡 MEDIUM PRIORITY - Important for Quality

### 12. Blog Content

**Action Required:**
- [ ] All blog posts have featured images
- [ ] Author information is complete
- [ ] Portable text content renders correctly
- [ ] Code blocks (if any) are formatted properly
- [ ] Internal links work correctly
- [ ] External links open in new tab
- [ ] Meta descriptions are compelling
- [ ] Published dates are correct

**Test URLs:**
- [ ] `/blogs` - Blog listing page
- [ ] `/blogs/[slug]` - Individual blog posts

---

### 13. Media Gallery

**Location:** `/media`

**Action Required:**
- [ ] All media items have titles and descriptions
- [ ] Categories/filters work correctly
- [ ] Images are optimized
- [ ] Videos load properly (if applicable)
- [ ] Gallery modal works on mobile
- [ ] Filter functionality is intuitive

---

### 14. Services Pages

**Location:** `/services`

**Action Required:**
- [ ] All services have descriptions
- [ ] Service icons are appropriate
- [ ] Service pages link correctly
- [ ] Call-to-action buttons work
- [ ] Contact forms on service pages work

---

### 15. Forms Testing

**Contact Form** (`/` or `/#contact`)
- [ ] All fields validate correctly
- [ ] Required fields show errors
- [ ] Email format validation works
- [ ] Phone number validation works
- [ ] Product options dropdown is populated
- [ ] Form submits successfully
- [ ] Success message shows
- [ ] Email arrives at recipient
- [ ] Google Sheets logs submission
- [ ] Error handling works (test with invalid data)

**Catalog Request Form**
- [ ] All fields validate correctly
- [ ] Product interest checkboxes work
- [ ] Form submits successfully
- [ ] Email with PDF download link arrives
- [ ] PDF downloads correctly
- [ ] Google Sheets logs submission
- [ ] Error handling works

**Test Cases:**
```
Valid submission:
- Name: "John Doe"
- Email: "john@example.com"
- Phone: "+919876543210"
- Product: Select any
- Message: "Test message"

Invalid submissions:
- Empty required fields
- Invalid email format
- Invalid phone number
- Special characters in name
```

---

## 🟢 RECOMMENDED - Polish & Performance

### 16. SEO Meta Tags Verification

**Pages to Check:**
- [ ] Homepage (`/`)
- [ ] About Us (`/aboutus`)
- [ ] Products listing (`/products`)
- [ ] Individual products (`/products/[slug]`)
- [ ] Location pages (`/products/[slug]/[city]`)
- [ ] Services (`/services`)
- [ ] Blog listing (`/blogs`)
- [ ] Individual posts (`/blogs/[slug]`)
- [ ] Media (`/media`)

**For Each Page:**
- [ ] Title tag is compelling and under 60 characters
- [ ] Meta description is unique and under 160 characters
- [ ] Open Graph tags are set (for social sharing)
- [ ] Twitter Card tags are set
- [ ] Canonical URL is correct
- [ ] Structured data (Schema.org) is present

**Testing Tools:**
- [metatags.io](https://metatags.io) - Preview social cards
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- View page source and check `<head>` section

---

### 17. Structured Data Verification

**Schema Types Used:**
- `Organization` (homepage)
- `Product` (product cards and pages)
- `BlogPosting` (blog posts)
- `Person` (team members)
- `FAQPage` (FAQ section)

**Action Required:**
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify no errors in structured data
- [ ] Check warnings and fix if important
- [ ] Test product schema on product pages
- [ ] Test organization schema on homepage

---

### 18. Robots.txt & Sitemap

**Files:**
- `src/app/robots.ts` - Robots.txt generation
- `src/app/sitemap.ts` - Main sitemap
- Section-specific sitemaps in each route folder

**Action Required:**
- [ ] Visit `/robots.txt` after deployment
- [ ] Verify allows search engines
- [ ] Visit `/sitemap.xml` after deployment
- [ ] Check all important pages are included
- [ ] Verify priority and change frequency are correct
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

---

### 19. Performance Testing

**Action Required:**
- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Performance score > 90
- [ ] Accessibility score > 95
- [ ] Best Practices score > 90
- [ ] SEO score > 95

**Test Pages:**
- [ ] Homepage
- [ ] Product listing page
- [ ] Individual product page
- [ ] Blog post page

**Lighthouse Testing:**
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit (after deploying)
lhci autorun --collect.url=https://your-domain.com
```

**Performance Targets:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

---

### 20. Cross-Browser Testing

**Browsers to Test:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS)
- [ ] Safari (iOS)
- [ ] Edge (latest)
- [ ] Samsung Internet (Android)

**Test Checklist Per Browser:**
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Forms submit
- [ ] Images load
- [ ] Animations run smoothly
- [ ] Modal dialogs work
- [ ] WhatsApp button works
- [ ] No console errors

---

### 21. Mobile Responsiveness

**Devices to Test:**
- [ ] iPhone (Safari)
- [ ] Android Phone (Chrome)
- [ ] iPad (Safari)
- [ ] Android Tablet

**Mobile Test Checklist:**
- [ ] All text is readable (no tiny fonts)
- [ ] Buttons are tappable (not too small)
- [ ] Forms are usable
- [ ] Images scale properly
- [ ] Navigation menu works (hamburger menu)
- [ ] Scrolling is smooth
- [ ] No horizontal scroll
- [ ] Touch interactions work
- [ ] WhatsApp button positioned correctly
- [ ] Modals work on mobile

**Chrome DevTools Testing:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] Pixel 5 (393px)
- [ ] Samsung Galaxy S20 Ultra (412px)
- [ ] iPad Air (820px)

---

### 22. Accessibility Testing

**Action Required:**
- [ ] Run axe DevTools extension
- [ ] Test keyboard navigation (Tab key)
- [ ] Verify all interactive elements are focusable
- [ ] Check focus indicators are visible
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Verify alt text on all images
- [ ] Check color contrast ratios
- [ ] Ensure ARIA labels are correct
- [ ] Test skip to content link

**Automated Testing:**
```bash
# Install axe-core
npm install -g @axe-core/cli

# Run accessibility scan (after deployment)
axe https://your-domain.com --tags wcag2a,wcag2aa
```

---

### 23. Security Headers

**Check After Deployment:**
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] Security headers are set:
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `X-XSS-Protection`
  - `Referrer-Policy`
  - `Content-Security-Policy`

**Testing Tool:**
- [Security Headers](https://securityheaders.com)
- Enter your domain and check score

**Cloudflare Pages automatically provides:**
- SSL/TLS encryption
- DDoS protection
- Basic security headers

---

### 24. Analytics & Monitoring Setup

**Recommended Tools:**
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Cloudflare Web Analytics
- [ ] Error tracking (Sentry/LogRocket)

**Action Required:**
- [ ] Add GA4 tracking code
- [ ] Verify events are tracking
- [ ] Set up conversion goals
- [ ] Configure Search Console
- [ ] Submit sitemap to Search Console
- [ ] Set up Cloudflare analytics

---

### 25. Link Testing

**Internal Links:**
- [ ] All navigation links work
- [ ] Footer links work
- [ ] Breadcrumb links work
- [ ] Product links work
- [ ] Blog post links work
- [ ] Service links work
- [ ] Team member links work
- [ ] Certificate links work

**External Links:**
- [ ] Social media links go to correct profiles
- [ ] External resources open in new tab
- [ ] No broken external links

**Tool:** Use [Broken Link Checker](https://www.brokenlinkcheck.com)

---

## 📋 Final Pre-Deployment Steps

### 26. Build & Test Locally

```bash
# 1. Clean install dependencies
rm -rf node_modules .next
pnpm install

# 2. Run linting
pnpm lint
# Expected: No errors or warnings

# 3. Build production bundle
pnpm build
# Expected: Build completes without errors

# 4. Test production build locally
pnpm start
# Visit http://localhost:3000

# 5. Check for console errors in browser
# Expected: No errors in console
```

**Action Required:**
- [ ] Clean build completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No build warnings
- [ ] Production build runs locally
- [ ] No console errors when testing

---

### 27. Environment Variables Checklist

**Development (.env.local):**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=development
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production (Cloudflare Pages):**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

**Action Required:**
- [ ] Production env vars are set in Cloudflare
- [ ] No sensitive data in client-side env vars
- [ ] All `NEXT_PUBLIC_*` vars are necessary
- [ ] Sanity dataset is set to `production`

---

### 28. DNS & Domain Setup

**Action Required:**
- [ ] Domain is registered
- [ ] DNS points to Cloudflare Pages
- [ ] SSL certificate is active
- [ ] WWW and non-WWW both work (or redirect properly)
- [ ] HTTPS enforced
- [ ] Test from different networks

**DNS Records to Verify:**
- [ ] A record or CNAME points to Cloudflare
- [ ] MX records for email (if applicable)
- [ ] TXT records for domain verification

---

### 29. Backup & Rollback Plan

**Sanity CMS:**
- [ ] Export production dataset before making changes
- [ ] Document current schema version
- [ ] Know how to restore from backup

**Code:**
- [ ] Current production commit is tagged
- [ ] Rollback process is documented
- [ ] Previous deployment can be restored in Cloudflare

**Backup Commands:**
```bash
# Export Sanity dataset
sanity dataset export production backup-$(date +%Y%m%d).tar.gz

# Tag current commit
git tag -a v1.0.0 -m "Initial production release"
git push origin v1.0.0
```

---

### 30. Team Communication

**Action Required:**
- [ ] Inform content team about Sanity Studio access
- [ ] Document who has admin access
- [ ] Set up notification for form submissions
- [ ] Create runbook for common issues
- [ ] Document who to contact for emergencies

---

## 🎯 Launch Day Checklist

### Pre-Launch (1 hour before)
- [ ] All checklist items above are complete
- [ ] Final content review in Sanity
- [ ] Backup current state
- [ ] Deploy to production
- [ ] Wait for deployment to complete

### Immediately After Launch
- [ ] Visit homepage and verify it loads
- [ ] Check 5-10 key pages manually
- [ ] Submit test contact form
- [ ] Verify email arrives
- [ ] Check Google Sheets for submission
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Monitor Cloudflare analytics

### First 24 Hours
- [ ] Monitor for errors in Cloudflare logs
- [ ] Check form submissions
- [ ] Verify emails are being sent
- [ ] Monitor performance metrics
- [ ] Check Google Analytics for traffic
- [ ] Test from different locations/devices
- [ ] Review user feedback

### First Week
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Search Console for errors
- [ ] Check page indexing status
- [ ] Review analytics data
- [ ] Gather user feedback
- [ ] Fix any reported issues

---

## 🚨 Common Issues & Solutions

### Issue: Forms Submit But No Email Arrives
**Solutions:**
1. Check Sanity `emailConfig` is set correctly
2. Verify SMTP credentials are correct
3. Check spam/junk folder
4. Test SMTP connection separately
5. Check Cloudflare logs for errors

### Issue: Images Not Loading
**Solutions:**
1. Verify Sanity CDN is accessible
2. Check image URLs in page source
3. Verify DNS preconnect is working
4. Check browser console for CORS errors
5. Test with different image

### Issue: Build Fails in Cloudflare
**Solutions:**
1. Check build logs for specific error
2. Verify environment variables are set
3. Test build locally with production config
4. Check Node.js version compatibility
5. Verify dependencies are installed

### Issue: Slow Page Load
**Solutions:**
1. Check image sizes and optimize
2. Review Lighthouse report
3. Enable Cloudflare caching
4. Check for render-blocking resources
5. Optimize fonts loading

### Issue: WhatsApp Button Not Working
**Solutions:**
1. Verify phone number format (+919876543210)
2. Check no spaces in phone number
3. Test on actual mobile device
4. Verify WhatsApp is installed on test device
5. Check button link in browser inspector

---

## 📞 Emergency Contacts

**Technical Issues:**
- Developer: [Your contact]
- Cloudflare Support: [Support portal]
- Sanity Support: [Support portal]

**Content Issues:**
- Content Manager: [Contact]
- Marketing Team: [Contact]

**Hosting & Domain:**
- Cloudflare Dashboard: [Link]
- Domain Registrar: [Link]

---

## ✅ Final Sign-Off

**Before marking complete, ensure:**
- [ ] All CRITICAL (🔴) items are fixed
- [ ] All HIGH PRIORITY (🟠) items are verified
- [ ] MEDIUM PRIORITY (🟡) items are reviewed
- [ ] RECOMMENDED (🟢) items are considered
- [ ] Launch day checklist is ready
- [ ] Team is informed of launch
- [ ] Emergency procedures are documented

**Signed Off By:**
- Developer: _______________ Date: ___________
- Content Manager: ___________ Date: ___________
- Project Manager: ___________ Date: ___________

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Cloudflare Pages:** https://developers.cloudflare.com/pages
- **Web.dev Performance:** https://web.dev/performance
- **Google Search Console:** https://search.google.com/search-console
- **Lighthouse CI:** https://github.com/GoogleChrome/lighthouse-ci

---

**Document Version:** 1.0  
**Last Updated:** October 20, 2025  
**Next Review:** After Launch  

---

## 🎉 Post-Launch Success Metrics

**Week 1 Goals:**
- [ ] Zero critical errors
- [ ] < 5% form submission failure rate
- [ ] All emails delivered successfully
- [ ] Page load time < 3 seconds
- [ ] Mobile traffic > 50%

**Month 1 Goals:**
- [ ] Google indexing 80%+ pages
- [ ] Organic traffic baseline established
- [ ] Form conversion rate tracked
- [ ] User feedback collected
- [ ] SEO improvements identified

---

**Good luck with your launch! 🚀**
