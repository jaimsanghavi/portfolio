# Portfolio Next.js Shell with Untitled UI

This is a barebones Next.js application with **Untitled UI components** integrated for rapid prototyping and visualization.

## Features
- **Next.js 15** (TypeScript)
- **Tailwind CSS v4** with custom design tokens
- **App Router** with `src/` directory
- **Untitled UI Components** - Full component library integrated
- **Untitled UI Icons** - Professional icon library
- **React Aria** - Accessible component foundation
- **Theme System** - Dark/light mode support
- **ESLint** configuration

## Untitled UI Integration
- ✅ Button components with multiple variants
- ✅ Form components (inputs, textareas, selects)
- ✅ Badge and tag components  
- ✅ Avatar and user profile components
- ✅ Progress indicators and loading states
- ✅ Tooltip and dropdown components
- ✅ Professional icon library (@untitledui/icons)
- ✅ Custom design tokens and theme system

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure
```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── base/              # Untitled UI base components
│   ├── foundations/       # Design system foundations
│   ├── marketing/         # Marketing-specific components
│   └── application/       # Application-specific components
├── hooks/                 # Custom React hooks
├── providers/             # Theme and context providers
├── styles/                # Global styles and themes
└── utils/                 # Utility functions
```

## Using Components

```tsx
import { Button } from "@/components/base/buttons/button";

export default function MyPage() {
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
