import {
  FeaturedProduct,
  ProductCategory,
} from "@/types/product";

// Données mock pour les produits phares
export const featuredProducts: FeaturedProduct[] = [
  {
    id: "fp-001",
    name: "iPhone 15 Pro Max 256GB",
    shortDescription:
      "Dernier iPhone avec puce A17 Pro, système de caméra avancé et design en titane.",
    description:
      "Le iPhone 15 Pro Max redéfinit ce que peut faire un smartphone. Avec sa puce A17 Pro révolutionnaire, son système de caméra professionnel et son design en titane de qualité aérospatiale, il offre des performances exceptionnelles. Écran Super Retina XDR de 6,7 pouces, USB-C et Action Button personnalisable.",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400",
    ],
    category: ProductCategory.ELECTRONICS,
    tags: ["smartphone", "apple", "premium", "populaire"],
    pricing: {
      basePrice: 8999, // Yuan
      basePriceFCFA: 764915, // 8999 * 85
      shippingCost: 25000,
      serviceFee: 78000,
      customsFees: 45000,
      totalPrice: 912915,
      currency: "FCFA",
      exchangeRate: 85,
      tiers: [
        {
          minQuantity: 1,
          maxQuantity: 4,
          unitPrice: 912915,
          totalPrice: 912915,
          savings: 0,
          savingsPercentage: 0,
        },
        {
          minQuantity: 5,
          maxQuantity: 9,
          unitPrice: 875000,
          totalPrice: 875000,
          savings: 37915,
          savingsPercentage: 4.2,
        },
        {
          minQuantity: 10,
          maxQuantity: 19,
          unitPrice: 850000,
          totalPrice: 850000,
          savings: 62915,
          savingsPercentage: 6.9,
        },
        {
          minQuantity: 20,
          unitPrice: 820000,
          totalPrice: 820000,
          savings: 92915,
          savingsPercentage: 10.2,
        },
      ],
    },
    buyers: [
      {
        id: "b1",
        name: "Kouame Jean",
        location: "Abidjan",
        purchaseDate: "2024-01-15",
        quantity: 2,
        isVerified: true,
      },
      {
        id: "b2",
        name: "Fatou Diallo",
        location: "Bouaké",
        purchaseDate: "2024-01-10",
        quantity: 1,
        isVerified: true,
      },
      {
        id: "b3",
        name: "Ibrahim T.",
        location: "Yamoussoukro",
        purchaseDate: "2024-01-08",
        quantity: 5,
        isVerified: true,
      },
    ],
    specifications: [
      {
        name: "Écran",
        value: "6,7 pouces Super Retina XDR",
        category: "dimension",
      },
      { name: "Processeur", value: "Puce A17 Pro", category: "performance" },
      { name: "Stockage", value: "256 GB", category: "performance" },
      {
        name: "Caméra",
        value: "48 MP + 12 MP + 12 MP",
        category: "performance",
      },
      { name: "Poids", value: "221 g", category: "weight" },
      {
        name: "Matériau",
        value: "Titane de qualité aérospatiale",
        category: "material",
      },
      { name: "Connecteur", value: "USB-C", category: "other" },
      { name: "Résistance", value: "IP68", category: "other" },
    ],
    inStock: true,
    stockQuantity: 45,
    minOrderQuantity: 1,
    maxOrderQuantity: 50,
    estimatedDelivery: "18-25 jours",
    weight: 0.221,
    dimensions: {
      length: 15.9,
      width: 7.6,
      height: 0.83,
      unit: "cm",
    },
    isPopular: true,
    isTrending: true,
    originalUrl: "https://detail.1688.com/offer/example-iphone",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "fp-002",
    name: 'MacBook Air M2 13" 256GB',
    shortDescription:
      "Ultrabook Apple avec puce M2, design ultra-fin et autonomie exceptionnelle.",
    description:
      "Le MacBook Air M2 combine puissance et portabilité dans un design iconique. Avec la puce M2 Apple Silicon, un écran Liquid Retina de 13,6 pouces et jusqu'à 18 heures d'autonomie, il est parfait pour le travail, les études et la créativité. Design ultra-fin de seulement 1,13 cm d'épaisseur.",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    ],
    category: ProductCategory.ELECTRONICS,
    tags: ["laptop", "apple", "portable", "étudiant"],
    pricing: {
      basePrice: 7999, // Yuan
      basePriceFCFA: 679915,
      shippingCost: 35000,
      serviceFee: 70000,
      customsFees: 40000,
      totalPrice: 824915,
      currency: "FCFA",
      exchangeRate: 85,
      tiers: [
        {
          minQuantity: 1,
          maxQuantity: 2,
          unitPrice: 824915,
          totalPrice: 824915,
          savings: 0,
          savingsPercentage: 0,
        },
        {
          minQuantity: 3,
          maxQuantity: 5,
          unitPrice: 795000,
          totalPrice: 795000,
          savings: 29915,
          savingsPercentage: 3.6,
        },
        {
          minQuantity: 6,
          maxQuantity: 10,
          unitPrice: 770000,
          totalPrice: 770000,
          savings: 54915,
          savingsPercentage: 6.7,
        },
        {
          minQuantity: 11,
          unitPrice: 745000,
          totalPrice: 745000,
          savings: 79915,
          savingsPercentage: 9.7,
        },
      ],
    },
    buyers: [
      {
        id: "b4",
        name: "Aminata Koné",
        location: "Abidjan",
        purchaseDate: "2024-01-12",
        quantity: 1,
        isVerified: true,
      },
      {
        id: "b5",
        name: "Yves Kouassi",
        location: "San-Pédro",
        purchaseDate: "2024-01-05",
        quantity: 3,
        isVerified: true,
      },
    ],
    specifications: [
      {
        name: "Écran",
        value: "13,6 pouces Liquid Retina",
        category: "dimension",
      },
      { name: "Processeur", value: "Puce M2 8 cœurs", category: "performance" },
      { name: "Mémoire", value: "8 GB RAM unifiée", category: "performance" },
      { name: "Stockage", value: "256 GB SSD", category: "performance" },
      {
        name: "Autonomie",
        value: "Jusqu'à 18 heures",
        category: "performance",
      },
      { name: "Poids", value: "1,24 kg", category: "weight" },
      { name: "Épaisseur", value: "1,13 cm", category: "dimension" },
      { name: "Ports", value: "2x Thunderbolt, MagSafe 3", category: "other" },
    ],
    inStock: true,
    stockQuantity: 28,
    minOrderQuantity: 1,
    maxOrderQuantity: 25,
    estimatedDelivery: "20-28 jours",
    weight: 1.24,
    dimensions: {
      length: 30.41,
      width: 21.5,
      height: 1.13,
      unit: "cm",
    },
    isPopular: true,
    isTrending: false,
    originalUrl: "https://detail.1688.com/offer/example-macbook",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "fp-003",
    name: "Samsung Galaxy S24 Ultra 512GB",
    shortDescription:
      "Smartphone premium avec S Pen intégré, zoom 100x et intelligence artificielle.",
    description:
      "Le Samsung Galaxy S24 Ultra est le smartphone Android le plus avancé. Équipé d'un écran Dynamic AMOLED 2X de 6,8 pouces, du processeur Snapdragon 8 Gen 3, d'un système de caméra révolutionnaire avec zoom spatial 100x et du S Pen intégré pour une productivité maximale.",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400",
    ],
    category: ProductCategory.ELECTRONICS,
    tags: ["smartphone", "samsung", "premium", "s-pen"],
    pricing: {
      basePrice: 8499, // Yuan
      basePriceFCFA: 722415,
      shippingCost: 25000,
      serviceFee: 75000,
      customsFees: 43000,
      totalPrice: 865415,
      currency: "FCFA",
      exchangeRate: 85,
      tiers: [
        {
          minQuantity: 1,
          maxQuantity: 3,
          unitPrice: 865415,
          totalPrice: 865415,
          savings: 0,
          savingsPercentage: 0,
        },
        {
          minQuantity: 4,
          maxQuantity: 8,
          unitPrice: 835000,
          totalPrice: 835000,
          savings: 30415,
          savingsPercentage: 3.5,
        },
        {
          minQuantity: 9,
          maxQuantity: 15,
          unitPrice: 810000,
          totalPrice: 810000,
          savings: 55415,
          savingsPercentage: 6.4,
        },
        {
          minQuantity: 16,
          unitPrice: 785000,
          totalPrice: 785000,
          savings: 80415,
          savingsPercentage: 9.3,
        },
      ],
    },
    buyers: [
      {
        id: "b6",
        name: "Michel Bamba",
        location: "Korhogo",
        purchaseDate: "2024-01-14",
        quantity: 2,
        isVerified: true,
      },
      {
        id: "b7",
        name: "Adjoua Prisca",
        location: "Abidjan",
        purchaseDate: "2024-01-09",
        quantity: 1,
        isVerified: true,
      },
    ],
    specifications: [
      { name: "Écran", value: '6,8" Dynamic AMOLED 2X', category: "dimension" },
      {
        name: "Processeur",
        value: "Snapdragon 8 Gen 3",
        category: "performance",
      },
      { name: "Stockage", value: "512 GB", category: "performance" },
      { name: "RAM", value: "12 GB", category: "performance" },
      { name: "Caméra principale", value: "200 MP", category: "performance" },
      { name: "Zoom", value: "Jusqu'à 100x", category: "performance" },
      { name: "S Pen", value: "Intégré", category: "other" },
      { name: "Batterie", value: "5000 mAh", category: "performance" },
    ],
    inStock: true,
    stockQuantity: 22,
    minOrderQuantity: 1,
    maxOrderQuantity: 30,
    estimatedDelivery: "16-24 jours",
    weight: 0.233,
    dimensions: {
      length: 16.2,
      width: 7.9,
      height: 0.86,
      unit: "cm",
    },
    isPopular: true,
    isTrending: true,
    originalUrl: "https://detail.1688.com/offer/example-galaxy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
  },
];

// Configuration par défaut du carousel
export const defaultCarouselConfig = {
  slidesToShow: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  autoplay: true,
  autoplayDelay: 5000,
  loop: true,
  dragFree: false,
};

// Fonctions utilitaires pour les données
export const getProductById = (id: string): FeaturedProduct | undefined => {
  return featuredProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (
  category: ProductCategory
): FeaturedProduct[] => {
  return featuredProducts.filter((product) => product.category === category);
};

export const getPopularProducts = (): FeaturedProduct[] => {
  return featuredProducts.filter((product) => product.isPopular);
};

export const getTrendingProducts = (): FeaturedProduct[] => {
  return featuredProducts.filter((product) => product.isTrending);
};

export const formatPrice = (
  price: number,
  currency: string = "FCFA"
): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency === "FCFA" ? "XOF" : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateSavings = (
  originalPrice: number,
  discountedPrice: number
) => {
  const savings = originalPrice - discountedPrice;
  const percentage = (savings / originalPrice) * 100;
  return {
    amount: savings,
    percentage: Math.round(percentage * 10) / 10,
  };
};
