
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment fonctionne Mon Fournisseur 2.0 ?",
      answer: "Il vous suffit d'envoyer le lien du produit qui vous intéresse, nous nous occupons de tout : vérification, négociation, achat, expédition et dédouanement jusqu'à la livraison en Côte d'Ivoire."
    },
    {
      question: "Quels sites chinois acceptez-vous ?",
      answer: "Nous acceptons les liens de 1688, Alibaba, Taobao et d'autres plateformes chinoises populaires. Si vous avez un doute, n'hésitez pas à nous contacter."
    },
    {
      question: "Combien de temps prend la livraison ?",
      answer: "En moyenne, comptez 15 à 30 jours selon le type de produit et le mode d'expédition choisi. Nous vous tenons informé à chaque étape."
    },
    {
      question: "Comment effectuer le paiement ?",
      answer: "Nous acceptons les virements bancaires, Mobile Money et d'autres moyens de paiement locaux. Le paiement se fait après validation de votre commande."
    },
    {
      question: "Y a-t-il des frais cachés ?",
      answer: "Non, nous sommes transparents sur tous les coûts : prix du produit, frais de service, expédition et dédouanement. Vous connaissez le prix total avant de valider."
    },
    {
      question: "Que faire si le produit ne correspond pas ?",
      answer: "Nous vérifions chaque produit avant expédition. En cas de problème, nous proposons un échange ou un remboursement selon nos conditions générales."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6">
            Questions Fréquentes
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => toggleFAQ(index)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="font-poppins font-semibold text-lg text-brand-dark pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-6 w-6 text-brand-orange flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-brand-orange flex-shrink-0" />
                  )}
                </div>
                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="font-inter text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
