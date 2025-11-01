# Liftronic Elevator Website - Client Handover Guide

**Version:** 1.1
**Date:** November 2025
**Website URL:** https://liftronic-elevator.vercel.app/ (Staging)
**Production URL:** https://liftronicelevator.com/ (To be launched)

---

## Table of Contents

1. [Website Overview](#website-overview)
2. [Accessing Sanity CMS](#accessing-sanity-cms)
3. [Website Structure & Pages](#website-structure--pages)
4. [Content Management Guide](#content-management-guide)
5. [Common Tasks](#common-tasks)
6. [SEO Best Practices](#seo-best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Support & Resources](#support--resources)

---

## Website Overview

### What is Liftronic Elevator Website?

The Liftronic Elevator website is a modern, SEO-optimized business website built to showcase your elevator and escalator products and services. The website features:

- **Dynamic Content Management**: All content is managed through Sanity CMS (no coding required)
- **SEO Optimized**: Built-in SEO features including meta tags, structured data, and location-based pages
- **Mobile Responsive**: Works perfectly on all devices (phones, tablets, desktops)
- **Fast Performance**: Optimized for speed and search engine rankings
- **Modern Design**: Clean, professional design with smooth animations

### Technology Stack

- **Frontend**: Next.js 15 with React 19 (modern web framework)
- **CMS**: Sanity Studio (content management system)
- **Styling**: Tailwind CSS (modern styling framework)
- **Hosting**: Cloudflare Pages (fast, global hosting)

---

## Accessing Sanity CMS

### What is Sanity Studio?

Sanity Studio is your content management dashboard where you can:
- Add, edit, and delete content
- Upload images and media
- Manage products, services, blog posts
- Configure SEO settings
- Update company information

### How to Access Sanity Studio

1. **Navigate to the Studio**
   - Go to: `https://liftronic-elevator.vercel.app/studio`
   - Once live: `https://liftronicelevator.com/studio`

2. **Login**
   - Use your provided credentials
   - You may need to authenticate via email or social login

3. **Studio Interface**
   - Left sidebar: Shows all content types (Products, Services, Blog Posts, etc.)
   - Main area: Editor where you make changes
   - Top bar: Search, publish, and settings

### Important Notes

- **Auto-save**: Changes are automatically saved as drafts
- **Publishing**: Click "Publish" button to make changes live on the website
- **Content Updates**: After publishing, changes can take up to **1 hour** to reflect on the live website due to caching and build processes

---

## Website Structure & Pages

### Homepage (`/`)

The main landing page featuring:
- Hero banner with company tagline
- About Us section
- Featured products and services
- Client logos marquee
- Testimonials
- Blog previews
- Media gallery preview
- Contact form
- FAQ section
- SEO content sections (collapsible)

**Managed via:**
- Home Page Settings (for FAQs, SEO content, contact form)
- Home Page SEO Settings (meta title, description, Open Graph image)
- Company Information (about section, stats)
- Products (featured products)
- Services (featured services)

### Products Page (`/products`)

Displays all elevator and escalator products in a grid layout.

**Features:**
- Product cards with images and descriptions
- Tag-based filtering
- Featured product highlighting
- Individual product detail pages

**Managed via:** Products collection in Sanity

### Product Detail Pages (`/products/[slug]`)

Individual pages for each product showing:
- Product title and subtitle
- Main image and gallery
- Detailed description
- Key features
- Specifications
- FAQs
- Related products

**Managed via:** Products collection in Sanity

### Location-Based Product Pages (`/products/[slug]/[city]`)

Special SEO-optimized pages for specific cities (e.g., `/products/passenger-elevator/mumbai`)

**Purpose:** Improve local SEO rankings for specific locations

**Features:**
- City-specific unique content (minimum 500 words)
- Location-specific meta tags
- Indexed separately by search engines

**Managed via:** Location Pages section within each Product

### Services Page (`/services`)

Displays all services offered by Liftronic Elevator.

**Features:**
- Service cards with images
- Popular/Featured badge for key services
- Tag-based organization

**Managed via:** Services collection in Sanity

### Service Detail Pages (`/services/[slug]`)

Individual pages for each service showing:
- Service title and summary
- Detailed description
- Service features
- Specifications
- FAQs
- Call-to-action

**Managed via:** Services collection in Sanity

### Blog Page (`/blogs`)

Lists all blog posts with:
- Featured blog post (larger card at top)
- Blog grid with images and excerpts
- Tag filtering

**Managed via:** Blog Post collection in Sanity

### Blog Post Pages (`/blogs/[slug]`)

Individual blog articles with:
- Featured image
- Author information
- Reading time
- Rich text content
- Related posts
- Social sharing

**Managed via:** Blog Post collection in Sanity

### About Us Page (`/aboutus`)

Company information page featuring:
- Hero section with company overview
- Who We Are section
- Vision, Mission & Values
- Why Choose Us
- Company timeline
- Team members
- Certificates and accreditations
- Company statistics

**Managed via:**
- Company Information
- Vision, Mission & Values
- Why Choose Us
- Timeline
- Team Members
- Certificates

### Media Gallery (`/media`)

Showcases images and videos of:
- Product installations
- Projects
- Maintenance work
- Company events

**Features:**
- Category filtering (Products, Installations, Maintenance, Projects)
- Media type filtering (Images, Videos)
- Tag-based search
- Lightbox view for images
- YouTube video integration

**Managed via:** Media collection in Sanity

---

## Content Management Guide

This section explains each content type in Sanity Studio and how to manage it.

---

### 1. Products

**Location in Sanity:** Click "Products" in the left sidebar

**Purpose:** Manage all elevator and escalator products

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Product Title** | Name of the product (e.g., "Passenger Elevator") | Yes | Keep it concise and descriptive |
| **Slug** | URL-friendly version (auto-generated) | Yes | Click "Generate" button |
| **Subtitle** | Short tagline or subtitle | No | E.g., "Safe, Smooth, and Reliable" |
| **Product Description** | Detailed description of the product | Yes | Minimum 20 characters |
| **Tags** | Select related tags for categorization | No | Helps with filtering on products page |
| **FAQs** | Select FAQs to display on product page | No | Choose relevant FAQs from the list |
| **Key Features** | Select up to 6 key features | No | Maximum 6 features allowed |
| **Key Specifications** | Technical specs (label-value pairs) | No | E.g., Capacity: 2-6 persons |
| **Main Image** | Featured product image | Yes | Max file size: 300KB |
| **Gallery Images** | Additional product photos | No | Max 300KB per image |
| **Featured Product** | Mark as featured for homepage | No | Featured products appear on homepage |
| **Location Pages** | City-specific SEO pages | No | See Location Pages section below |
| **SEO Settings** | Override meta title, description, keywords | No | Expand to customize SEO |

#### How to Add a New Product

1. Click "Products" in the sidebar
2. Click the "+" button or "Create new Product"
3. Fill in the required fields (marked with *)
4. Add Main Image (required)
5. Optionally add Gallery Images
6. Select Key Features (up to 6)
7. Add Specifications as label-value pairs
8. Configure SEO settings if needed
9. Click "Publish" to make it live

#### Location Pages (Advanced)

Location Pages allow you to create city-specific versions of product pages for better local SEO.

**When to Use:** To rank better for searches like "passenger elevator in Mumbai"

**How to Create:**

1. Open a Product
2. Scroll to "Location-Specific Pages"
3. Click "Add item"
4. Fill in:
   - **City Name**: Display name (e.g., "Mumbai")
   - **City Slug**: Click "Generate" (becomes "mumbai")
   - **Unique Content**: Write 500+ words of city-specific content
   - **Meta Title**: E.g., "Passenger Elevator in Mumbai | Liftronic"
   - **Meta Description**: City-specific description (max 160 chars)
   - **Keywords**: Add location-based keywords
   - **Published**: Toggle to true when ready
   - **Enable Indexing**: Keep FALSE initially, enable after content review
5. Click "Publish"

**Important Notes:**
- Content must be **at least 500 words** to avoid duplicate content penalties
- Each city needs **unique content** - don't copy-paste!
- Keep "Enable Indexing" as FALSE during testing
- Enable indexing only after verifying content quality

---

### 2. Services

**Location in Sanity:** Click "Service Offered" in the left sidebar

**Purpose:** Manage services like installation, maintenance, AMC, etc.

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Service Title** | Name of the service | Yes | E.g., "Installation Services" |
| **Service Slug** | URL-friendly version | Yes | Auto-generated from title |
| **Service Summary** | Brief description (20-160 chars) | Yes | Used in cards and meta description |
| **Service Description** | Detailed description | Yes | Minimum 50 characters |
| **Featured Service** | Mark as "Popular" | No | Shows "Popular" badge |
| **Service Tags** | Tags for categorization | No | E.g., "Maintenance", "Emergency" |
| **Service Image** | Featured image | No | Max 300KB, shown on service pages |
| **Service Features** | List of features | No | Add multiple feature items |
| **FAQs** | Related FAQs | No | Select from FAQ collection |
| **Service Specifications** | Key metrics/parameters | No | Label-value pairs |
| **SEO Settings** | Meta title, description, keywords | No | Customize for better SEO |
| **Sitemap Priority** | SEO priority (0.0-1.0) | No | Default: 0.8 (higher = more important) |
| **Change Frequency** | How often content updates | No | Default: monthly |

#### How to Add a New Service

1. Click "Service Offered" in sidebar
2. Click "Create new Service Offered"
3. Fill in title and slug
4. Write summary (shows on service cards)
5. Write detailed description
6. Mark as "Featured" if it's a popular service
7. Upload service image (optional)
8. Add service features (click "Add item")
9. Add specifications if applicable
10. Click "Publish"

---

### 3. Blog Posts

**Location in Sanity:** Click "Blog Post" in the left sidebar

**Purpose:** Manage blog articles and news

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Title** | Blog post title | Yes | 10-200 characters, make it engaging |
| **Slug** | URL-friendly version | Yes | Auto-generated |
| **Excerpt** | Brief summary | No | 50-300 chars, shows on blog listing |
| **Author** | Select author | No | Choose from Authors collection |
| **Main Image** | Featured image | No | Max 300KB, recommended for social sharing |
| **Tag** | Primary category | No | E.g., "Industry News", "Tips" |
| **Published At** | Publication date/time | No | Defaults to current date |
| **Read Time** | Estimated reading time | No | E.g., "5 min read" |
| **Body** | Main content (rich text) | Yes | Use formatting tools for headings, lists |
| **Featured Post** | Mark as featured | No | Featured posts appear larger on blog page |
| **Related Posts** | Related articles | No | Select up to 3 related posts |
| **Related Products** | Related products | No | Select up to 3 related products |
| **SEO Settings** | Meta tags | No | Override for custom SEO |

#### How to Create a Blog Post

1. Click "Blog Post" in sidebar
2. Click "Create new Blog Post"
3. Enter a compelling title
4. Generate slug
5. Write excerpt (summary)
6. Select author (optional)
7. Upload featured image (recommended)
8. Select a tag/category
9. Enter read time (optional, e.g., "5 min read")
10. Write your content in the Body field using the rich text editor:
    - Use headings (H2, H3) for structure
    - Add bullet points and numbered lists
    - Bold important text
    - Add links where relevant
11. Mark as "Featured" if it's a key article
12. Add related posts (optional) - these will appear at the bottom of the article
13. Add related products (optional) - products mentioned in the article will be showcased
14. Click "Publish"


#### Rich Text Editor Tips

- **Headings**: Use H2 for main sections, H3 for subsections
- **Bold**: Highlight important points
- **Lists**: Use bullet points for easy reading
- **Links**: Add internal links to products/services
- **Images**: Can be embedded in content (upload inline)

---

### 4. Media Gallery

**Location in Sanity:** Click "Media" in the left sidebar

**Purpose:** Showcase images and videos of installations, projects, etc.

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Title** | Media title | Yes | Descriptive title for the media |
| **Description** | Brief description | Yes | Explain what's shown in the media |
| **Media Type** | Image or Video | Yes | Select Image or Video |
| **Image** | Upload image | Conditional | Required if type is "Image", max 300KB |
| **YouTube URL** | Full YouTube video URL | Conditional | Required if type is "Video" |
| **Video Thumbnail** | Custom thumbnail for video | No | Max 300KB, uses YouTube thumbnail if empty |
| **Category** | Select category | Yes | Products/Installations/Maintenance/Projects |
| **Tags** | Additional tags | No | For better organization |
| **Published At** | Publication date | Yes | Defaults to current date |

#### How to Add Media (Image)

1. Click "Media" in sidebar
2. Click "Create new Media"
3. Enter title
4. Enter description
5. Select "Image" as Media Type
6. Upload image (max 300KB)
7. Select category (Products, Installations, etc.)
8. Add tags (optional)
9. Click "Publish"

#### How to Add Media (Video)

1. Click "Media" in sidebar
2. Click "Create new Media"
3. Enter title
4. Enter description
5. Select "Video" as Media Type
6. Paste full YouTube URL (e.g., https://www.youtube.com/watch?v=...)
7. Upload custom thumbnail (optional, or YouTube thumbnail will be used)
8. Select category
9. Add tags (optional)
10. Click "Publish"

**YouTube URL Format:**
- Full URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Or short URL: `https://youtu.be/VIDEO_ID`

---

### 5. Company Information

**Location in Sanity:** Click "Company Information" in the left sidebar

**Purpose:** Manage company details shown on About page and Homepage

**Note:** Usually you'll have only ONE company information document. Edit it instead of creating new ones.

#### Fields Explained

| Field | Description | Tips |
|-------|-------------|------|
| **Title** | Internal title | E.g., "Main Company Info" |
| **Established Year** | Founding year | E.g., "2009" |
| **Tagline** | Short tagline | E.g., "15+ Years of Excellence" |
| **About Page Heading** | Main heading for about page | E.g., "About Liftronic Elevator" |
| **About Description** | Brief description for about hero | Appears at top of about page |
| **Who We Are - Title** | Section title | Default: "Who We Are" |
| **Who We Are - Content** | Rich text content | Multiple paragraphs about company |
| **Key Points** | Bullet points | Highlight key features/benefits |
| **Hero Image** | About page hero image | Max 300KB |
| **Company Statistics** | Stats shown on about page | E.g., "500+ Projects", "15+ Years" |
| **Homepage About Title** | Title for homepage section | E.g., "About Liftronic" |
| **Homepage About Subtitle** | Subtitle for homepage | E.g., "Innovation Meets Elegance" |
| **Homepage About Description** | Full text for homepage | Detailed description |
| **Homepage Features** | Feature cards (max 3) | Shown on homepage about section |

#### Company Statistics

Add impressive numbers like:
- **Label**: "Projects Completed"
- **Value**: 500 (number only)
- **Suffix**: "+" (or "%", "K")
- **Icon**: "star", "buildings", "globe", "wrench"

**Available Icons:**
- star
- globe
- wrench
- shield
- cog
- support
- check
- rocket
- trending
- heart
- user

---

### 6. Vision, Mission & Values

**Location in Sanity:** Click "Vision, Mission & Values" in the left sidebar

**Purpose:** Define company vision, mission, commitment, and core values for About page

**Note:** Typically one document. Edit existing instead of creating new.

#### Fields Explained

| Section | Fields | Tips |
|---------|--------|------|
| **Vision** | Title, Description, Icon | Your long-term vision |
| **Mission** | Title, Description, Icon | What you aim to achieve |
| **Commitment** | Title, Description, Icon | Your promise to customers |
| **Core Values** | Array of values | Add multiple value items |

#### Available Icons
- trending, star, globe, shield, check, heart, cog, support, wrench, rocket, user

#### How to Update

1. Click "Vision, Mission & Values"
2. Open the existing document
3. Update Vision description
4. Update Mission description
5. Update Commitment description
6. Edit Core Values:
   - Each value has: Title, Description, Icon
   - Click "Add item" to add more values
   - Remove values by clicking the trash icon
7. Click "Publish"

---

### 7. Why Choose Us

**Location in Sanity:** Click "Why Choose Us" in the left sidebar

**Purpose:** Highlight reasons why customers should choose Liftronic

#### Fields Explained

| Field | Description | Tips |
|-------|-------------|------|
| **Title** | Reason title | E.g., "Expert Team" |
| **Description** | Detailed explanation | 20-500 characters |
| **Icon** | Visual icon | star, shield, support, cog, check, globe, wrench, rocket, trending, heart, user |
| **Key Features** | Bullet points | Additional features |
| **Display Order** | Sorting order | Lower numbers appear first |
| **Active** | Show/hide toggle | Uncheck to hide |

#### How to Add a Reason

1. Click "Why Choose Us"
2. Click "Create new Why Choose Us"
3. Enter title (e.g., "24/7 Support")
4. Write description (why this matters)
5. Select icon
6. Add key features as bullet points (optional)
7. Set display order (1 = first)
8. Ensure "Active" is checked
9. Click "Publish"

---

### 8. Team Members

**Location in Sanity:** Click "Team Members" in the left sidebar

**Purpose:** Showcase company team on About page

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Name** | Team member name | Yes | Full name |
| **Position/Role** | Job title | Yes | E.g., "CEO", "Head of Engineering" |
| **Biography** | Short bio | No | Background and expertise |
| **Profile Image** | Photo | Yes | Max 300KB, professional headshot |
| **Email** | Contact email | No | Public email address |
| **Phone** | Contact phone | No | Public phone number |
| **LinkedIn URL** | LinkedIn profile | No | Full LinkedIn URL |
| **Featured Team Member** | Show on main team section | No | Default: true |
| **Display Order** | Sorting order | No | Lower numbers appear first |

#### How to Add a Team Member

1. Click "Team Members"
2. Click "Create new Team Member"
3. Enter name and position
4. Write a short bio
5. Upload professional photo (max 300KB)
6. Add contact details (optional)
7. Add LinkedIn URL (optional)
8. Set display order (1 = appears first)
9. Ensure "Featured" is checked if you want them on the main page
10. Click "Publish"

---

### 9. Certificates

**Location in Sanity:** Click "Certificate" in the left sidebar

**Purpose:** Display company certifications and accreditations

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Certificate Title** | Name of certificate | Yes | E.g., "ISO 9001:2015 Certification" |
| **Issuing Organization** | Who issued it | Yes | E.g., "Bureau Veritas" |
| **Issue Date** | When issued | Yes | E.g., "October 2022" or "2022" |
| **Certificate Image** | Certificate photo | Yes | Max 300KB, clear and readable |
| **Image Alt Text** | Accessibility description | No | Describe the certificate |
| **Description** | Additional context | No | Brief explanation |
| **Display Order** | Sorting order | Yes | Lower = shown first |
| **Featured Certificate** | Highlight prominently | No | Default: false |

#### How to Add a Certificate

1. Click "Certificate"
2. Click "Create new Certificate"
3. Enter certificate title
4. Enter issuing organization
5. Enter issue date
6. Upload certificate image (max 300KB)
7. Add alt text for accessibility
8. Write brief description (optional)
9. Set display order
10. Check "Featured" if it's important
11. Click "Publish"

---

### 10. Company Timeline

**Location in Sanity:** Click "Company Timeline" in the left sidebar

**Purpose:** Show company milestones and history on About page

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Year** | Milestone year | Yes | E.g., "2009", "2015" |
| **Title** | Event title | Yes | E.g., "Company Founded" |
| **Description** | Event details | Yes | 10-200 characters |
| **Featured** | Show on main timeline | No | Only featured items appear |
| **Display Order** | Sorting order | Yes | Chronological order |

#### How to Add a Milestone

1. Click "Company Timeline"
2. Click "Create new Company Timeline"
3. Enter year (e.g., "2015")
4. Enter title (e.g., "Expanded to 10 Cities")
5. Write description
6. Check "Featured" to display it
7. Set display order (earlier years = lower numbers)
8. Click "Publish"

---

### 11. Testimonials

**Location in Sanity:** Click "Testimonials" in the left sidebar

**Purpose:** Display customer reviews and feedback with ratings

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Testimonial From (Name)** | Customer/company name | Yes | E.g., "ABC Corporation" |
| **Company Image** | Logo or photo | No | Max 300KB |
| **Testimonial Detail** | The review text | Yes | Minimum 10 characters |
| **Rating** | Star rating (1-5) | Yes | Decimal values allowed (e.g., 4.5) |

#### How to Add a Testimonial

1. Click "Testimonials"
2. Click "Create new Testimonial"
3. Enter customer/company name
4. Upload company logo (optional, max 300KB)
5. Write the testimonial (minimum 10 chars)
6. Set the rating (1-5 stars)
   - Default is 5 stars
   - You can use decimals (e.g., 4.5 for 4.5 stars)
   - This rating appears visually as stars on the website
   - Used to calculate average rating for SEO
7. Click "Publish"

#### Important Notes About Ratings

- **SEO Impact**: Testimonial ratings are used to calculate the average rating shown in search results (Google Rich Snippets)
- **Visual Display**: Ratings appear as stars on the testimonials section (★★★★★)
- **Half Stars**: Ratings like 4.5 will show 4 full stars and 1 half star
- **Accuracy**: Use honest ratings - manipulated ratings can harm SEO
- **Preview**: The Sanity Studio preview will show the rating next to the customer name

---

### 12. Clients

**Location in Sanity:** Click "Clients" in the left sidebar

**Purpose:** Display client logos in the marquee on homepage

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Title** | Client name | Yes | E.g., "Reliance Industries" |
| **Image** | Client logo | No | Max 300KB, transparent PNG recommended |

#### How to Add a Client Logo

1. Click "Clients"
2. Click "Create new Client"
3. Enter client name
4. Upload logo (max 300KB)
   - Recommended: PNG with transparent background
   - Square or rectangular logos work best
5. Add alt text for accessibility
6. Click "Publish"

---

### 13. FAQs

**Location in Sanity:** Click "FAQ" in the left sidebar

**Purpose:** Manage frequently asked questions shown on multiple pages

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Question** | The question text | Yes | 5-200 characters, start with question word |
| **Answer** | The answer text | Yes | Minimum 10 characters, be concise |

#### How to Add an FAQ

1. Click "FAQ"
2. Click "Create new FAQ"
3. Write question (e.g., "What is the warranty period?")
4. Write answer (be clear and concise)
5. Click "Publish"

#### Where FAQs Appear

FAQs can be linked to:
- Homepage (via Home Page Settings)
- Product pages (select FAQs in product editor)
- Service pages (select FAQs in service editor)

---

### 14. Tags

**Location in Sanity:** Click "Tags" in the left sidebar

**Purpose:** Categorize blog posts and products

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Title** | Tag name | Yes | 2-50 characters |
| **Slug** | URL-friendly version | Yes | Auto-generated |

#### How to Add a Tag

1. Click "Tags"
2. Click "Create new Tag"
3. Enter tag title (e.g., "Industry News")
4. Generate slug
5. Click "Publish"

**Common Tags:**
- Industry News
- Product Updates
- Maintenance Tips
- Safety Guidelines
- Installation

---

### 15. Product Key Features

**Location in Sanity:** Click "Product Key Feature" in the left sidebar

**Purpose:** Reusable features that can be added to products

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Feature Title** | Name of the feature | Yes | E.g., "Energy Efficient" |
| **Feature Description** | Detailed explanation | Yes | Minimum 10 characters |
| **Icon** | React icon name | Yes | E.g., "FiCheckCircle", "RocketIcon" |

#### How to Add a Key Feature

1. Click "Product Key Feature"
2. Click "Create new Product Key Feature"
3. Enter feature title
4. Write description
5. Enter icon name from react-icons (e.g., "FiCheckCircle", "BiRocket", "FiStar")
   - Common options: FiCheckCircle, FiStar, FiShield, FiZap, BiRocket, FiLock, FiGlobe
   - For complete list, consult your developer or check the iconMapper file
6. Click "Publish"

**Note:** Product Key Features use React component names (e.g., "FiCheckCircle"), while other sections use simple names (e.g., "star", "shield").

#### Using Key Features

When editing a product:
1. Scroll to "Key Features" field
2. Click "Add item"
3. Search and select from existing features
4. Maximum 6 features per product

---

### 16. Service Performance Numbers

**Location in Sanity:** Click "Service Performance" in the left sidebar

**Purpose:** Display performance metrics and statistics

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Service Performance Title** | Metric name | Yes | E.g., "Response Time" |
| **Service Performance Figure** | The number/metric | No | E.g., "< 24 hours" |

#### How to Add Performance Metric

1. Click "Service Performance"
2. Click "Create new Service Performance"
3. Enter title (metric name)
4. Enter figure (the value)
5. Click "Publish"

---

### 17. Authors

**Location in Sanity:** Click "Author" in the left sidebar

**Purpose:** Manage blog post authors

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Name** | Author name | No | E.g., "John Smith" |
| **Slug** | URL-friendly version | No | Auto-generated from name |
| **Image** | Author photo | No | Max 300KB |
| **Bio** | Author biography | No | Rich text, brief background |

#### How to Add an Author

1. Click "Author"
2. Click "Create new Author"
3. Enter author name
4. Generate slug
5. Upload photo (optional, max 300KB)
6. Write bio (optional)
7. Click "Publish"

---

### 18. Contact Information

**Location in Sanity:** Click "Contact Information" in the left sidebar

**Purpose:** Manage phone numbers, email, WhatsApp, and map shown across the site

**Note:** Usually ONE document. Edit existing instead of creating new.

#### Fields Explained

| Field | Description | Tips |
|-------|-------------|------|
| **Support Phone** | Customer support number | E.g., "1800 890 8411" |
| **Support Phone Label** | Label for support phone | E.g., "Liftronic Care" |
| **Email** | Contact email | Must be valid email format |
| **Email Label** | Label for email | E.g., "Send us Email" |
| **Sales Enquiry Phone** | Sales phone number | E.g., "+91 9028226664" |
| **Sales Phone Label** | Label for sales phone | E.g., "Sales Enquiry" |
| **Map Embed URL** | Google Maps embed URL | Get from Google Maps |
| **Headquarters** | Company HQ location | E.g., "Mumbai, Maharashtra, India" |
| **WhatsApp Number** | WhatsApp business number | Format: 919876543210 (no + or spaces) |
| **WhatsApp Default Message** | Pre-filled message | E.g., "Hello! I'm interested in..." |
| **Privacy Policy URL** | Link to privacy policy | Full URL |
| **Terms of Service URL** | Link to terms | Full URL |

#### How to Update Contact Info

1. Click "Contact Information"
2. Open the existing document
3. Update phone numbers, email as needed
4. For WhatsApp number:
   - Remove + and spaces
   - Format: country code + number (e.g., 919876543210)
5. Update default WhatsApp message
6. Click "Publish"

#### Getting Google Maps Embed URL

1. Go to Google Maps
2. Search for your location
3. Click "Share"
4. Click "Embed a map"
5. Copy the URL from the iframe src
6. Paste into "Map Embed URL" field

---

### 19. Social Media Links

**Location in Sanity:** Click "Socials" in the left sidebar

**Purpose:** Social media links shown in footer

#### Fields Explained

| Field | Description | Required? | Tips |
|-------|-------------|-----------|------|
| **Title** | Social platform name | No | E.g., "Instagram", "Facebook" |
| **Icon** | Icon name | No | E.g., "fiInstagram", "fiFacebook" |
| **Url** | Link to social profile | No | Full URL (https://...) |

#### How to Add Social Media Link

1. Click "Socials"
2. Click "Create new Social"
3. Enter platform name (e.g., "Instagram")
4. Enter icon name (ask developer for available icons)
5. Paste full URL to your social profile
6. Click "Publish"

**Common Social Media Icons:**
- fiInstagram (Instagram)
- fiFacebook (Facebook)
- fiLinkedin (LinkedIn)
- fiTwitter (Twitter/X)
- fiYoutube (YouTube)

**Other Available Icons:**
You can use any icon from the iconMapper. Common ones include:
- fiShield, fiSettings, fiZap, fiTool, fiCheckCircle
- fiCpu, fiTrendingUp, fiLock, fiStar, fiGlobe
- fiActivity, fiThumbsUp, fiAward, fiHome, fiUsers
- fiTarget, fiTruck, fiHeart, fiPackage, fiClock
- fiPhone, fiMail, fiMapPin, fiCalendar
- And many more from react-icons/fi, react-icons/bi, react-icons/hi

For the complete list, ask your developer or refer to the iconMapper file.

---

### 20. Home Page SEO Settings

**Location in Sanity:** Click "Home Page SEO Settings" in the left sidebar

**Purpose:** Control homepage SEO metadata and Open Graph settings

**Note:** ONE document, edit existing

#### Fields Explained

| Field | Description | Tips |
|-------|-------------|------|
| **Meta Title** | Page title in search results | Max 60 chars, include brand name |
| **Meta Description** | Description in search results | 50-160 chars, compelling |
| **SEO Keywords** | Keywords for SEO | Add as tags |
| **Open Graph Image** | Image for social sharing | 1200x630px recommended, max 300KB |
| **Canonical URL** | Preferred URL for this page | Leave empty to use default |
| **Allow Search Engine Indexing** | Let Google index page | Default: true |
| **Allow Following Links** | Let Google follow links | Default: true |
| **Additional Structured Data** | JSON-LD overrides | Advanced, usually not needed |

#### How to Update Homepage SEO

1. Click "Home Page SEO Settings"
2. Open the document
3. Update meta title (keep under 60 characters)
4. Update meta description (50-160 characters)
5. Add relevant keywords as tags
6. Upload Open Graph image (1200x630px)
7. Click "Publish"

**SEO Tips:**
- Include your brand name in title
- Make description compelling to increase clicks
- Use keywords naturally
- Update Open Graph image to represent your business

---

### 21. Home Page Settings

**Location in Sanity:** Click "Home Page Settings" in the left sidebar

**Purpose:** Configure homepage sections, forms, email, and catalog

**Note:** ONE document with multiple configuration sections

#### Fields Explained

##### FAQ Section

| Field | Description | Tips |
|-------|-------------|------|
| **Featured FAQs** | Select FAQs for homepage | Recommended: 8-12 FAQs |
| **Show FAQ Section** | Toggle FAQ section visibility | Default: true |

##### SEO Content Sections

| Field | Description | Tips |
|-------|-------------|------|
| **SEO Content Sections** | Collapsible content sections | Aim for 3000+ words total |
| **Show SEO Content Section** | Toggle section visibility | Default: true |

**For each SEO section:**
- **Section Title**: Main heading (e.g., "About Elevators in India")
- **Content**: Rich text, minimum 300 words per section
- **Target Keywords**: Keywords this content targets
- **Display Order**: 0 = first section
- **Default Expanded**: Show content expanded by default (only for first section)

##### Contact Form

| Field | Description | Tips |
|-------|-------------|------|
| **Product Options for Contact Form** | Dropdown options | List of products |

##### Google Sheets Integration

| Field | Description | Tips |
|-------|-------------|------|
| **Contact Form Google Sheet URL** | Webhook for contact form | Get from Google Sheets Apps Script |
| **Catalog Form Google Sheet URL** | Webhook for catalog form | Get from Google Sheets Apps Script |

##### Email Configuration (Nodemailer)

| Field | Description | Tips |
|-------|-------------|------|
| **SMTP Host** | Email server | E.g., smtp.gmail.com |
| **SMTP Port** | Server port | 587 (TLS) or 465 (SSL) |
| **Use SSL/TLS** | Enable encryption | False for port 587, True for 465 |
| **SMTP Username** | Sender email | Full email address |
| **SMTP Password** | Email password | Use App Password for Gmail |
| **Recipient Email** | Where to receive forms | Your business email |
| **From Name** | Display name | E.g., "Liftronic Elevators" |

##### Catalog PDF

| Field | Description | Tips |
|-------|-------------|------|
| **Catalog PDF File** | Downloadable catalog | Upload PDF file |

#### How to Configure Homepage Settings

**To Update FAQs:**
1. Click "Home Page Settings"
2. Open the document
3. Scroll to "Featured FAQs"
4. Click "Add item" and select FAQs
5. Drag to reorder
6. Click "Publish"

**To Add SEO Content Section:**
1. Scroll to "SEO Content Sections"
2. Click "Add item"
3. Enter section title
4. Write content (minimum 300 words)
5. Add target keywords
6. Set display order
7. Check "Default Expanded" for first section only
8. Click "Publish"

**To Update Contact Form Products:**
1. Scroll to "Product Options for Contact Form"
2. Edit existing options or add new ones
3. Click "Publish"

**To Configure Email (Advanced):**
1. Scroll to "Email Configuration"
2. Fill in SMTP settings:
   - For Gmail: smtp.gmail.com, port 587, SSL/TLS false
   - Create App Password in Google Account settings
   - Use App Password in SMTP Password field
3. Enter recipient email (where forms are sent)
4. Set "From Name"
5. Click "Publish"

**To Upload Catalog:**
1. Scroll to "Catalog PDF File"
2. Click "Upload"
3. Select PDF file
4. Wait for upload to complete
5. Click "Publish"

---

## Common Tasks

### How to Feature a Product on Homepage

1. Go to "Products"
2. Open the product you want to feature
3. Scroll to "Featured Product"
4. Check the checkbox
5. Click "Publish"

**Note:** All products marked as "Featured" will appear on the homepage.

---

### How to Update Company Phone Number

1. Go to "Contact Information"
2. Open the document
3. Update "Support Phone" or "Sales Enquiry Phone"
4. Click "Publish"

**Changes appear in:**
- Header (top right)
- Footer
- Contact section

---

### How to Add a New Blog Post

1. Go to "Blog Post"
2. Click "Create new Blog Post"
3. Fill in all required fields (marked with *)
4. Write content in Body using rich text editor
5. Upload featured image (recommended)
6. Select author
7. Add tag/category
8. Click "Publish"

---

### How to Update About Page

The About page pulls content from multiple collections:

**To Update Company Overview:**
1. Go to "Company Information"
2. Edit "Who We Are" content
3. Click "Publish"

**To Update Vision/Mission:**
1. Go to "Vision, Mission & Values"
2. Edit descriptions
3. Click "Publish"

**To Add/Edit Team Members:**
1. Go to "Team Members"
2. Create new or edit existing
3. Click "Publish"

**To Add Certificates:**
1. Go to "Certificate"
2. Create new certificate
3. Click "Publish"

---

### How to Change Homepage Hero Text

1. Go to "Company Information"
2. Edit "Homepage About Title" and "Homepage About Subtitle"
3. Click "Publish"

---

### How to Add Images to Media Gallery

1. Go to "Media"
2. Click "Create new Media"
3. Select "Image" as Media Type
4. Upload image (max 300KB)
5. Select category
6. Add title and description
7. Click "Publish"

---

### How to Add YouTube Video to Media Gallery

1. Go to "Media"
2. Click "Create new Media"
3. Select "Video" as Media Type
4. Paste YouTube URL
5. Upload custom thumbnail (optional)
6. Select category
7. Add title and description
8. Click "Publish"

---

### How to Update WhatsApp Button

1. Go to "Contact Information"
2. Update "WhatsApp Number" (format: 919876543210)
3. Update "WhatsApp Default Message"
4. Click "Publish"

**WhatsApp button appears:**
- Fixed on all pages (bottom right)
- Pre-filled with your message

---

### How to Update Social Media Links

1. Go to "Socials"
2. Find existing social link or create new
3. Update URL
4. Click "Publish"

**Social links appear:**
- Footer (bottom of all pages)

---

### How to Change Homepage FAQs

1. Go to "Home Page Settings"
2. Scroll to "Featured FAQs"
3. Click "Add item" to add more
4. Click "X" to remove
5. Drag to reorder
6. Click "Publish"

---

### How to Upload a New Catalog

1. Go to "Home Page Settings"
2. Scroll to "Catalog PDF File"
3. Click "Upload"
4. Select your PDF file
5. Wait for upload
6. Click "Publish"

**Catalog appears:**
- Download button on homepage and other pages
- Users can download after filling form

---

### How to Create Location-Specific Product Page

1. Go to "Products"
2. Open a product
3. Scroll to "Location-Specific Pages"
4. Click "Add item"
5. Fill in:
   - City Name (e.g., "Mumbai")
   - Generate City Slug
   - Write 500+ words unique content
   - Create unique meta title
   - Create unique meta description
   - Add keywords
   - Published: true
   - Enable Indexing: false (initially)
6. Click "Publish"

**Testing:**
- Visit: `/products/[product-slug]/[city-slug]`
- E.g., `/products/passenger-elevator/mumbai`

**When to Enable Indexing:**
- After reviewing content quality
- After verifying no duplicate content
- When ready for search engines to index

---

## SEO Best Practices

### Meta Titles

- **Length**: Maximum 60 characters
- **Format**: "Primary Keyword - Secondary Keyword | Brand Name"
- **Example**: "Passenger Elevator in Mumbai | Liftronic Elevator"
- **Tips**:
  - Include primary keyword near the beginning
  - Make it compelling to encourage clicks
  - Always include brand name

### Meta Descriptions

- **Length**: 50-160 characters (aim for 150-155)
- **Purpose**: Entice users to click from search results
- **Tips**:
  - Include a call-to-action
  - Summarize page content
  - Include primary keyword
  - Make it unique for each page
  - Write for humans, not just search engines

**Example:**
"Looking for reliable passenger elevators in Mumbai? Liftronic offers premium elevator solutions with 15+ years of experience. Get a quote today!"

### Keywords

- **Research**: Use Google Keyword Planner or similar tools
- **Placement**: Include in title, description, headings, content
- **Density**: Natural usage, don't stuff keywords
- **Long-tail**: Target specific phrases (e.g., "passenger elevator in Mumbai" vs "elevator")

### Images

- **File Names**: Use descriptive names (e.g., `passenger-elevator-mumbai.jpg` not `IMG_1234.jpg`)
- **Alt Text**: Always add descriptive alt text for accessibility and SEO
- **Size**: Keep under 300KB for fast loading
- **Format**: Use JPG for photos, PNG for logos/graphics

### Content Quality

- **Length**: Aim for 500+ words on important pages
- **Originality**: Never copy content from other sites
- **Structure**: Use headings (H1, H2, H3) for organization
- **Readability**: Short paragraphs, bullet points, clear language
- **Updates**: Regularly update content to keep it fresh

### Internal Linking

- Link related pages together
- Use descriptive anchor text
- Link from blog posts to products/services
- Create a logical site structure

### URL Structure

- Keep URLs short and descriptive
- Use hyphens to separate words
- Include keywords when relevant
- Use lowercase letters

**Good:** `/products/passenger-elevator`
**Bad:** `/product?id=12345`

### Review Schema & Ratings (SEO)

The website automatically implements **Review Schema** and **Aggregate Rating** markup for better search engine visibility.

#### How It Works

1. **Individual Reviews**: Each testimonial with a rating is marked up as a `Review` schema
2. **Aggregate Rating**: The average of all testimonial ratings is calculated and displayed
3. **Search Results**: Google may show star ratings in search results (Rich Snippets)

#### Best Practices for Testimonials

- **Be Honest**: Only use real testimonials with accurate ratings
- **Collect Regularly**: Add new testimonials monthly to keep ratings fresh
- **Variety**: Include a range of ratings (not all 5 stars looks suspicious)
- **Quality Over Quantity**: 10-20 quality reviews are better than 100 generic ones
- **Context**: Testimonials with detailed feedback perform better than short quotes

#### Rating Guidelines

- **5 Stars**: Exceptional, exceeded expectations
- **4-4.5 Stars**: Very good, met expectations well
- **3-3.5 Stars**: Good, met basic expectations
- **Below 3**: Use sparingly, only if constructive

**SEO Impact:**
- ✅ Star ratings can appear in Google search results
- ✅ Higher average ratings improve click-through rates
- ✅ Review schema helps Google understand your reputation
- ⚠️ Fake or manipulated ratings can result in penalties

---

## Troubleshooting

### Changes Not Appearing on Website

**Problem**: I published changes but don't see them on the live site.

**Solutions:**
1. Wait 1-2 minutes for changes to propagate
2. Hard refresh your browser:
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R
3. Check if you clicked "Publish" (not just save)
4. Clear browser cache
5. Try incognito/private browsing mode

---

### Image Won't Upload

**Problem**: Getting error when uploading image.

**Solutions:**
1. Check file size - must be under 300KB
2. Reduce image size:
   - Use online tools like TinyPNG or Compressor.io
   - Resize dimensions if too large
3. Check file format - use JPG or PNG
4. Rename file - remove special characters, use hyphens

---

### Can't Generate Slug

**Problem**: "Generate" button for slug doesn't work.

**Solutions:**
1. Make sure title field is filled in first
2. Click outside the title field then click "Generate"
3. Manually type a URL-friendly version (lowercase, hyphens, no spaces)

---

### Location Page Content Too Short

**Problem**: Getting error about content length.

**Solutions:**
1. Location pages require minimum 500 words
2. Write unique, city-specific content
3. Don't copy from other pages
4. Include:
   - Why your product is ideal for that city
   - Local market information
   - City-specific benefits
   - Local case studies or examples

---

### Form Emails Not Sending

**Problem**: Not receiving emails from contact form.

**Solutions:**
1. Check "Home Page Settings" → "Email Configuration"
2. Verify all SMTP settings are correct
3. For Gmail:
   - Use App Password, not regular password
   - Enable "Less secure app access" if needed
4. Check spam/junk folder
5. Verify recipient email is correct

---

### Featured Product Not Showing

**Problem**: Marked product as featured but it doesn't appear on homepage.

**Solutions:**
1. Ensure "Featured Product" checkbox is checked
2. Click "Publish" after checking
3. Wait 1-2 minutes for changes
4. Hard refresh browser
5. Verify product has all required fields filled

---

### Video Not Playing

**Problem**: YouTube video not displaying in media gallery.

**Solutions:**
1. Check YouTube URL format:
   - Should be full URL: `https://www.youtube.com/watch?v=...`
   - Or short URL: `https://youtu.be/...`
2. Make sure video is public (not private/unlisted)
3. Test URL by pasting in browser
4. Re-paste URL and publish again

---

### Rating Not Showing on Testimonial

**Problem**: Star rating not appearing on testimonial card.

**Solutions:**
1. Verify rating field is filled (1-5 scale)
2. Check that rating is a valid number (1.0 to 5.0)
3. Re-publish the testimonial
4. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
5. Check that testimonial is published (not just saved as draft)

---

### Average Rating Not Updating

**Problem**: Average rating in search results not changing after updating testimonials.

**Solutions:**
1. Wait 1-2 hours for changes to propagate
2. Ensure all testimonials have ratings assigned
3. Verify testimonials are published (not drafts)
4. Check Google Search Console for indexing status
5. Note: Google may take days/weeks to update rich snippets in search results

---

## Support & Resources

### Getting Help

If you encounter issues not covered in this guide:

1. **Check Sanity Documentation**: https://www.sanity.io/docs
2. **Contact Developer**: Reach out to your development team
3. **Sanity Support**: support@sanity.io for CMS-specific issues

### Training Resources

- **Sanity Studio Tutorial**: https://www.sanity.io/docs/studio
- **Rich Text Editor Guide**: https://www.sanity.io/docs/block-content
- **Image Best Practices**: https://www.sanity.io/docs/image-type

### Important URLs

- **Staging Site**: https://liftronic-elevator.vercel.app/
- **Production Site**: https://liftronicelevator.com/ (when live)
- **Sanity Studio (Staging)**: https://liftronic-elevator.vercel.app/studio
- **Sanity Studio (Production)**: https://liftronicelevator.com/studio (when live)

### Best Practices Summary

1. **Always Publish**: Changes aren't live until you click "Publish"
2. **Optimize Images**: Keep under 300KB for fast loading
3. **Unique Content**: Never duplicate content across pages
4. **SEO First**: Always fill in meta titles and descriptions
5. **Regular Updates**: Keep content fresh with regular blog posts
6. **Quality Over Quantity**: Better to have fewer high-quality items than many low-quality ones
7. **Preview Before Publishing**: Review changes before clicking publish
8. **Backup Important Content**: Copy important text to a document before making major changes
9. **Honest Ratings**: Use accurate ratings for testimonials - impacts SEO and trust
10. **Review Schema**: All testimonials automatically generate SEO-friendly review markup

### Maintenance Checklist

**Weekly:**
- [ ] Check for new form submissions
- [ ] Review and respond to contact inquiries
- [ ] Check website for errors or broken links

**Monthly:**
- [ ] Add new blog post
- [ ] Review and update product information
- [ ] Check analytics and adjust content strategy
- [ ] Update client logos if new clients added
- [ ] Review and update FAQs
- [ ] Add new testimonials with accurate ratings
- [ ] Review average rating and testimonial quality

**Quarterly:**
- [ ] Review all product descriptions for accuracy
- [ ] Update company information if changed
- [ ] Review and optimize SEO settings
- [ ] Update team member information
- [ ] Add new certificates and accreditations
- [ ] Refresh homepage content
- [ ] Audit testimonials - ensure all have ratings and are authentic

**Annually:**
- [ ] Complete content audit
- [ ] Update all images and media
- [ ] Review and update all service information
- [ ] Refresh about page content
- [ ] Update company timeline with new milestones

---

## Conclusion

This guide covers all aspects of managing your Liftronic Elevator website through Sanity CMS. The system is designed to be user-friendly and doesn't require any coding knowledge.

**Recent Enhancements:**
- ⭐ **Testimonial Rating System**: Collect and display star ratings for better SEO
- 📊 **Dynamic Review Schema**: Automatic calculation of average ratings
- 🎯 **Rich Snippets**: Potential for star ratings in Google search results

**Remember:**
- Take your time learning the system
- Start with small changes to build confidence
- Always preview before publishing
- Don't hesitate to ask for help
- **NEW**: Assign ratings to all testimonials for maximum SEO benefit

Your website is a powerful marketing tool. By keeping content fresh, optimized, and engaging, you'll attract more customers and grow your business. The new rating system helps build trust and improve your search engine visibility.

**Welcome to your new website management system!**

---

*Document Version: 1.1*
*Last Updated: November 2025*
*Changelog: Added testimonial rating system and review schema documentation*
*For questions or support, contact your development team*
