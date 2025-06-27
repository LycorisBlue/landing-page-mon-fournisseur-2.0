
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Aminata Koné",
      profession: "Commerçante",
      content: "Grâce à Mon Fournisseur 2.0, j'ai pu importer des produits de qualité depuis la Chine sans me soucier de la langue ou des formalités. Le service est exceptionnel !",
      rating: 5,
      avatar: "AK"
    },
    {
      name: "Ibrahim Traoré",
      profession: "Entrepreneur",
      content: "Fini les arnaques et les produits de mauvaise qualité ! Avec cette plateforme, je commande en toute confiance. L'équipe est très professionnelle.",
      rating: 5,
      avatar: "IT"
    },
    {
      name: "Fatou Diallo",
      profession: "Boutique en ligne",
      content: "Le processus est simple et transparent. Je recommande vivement à tous ceux qui veulent importer depuis la Chine sans tracas.",
      rating: 5,
      avatar: "FD"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-brand-dark mb-6">
            Témoignages Clients
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients pensent de nos services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="font-inter text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-red to-brand-orange rounded-full flex items-center justify-center text-white font-poppins font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-brand-dark">
                    {testimonial.name}
                  </h4>
                  <p className="font-inter text-gray-500 text-sm">
                    {testimonial.profession}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
