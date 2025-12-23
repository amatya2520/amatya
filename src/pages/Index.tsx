import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_QUERY } from '@/lib/shopify';
import { ArrowRight, Leaf, Award, Heart, Truck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { storeName, canonicalUrl, currencySymbol, freeDeliveryThreshold } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 3 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [products]);

  const freeDeliveryText = freeDeliveryThreshold > 0 
    ? `Above ${currencySymbol}${freeDeliveryThreshold}/-` 
    : 'On all orders';

  return (
    <>
      <Helmet>
        <title>{storeName} - The Amrit Essence | Pure & Natural Indian Food Products</title>
        <meta name="description" content={`${storeName} brings the purity of rural traditions to your modern kitchen. Shop pure A2 Gir Cow Ghee, Raw Honey, and Natural Sweeteners. 100% natural, chemical-free products from Madhya Pradesh.`} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>

      <div ref={sectionRef}>
        <Hero />

        {/* About Section */}
        <section className="py-20 md:py-32 bg-gradient-warm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-animate className="space-y-6">
                <span className="text-sm font-medium text-accent tracking-wider uppercase">Our Story</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  The Amrit Essence
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At {storeName} we bring the purity of rural traditions to your modern kitchen. 
                  Rooted in authenticity, our brand is committed to delivering natural, 
                  chemical-free products straight from the farm. Every item—from our Bilona 
                  method Gir cow Ghee, to different raw Honey, and traditional Jaggery and 
                  Muscovado (Khaand)—is a reflection of India's rich agricultural heritage.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in preserving the village legacy by empowering farmers and 
                  promoting time-tested methods of food production, ensuring you get 
                  wholesome nutrition in every spoonful.
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">
                    Read Our Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div data-animate className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-golden/10 overflow-hidden shadow-elevated">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="font-heading text-2xl text-foreground mb-2">Pure & Natural</h3>
                      <p className="text-muted-foreground">Traditional methods, authentic taste</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Leaf, title: '100% Natural', desc: 'No chemicals or additives' },
                { icon: Award, title: 'Traditional Methods', desc: 'Bilona & ancient processes' },
                { icon: Heart, title: 'Farm Fresh', desc: 'Direct from farmers' },
                { icon: Truck, title: 'Free Delivery', desc: freeDeliveryText },
              ].map((feature, i) => (
                <div 
                  key={feature.title} 
                  data-animate
                  className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-shadow"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <feature.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 md:py-32 bg-gradient-warm">
          <div className="container mx-auto px-4 md:px-6">
            <div data-animate className="text-center mb-12">
              <span className="text-sm font-medium text-accent tracking-wider uppercase">Our Products</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                Featured Bestsellers
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Discover our range of pure, natural products made using traditional methods passed down through generations.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl h-96 animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl shadow-soft">
                <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl text-foreground mb-2">No Products Yet</h3>
                <p className="text-muted-foreground">
                  Products will appear here once added to your Shopify store.
                </p>
              </div>
            )}

            <div data-animate className="text-center mt-12">
              <Button asChild variant="hero" size="lg">
                <Link to="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-earth text-cream">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div data-animate className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                Experience the True Essence of Purity
              </h2>
              <p className="text-cream/80 text-lg">
                Join thousands of families who have made {storeName} a part of their daily wellness routine.
              </p>
              <Button asChild variant="golden" size="xl">
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
