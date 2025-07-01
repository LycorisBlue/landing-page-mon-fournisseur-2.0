
import { useState } from "react";
import Hero from "@/components/Hero";
import ProductForm from "@/components/ProductForm";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="min-h-screen font-inter">
      <Hero onFormToggle={toggleForm} />
      <ProcessSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <ProductForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Bouton flottant */}
      <FloatingActionButton onFormToggle={toggleForm} />

      {/* Footer amélioré */}
      <footer className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo et description */}
            <div className="md:col-span-2">
              <h3 className="font-poppins font-bold text-3xl mb-4 bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent">
                Mon Fournisseur 2.0
              </h3>
              <p className="font-inter text-white/80 mb-6 leading-relaxed">
                Votre partenaire de confiance pour commander facilement depuis la Chine vers la Côte d'Ivoire.
                Simplifiez vos importations avec notre accompagnement complet.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-orange rounded-full"></div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-poppins font-semibold text-xl mb-4 text-brand-orange">
                Nos Services
              </h4>
              <ul className="space-y-3 font-inter text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Recherche produits</li>
                <li className="hover:text-white transition-colors cursor-pointer">Négociation prix</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contrôle qualité</li>
                <li className="hover:text-white transition-colors cursor-pointer">Expédition</li>
                <li className="hover:text-white transition-colors cursor-pointer">Dédouanement</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-poppins font-semibold text-xl mb-4 text-brand-orange">
                Contact
              </h4>
              <div className="space-y-3 font-inter text-white/80">
                <p>📞 +225 XX XX XX XX XX</p>
                <p>📧 contact@monfournisseur2.com</p>
                <p>📍 Abidjan, Côte d'Ivoire</p>
                <p>🕒 Lun-Ven: 8h-18h</p>
              </div>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="font-inter text-white/60 mb-4 md:mb-0">
                © 2024 Mon Fournisseur 2.0. Tous droits réservés.
              </p>
              <div className="flex space-x-6 font-inter text-white/60">
                <a href="#" className="hover:text-white transition-colors">Conditions générales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
