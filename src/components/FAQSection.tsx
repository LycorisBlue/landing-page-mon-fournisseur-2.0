// src/components/FAQSection.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: 1,
      category: "Général",
      question: "Comment fonctionne Mon Fournisseur 2.0 ?",
      answer: "Il vous suffit d'envoyer le lien du produit qui vous intéresse, nous nous occupons de tout : vérification, négociation, achat, expédition et dédouanement jusqu'à la livraison en Côte d'Ivoire.",
      tags: ["fonctionnement", "processus", "service"]
    },
    {
      id: 2,
      category: "Produits",
      question: "Quels sites chinois acceptez-vous ?",
      answer: "Nous acceptons les liens de 1688, Alibaba, Taobao et d'autres plateformes chinoises populaires comme DHgate et Made-in-China. Si vous avez un doute sur un site spécifique, n'hésitez pas à nous contacter.",
      tags: ["sites", "plateformes", "1688", "alibaba", "taobao"]
    },
    {
      id: 3,
      category: "Livraison",
      question: "Combien de temps prend la livraison ?",
      answer: "En moyenne, comptez 15 à 30 jours selon le type de produit et le mode d'expédition choisi. Les produits électroniques peuvent prendre un peu plus de temps en raison des contrôles douaniers. Nous vous tenons informé à chaque étape avec un suivi en temps réel.",
      tags: ["délai", "livraison", "transport", "douane"]
    },
    {
      id: 4,
      category: "Paiement",
      question: "Comment effectuer le paiement ?",
      answer: "Nous acceptons plusieurs moyens de paiement adaptés au marché ivoirien : Mobile Money (Orange Money, Moov Money), virements bancaires, et paiements en espèces dans nos points de collecte à Abidjan. Le paiement se fait après validation de votre commande.",
      tags: ["paiement", "mobile money", "virement", "orange money"]
    },
    {
      id: 5,
      category: "Tarification",
      question: "Y a-t-il des frais cachés ?",
      answer: "Absolument pas ! Nous sommes totalement transparents sur tous les coûts : prix du produit, frais de service (10-15%), expédition, dédouanement et TVA. Vous recevez un devis détaillé avant de valider votre commande. Aucune surprise !",
      tags: ["frais", "transparent", "coût", "prix"]
    },
    {
      id: 6,
      category: "Garantie",
      question: "Que faire si le produit ne correspond pas ?",
      answer: "Nous vérifions chaque produit avant expédition avec photos et vidéos. En cas de non-conformité ou de défaut, nous proposons un échange, un remboursement partiel ou total selon notre politique de garantie client de 30 jours.",
      tags: ["garantie", "retour", "échange", "défaut"]
    },
    {
      id: 7,
      category: "Livraison",
      question: "Livrez-vous dans toute la Côte d'Ivoire ?",
      answer: "Oui ! Nous livrons dans toutes les régions de Côte d'Ivoire. Abidjan et ses communes (livraison gratuite), Bouaké, Yamoussoukro, San-Pédro, Korhogo et toutes les autres villes. Les frais varient selon la distance.",
      tags: ["livraison", "abidjan", "bouaké", "régions", "côte d'ivoire"]
    },
    {
      id: 8,
      category: "Général",
      question: "Puis-je suivre ma commande ?",
      answer: "Bien sûr ! Dès validation de votre commande, vous recevez un numéro de suivi unique. Vous pouvez suivre votre colis depuis la Chine jusqu'à votre porte via notre plateforme web et par SMS automatiques.",
      tags: ["suivi", "tracking", "commande", "sms"]
    }
  ];

  const categories = ["Tous", ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "Tous" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-brand-red to-brand-orange text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Besoin d'aide ?
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6">
            Questions Fréquentes
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher dans les questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-brand-orange rounded-xl font-inter"
            />
          </div>
        </motion.div>

        {/* Filtres par catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${selectedCategory === category
                ? 'bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Statistiques rapides - Alignées avec le reste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "❓", number: "8", label: "Questions fréquentes" },
              { icon: "⚡", number: "< 2h", label: "Réponse moyenne" },
              { icon: "💬", number: "24/7", label: "Support WhatsApp" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-poppins font-bold text-2xl text-brand-dark mb-1">{stat.number}</div>
                <div className="font-inter text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Liste des FAQ */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-4"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <motion.div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleFAQ(faq.id)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Badge catégorie */}
                        <span className={`inline-block text-white text-xs font-medium px-3 py-1 rounded-full mb-3 bg-gradient-to-r from-orange-400 to-orange-600`}>
                          {faq.category}
                        </span>

                        {/* Question */}
                        <h3 className="font-poppins font-semibold text-lg md:text-xl text-brand-dark mb-2 leading-relaxed">
                          {faq.question}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Chevron animé */}
                      <motion.div
                        animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <ChevronDown className="h-6 w-6 text-brand-orange" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Réponse animée */}
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                            <p className="font-inter text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>

                            {/* Action utile */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Cette réponse vous a-t-elle aidé ?</span>
                                <div className="flex space-x-2">
                                  <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors">
                                    👍
                                  </button>
                                  <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                    👎
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Message si aucun résultat */}
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="font-poppins font-bold text-xl text-gray-700 mb-2">
                Aucune question trouvée
              </h3>
              <p className="font-inter text-gray-500 mb-6">
                Essayez avec d'autres mots-clés ou parcourez toutes les catégories
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tous");
                }}
                className="bg-gradient-to-r from-brand-red to-brand-orange text-white px-6 py-3 rounded-xl font-inter font-medium hover:shadow-lg transition-all duration-300"
              >
                Voir toutes les questions
              </button>
            </motion.div>
          )}
        </div>

        {/* Section contact pour questions non répondues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-brand-red to-brand-orange rounded-3xl p-8 text-center text-white"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-poppins font-bold text-2xl mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="font-inter text-white/90 mb-6 text-lg">
              Notre équipe est disponible 24/7 pour répondre à toutes vos questions spécifiques
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+225XXXXXXXXXX"
                className="bg-white text-brand-red px-6 py-3 rounded-xl font-inter font-medium hover:shadow-lg transition-all duration-300"
              >
                💬 WhatsApp
              </a>
              <a
                href="tel:+225XXXXXXXXXX"
                className="bg-white/10 text-white border border-white/30 px-6 py-3 rounded-xl font-inter font-medium hover:bg-white/20 transition-all duration-300"
              >
                📞 Appeler
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;