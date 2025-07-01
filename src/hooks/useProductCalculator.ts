import { useState, useCallback, useMemo } from "react";
import {
  FeaturedProduct,
  CalculatorResult,
  PricingTier,
} from "@/types/product";

interface UseProductCalculatorProps {
  product: FeaturedProduct;
  initialQuantity?: number;
}

export const useProductCalculator = ({
  product,
  initialQuantity = 1,
}: UseProductCalculatorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [step, setStep] = useState(1);

  // Trouve le palier de prix applicable pour la quantité donnée
  const getApplicableTier = useCallback(
    (qty: number): PricingTier | undefined => {
      if (!product.pricing.tiers) return undefined;

      return product.pricing.tiers.find(
        (tier) =>
          qty >= tier.minQuantity &&
          (!tier.maxQuantity || qty <= tier.maxQuantity)
      );
    },
    [product.pricing.tiers]
  );

  // Calcul du résultat basé sur la quantité actuelle
  const result: CalculatorResult = useMemo(() => {
    const applicableTier = getApplicableTier(quantity);
    const unitPrice = applicableTier
      ? applicableTier.unitPrice
      : product.pricing.totalPrice;

    // Calcul des totaux
    const totalPrice = unitPrice * quantity;
    const shippingTotal = product.pricing.shippingCost * quantity;
    const serviceTotal = product.pricing.serviceFee * quantity;
    const customsTotal = product.pricing.customsFees * quantity;

    // Prix de base sans réduction
    const baseTotal = product.pricing.totalPrice * quantity;
    const savings = baseTotal - totalPrice;
    const savingsPercentage = baseTotal > 0 ? (savings / baseTotal) * 100 : 0;

    const grandTotal = totalPrice;

    return {
      quantity,
      unitPrice,
      totalPrice,
      shippingTotal,
      serviceTotal,
      customsTotal,
      grandTotal,
      savings: Math.max(0, savings),
      savingsPercentage: Math.max(0, savingsPercentage),
      applicableTier,
      breakdown: {
        products: product.pricing.basePriceFCFA * quantity,
        shipping: shippingTotal,
        service: serviceTotal,
        customs: customsTotal,
      },
    };
  }, [quantity, product, getApplicableTier]);

  // Fonctions de contrôle de la quantité
  const increaseQuantity = useCallback(() => {
    setQuantity((prev) => {
      const newQty = prev + step;
      const maxQty = product.maxOrderQuantity || 1000;
      return Math.min(newQty, maxQty);
    });
  }, [step, product.maxOrderQuantity]);

  const decreaseQuantity = useCallback(() => {
    setQuantity((prev) => {
      const newQty = prev - step;
      return Math.max(newQty, product.minOrderQuantity);
    });
  }, [step, product.minOrderQuantity]);

  const setQuantityDirectly = useCallback(
    (value: number) => {
      const minQty = product.minOrderQuantity;
      const maxQty = product.maxOrderQuantity || 1000;
      const clampedValue = Math.max(minQty, Math.min(value, maxQty));
      setQuantity(clampedValue);
    },
    [product.minOrderQuantity, product.maxOrderQuantity]
  );

  // Fonction pour changer le pas
  const setStepValue = useCallback((newStep: number) => {
    setStep(newStep);
  }, []);

  // Reset à la quantité initiale
  const reset = useCallback(() => {
    setQuantity(initialQuantity);
    setStep(1);
  }, [initialQuantity]);

  // Vérification des limites
  const canIncrease = quantity + step <= (product.maxOrderQuantity || 1000);
  const canDecrease = quantity - step >= product.minOrderQuantity;

  // Prochains paliers disponibles
  const nextTiers = useMemo(() => {
    if (!product.pricing.tiers) return [];

    return product.pricing.tiers
      .filter((tier) => tier.minQuantity > quantity)
      .slice(0, 3); // Prendre les 3 prochains paliers
  }, [product.pricing.tiers, quantity]);

  // Économies potentielles si on atteint le prochain palier
  const nextTierSavings = useMemo(() => {
    const nextTier = nextTiers[0];
    if (!nextTier) return null;

    const currentTotal = result.grandTotal;
    const nextTierTotal = nextTier.unitPrice * nextTier.minQuantity;
    const potentialSavings =
      product.pricing.totalPrice * nextTier.minQuantity - nextTierTotal;

    return {
      tier: nextTier,
      quantityNeeded: nextTier.minQuantity - quantity,
      totalSavings: potentialSavings,
      savingsPerUnit: potentialSavings / nextTier.minQuantity,
    };
  }, [nextTiers, result.grandTotal, quantity, product.pricing.totalPrice]);

  return {
    // États
    quantity,
    step,
    result,

    // Actions
    increaseQuantity,
    decreaseQuantity,
    setQuantity: setQuantityDirectly,
    setStep: setStepValue,
    reset,

    // États dérivés
    canIncrease,
    canDecrease,
    nextTiers,
    nextTierSavings,

    // Utilitaires
    getApplicableTier,
    formatPrice: (price: number) =>
      new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price),
  };
};

export default useProductCalculator;
