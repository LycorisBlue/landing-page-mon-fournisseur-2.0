import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FeaturedProduct } from '@/types/product';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
    products: FeaturedProduct[];
    onProductSelect: (product: FeaturedProduct) => void;
    autoplay?: boolean;
    className?: string;
}

const ProductCarousel = ({
    products,
    onProductSelect,
    autoplay = true,
    className = ""
}: ProductCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 }
        }
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [autoplayActive, setAutoplayActive] = useState(autoplay);

    // Auto-play manuel
    useEffect(() => {
        if (!autoplayActive || !emblaApi) return;

        const interval = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [emblaApi, autoplayActive]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            setAutoplayActive(false); // Arrêter l'autoplay quand l'utilisateur intervient
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
            setAutoplayActive(false); // Arrêter l'autoplay quand l'utilisateur intervient
        }
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) {
            emblaApi.scrollTo(index);
            setAutoplayActive(false); // Arrêter l'autoplay quand l'utilisateur intervient
        }
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="font-poppins font-bold text-xl text-gray-700 mb-2">
                    Aucun produit disponible
                </h3>
                <p className="font-inter text-gray-500">
                    Les produits phares seront bientôt disponibles
                </p>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {/* Carousel container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex-none w-full md:w-1/2 lg:w-1/3 min-w-0"
                        >
                            <ProductCard
                                product={product}
                                onViewDetails={onProductSelect}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <AnimatePresence>
                {canScrollPrev && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10"
                    >
                        <Button
                            onClick={scrollPrev}
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-brand-orange shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <ChevronLeft className="h-5 w-5 text-brand-dark" />
                        </Button>
                    </motion.div>
                )}

                {canScrollNext && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
                    >
                        <Button
                            onClick={scrollNext}
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-brand-orange shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <ChevronRight className="h-5 w-5 text-brand-dark" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index * 3)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(selectedIndex / 3) === index
                            ? 'bg-gradient-to-r from-brand-red to-brand-orange scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Aller au groupe de produits ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-brand-red to-brand-orange"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${((selectedIndex + 1) / products.length) * 100}%`
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center mt-4 gap-6 text-sm text-gray-500 font-inter">
                <span>
                    {selectedIndex + 1} sur {products.length} produits
                </span>
                <span className="hidden md:inline">
                    •
                </span>
                <span className="hidden md:inline">
                    {products.filter(p => p.isPopular).length} populaires
                </span>
                <span className="hidden md:inline">
                    •
                </span>
                <span className="hidden md:inline">
                    {products.filter(p => p.isTrending).length} en tendance
                </span>
            </div>

            {/* Auto-play indicator */}
            {autoplayActive && (
                <div className="absolute top-4 right-4 z-10">
                    <motion.div
                        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Auto
                    </motion.div>
                </div>
            )}

            {/* Toggle autoplay button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setAutoplayActive(!autoplayActive)}
                    className="text-sm text-gray-500 hover:text-brand-orange transition-colors duration-300 font-inter"
                >
                    {autoplayActive ? '⏸️ Pause auto' : '▶️ Lecture auto'}
                </button>
            </div>
        </div>
    );
};

export default ProductCarousel;