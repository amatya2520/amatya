/**
 * Environment-based configuration for the storefront.
 * All Shopify and store-related values are loaded from environment variables.
 * 
 * Required environment variables:
 * - VITE_SHOPIFY_STORE_DOMAIN: Shopify store permanent domain (e.g., my-store.myshopify.com)
 * - VITE_SHOPIFY_STOREFRONT_TOKEN: Storefront API access token
 * 
 * Optional environment variables (with defaults):
 * - VITE_SHOPIFY_API_VERSION: API version (default: 2025-07)
 * - VITE_STORE_NAME: Store display name (default: Store)
 * - VITE_STORE_CURRENCY_CODE: Currency code (default: INR)
 * - VITE_STORE_CURRENCY_SYMBOL: Currency symbol (default: ₹)
 * - VITE_STORE_FREE_DELIVERY_THRESHOLD: Free delivery threshold (default: 0)
 * - VITE_STORE_CANONICAL_URL: Canonical URL for SEO (default: empty)
 * - VITE_CART_STORAGE_KEY: LocalStorage key for cart (default: shop-cart)
 */

interface StoreConfig {
  // Shopify API Configuration
  shopify: {
    storeDomain: string;
    storefrontToken: string;
    apiVersion: string;
    storefrontUrl: string;
  };
  // Store Customization
  store: {
    name: string;
    currencyCode: string;
    currencySymbol: string;
    freeDeliveryThreshold: number;
    canonicalUrl: string;
  };
  // Cart Configuration
  cart: {
    storageKey: string;
  };
}

function getRequiredEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please check your .env file. See .env.example for required variables.`
    );
  }
  return value;
}

function getOptionalEnv(key: string, defaultValue: string): string {
  return import.meta.env[key] || defaultValue;
}

function createConfig(): StoreConfig {
  // Required values - will throw if missing
  const storeDomain = getRequiredEnv('VITE_SHOPIFY_STORE_DOMAIN');
  const storefrontToken = getRequiredEnv('VITE_SHOPIFY_STOREFRONT_TOKEN');

  // Optional values with defaults
  const apiVersion = getOptionalEnv('VITE_SHOPIFY_API_VERSION', '2025-07');
  const storeName = getOptionalEnv('VITE_STORE_NAME', 'Store');
  const currencyCode = getOptionalEnv('VITE_STORE_CURRENCY_CODE', 'INR');
  const currencySymbol = getOptionalEnv('VITE_STORE_CURRENCY_SYMBOL', '₹');
  const freeDeliveryThreshold = parseFloat(getOptionalEnv('VITE_STORE_FREE_DELIVERY_THRESHOLD', '0'));
  const canonicalUrl = getOptionalEnv('VITE_STORE_CANONICAL_URL', '');
  const cartStorageKey = getOptionalEnv('VITE_CART_STORAGE_KEY', 'shop-cart');

  // Derived values
  const storefrontUrl = `https://${storeDomain}/api/${apiVersion}/graphql.json`;

  return {
    shopify: {
      storeDomain,
      storefrontToken,
      apiVersion,
      storefrontUrl,
    },
    store: {
      name: storeName,
      currencyCode,
      currencySymbol,
      freeDeliveryThreshold,
      canonicalUrl,
    },
    cart: {
      storageKey: cartStorageKey,
    },
  };
}

// Export the configuration - will validate on first access
export const config = createConfig();

// Export individual values for convenience
export const {
  shopify: { storeDomain, storefrontToken, apiVersion, storefrontUrl },
  store: { name: storeName, currencyCode, currencySymbol, freeDeliveryThreshold, canonicalUrl },
  cart: { storageKey: cartStorageKey },
} = config;
