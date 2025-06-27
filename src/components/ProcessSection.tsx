// src/components/ProcessSection.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { CheckCircle } from "lucide-react";

// Types pour TypeScript
interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Inscription",
    description: "Créez votre compte en quelques minutes et accédez à notre plateforme sécurisée. Un processus simple et rapide pour commencer votre expérience d'achat en toute confiance.",
    icon: "👤",
    color: "from-brand-red to-brand-orange"
  },
  {
    number: 2,
    title: "Soumission du lien",
    description: "Envoyez-nous le lien de votre produit depuis 1688, Alibaba ou Taobao. Notre équipe analyse immédiatement votre demande pour vous proposer la meilleure solution.",
    icon: "🔗",
    color: "from-brand-orange to-brand-orange-light"
  },
  {
    number: 3,
    title: "Vérification",
    description: "Nous vérifions la disponibilité, la qualité et négocions le meilleur prix avec nos partenaires locaux en Chine pour vous garantir un achat optimal.",
    icon: "🔍",
    color: "from-blue-400 to-blue-600"
  },
  {
    number: 4,
    title: "Paiement",
    description: "Paiement sécurisé via Mobile Money, virement bancaire ou autres moyens locaux. Plusieurs options adaptées au marché ivoirien pour votre confort.",
    icon: "💳",
    color: "from-green-400 to-green-600"
  },
  {
    number: 5,
    title: "Achat",
    description: "Nous achetons votre produit directement en Chine avec notre expertise locale et notre réseau de fournisseurs de confiance établi depuis des années.",
    icon: "🛒",
    color: "from-purple-400 to-purple-600"
  },
  {
    number: 6,
    title: "Expédition",
    description: "Envoi sécurisé et suivi en temps réel vers la Côte d'Ivoire. Vous recevez toutes les informations de tracking pour suivre votre colis à chaque étape.",
    icon: "🚢",
    color: "from-orange-400 to-orange-600"
  },
  {
    number: 7,
    title: "Livraison",
    description: "Réception rapide à domicile ou en point relais dans toute la Côte d'Ivoire. Notre réseau de livraison couvre l'ensemble du territoire national.",
    icon: "📦",
    color: "from-red-400 to-red-600"
  }
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Gestion de l'autoplay pour parcourir les étapes
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isInView && autoplay) {
      interval = setInterval(() => {
        setActiveStep(prev => prev < steps.length ? prev + 1 : 1);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isInView, autoplay]);

  // Animation lorsque la section entre dans la vue
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-brand-red to-brand-orange text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Processus simplifié
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6">
            Comment ça marche ?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un processus simple et transparent pour commander en toute sérénité
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-orange mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Navigation visuelle animée */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            {/* Barre de progression */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-red to-brand-orange"
                animate={{ width: `${(activeStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Points de navigation pour les étapes */}
            <div className="relative flex justify-between w-full max-w-5xl" style={{ width: '85vw', maxWidth: '900px' }}>
              {steps.map((step) => (
                <StepDot
                  key={step.number}
                  step={step}
                  isActive={activeStep === step.number}
                  onClick={() => {
                    setActiveStep(step.number);
                    setAutoplay(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contenu de l'étape active avec animation */}
        <div className="flex justify-center">
          <motion.div
            className="max-w-4xl w-full"
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Partie visuelle */}
                <div className={`md:w-2/5 bg-gradient-to-br ${steps[activeStep - 1].color} p-8 flex items-center justify-center`}>
                  <div className="text-center">
                    <motion.div
                      className="text-8xl mb-4 inline-block"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      {steps[activeStep - 1].icon}
                    </motion.div>
                    <div className="text-white text-xl font-poppins font-bold">
                      Étape {steps[activeStep - 1].number}
                    </div>
                  </div>
                </div>

                {/* Contenu détaillé */}
                <div className="md:w-3/5 p-8">
                  <h3 className="font-poppins font-bold text-3xl text-brand-dark mb-4">
                    {steps[activeStep - 1].title}
                  </h3>
                  <p className="font-inter text-gray-600 mb-6 text-lg leading-relaxed">
                    {steps[activeStep - 1].description}
                  </p>

                  <StepExample stepNumber={activeStep} />

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => {
                        setActiveStep(prev => prev > 1 ? prev - 1 : steps.length);
                        setAutoplay(false);
                      }}
                      className="flex items-center text-gray-500 hover:text-brand-orange transition-colors duration-300 font-inter font-medium"
                    >
                      <span className="mr-2">←</span> Précédent
                    </button>
                    <button
                      onClick={() => {
                        setActiveStep(prev => prev < steps.length ? prev + 1 : 1);
                        setAutoplay(false);
                      }}
                      className="flex items-center text-brand-orange font-medium hover:text-brand-red transition-colors duration-300 font-inter"
                    >
                      Suivant <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contrôle de lecture automatique */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setAutoplay(!autoplay)}
            className={`flex items-center text-sm font-inter transition-colors duration-300 ${autoplay ? 'text-brand-orange' : 'text-gray-500'}`}
          >
            {autoplay ? (
              <>
                <span className="mr-2">❚❚</span> Pause auto
              </>
            ) : (
              <>
                <span className="mr-2">▶</span> Lecture auto
              </>
            )}
          </button>
        </div>

        {/* Badge de confiance */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-inter font-medium">
            <CheckCircle className="h-5 w-5 mr-2" />
            Processus 100% transparent et sécurisé
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant pour les points de navigation des étapes
const StepDot = ({ step, isActive, onClick }: { step: Step; isActive: boolean; onClick: () => void }) => {
  return (
    <motion.button
      className="relative flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <motion.div
        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-poppins font-bold text-lg transition-all duration-300 ${isActive
            ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
            : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-brand-orange'
          }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {step.number}
      </motion.div>
      {isActive && (
        <motion.div
          className={`absolute top-0 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} blur-md -z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.5 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
      <div className={`absolute -bottom-8 whitespace-nowrap text-xs font-inter font-medium transition-colors duration-300 ${isActive ? 'text-brand-dark' : 'text-gray-500'
        }`}>
        {step.title}
      </div>
    </motion.button>
  );
};

// Exemples concrets pour chaque étape
const StepExample = ({ stepNumber }: { stepNumber: number }) => {
  switch (stepNumber) {
    case 1:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Inscription simple</div>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Nom, prénom, téléphone
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Adresse de livraison
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Confirmation par SMS
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Exemple de lien</div>
          <div className="flex items-center text-gray-600">
            <span className="bg-brand-orange/10 text-brand-orange rounded px-2 py-1 mr-2 text-xs font-medium">URL Taobao</span>
            <span className="truncate font-mono text-xs">https://item.taobao.com/item.htm?id=12345678</span>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Notre équipe vérifie</div>
          <div className="flex flex-col gap-2 text-gray-600">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Prix réel: 150 ¥ (18,000 FCFA)
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Vendeur: 4.8/5 (9,452 évaluations)
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Disponibilité confirmée
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Votre facture détaillée</div>
          <div className="space-y-1 text-gray-600">
            <div className="flex justify-between">
              <span>Prix produit:</span>
              <span>18,000 FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Frais d'expédition:</span>
              <span>12,500 FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Commission service:</span>
              <span>3,000 FCFA</span>
            </div>
            <div className="border-t border-gray-300 my-1"></div>
            <div className="flex justify-between font-semibold text-brand-dark">
              <span>Total:</span>
              <span>33,500 FCFA</span>
            </div>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Confirmation d'achat</div>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <span className="text-brand-orange mr-2">📱</span> SMS envoyé: "Votre produit a été acheté!"
            </div>
            <div className="flex items-center">
              <span className="text-brand-orange mr-2">🔢</span> N° de commande: MF2-29845
            </div>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Suivi d'expédition en temps réel</div>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between items-center">
              <span>📍 Guangzhou, Chine</span>
              <span className="text-green-500">✓</span>
            </div>
            <div className="flex justify-between items-center">
              <span>🚢 En transit maritime</span>
              <span className="text-yellow-500">●</span>
            </div>
            <div className="flex justify-between items-center">
              <span>🏠 Abidjan, Côte d'Ivoire</span>
              <span className="text-gray-400">...</span>
            </div>
          </div>
        </div>
      );
    case 7:
      return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
          <div className="font-inter font-medium text-gray-700 mb-2">Options de livraison</div>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center">
              <span className="text-brand-orange mr-2">🏠</span> Livraison à domicile: +2,000 FCFA
            </div>
            <div className="flex items-center">
              <span className="text-brand-orange mr-2">🏢</span> Point de retrait Abidjan: Gratuit
            </div>
            <div className="flex items-center">
              <span className="text-brand-orange mr-2">📦</span> Délai: 15-30 jours
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default ProcessSection;