
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onFormToggle: () => void;
}

const Hero = ({ onFormToggle }: HeroProps) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-red via-brand-orange to-brand-orange-light flex items-center justify-center px-4 py-20">
      {/* Background Pattern avec animations flottantes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white rounded-full animate-float-medium"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-white rounded-full animate-float-fast"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full animate-float-slow"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        {/* Logo placeholder */}
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-white text-2xl mb-2">
            Mon Fournisseur 2.0
          </h1>
          <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
        </div>

        {/* Main Title */}
        <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
          Commandez en toute simplicité
          <span className="block text-brand-orange-light">
            depuis la Chine
          </span>
          <span className="block text-white">
            jusqu'en Côte d'Ivoire
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Mon Fournisseur 2.0 vous accompagne à chaque étape : 
          de la recherche au dédouanement
        </p>

        {/* CTA Button */}
        <Button
          onClick={onFormToggle}
          size="lg"
          className="bg-white text-brand-red hover:bg-gray-100 font-poppins font-semibold text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Envoyer un lien produit
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
