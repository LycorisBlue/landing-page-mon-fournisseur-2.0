// src/components/ProductForm.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Send, CheckCircle, Plus, Trash2, Link, Sparkles, Shield, Clock } from "lucide-react";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductForm = ({ isOpen, onClose }: ProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    whatsapp: "",
    productLinks: [""],
    description: "",
    urgency: "normal",
    budget: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: "Contact", description: "Vos informations" },
    { number: 2, title: "Produits", description: "Liens et détails" },
    { number: 3, title: "Finalisation", description: "Derniers détails" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ whatsapp: "", productLinks: [""], description: "", urgency: "normal", budget: "" });
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  const addLinkField = () => {
    setFormData({
      ...formData,
      productLinks: [...formData.productLinks, ""]
    });
  };

  const removeLinkField = (index: number) => {
    if (formData.productLinks.length > 1) {
      const newLinks = formData.productLinks.filter((_, i) => i !== index);
      setFormData({ ...formData, productLinks: newLinks });
    }
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...formData.productLinks];
    newLinks[index] = value;
    setFormData({ ...formData, productLinks: newLinks });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.whatsapp.length >= 10;
      case 2:
        return formData.productLinks[0].length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-brand-red to-brand-orange p-6 relative overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 flex justify-between items-center">
            <div>
              {!isSubmitted ? (
                <>
                  <h2 className="font-poppins font-bold text-2xl md:text-3xl text-white mb-2">
                    Envoyer un lien produit
                  </h2>
                  <p className="text-white/90 font-inter">
                    Étape {currentStep} sur 3 - {steps[currentStep - 1].description}
                  </p>
                </>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-white mr-3" />
                  <div>
                    <h2 className="font-poppins font-bold text-2xl md:text-3xl text-white">
                      Demande envoyée !
                    </h2>
                    <p className="text-white/90 font-inter">
                      Nous vous recontacterons rapidement
                    </p>
                  </div>
                </div>
              )}
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-3 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Barre de progression */}
          {!isSubmitted && (
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${currentStep >= step.number
                        ? 'bg-white text-brand-red'
                        : 'bg-white/30 text-white'
                      }`}>
                      {step.number}
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <div className="text-white font-medium text-sm">{step.title}</div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-1 w-12 mx-3 rounded-full transition-all duration-300 ${currentStep > step.number ? 'bg-white' : 'bg-white/30'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Étape 1 : Contact */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-brand-red to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📱</span>
                      </div>
                      <h3 className="font-poppins font-bold text-2xl text-brand-dark mb-2">
                        Vos informations de contact
                      </h3>
                      <p className="text-gray-600 font-inter">
                        Pour vous tenir informé de votre commande
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="whatsapp" className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                          Numéro WhatsApp *
                        </Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          placeholder="+225 XX XX XX XX XX"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="font-inter border-2 border-gray-200 focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300"
                          required
                        />
                        <p className="text-sm text-gray-500 mt-2 font-inter">
                          Nous utiliserons WhatsApp pour vous envoyer les mises à jour
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start">
                          <Shield className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-inter text-blue-800 font-medium mb-1">
                              Vos données sont protégées
                            </p>
                            <p className="font-inter text-blue-700 text-sm">
                              Nous ne partagerons jamais vos informations avec des tiers
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Étape 2 : Produits */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-brand-red to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Link className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-poppins font-bold text-2xl text-brand-dark mb-2">
                        Liens de vos produits
                      </h3>
                      <p className="text-gray-600 font-inter">
                        Ajoutez les liens depuis 1688, Alibaba, Taobao...
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                        Liens produits *
                      </Label>

                      {formData.productLinks.map((link, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 items-start"
                        >
                          <div className="flex-1">
                            <Input
                              placeholder={`https://item.taobao.com/... (Lien ${index + 1})`}
                              value={link}
                              onChange={(e) => updateLink(index, e.target.value)}
                              className="font-inter border-2 border-gray-200 focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300"
                              required={index === 0}
                            />
                          </div>
                          {formData.productLinks.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeLinkField(index)}
                              variant="outline"
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50 p-3 rounded-xl"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          )}
                        </motion.div>
                      ))}

                      <Button
                        type="button"
                        onClick={addLinkField}
                        variant="outline"
                        className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 font-inter font-medium rounded-xl w-full py-3"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Ajouter un autre lien
                      </Button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {['taobao.com', '1688.com', 'alibaba.com'].map((site) => (
                          <div key={site} className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">🌐</div>
                            <p className="font-inter text-sm font-medium text-gray-700">{site}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Étape 3 : Finalisation */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-brand-red to-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-poppins font-bold text-2xl text-brand-dark mb-2">
                        Derniers détails
                      </h3>
                      <p className="text-gray-600 font-inter">
                        Aidez-nous à mieux comprendre votre besoin
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="description" className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                          Description ou précisions
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Quantités souhaitées, couleurs, tailles, budget approximatif, délai souhaité..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="min-h-[120px] font-inter border-2 border-gray-200 focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <Label className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                          Urgence de la commande
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { value: 'normal', label: 'Normal', desc: '15-30 jours', icon: '📅' },
                            { value: 'urgent', label: 'Urgent', desc: '10-20 jours', icon: '⚡' },
                            { value: 'express', label: 'Express', desc: '7-15 jours', icon: '🚀' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, urgency: option.value })}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.urgency === option.value
                                  ? 'border-brand-orange bg-brand-orange/10'
                                  : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <div className="font-inter font-medium text-brand-dark">{option.label}</div>
                              <div className="font-inter text-sm text-gray-600">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-inter text-green-800 font-medium mb-1">
                              Réponse rapide garantie
                            </p>
                            <p className="font-inter text-green-700 text-sm">
                              Notre équipe vous recontacte sous 2h avec un devis détaillé
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="font-poppins font-bold text-3xl text-brand-dark mb-4">
                Parfait ! Demande reçue
              </h3>
              <p className="font-inter text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Votre demande a été transmise à notre équipe. Vous recevrez un devis détaillé sur WhatsApp dans les 2 heures.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-2">📱</div>
                    <p className="font-inter text-sm font-medium text-gray-700">SMS de confirmation</p>
                    <p className="font-inter text-xs text-gray-500">Immédiat</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">💬</div>
                    <p className="font-inter text-sm font-medium text-gray-700">Devis WhatsApp</p>
                    <p className="font-inter text-xs text-gray-500">Sous 2h</p>
                  </div>
                  <div>
                    <div className="text-2xl mb-2">📞</div>
                    <p className="font-inter text-sm font-medium text-gray-700">Appel de suivi</p>
                    <p className="font-inter text-xs text-gray-500">24h</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold text-lg px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300"
              >
                Nouvelle demande
              </Button>
            </motion.div>
          )}
        </div>

        {/* Footer avec navigation */}
        {!isSubmitted && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="font-inter font-medium px-6 py-3 rounded-xl"
                  >
                    ← Étape précédente
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Étape suivante →
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold px-8 py-3 rounded-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductForm;