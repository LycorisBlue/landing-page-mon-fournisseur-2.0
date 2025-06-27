
import { CheckCircle, User, Link, Shield, CreditCard, Package, Truck, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const ProcessSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const steps = [
    {
      icon: <User className="h-16 w-16" />,
      title: "Inscription",
      description: "Créez votre compte en quelques minutes et accédez à notre plateforme sécurisée. Un processus simple et rapide pour commencer votre expérience d'achat en toute confiance."
    },
    {
      icon: <Link className="h-16 w-16" />,
      title: "Soumission du lien",
      description: "Envoyez-nous le lien de votre produit depuis 1688, Alibaba ou Taobao. Notre équipe analyse immédiatement votre demande pour vous proposer la meilleure solution."
    },
    {
      icon: <Shield className="h-16 w-16" />,
      title: "Vérification",
      description: "Nous vérifions la disponibilité, la qualité et négocions le meilleur prix avec nos partenaires locaux en Chine pour vous garantir un achat optimal."
    },
    {
      icon: <CreditCard className="h-16 w-16" />,
      title: "Paiement",
      description: "Paiement sécurisé via Mobile Money, virement bancaire ou autres moyens locaux. Plusieurs options adaptées au marché ivoirien pour votre confort."
    },
    {
      icon: <Package className="h-16 w-16" />,
      title: "Achat",
      description: "Nous achetons votre produit directement en Chine avec notre expertise locale et notre réseau de fournisseurs de confiance établi depuis des années."
    },
    {
      icon: <Truck className="h-16 w-16" />,
      title: "Expédition",
      description: "Envoi sécurisé et suivi en temps réel vers la Côte d'Ivoire. Vous recevez toutes les informations de tracking pour suivre votre colis à chaque étape."
    },
    {
      icon: <Home className="h-16 w-16" />,
      title: "Livraison",
      description: "Réception rapide à domicile ou en point relais dans toute la Côte d'Ivoire. Notre réseau de livraison couvre l'ensemble du territoire national."
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6">
            Comment ça marche ?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un processus simple et transparent pour commander en toute sérénité
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-orange mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Carousel pour toutes les tailles d'écran */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative bg-white p-12 md:p-16 rounded-3xl shadow-2xl mx-4">
                    {/* Step number - plus grand et plus visible */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold rounded-full flex items-center justify-center text-xl shadow-lg">
                      {index + 1}
                    </div>

                    {/* Contenu centré avec plus d'espace */}
                    <div className="text-center pt-8">
                      {/* Icon plus grand */}
                      <div className="text-brand-orange mb-8 flex justify-center">
                        {step.icon}
                      </div>

                      {/* Titre plus prominent */}
                      <h3 className="font-poppins font-bold text-3xl md:text-4xl text-brand-dark mb-6">
                        {step.title}
                      </h3>

                      {/* Description plus lisible avec plus d'espace */}
                      <p className="font-inter text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Boutons de navigation plus visibles */}
            <CarouselPrevious className="left-4 md:left-8 w-12 h-12 bg-white shadow-lg border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300" />
            <CarouselNext className="right-4 md:right-8 w-12 h-12 bg-white shadow-lg border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300" />
          </Carousel>

          {/* Indicateurs de progression */}
          <div className="flex justify-center mt-8 space-x-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-brand-red to-brand-orange scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Instructions tactiles */}
          <div className="text-center mt-8">
            <p className="font-inter text-gray-500 text-sm">
              Glissez horizontalement ou utilisez les flèches pour naviguer
            </p>
          </div>
        </div>

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

export default ProcessSection;
