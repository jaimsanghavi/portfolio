'use client';

import { useState } from 'react';
import Image from 'next/image';
import { photos } from '@/data/photos';
import { Card, FadeIn, StaggerContainer, StaggerItem, HoverScale } from '@/components';
import { 
  ArrowLeftIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CameraIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

const photographyImages = photos.map((p, i) => ({
  id: i + 1,
  src: p.src,
  alt: 'Photography by Jai M Sanghavi',
}));

export default function Photography() {
  const [selectedImage, setSelectedImage] = useState<null | typeof photographyImages[0]>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (image: typeof photographyImages[0]) => {
    setSelectedImage(image);
    setCurrentImageIndex(photographyImages.findIndex(img => img.id === image.id));
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + photographyImages.length) % photographyImages.length
      : (currentImageIndex + 1) % photographyImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(photographyImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <Link 
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-sm sm:text-base">Back to Portfolio</span>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CameraIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Photography</h1>
            </div>
            
            <a
              href="https://www.instagram.com/xposure_trifecta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs sm:text-sm font-medium"
            >
              @xposure_trifecta
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <FadeIn className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Through My Lens
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Beyond product management, I find joy in capturing moments that tell stories. 
              Each photograph represents a unique perspective on the world around us.
            </p>
          </FadeIn>

          {/* Photo Gallery */}
          <StaggerContainer staggerDelay={0.05} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {photographyImages.map((image) => (
              <StaggerItem key={image.id}>
                <HoverScale scale={1.02}>
                  <Card 
                    className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {image.src.endsWith('.heic') ? (
                        // HEIC has limited browser support; fall back to <img>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                    </div>
                  </Card>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Call to Action */}
          <FadeIn delay={0.3} className="text-center mt-10 sm:mt-16">
            <HoverScale>
              <Card className="p-6 sm:p-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CameraIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Follow My Photography Journey
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                Stay updated with my latest captures and photography adventures on Instagram.
              </p>
              <a
                href="https://www.instagram.com/xposure_trifecta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <ShareIcon className="w-4 h-4 mr-2" />
                Follow @xposure_trifecta
              </a>
            </Card>
          </HoverScale>
        </FadeIn>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
            >
              <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
            >
              <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image */}
            <div className="relative max-w-4xl max-h-[80vh]">
              {selectedImage.src.endsWith('.heic') ? (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1600}
                  height={1200}
                  className="w-full h-full object-contain rounded-lg"
                  priority
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
