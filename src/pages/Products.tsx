import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductCard } from '@/components/ProductCard';
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_QUERY } from '@/lib/shopify';
import { Leaf, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'ghee', name: 'Ghee', query: 'title:ghee' },
  { id: 'honey', name: 'Honey', query: 'title:honey' },
  { id: 'sweeteners', name: 'Natural Sweeteners', query: 'title:khaand OR title:muscovado OR title:jaggery' },
];

export default function Products() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const category = categories.find(c => c.id === activeCategory);
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { 
          first: 50,
          query: category?.query || null
        });
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
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Products - AMATYA | A2 Ghee, Raw Honey & Natural Sweeteners</title>
        <meta name="description" content="Shop pure A2 Gir Cow Ghee made with Bilona method, Raw Forest Honey varieties, and natural sweeteners like Khaand Shree. 100% natural, chemical-free products." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-medium text-accent tracking-wider uppercase">Our Products</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
              Pure & Natural Products
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Each product is crafted with traditional methods, preserving the authentic taste and nutritional benefits that nature intended.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-background border-b border-border sticky top-16 md:top-20 z-40 backdrop-blur-lg bg-background/90">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 md:justify-center">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex-shrink-0"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20 bg-gradient-warm min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-heading text-2xl text-foreground mb-2">No Products Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Products will appear here once added to your store. Tell me what products you'd like to add!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Ghee (Gir Cow — Bilona Method)
              </h3>
              <p className="text-muted-foreground text-sm">
                Crafted from indigenous Gir cow A2 milk using the ancient Vedic Bilona method. 
                Rich in nutrients, free from preservatives and chemicals.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Honey (Ajwain, Saunf, Tulsi, Forest, Shisham)
              </h3>
              <p className="text-muted-foreground text-sm">
                Raw, unprocessed honey varieties collected from diverse flora. 
                Each type offers unique therapeutic benefits and natural sweetness.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Natural Sweeteners (Khaand Shree / Muscovado / Jaggery)
              </h3>
              <p className="text-muted-foreground text-sm">
                Traditionally crafted unrefined sweeteners preserving original minerals and nutrients. 
                A healthier alternative to refined sugar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
