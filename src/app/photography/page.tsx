'use client';

import { useState } from 'react';
import Image from 'next/image';
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

// Your actual photography collection
const photographyImages = [
  // WebP format images (better browser support)
  {
    id: 1,
    src: '/photography/324860731_1273701116546063_4771658365577086506_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 2,
    src: '/photography/323179383_1816489285405090_7800638550098219027_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 3,
    src: '/photography/324388671_692160455618228_2572718640353232443_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 4,
    src: '/photography/323900556_724675602303921_592203611616967247_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 5,
    src: '/photography/422610274_1109713333709477_2118922106565121017_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 6,
    src: '/photography/323819053_1147861295933605_5399696294270207753_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 7,
    src: '/photography/323686251_867713461046594_6914581393101866910_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 8,
    src: '/photography/329042318_5772019026257559_7044600115595176343_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 9,
    src: '/photography/324393605_520365360072259_2307840321583450863_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 10,
    src: '/photography/332309724_435064332136424_3579279138325424362_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 11,
    src: '/photography/323008320_700479145023055_7157814665361205327_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 12,
    src: '/photography/340845366_786684119546567_7233537049660068430_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 13,
    src: '/photography/323537933_247951697559793_490459754974463146_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 14,
    src: '/photography/323819054_201402545794069_3845227589543272770_n.webp',
    alt: 'Photography by Jai M Sanghavi'
  },
  // HEIC format images (may have limited browser support)
  {
    id: 15,
    src: '/photography/433577135_835891355019819_5462604211105230202_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 16,
    src: '/photography/434773162_409007302023067_372559903276625094_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 17,
    src: '/photography/435896592_1496590401204881_6345130046748279923_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 18,
    src: '/photography/438793076_422457307386677_5430940434126277009_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 19,
    src: '/photography/441507840_359048803840804_432297518658082809_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 20,
    src: '/photography/446871704_452658700693403_8600770644444568578_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 21,
    src: '/photography/447021477_1014290143642976_2823700567140253917_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 22,
    src: '/photography/447881309_3383680268591928_2746980103852006545_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 23,
    src: '/photography/449365235_1175049860475853_4560504234196620185_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 24,
    src: '/photography/449394837_1882383668896977_6827194314670946648_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 25,
    src: '/photography/449772690_1656203845156112_3052598461519597944_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 26,
    src: '/photography/449824295_1499081180991567_1350260865608327560_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 27,
    src: '/photography/452370042_1847002412451655_1933339349032086643_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 28,
    src: '/photography/452656235_1545218043036490_9192056101365039643_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 29,
    src: '/photography/455701715_468186756195890_8434236256749230809_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 30,
    src: '/photography/456067176_854722409620088_8442425678001271239_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 31,
    src: '/photography/459057159_1529687260980615_4708324562801833502_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 32,
    src: '/photography/459088545_1659787851539562_6347684951987481568_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 33,
    src: '/photography/461822677_547594307762390_7008266906814213471_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 34,
    src: '/photography/468083066_586341343847873_3580486598576252635_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 35,
    src: '/photography/472410244_598114869473977_3548124624465481809_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 36,
    src: '/photography/472519022_3924726844482965_4597741987426783319_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 37,
    src: '/photography/472767948_591606543576355_2556365856874324049_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 38,
    src: '/photography/473070994_417613504680714_6704558926550980586_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 39,
    src: '/photography/473662637_9370913546254769_5629468347619891658_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 40,
    src: '/photography/479475798_3824164501181080_6997171496947928287_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  },
  {
    id: 41,
    src: '/photography/479495270_9651417114889412_6388995564511848323_n.heic',
    alt: 'Photography by Jai M Sanghavi'
  }
];

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <CameraIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Photography</h1>
            </div>
            
            <a
              href="https://www.instagram.com/xposure_trifecta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
            >
              @xposure_trifecta
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Through My Lens
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Beyond product management, I find joy in capturing moments that tell stories. 
              Each photograph represents a unique perspective on the world around us.
            </p>
          </FadeIn>

          {/* Photo Gallery */}
          <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <FadeIn delay={0.3} className="text-center mt-16">
            <HoverScale>
              <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CameraIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Follow My Photography Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay updated with my latest captures and photography adventures on Instagram.
              </p>
              <a
                href="https://www.instagram.com/xposure_trifecta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRightIcon className="w-8 h-8" />
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
