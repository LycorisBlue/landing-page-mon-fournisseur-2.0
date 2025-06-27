
import { Shield, CreditCard, Users, Truck, MessageCircle, Star } from "lucide-react";

const BenefitsSection = () => {
  const problems = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      problem: "Barrière de la langue",
      solution: "Nous parlons chinois et gérons toute la communication",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      problem: "Problèmes de paiement",
      solution: "Solutions de paiement locales : Mobile Money, virements",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      problem: "Fiabilité des vendeurs",
      solution: "Vérification et sélection rigoureuse de nos partenaires",
      color: "from-brand-red to-brand-orange"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      problem: "Complexité de livraison",
      solution: "Gestion complète : expédition, dédouanement, livraison",
      color: "from-brand-orange to-brand-orange-light"
    }
  ];

  const stats = [
    { number: "500+", label: "Commandes réussies" },
    { number: "98%", label: "Clients satisfaits" },
    { number: "15j", label: "Délai moyen" },
    { number: "24/7", label: "Support client" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6">
            Pourquoi nous choisir ?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nous résolvons tous les problèmes que vous rencontrez habituellement
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-orange mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Problems & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {problems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.color} text-white rounded-xl mb-6`}>
                {item.icon}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-red-600 mb-2">
                    ❌ Problème classique
                  </h3>
                  <p className="font-inter text-gray-700">
                    {item.problem}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-green-600 mb-2">
                    ✅ Notre solution
                  </h3>
                  <p className="font-inter text-gray-700 font-medium">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-brand-red to-brand-orange rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="font-poppins font-bold text-3xl mb-4">
              Nos performances parlent d'elles-mêmes
            </h3>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 fill-current text-yellow-300 mx-1" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-poppins font-bold text-4xl md:text-5xl mb-2">
                  {stat.number}
                </div>
                <div className="font-inter text-white/90 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-70">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-green-600" />
            <span className="font-inter font-medium text-gray-700">Paiements sécurisés</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <span className="font-inter font-medium text-gray-700">Support 24/7</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-purple-600" />
            <span className="font-inter font-medium text-gray-700">Livraison garantie</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
