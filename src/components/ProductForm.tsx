// src/components/ProductForm.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Send, CheckCircle, Plus, Trash2, Link, Sparkles, Shield, Clock, ArrowLeft } from "lucide-react";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductLink {
  url: string;
  isValid: boolean;
}

interface FormErrors {
  whatsapp?: string;
  contactNumber?: string;
  productLinks?: string;
  description?: string;
  general?: string;
}

const ProductForm = ({ isOpen, onClose }: ProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  // États du formulaire adaptés de SubmitProduct
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [whatsappDisplay, setWhatsappDisplay] = useState<string>('');
  const [contactDisplay, setContactDisplay] = useState<string>('');
  const [useWhatsappAsContact, setUseWhatsappAsContact] = useState<boolean>(true);
  const [productLinks, setProductLinks] = useState<ProductLink[]>([{ url: '', isValid: true }]);
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<string>("normal");
  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string>('');

  const steps = [
    { number: 1, title: "Contact", description: "Vos informations" },
    { number: 2, title: "Produits", description: "Liens et détails" },
    { number: 3, title: "Finalisation", description: "Derniers détails" }
  ];

  // Fonction pour formater le numéro (ajouter +225 si nécessaire)
  const formatIvoryCoastNumber = (value: string): string => {
    const cleaned = value.replace(/[^\d+]/g, '');

    if (cleaned.startsWith('+225')) {
      return cleaned;
    }

    if (cleaned.startsWith('225')) {
      return '+' + cleaned;
    }

    if (cleaned.startsWith('0')) {
      return '+225' + cleaned.substring(1);
    }

    if (/^\d+$/.test(cleaned) && cleaned.length >= 8) {
      return '+225' + cleaned;
    }

    return cleaned;
  };

  // Validation du numéro ivoirien
  const validateIvoryCoastNumber = (number: string): boolean => {
    const pattern = /^\+225\d{8,10}$/;
    return pattern.test(number);
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Valider le numéro WhatsApp
    if (!whatsappDisplay.trim()) {
      newErrors.whatsapp = "Le numéro WhatsApp est obligatoire";
      isValid = false;
    } else {
      const formattedWhatsapp = formatIvoryCoastNumber(whatsappDisplay);
      if (!validateIvoryCoastNumber(formattedWhatsapp)) {
        newErrors.whatsapp = "Format du numéro WhatsApp invalide. Utilisez un numéro ivoirien valide (ex: 07 08 09 10 11)";
        isValid = false;
      }
    }

    // Valider le numéro de contact si différent du WhatsApp
    if (!useWhatsappAsContact) {
      if (!contactDisplay.trim()) {
        newErrors.contactNumber = "Le numéro de contact est obligatoire";
        isValid = false;
      } else {
        const formattedContact = formatIvoryCoastNumber(contactDisplay);
        if (!validateIvoryCoastNumber(formattedContact)) {
          newErrors.contactNumber = "Format du numéro de contact invalide. Utilisez un numéro ivoirien valide (ex: 07 08 09 10 11)";
          isValid = false;
        }
      }
    }

    // Vérifier qu'au moins un lien produit valide ou une description est fourni
    const validLinks = productLinks.filter(link => link.url.trim() !== '');

    if (validLinks.length === 0 && !description.trim()) {
      newErrors.general = "Veuillez fournir au moins un lien de produit ou une description";
      isValid = false;
    }

    // Vérifier le format des liens
    const hasInvalidLink = productLinks.some(
      link => link.url.trim() !== '' &&
        !link.url.match(/^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/)
    );

    if (hasInvalidLink) {
      newErrors.productLinks = "Au moins un des liens produits n'est pas valide";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Gestion des liens produits
  const handleProductLinkChange = (index: number, value: string) => {
    const updatedLinks = [...productLinks];
    updatedLinks[index] = {
      url: value,
      isValid: value === '' || !!value.match(/^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/)
    };
    setProductLinks(updatedLinks);
  };

  const addProductLink = () => {
    setProductLinks([...productLinks, { url: '', isValid: true }]);
  };

  const removeProductLink = (index: number) => {
    if (productLinks.length > 1) {
      const updatedLinks = [...productLinks];
      updatedLinks.splice(index, 1);
      setProductLinks(updatedLinks);
    }
  };

  // Gestion du changement de numéro WhatsApp
  const handleWhatsappChange = (value: string) => {
    setWhatsappDisplay(value);
    const formatted = formatIvoryCoastNumber(value);
    setWhatsappNumber(formatted);

    if (useWhatsappAsContact) {
      setContactDisplay(value);
      setContactNumber(formatted);
    }
  };

  // Gestion du changement de numéro de contact
  const handleContactNumberChange = (value: string) => {
    setContactDisplay(value);
    const formatted = formatIvoryCoastNumber(value);
    setContactNumber(formatted);
  };

  // Gestion du toggle "utiliser WhatsApp comme contact"
  const handleUseWhatsappAsContactChange = (checked: boolean) => {
    setUseWhatsappAsContact(checked);
    if (checked) {
      setContactDisplay(whatsappDisplay);
      setContactNumber(whatsappNumber);
    } else {
      setContactDisplay('');
      setContactNumber('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Préparation des données pour l'API (même structure que SubmitProduct)
      const payload = {
        whatsapp_number: formatIvoryCoastNumber(whatsappDisplay),
        contact_number: formatIvoryCoastNumber(useWhatsappAsContact ? whatsappDisplay : contactDisplay),
        product_links: productLinks
          .filter(link => link.url.trim() !== '')
          .map(link => link.url.trim()),
        description: description.trim() || undefined,
        urgency: urgency
      };

      // Appel à l'API
      const response = await fetch('https://china-test.api-medev.com/client/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue lors du traitement de votre demande');
      }

      // Succès
      setIsSubmitted(true);
      setRequestId(data.data.request_id);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setWhatsappNumber('');
    setContactNumber('');
    setWhatsappDisplay('');
    setContactDisplay('');
    setUseWhatsappAsContact(true);
    setProductLinks([{ url: '', isValid: true }]);
    setDescription('');
    setUrgency('normal');
    setErrors({});
    setIsSubmitted(false);
    setRequestId('');
    setCurrentStep(1);
    onClose();
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
        return whatsappDisplay.length >= 10;
      case 2:
        return productLinks[0].url.length > 0 || description.trim().length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/30 z-50 p-4 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="bg-white w-full max-w-2xl h-full max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-brand-red to-brand-orange p-6 relative overflow-hidden flex-shrink-0">
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
                  className="text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
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
            <div className="flex-1 p-6 overflow-y-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  {/* Erreur générale */}
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700"
                    >
                      <div className="flex items-center">
                        <X className="h-5 w-5 mr-2 text-red-500" />
                        {errors.general}
                      </div>
                    </motion.div>
                  )}

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
                          {/* Numéro WhatsApp */}
                          <div>
                            <Label htmlFor="whatsapp" className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                              Numéro WhatsApp *
                            </Label>
                            <Input
                              id="whatsapp"
                              type="tel"
                              placeholder="07 08 09 10 11"
                              value={whatsappDisplay}
                              onChange={(e) => handleWhatsappChange(e.target.value)}
                              className={`font-inter border-2 ${errors.whatsapp ? 'border-red-300' : 'border-gray-200'} focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300`}
                              required
                            />
                            {errors.whatsapp && (
                              <p className="text-sm text-red-600 mt-2">{errors.whatsapp}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-2 font-inter">
                              Nous utiliserons WhatsApp pour vous envoyer les mises à jour
                            </p>
                          </div>

                          {/* Option utiliser WhatsApp comme contact */}
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="useWhatsappAsContact"
                              checked={useWhatsappAsContact}
                              onChange={(e) => handleUseWhatsappAsContactChange(e.target.checked)}
                              className="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
                            />
                            <label htmlFor="useWhatsappAsContact" className="ml-2 text-gray-700 font-inter">
                              Utiliser ce numéro WhatsApp comme numéro de contact principal
                            </label>
                          </div>

                          {/* Numéro de contact alternatif */}
                          {!useWhatsappAsContact && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Label htmlFor="contact" className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                                Numéro de contact alternatif *
                              </Label>
                              <Input
                                id="contact"
                                type="tel"
                                placeholder="07 08 09 10 11"
                                value={contactDisplay}
                                onChange={(e) => handleContactNumberChange(e.target.value)}
                                className={`font-inter border-2 ${errors.contactNumber ? 'border-red-300' : 'border-gray-200'} focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300`}
                                required={!useWhatsappAsContact}
                              />
                              {errors.contactNumber && (
                                <p className="text-sm text-red-600 mt-2">{errors.contactNumber}</p>
                              )}
                            </motion.div>
                          )}

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
                            Liens produits
                          </Label>

                          {productLinks.map((link, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex gap-3 items-start"
                            >
                              <div className="flex-1">
                                <Input
                                  placeholder={`https://item.taobao.com/... (Lien ${index + 1})`}
                                  value={link.url}
                                  onChange={(e) => handleProductLinkChange(index, e.target.value)}
                                  className={`font-inter border-2 ${!link.isValid && link.url !== '' ? 'border-red-300' : 'border-gray-200'} focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300`}
                                />
                                {!link.isValid && link.url !== '' && (
                                  <p className="text-sm text-red-600 mt-1">Ce lien n'est pas valide</p>
                                )}
                              </div>
                              {productLinks.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => removeProductLink(index)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-600 hover:bg-red-50 p-3 rounded-xl"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              )}
                            </motion.div>
                          ))}

                          {errors.productLinks && (
                            <p className="text-sm text-red-600">{errors.productLinks}</p>
                          )}

                          <Button
                            type="button"
                            onClick={addProductLink}
                            variant="outline"
                            className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 font-inter font-medium rounded-xl w-full py-3"
                          >
                            <Plus className="mr-2 h-5 w-5" />
                            Ajouter un autre lien
                          </Button>

                          {/* Description */}
                          <div>
                            <Label htmlFor="description" className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                              Description ou précisions (optionnel)
                            </Label>
                            <Textarea
                              id="description"
                              placeholder="Quantités souhaitées, couleurs, tailles, budget approximatif, délai souhaité..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="min-h-[120px] font-inter border-2 border-gray-200 focus:border-brand-orange rounded-xl text-lg py-4 px-4 transition-all duration-300"
                            />
                          </div>

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
                            Récapitulatif de votre demande
                          </h3>
                          <p className="text-gray-600 font-inter">
                            Vérifiez vos informations avant envoi
                          </p>
                        </div>

                        <div className="space-y-6">
                          {/* Récapitulatif des informations */}
                          <div className="bg-gray-50 rounded-2xl p-6">
                            <h4 className="font-poppins font-semibold text-lg text-brand-dark mb-4">
                              Informations de contact
                            </h4>
                            <div className="space-y-2 text-gray-700">
                              <p><strong>WhatsApp :</strong> {formatIvoryCoastNumber(whatsappDisplay)}</p>
                              {!useWhatsappAsContact && (
                                <p><strong>Contact :</strong> {formatIvoryCoastNumber(contactDisplay)}</p>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-2xl p-6">
                            <h4 className="font-poppins font-semibold text-lg text-brand-dark mb-4">
                              Produits demandés
                            </h4>
                            {productLinks.filter(link => link.url.trim() !== '').length > 0 ? (
                              <div className="space-y-2">
                                {productLinks.filter(link => link.url.trim() !== '').map((link, index) => (
                                  <p key={index} className="text-gray-700 text-sm break-all">
                                    <strong>Lien {index + 1} :</strong> {link.url}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">Aucun lien fourni</p>
                            )}

                            {description.trim() && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-gray-700"><strong>Description :</strong></p>
                                <p className="text-gray-600 mt-1">{description}</p>
                              </div>
                            )}
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

                  {/* Affichage du numéro de demande et contact */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Numéro de demande :</span>
                      <span className="font-medium text-brand-dark font-mono">{requestId}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Nous vous contacterons via WhatsApp au{' '}
                      <span className="font-medium text-brand-dark">
                        {formatIvoryCoastNumber(whatsappDisplay)}
                      </span>
                      {' '}pour discuter des détails.
                    </div>
                  </div>

                  <Button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold text-lg px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Fermer
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Footer avec navigation */}
            {!isSubmitted && (
              <div className="border-t border-gray-100 p-6 bg-gray-50 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        size="icon"
                        className="w-12 h-12 rounded-full font-inter font-medium border-2 hover:bg-gray-100 transition-all duration-300"
                        title="Étape précédente"
                      >
                        <ArrowLeft className="h-5 w-5" />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductForm;