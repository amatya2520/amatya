import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { ShopifyProduct, createDirectCheckout } from '@/lib/shopify';
import { currencySymbol, storeName } from '@/lib/config';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success('Added to cart', {
      description: `${node.title} has been added to your cart.`,
      position: 'top-center',
    });
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    setIsBuyingNow(true);
    try {
      const checkoutUrl = await createDirectCheckout(firstVariant.id, 1);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Buy now failed:', error);
      toast.error('Failed to create checkout', {
        description: 'Please try again or add to cart instead.',
        position: 'top-center',
      });
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
    >
      <article className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-muted relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-warm">
              <span className="text-muted-foreground font-heading text-lg">{storeName}</span>
            </div>
          )}
          
          {/* Quick action buttons */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <Button 
              variant="hero" 
              size="sm" 
              onClick={handleAddToCart}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBuyNow}
              disabled={isBuyingNow}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 bg-background/90 backdrop-blur-sm"
            >
              {isBuyingNow ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Buy Now
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {node.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {node.description.slice(0, 100)}...
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-primary font-heading">
              {currencySymbol}{parseFloat(price.amount).toFixed(0)}
            </span>
            
            <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
              Pure & Natural
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
