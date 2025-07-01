import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Star, Users, Package, Truck, Shield, Calculator, ShoppingCart, Heart, Share2, ZoomIn } from "lucide-react";
import { FeaturedProduct, ProductFormData } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductCalculator from "./ProductCalculator";
import useEmblaCarousel from 'embla-carousel-react';

interface ProductModalProps {
    product: FeaturedProduct | null;
    isOpen: boolean;
    onClose: () => void;
    onOrderNow: (formData: ProductFormData) => void;
}

const ProductModal = ({ product, isOpen, onClose, onOrderNow }: ProductModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showImageZoom, setShowImageZoom] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Carousel pour les images
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center'
    });

    // Gestion du focus et échap
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Reset des états quand le produit change
    useEffect(() => {
        if (product) {
            setCurrentImageIndex(0);
            setShowCalculator(false);
            setShowImageZoom(false);
            setSelectedSpec(null);
        }
    }, [product]);

    if (!product) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleOrderNow = () => {
        const formData: ProductFormData = {
            productId: product.id,
            productName: product.name,
            productUrl: product.originalUrl,
            quantity: 1,
            specifications: product.specifications.map(spec => `${spec.name}: ${spec.value}`).join(', ')
        };
        onOrderNow(formData);
        onClose();
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const getBestTier = () => {
        if (!product.pricing.tiers || product.pricing.tiers.length === 0) return null;
        return product.pricing.tiers[product.pricing.tiers.length - 1];
    };

    const bestTier = getBestTier();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 p-4 flex items-center justify-center"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="bg-white w-full max-w-6xl max-h-[95vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-brand-red to-brand-orange p-6 text-white relative overflow-hidden flex-shrink-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                            <div className="relative z-10 flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="font-poppins font-bold text-2xl md:text-3xl">
                                            {product.name}
                                        </h2>
                                        <div className="flex gap-2">
                                            {product.isPopular && (
                                                <Badge className="bg-white/20 text-white border-white/30">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Populaire
                                                </Badge>
                                            )}
                                            {product.isTrending && (
                                                <Badge className="bg-white/20 text-white border-white/30">
                                                    📈 Tendance
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-white/90 font-inter text-lg">
                                        {product.shortDescription}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="text-sm text-white/80">
                                            Catégorie: {product.category.replace('-', ' ')}
                                        </span>
                                        <Separator orientation="vertical" className="h-4 bg-white/30" />
                                        <span className="text-sm text-white/80">
                                            ID: {product.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/20 p-2 rounded-full"
                                        title="Partager"
                                    >
                                        <Share2 className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/20 p-2 rounded-full"
                                        title="Ajouter aux favoris"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        onClick={onClose}
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/20 p-3 rounded-full"
                                    >
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Contenu principal */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="grid lg:grid-cols-2 gap-8 p-6">
                                {/* Galerie d'images */}
                                <div className="space-y-4">
                                    {/* Image principale */}
                                    <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
                                        <img
                                            src={product.images[currentImageIndex]}
                                            alt={`${product.name} - Image ${currentImageIndex + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Navigation images */}
                                        {product.images.length > 1 && (
                                            <>
                                                <Button
                                                    onClick={prevImage}
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-0 shadow-lg"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </Button>
                                                <Button
                                                    onClick={nextImage}
                                                    variant="outline"
                                                    size="icon"
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-0 shadow-lg"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </Button>
                                            </>
                                        )}

                                        {/* Bouton zoom */}
                                        <Button
                                            onClick={() => setShowImageZoom(true)}
                                            variant="outline"
                                            size="icon"
                                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-0 shadow-lg"
                                        >
                                            <ZoomIn className="h-5 w-5" />
                                        </Button>

                                        {/* Indicateur image */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                            {currentImageIndex + 1} / {product.images.length}
                                        </div>
                                    </div>

                                    {/* Thumbnails */}
                                    {product.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {product.images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex
                                                            ? 'border-brand-orange scale-105'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Acheteurs */}
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Users className="h-5 w-5 text-brand-orange" />
                                            <h3 className="font-poppins font-semibold text-lg">
                                                Clients satisfaits ({product.buyers.length})
                                            </h3>
                                        </div>

                                        <div className="space-y-3">
                                            {product.buyers.map((buyer) => (
                                                <div key={buyer.id} className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-red to-brand-orange flex items-center justify-center text-white font-bold text-sm">
                                                        {buyer.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">{buyer.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {buyer.location} • {buyer.quantity} unité{buyer.quantity > 1 ? 's' : ''} • {new Date(buyer.purchaseDate).toLocaleDateString('fr-FR')}
                                                            {buyer.isVerified && <span className="text-green-600 ml-1">✓</span>}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Informations produit */}
                                <div className="space-y-6">
                                    {/* Prix */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="font-poppins font-bold text-3xl text-brand-red">
                                                {formatPrice(product.pricing.totalPrice)}
                                            </span>
                                            <span className="text-lg text-gray-600">/unité</span>
                                        </div>

                                        {bestTier && (
                                            <div className="flex items-center gap-2 text-green-600 mb-4">
                                                <span className="text-sm font-medium">
                                                    Jusqu'à {bestTier.savingsPercentage?.toFixed(1)}% d'économie à partir de {bestTier.minQuantity} unités
                                                </span>
                                            </div>
                                        )}

                                        {/* Détail des coûts */}
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Prix produit (Chine):</span>
                                                <span>{formatPrice(product.pricing.basePriceFCFA)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Expédition:</span>
                                                <span>{formatPrice(product.pricing.shippingCost)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Service:</span>
                                                <span>{formatPrice(product.pricing.serviceFee)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Douane:</span>
                                                <span>{formatPrice(product.pricing.customsFees)}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-semibold">
                                                <span>Total TTC:</span>
                                                <span className="text-brand-red">{formatPrice(product.pricing.totalPrice)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions principales */}
                                    <div className="space-y-3">
                                        <Button
                                            onClick={handleOrderNow}
                                            className="w-full bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold text-lg py-4 rounded-xl"
                                        >
                                            <ShoppingCart className="mr-2 h-5 w-5" />
                                            Commander maintenant
                                        </Button>

                                        <Button
                                            onClick={() => setShowCalculator(!showCalculator)}
                                            variant="outline"
                                            className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange/10 font-poppins font-semibold py-4 rounded-xl"
                                        >
                                            <Calculator className="mr-2 h-5 w-5" />
                                            {showCalculator ? 'Masquer' : 'Afficher'} le calculateur
                                        </Button>
                                    </div>

                                    {/* Calculateur */}
                                    <AnimatePresence>
                                        {showCalculator && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <ProductCalculator
                                                    product={product}
                                                    onOrderWithQuantity={(quantity) => {
                                                        const formData: ProductFormData = {
                                                            productId: product.id,
                                                            productName: product.name,
                                                            productUrl: product.originalUrl,
                                                            quantity,
                                                            specifications: product.specifications.map(spec => `${spec.name}: ${spec.value}`).join(', ')
                                                        };
                                                        onOrderNow(formData);
                                                        onClose();
                                                    }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Informations livraison */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                                            <Package className="h-6 w-6 text-brand-orange mx-auto mb-2" />
                                            <p className="text-sm font-medium text-gray-900">En stock</p>
                                            <p className="text-xs text-gray-500">{product.stockQuantity} unités</p>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                                            <Truck className="h-6 w-6 text-brand-orange mx-auto mb-2" />
                                            <p className="text-sm font-medium text-gray-900">Livraison</p>
                                            <p className="text-xs text-gray-500">{product.estimatedDelivery}</p>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                                            <Shield className="h-6 w-6 text-brand-orange mx-auto mb-2" />
                                            <p className="text-sm font-medium text-gray-900">Garantie</p>
                                            <p className="text-xs text-gray-500">30 jours</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="font-poppins font-semibold text-lg mb-3">Description</h3>
                                        <p className="font-inter text-gray-700 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Spécifications */}
                                    <div>
                                        <h3 className="font-poppins font-semibold text-lg mb-4">Spécifications techniques</h3>
                                        <div className="grid gap-3">
                                            {product.specifications.map((spec, index) => (
                                                <motion.div
                                                    key={index}
                                                    className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${selectedSpec === spec.name
                                                            ? 'border-brand-orange bg-brand-orange/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    onClick={() => setSelectedSpec(selectedSpec === spec.name ? null : spec.name)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-gray-900">{spec.name}</span>
                                                        <span className="text-gray-600">{spec.value}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer sticky */}
                        <div className="border-t border-gray-100 p-6 bg-white flex-shrink-0">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-poppins font-bold text-xl text-brand-red">
                                            {formatPrice(product.pricing.totalPrice)}
                                        </p>
                                        <p className="text-sm text-gray-500">Prix unitaire TTC</p>
                                    </div>
                                    {bestTier && (
                                        <div className="text-left">
                                            <p className="font-medium text-green-600">
                                                -{bestTier.savingsPercentage?.toFixed(1)}%
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                dès {bestTier.minQuantity} unités
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setShowCalculator(!showCalculator)}
                                        variant="outline"
                                        className="border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                                    >
                                        <Calculator className="mr-2 h-4 w-4" />
                                        Calculer
                                    </Button>
                                    <Button
                                        onClick={handleOrderNow}
                                        className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold px-8"
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Commander
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Modal zoom image */}
                    <AnimatePresence>
                        {showImageZoom && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
                                onClick={() => setShowImageZoom(false)}
                            >
                                <motion.img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                />
                                <Button
                                    onClick={() => setShowImageZoom(false)}
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 text-white hover:bg-white/20 w-12 h-12 rounded-full"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;