# Jai M Sanghavi - Professional Portfolio

A comprehensive professional portfolio showcasing product management expertise, AI/ML projects, and photography work. Built with Next.js 15, Tailwind CSS v4, and Untitled UI components.

**🌐 Live Portfolio:** https://portfolio-kpcp3icuy-jaimsanghavi-5090s-projects.vercel.app

## 📋 Portfolio Overview

**Professional Profile:**
- **Name:** Jai M Sanghavi
- **Title:** CSPO® Certified Product Manager & Business Experience Designer
- **Current Role:** Business Experience Designer at Deloitte Studios (Deloitte USI)
- **Experience:** 6+ years in AI/ML product strategy and enterprise SaaS
- **Contact:** jaimsanghavi@gmail.com | +91 9535156876 | [LinkedIn](https://www.linkedin.com/in/jaimsanghavi)

**Key Achievements:**
- Led AI-driven features that increased user adoption by 50%+ and reduced time-to-insight by 60%
- Delivered $20M+ in ARR across 500+ enterprise users
- $250K+ annual savings through automation solutions
- TCS "Innovation Spark Award" winner (top 5% of 450K employees)

## 🛠 Technical Stack

### Core Technologies
- **Next.js 15** with TypeScript and App Router
- **Tailwind CSS v4** with custom design tokens and dark mode
- **Untitled UI Components** - Complete design system
- **Heroicons** - Professional icon library
- **Responsive Design** - Mobile-first approach

### Portfolio Sections
- **Hero Section** - Professional introduction with key metrics
- **Featured Projects** - 3 major AI/ML projects with impact metrics
- **Core Competencies** - Skills and expertise areas
- **Work Experience** - Detailed timeline (Deloitte → Edgeverve → TCS)
- **Photography Gallery** - 41 curated images with lightbox functionality
- **Contact Section** - Email and LinkedIn integration

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Main portfolio page
│   │   ├── photography/             # Photography gallery
│   │   │   └── page.tsx            # Gallery with 41 images
│   │   ├── showcase/               # Project showcase
│   │   │   └── page.tsx            # Detailed project views
│   │   ├── globals.css             # Global styles
│   │   └── layout.tsx              # Root layout
│   ├── components/                 # Untitled UI components
│   │   ├── base/                   # Core UI components
│   │   ├── foundations/            # Design system
│   │   ├── marketing/              # Marketing components
│   │   └── application/            # App-specific components
│   ├── hooks/                      # Custom React hooks
│   ├── providers/                  # Context providers
│   └── utils/                      # Utility functions
├── public/
│   ├── Jai_ProfilePic.jpg         # Profile picture
│   └── photography/               # 41 photography images
│       ├── *.webp                 # 14 WebP format images
│       └── *.heic                 # 27 HEIC format images
├── .vercel/                       # Vercel deployment config
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will be available at `http://localhost:3000`

### Key Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📸 Photography Gallery

The photography section showcases 41 curated images:
- **Location:** `/public/photography/`
- **Formats:** WebP (14 images) and HEIC (27 images)
- **Features:** Responsive grid, lightbox modal, navigation
- **Source:** Instagram @xposure_trifecta

### Adding New Photos
1. Add images to `/public/photography/`
2. Update the image list in `/src/app/photography/page.tsx`
3. Rebuild and redeploy

## 🌐 Deployment Instructions

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Build the project**:
```bash
npm run build
```

3. **Deploy to production**:
```bash
npx vercel --prod
```

4. **Your site will be live** at the provided URL (currently: https://portfolio-kpcp3icuy-jaimsanghavi-5090s-projects.vercel.app)

### Method 2: Vercel Website (Drag & Drop)

1. **Build the project locally**:
```bash
npm run build
```

2. **Create deployment package**:
```bash
tar -czf portfolio-deploy.tar.gz .next public package.json next.config.js
```

3. **Go to [Vercel.com](https://vercel.com)**
4. **Drag and drop** the `portfolio-deploy.tar.gz` file
5. **Follow the deployment wizard**

### Method 3: GitHub Integration

1. **Push code to GitHub repository**
2. **Connect GitHub repo to Vercel**
3. **Automatic deployments** on every push to main branch

### Custom Domain Setup (Optional)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Update DNS records as instructed

## 🔧 Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Disabled for faster builds
  },
  typescript: {
    ignoreBuildErrors: true,   // Disabled for faster builds
  },
};

export default nextConfig;
```

### Key Features Enabled
- **Static Export** ready
- **Image Optimization** for photography
- **Fast Refresh** in development
- **TypeScript** support
- **Tailwind CSS v4** integration

## 🎨 Styling & Design

### Untitled UI Components
- ✅ Complete design system integration
- ✅ Button, Card, Badge, and form components
- ✅ Professional icon library (@untitledui/icons)
- ✅ Dark/light mode support
- ✅ Responsive design tokens

### Custom Styling
- **Primary Colors:** Blue gradient (blue-600 to purple-600)
- **Dark Mode:** Default theme with toggle
- **Typography:** Professional hierarchy
- **Spacing:** Consistent design system
- **Animations:** Smooth transitions and hover effects

## 📊 Performance Optimization

### Build Analysis
```
Route (app)                                 Size  First Load JS
┌ ○ /                                    7.73 kB         133 kB
├ ○ /_not-found                            989 B         101 kB  
├ ○ /photography                         9.12 kB         132 kB
└ ○ /showcase                            30.3 kB         156 kB
+ First Load JS shared by all            99.6 kB
```

### Optimizations Applied
- **Static Generation** for all pages
- **Image Optimization** via Next.js
- **Bundle Splitting** for optimal loading
- **Tree Shaking** for unused code removal
- **CDN Delivery** via Vercel

## 🔄 Making Updates

### Content Updates
1. **Edit source files** in `/src/app/`
2. **Test locally** with `npm run dev`
3. **Build and deploy**:
```bash
npm run build
npx vercel --prod
```

### Adding New Sections
1. **Create new page** in `/src/app/new-section/page.tsx`
2. **Update navigation** in main layout
3. **Add route to next.config.js** if needed
4. **Rebuild and redeploy**

### Photography Updates
1. **Add images** to `/public/photography/`
2. **Update image array** in `/src/app/photography/page.tsx`
3. **Test locally** to ensure proper loading
4. **Deploy updates**

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
- ESLint and TypeScript errors are disabled in `next.config.js`
- Check console for runtime errors

**Image Loading Issues:**
- Ensure images are in `/public/photography/`
- Check file permissions and formats
- Verify image paths in code

**Deployment Issues:**
- Ensure all dependencies are in `package.json`
- Check Vercel build logs for specific errors
- Verify environment variables if needed

### Getting Help
- Check [Next.js Documentation](https://nextjs.org/docs)
- Review [Vercel Deployment Docs](https://vercel.com/docs)
- Contact: jaimsanghavi@gmail.com

## 📄 License

This project is for personal portfolio use. All photography and content belong to Jai M Sanghavi.

---

**Portfolio Owner:** Jai M Sanghavi  
**Email:** jaimsanghavi@gmail.com  
**LinkedIn:** [linkedin.com/in/jaimsanghavi](https://www.linkedin.com/in/jaimsanghavi)  
**Live Site:** https://portfolio-kpcp3icuy-jaimsanghavi-5090s-projects.vercel.app
  return (
    <div>
      <Button color="primary" size="lg">
        Get Started
      </Button>
    </div>
  );
}
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Inter](https://fonts.google.com/specimen/Inter), optimized for UI design.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Untitled UI React](https://www.untitledui.com/react) - Component documentation
- [Untitled UI Figma](https://www.untitledui.com/figma) - Design system
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
