// src/components/FloatingActionButton.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';

interface FloatingActionButtonProps {
    onFormToggle: () => void;
}

const FloatingActionButton = ({ onFormToggle }: FloatingActionButtonProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Obtenir la position du bouton principal dans le Hero
            const heroButton = document.querySelector('[data-hero-button]');

            if (heroButton) {
                const heroButtonRect = heroButton.getBoundingClientRect();
                const hasPassedButton = heroButtonRect.bottom < 0;
                setIsVisible(hasPassedButton);
            }

            // Afficher le bouton scroll to top après 300px de scroll
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility(); // Check initial state

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            {/* Bouton Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-white hover:bg-gray-50 text-gray-600 hover:text-brand-orange rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                        title="Retour en haut"
                    >
                        <ArrowUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Bouton principal de demande avec texte */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={onFormToggle}
                        className="relative bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 px-6 py-4 group overflow-hidden"
                        title="Envoyer un lien produit"
                    >
                        {/* Animation de pulsation */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-brand-red to-brand-orange rounded-full"
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.8, 0.4, 0.8]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Contenu du bouton */}
                        <div className="relative z-10 flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="font-poppins font-semibold text-sm whitespace-nowrap">
                                Envoyer un lien produit
                            </span>
                        </div>


                        {/* Badge notification */}
                        <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center text-xs font-bold"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            !
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActionButton;