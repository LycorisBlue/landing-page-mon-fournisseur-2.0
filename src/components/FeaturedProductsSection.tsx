import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, ShoppingBag, Sparkles } from 'lucide-react';
import { FeaturedProduct, ProductFormData } from '@/types/product';
import { featuredProducts } from '@/data/featuredProducts';
import ProductCarousel from './ProductCarousel';
import ProductModal from './ProductModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeaturedProductsSectionProps {
    onOrderProduct?: (formData: ProductFormData) => void;
    className?: string;
}

const FeaturedProductsSection = ({
    onOrderProduct,
    className = ""
}: FeaturedProductsSectionProps) => {
    const [selectedProduct, setSelectedProduct] = useState<FeaturedProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | 'popular' | 'trending'>('all');

    // Filtrer les produits selon le filtre sélectionné
    const filteredProducts = featuredProducts.filter(product => {
        switch (filter) {
            case 'popular':
                return product.isPopular;
            case 'trending':
                return product.isTrending;
            default:
                return true;
        }
    });

    const handleProductSelect = (product: FeaturedProduct) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // Délai pour l'animation
    };

    const handleOrderProduct = (formData: ProductFormData) => {
        if (onOrderProduct) {
            onOrderProduct(formData);
        }
        handleCloseModal();
    };

    // Statistiques des produits
    const stats = {
        total: featuredProducts.length,
        popular: featuredProducts.filter(p => p.isPopular).length,
        trending: featuredProducts.filter(p => p.isTrending).length,
        inStock: featuredProducts.filter(p => p.inStock).length
    };

    // Calcul du prix moyen
    const averagePrice = Math.round(
        featuredProducts.reduce((sum, product) => sum + product.pricing.totalPrice, 0) / featuredProducts.length
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className={`py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden ${className}`}>
            <div className="container mx-auto px-4">
                {/* Header animé */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {/* Badge d'introduction */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <Badge className="bg-gradient-to-r from-brand-red to-brand-orange text-white px-6 py-2 text-sm font-medium rounded-full">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Produits phares
                        </Badge>
                    </motion.div>

                    {/* Titre principal */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6"
                    >
                        Nos meilleures ventes
                        <span className="block text-brand-orange mt-2">depuis la Chine</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        Découvrez nos produits les plus populaires avec prix transparents,
                        délais garantis et avis clients vérifiés
                    </motion.p>

                    {/* Ligne décorative */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-gradient-to-r from-brand-red to-brand-orange mx-auto rounded-full"
                    />
                </motion.div>

                {/* Statistiques et filtres */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    {/* Filtres */}
                    <div className="flex justify-center">
                        <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex gap-2">
                            <Button
                                onClick={() => setFilter('all')}
                                variant={filter === 'all' ? 'default' : 'ghost'}
                                className={`rounded-xl font-inter font-medium transition-all duration-300 ${filter === 'all'
                                        ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-lg'
                                        : 'text-gray-600 hover:text-brand-orange hover:bg-gray-50'
                                    }`}
                            >
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Tous ({stats.total})
                            </Button>

                            <Button
                                onClick={() => setFilter('popular')}
                                variant={filter === 'popular' ? 'default' : 'ghost'}
                                className={`rounded-xl font-inter font-medium transition-all duration-300 ${filter === 'popular'
                                        ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-lg'
                                        : 'text-gray-600 hover:text-brand-orange hover:bg-gray-50'
                                    }`}
                            >
                                <Star className="h-4 w-4 mr-2" />
                                Populaires ({stats.popular})
                            </Button>

                            <Button
                                onClick={() => setFilter('trending')}
                                variant={filter === 'trending' ? 'default' : 'ghost'}
                                className={`rounded-xl font-inter font-medium transition-all duration-300 ${filter === 'trending'
                                        ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-lg'
                                        : 'text-gray-600 hover:text-brand-orange hover:bg-gray-50'
                                    }`}
                            >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Tendances ({stats.trending})
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Carousel de produits */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                >
                    {filteredProducts.length > 0 ? (
                        <ProductCarousel
                            products={filteredProducts}
                            onProductSelect={handleProductSelect}
                            autoplay={true}
                            className="mb-12"
                        />
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="font-poppins font-bold text-xl text-gray-700 mb-2">
                                Aucun produit trouvé
                            </h3>
                            <p className="font-inter text-gray-500 mb-6">
                                Essayez un autre filtre ou consultez tous nos produits
                            </p>
                            <Button
                                onClick={() => setFilter('all')}
                                className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90"
                            >
                                Voir tous les produits
                            </Button>
                        </div>
                    )}
                </motion.div>

                {/* Call-to-action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-brand-red to-brand-orange rounded-3xl p-8 text-white relative overflow-hidden">
                        {/* Éléments décoratifs */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h3 className="font-poppins font-bold text-2xl md:text-3xl mb-4">
                                Vous ne trouvez pas ce que vous cherchez ?
                            </h3>
                            <p className="font-inter text-white/90 mb-6 text-lg">
                                Envoyez-nous le lien de n'importe quel produit depuis la Chine
                                et obtenez un devis personnalisé en moins de 2h
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    onClick={() => onOrderProduct && onOrderProduct({})}
                                    className="bg-white text-brand-red hover:bg-gray-100 font-poppins font-semibold px-8 py-3 rounded-xl"
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Envoyer un lien produit
                                </Button>

                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Réponse garantie sous 2h
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Garanties */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                    {[
                        {
                            icon: "🛡️",
                            title: "Qualité garantie",
                            description: "Tous nos produits sont vérifiés avant expédition"
                        },
                        {
                            icon: "📦",
                            title: "Livraison sécurisée",
                            description: "Suivi en temps réel jusqu'à votre porte"
                        },
                        {
                            icon: "💬",
                            title: "Support 24/7",
                            description: "Notre équipe vous accompagne à chaque étape"
                        }
                    ].map((guarantee, index) => (
                        <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg">
                            <div className="text-4xl mb-4">{guarantee.icon}</div>
                            <h4 className="font-poppins font-semibold text-lg text-brand-dark mb-2">
                                {guarantee.title}
                            </h4>
                            <p className="font-inter text-gray-600 text-sm">
                                {guarantee.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Modal produit */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onOrderNow={handleOrderProduct}
            />
        </section>
    );
};

export default FeaturedProductsSection;