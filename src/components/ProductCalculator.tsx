import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Calculator, TrendingDown, Package, Truck, DollarSign, ShoppingCart } from 'lucide-react';
import { FeaturedProduct } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import useProductCalculator from '@/hooks/useProductCalculator';

interface ProductCalculatorProps {
    product: FeaturedProduct;
    onOrderWithQuantity?: (quantity: number) => void;
    className?: string;
}

const ProductCalculator = ({
    product,
    onOrderWithQuantity,
    className = ""
}: ProductCalculatorProps) => {
    const {
        quantity,
        step,
        result,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        setStep,
        reset,
        canIncrease,
        canDecrease,
        nextTiers,
        nextTierSavings,
        formatPrice
    } = useProductCalculator({ product });

    const [inputValue, setInputValue] = useState(quantity.toString());
    const [showBreakdown, setShowBreakdown] = useState(false);

    // Synchroniser l'input avec la quantité
    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 0) {
            setQuantity(numValue);
        }
    };

    const handleInputBlur = () => {
        const numValue = parseInt(inputValue);
        if (isNaN(numValue) || numValue < product.minOrderQuantity) {
            setInputValue(product.minOrderQuantity.toString());
            setQuantity(product.minOrderQuantity);
        }
    };

    const stepOptions = [1, 10, 50, 100, 500, 1000];

    return (
        <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-red to-brand-orange rounded-xl flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-poppins font-bold text-xl text-brand-dark">
                        Calculateur de prix
                    </h3>
                    <p className="text-sm text-gray-600 font-inter">
                        Calculez vos économies selon la quantité
                    </p>
                </div>
            </div>

            {/* Contrôles de quantité */}
            <div className="space-y-6">
                {/* Sélecteur de pas */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Pas d'incrémentation
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {stepOptions.map((stepOption) => (
                            <Button
                                key={stepOption}
                                onClick={() => setStep(stepOption)}
                                variant={step === stepOption ? "default" : "outline"}
                                size="sm"
                                className={`${step === stepOption
                                        ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white'
                                        : 'border-gray-300 text-gray-600 hover:border-brand-orange'
                                    } rounded-lg font-medium transition-all duration-300`}
                            >
                                {stepOption}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Contrôle quantité */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Quantité souhaitée
                    </Label>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={decreaseQuantity}
                            disabled={!canDecrease}
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-brand-orange disabled:opacity-50"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <div className="flex-1 relative">
                            <Input
                                type="number"
                                value={inputValue}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onBlur={handleInputBlur}
                                min={product.minOrderQuantity}
                                max={product.maxOrderQuantity}
                                className="text-center text-xl font-bold border-2 border-gray-300 focus:border-brand-orange rounded-xl py-3"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <span className="text-sm text-gray-500">unités</span>
                            </div>
                        </div>

                        <Button
                            onClick={increaseQuantity}
                            disabled={!canIncrease}
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-brand-orange disabled:opacity-50"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Min: {product.minOrderQuantity}</span>
                        <span>Max: {product.maxOrderQuantity || 'Illimité'}</span>
                    </div>
                </div>

                {/* Résultat principal */}
                <motion.div
                    key={result.grandTotal}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-6 border-2 border-brand-orange/20"
                >
                    <div className="text-center mb-4">
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                            <span className="text-3xl font-bold text-brand-red font-poppins">
                                {formatPrice(result.grandTotal)}
                            </span>
                            <span className="text-lg text-gray-600">total</span>
                        </div>
                        <div className="text-lg text-gray-700 font-medium">
                            {formatPrice(result.unitPrice)} × {quantity} unités
                        </div>
                    </div>

                    {/* Économies */}
                    {result.savings > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4"
                        >
                            <div className="flex items-center gap-2 text-green-700 mb-2">
                                <TrendingDown className="h-4 w-4" />
                                <span className="font-semibold">Vous économisez !</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-green-600 font-medium">
                                        {formatPrice(result.savings)}
                                    </p>
                                    <p className="text-green-500 text-xs">d'économie totale</p>
                                </div>
                                <div>
                                    <p className="text-green-600 font-medium">
                                        -{result.savingsPercentage.toFixed(1)}%
                                    </p>
                                    <p className="text-green-500 text-xs">de réduction</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Palier appliqué */}
                    {result.applicableTier && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                            <div className="flex items-center gap-2 text-blue-700 text-sm">
                                <Package className="h-4 w-4" />
                                <span className="font-medium">
                                    Palier appliqué: {result.applicableTier.minQuantity}
                                    {result.applicableTier.maxQuantity && ` - ${result.applicableTier.maxQuantity}`} unités
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Détail des coûts */}
                    <div className="space-y-2">
                        <Button
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            variant="ghost"
                            className="w-full text-gray-600 hover:text-brand-orange"
                            size="sm"
                        >
                            {showBreakdown ? 'Masquer' : 'Afficher'} le détail des coûts
                        </Button>

                        <AnimatePresence>
                            {showBreakdown && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Produits ({quantity}×):</span>
                                            <span className="font-medium">{formatPrice(result.breakdown.products)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Expédition:</span>
                                            <span className="font-medium">{formatPrice(result.breakdown.shipping)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Service:</span>
                                            <span className="font-medium">{formatPrice(result.breakdown.service)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Douane:</span>
                                            <span className="font-medium">{formatPrice(result.breakdown.customs)}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-semibold text-brand-dark">
                                            <span>Total TTC:</span>
                                            <span>{formatPrice(result.grandTotal)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Prochains paliers */}
                {nextTierSavings && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-orange-50 border border-orange-200 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-2 text-orange-700 mb-3">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-semibold">Économisez encore plus !</span>
                        </div>
                        <div className="text-sm text-orange-600">
                            <p className="mb-2">
                                Commandez <strong>{nextTierSavings.quantityNeeded} unités de plus</strong> pour atteindre le palier
                                <strong> {nextTierSavings.tier.minQuantity} unités</strong>
                            </p>
                            <div className="flex justify-between items-center">
                                <span>Économie supplémentaire:</span>
                                <Badge className="bg-orange-500 text-white">
                                    +{formatPrice(nextTierSavings.totalSavings)}
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={() => setQuantity(nextTierSavings.tier.minQuantity)}
                            variant="outline"
                            size="sm"
                            className="w-full mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                            Passer à {nextTierSavings.tier.minQuantity} unités
                        </Button>
                    </motion.div>
                )}

                {/* Tous les paliers disponibles */}
                {product.pricing.tiers && product.pricing.tiers.length > 1 && (
                    <div>
                        <h4 className="font-medium text-gray-700 mb-3 text-sm">
                            Tous les paliers de prix
                        </h4>
                        <div className="grid gap-2">
                            {product.pricing.tiers.map((tier, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setQuantity(tier.minQuantity)}
                                    className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${result.applicableTier === tier
                                            ? 'border-brand-orange bg-brand-orange/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {tier.minQuantity}
                                                {tier.maxQuantity && ` - ${tier.maxQuantity}`} unités
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {formatPrice(tier.unitPrice)}/unité
                                            </p>
                                        </div>
                                        {tier.savingsPercentage && tier.savingsPercentage > 0 && (
                                            <Badge className="bg-green-500 text-white">
                                                -{tier.savingsPercentage.toFixed(1)}%
                                            </Badge>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button
                        onClick={reset}
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-600 hover:border-brand-orange"
                    >
                        Réinitialiser
                    </Button>

                    {onOrderWithQuantity && (
                        <Button
                            onClick={() => onOrderWithQuantity(quantity)}
                            className="flex-1 bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Commander {quantity} unités
                        </Button>
                    )}
                </div>

                {/* Informations supplémentaires */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <Truck className="h-5 w-5 text-brand-orange mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Livraison</p>
                        <p className="text-sm font-medium text-gray-900">{product.estimatedDelivery}</p>
                    </div>
                    <div className="text-center">
                        <Package className="h-5 w-5 text-brand-orange mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Stock disponible</p>
                        <p className="text-sm font-medium text-gray-900">
                            {product.stockQuantity || 'Disponible'} unités
                        </p>
                    </div>
                </div>

                {/* Note de bas */}
                <div className="text-xs text-gray-500 text-center bg-gray-100 rounded-lg p-3">
                    💡 <strong>Astuce:</strong> Plus vous commandez, plus vous économisez !
                    Les prix incluent tous les frais (expédition, service, douane).
                </div>
            </div>
        </div>
    );
};

export default ProductCalculator;