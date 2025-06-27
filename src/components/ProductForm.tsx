
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Send, CheckCircle, Plus, Trash2 } from "lucide-react";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductForm = ({ isOpen, onClose }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    whatsapp: "",
    productLinks: [""],
    description: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ whatsapp: "", productLinks: [""], description: "" });
    setIsSubmitted(false);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-red to-brand-orange p-6 flex-shrink-0">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-white">
              {isSubmitted ? "Demande soumise !" : "Envoyer un lien produit"}
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Numéro WhatsApp */}
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
                    className="font-inter border-2 border-gray-200 focus:border-brand-orange rounded-lg text-lg py-4 px-4"
                    required
                  />
                </div>

                {/* Liens produits */}
                <div>
                  <Label className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                    Liens produits (1688, Alibaba, Taobao) *
                  </Label>
                  <div className="space-y-4">
                    {formData.productLinks.map((link, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <Input
                            placeholder={`Lien produit ${index + 1}`}
                            value={link}
                            onChange={(e) => updateLink(index, e.target.value)}
                            className="font-inter border-2 border-gray-200 focus:border-brand-orange rounded-lg text-lg py-4 px-4"
                            required={index === 0}
                          />
                        </div>
                        {formData.productLinks.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeLinkField(index)}
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50 p-3"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={addLinkField}
                      variant="outline"
                      className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 font-inter font-medium"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Ajouter un autre lien
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="font-inter font-medium text-brand-dark mb-3 block text-lg">
                    Description ou précisions
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Ajoutez des détails sur votre commande : quantités, couleurs, tailles, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[150px] font-inter border-2 border-gray-200 focus:border-brand-orange rounded-lg text-lg py-4 px-4"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold text-xl py-4 px-8 rounded-lg transform hover:scale-[1.02] transition-all duration-300"
                >
                  <Send className="mr-2 h-6 w-6" />
                  Soumettre ma demande
                </Button>
              </form>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h3 className="font-poppins font-bold text-3xl text-brand-dark mb-6">
                  Félicitations !
                </h3>
                <p className="font-inter text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Votre demande a bien été soumise ! Elle sera traitée dans les plus brefs délais.
                </p>
                <Button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-red/90 hover:to-brand-orange/90 font-poppins font-semibold text-lg px-8 py-4 rounded-lg"
                >
                  Retour à l'accueil
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
