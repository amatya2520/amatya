import { Helmet } from 'react-helmet-async';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The A2 Gir Cow Ghee from AMATYA is absolutely amazing! The aroma and taste remind me of my grandmother\'s homemade ghee. You can truly taste the purity.',
    product: 'A2 Gir Cow Ghee',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'I\'ve tried many honey brands, but AMATYA\'s Raw Forest Honey is on another level. It\'s thick, rich, and you can taste the natural goodness in every spoon.',
    product: 'Raw Forest Honey',
  },
  {
    name: 'Anita Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Switched to Khaand Shree from regular sugar and the difference is incredible. My tea tastes better and I feel good knowing it\'s healthier for my family.',
    product: 'Khaand Shree',
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'The Bilona ghee has transformed my cooking. The traditional preparation method really makes a difference. Highly recommend to everyone!',
    product: 'A2 Gir Cow Ghee',
  },
  {
    name: 'Meera Krishnan',
    location: 'Bangalore',
    rating: 5,
    text: 'Raw Tulsi Honey has become my go-to for morning warm water. The subtle herbal notes are so soothing, and it\'s helped with my seasonal allergies.',
    product: 'Raw Tulsi Honey',
  },
  {
    name: 'Arun Joshi',
    location: 'Pune',
    rating: 5,
    text: 'Finally found authentic products that remind me of village life! AMATYA is preserving our food traditions and delivering them to our homes. Thank you!',
    product: 'Multiple Products',
  },
];

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Customer Reviews - AMATYA | What Our Customers Say</title>
        <meta name="description" content="Read genuine reviews from AMATYA customers about our A2 Gir Cow Ghee, Raw Honey, and natural sweeteners. See why families trust AMATYA for pure, traditional products." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-medium text-accent tracking-wider uppercase">Testimonials</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
              What Our Customers Say
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Real stories from families who have made AMATYA a part of their daily wellness routine.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24 bg-gradient-warm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-card transition-shadow relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-heading text-lg text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-3 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {testimonial.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Reviews Placeholder */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Video Reviews
            </h2>
            <p className="text-muted-foreground mt-2">
              Coming soon - watch our customers share their experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="aspect-video bg-card rounded-2xl shadow-soft flex items-center justify-center"
              >
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">▶️</span>
                  </div>
                  <p className="text-sm">Video Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-earth text-cream text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-honey-light mb-4">
            Join Our Growing Family
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto">
            Experience the purity of AMATYA products and become part of thousands of families 
            who trust us for their daily wellness needs.
          </p>
        </div>
      </section>
    </>
  );
}
