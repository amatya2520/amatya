import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShoppingCart, Minus, Plus, ArrowLeft, Truck, Leaf, Award, Check } from 'lucide-react';

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return;
      setLoading(true);
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-foreground mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      product: { node: product } as ShopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });

    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart.`,
      position: 'top-center',
    });
  };

  return (
    <>
      <Helmet>
        <title>{product.title} - AMATYA | The Amrit Essence</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-gradient-warm py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back button */}
          <Link 
            to="/products" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-card shadow-card">
                {images[activeImage]?.node ? (
                  <img
                    src={images[activeImage].node.url}
                    alt={images[activeImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Leaf className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImage === idx ? 'border-primary shadow-golden' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-accent tracking-wider uppercase">AMATYA</span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {product.title}
                </h1>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-primary font-heading">
                  ₹{parseFloat(selectedVariant?.price.amount || '0').toFixed(0)}
                </span>
                {product.variants.edges.length > 1 && (
                  <span className="text-muted-foreground text-sm">
                    {selectedVariant?.title}
                  </span>
                )}
              </div>

              {/* Variants */}
              {product.options.length > 0 && product.options[0].values.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    {product.options[0].name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant, idx) => (
                      <button
                        key={variant.node.id}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedVariantIdx === idx
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {variant.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-accent" />
                  <span>Free delivery above ₹2500/-</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Leaf className="h-4 w-4 text-accent" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4 text-accent" />
                  <span>Traditional Methods</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h2 className="font-heading text-xl font-semibold text-foreground">Description</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {product.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">Why Choose This Product?</h3>
                <ul className="space-y-2">
                  {[
                    '100% pure, natural, and free from chemicals',
                    'Made using traditional methods',
                    'Rich in natural nutrients and benefits',
                    'Sourced ethically from trusted farmers',
                    'Quality tested and hygienically packed',
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
