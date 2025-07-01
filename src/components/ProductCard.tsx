import { motion } from "framer-motion";
import { ShoppingCart, Users, Star, TrendingUp } from "lucide-react";
import { FeaturedProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
    product: FeaturedProduct;
    onViewDetails: (product: FeaturedProduct) => void;
    index: number;
}

const ProductCard = ({ product, onViewDetails, index }: ProductCardProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const getBestTier = () => {
        if (!product.pricing.tiers || product.pricing.tiers.length === 0) return null;
        return product.pricing.tiers[product.pricing.tiers.length - 1];
    };

    const bestTier = getBestTier();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => onViewDetails(product)}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            {/* Image avec badges */}
            <div className="relative overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges de statut */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isPopular && (
                        <Badge className="bg-brand-red text-white font-medium">
                            <Star className="h-3 w-3 mr-1" />
                            Populaire
                        </Badge>
                    )}
                    {product.isTrending && (
                        <Badge className="bg-brand-orange text-white font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Tendance
                        </Badge>
                    )}
                </div>

                {/* Stock status */}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={product.inStock ? "default" : "destructive"}
                        className={product.inStock ? "bg-green-500" : ""}
                    >
                        {product.inStock ? "En stock" : "Rupture"}
                    </Badge>
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Contenu */}
            <div className="p-6">
                {/* Titre et catégorie */}
                <div className="mb-3">
                    <h3 className="font-poppins font-bold text-lg text-brand-dark mb-1 line-clamp-2 group-hover:text-brand-red transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-inter capitalize">
                        {product.category.replace('-', ' ')}
                    </p>
                </div>

                {/* Description courte */}
                <p className="font-inter text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                </p>

                {/* Prix */}
                <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-poppins font-bold text-xl text-brand-red">
                            {formatPrice(product.pricing.totalPrice)}
                        </span>
                        <span className="text-sm text-gray-500 font-inter">/unité</span>
                    </div>

                    {bestTier && (
                        <div className="text-xs text-green-600 font-medium">
                            Jusqu'à {bestTier.savingsPercentage?.toFixed(1)}% d'économie à partir de {bestTier.minQuantity} unités
                        </div>
                    )}
                </div>

                {/* Acheteurs */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600 font-inter">
                            {product.buyers.length} client{product.buyers.length > 1 ? 's' : ''} satisfait{product.buyers.length > 1 ? 's' : ''}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Avatars des acheteurs */}
                        <div className="flex -space-x-2">
                            {product.buyers.slice(0, 3).map((buyer, idx) => (
                                <div
                                    key={buyer.id}
                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-red to-brand-orange flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                                    title={`${buyer.name} - ${buyer.location}`}
                                >
                                    {buyer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            ))}
                        </div>

                        {/* Noms */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 truncate font-inter">
                                {product.buyers.slice(0, 2).map(b => b.name.split(' ')[0]).join(', ')}
                                {product.buyers.length > 2 && ` +${product.buyers.length - 2} autres`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Spécifications clés */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                        {product.specifications.slice(0, 3).map((spec, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-inter"
                            >
                                {spec.value}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(product);
                        }}
                        className="flex-1 bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-medium rounded-xl"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Voir détails
                    </Button>
                </div>

                {/* Informations supplémentaires */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-inter">
                        <span>Livraison: {product.estimatedDelivery}</span>
                        <span>Min: {product.minOrderQuantity} unité{product.minOrderQuantity > 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;