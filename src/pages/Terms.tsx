import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - AMATYA</title>
        <meta name="description" content="AMATYA Terms & Conditions. Read our product information, order confirmation, pricing, and compliance policies." />
      </Helmet>

      <div className="py-16 md:py-24 bg-gradient-warm min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Terms & Conditions - Amatya
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">1. Product Information</h2>
                <p className="text-muted-foreground">All product details, ingredients, and descriptions are accurate.</p>
                <p className="text-muted-foreground">Slight variation in color, aroma, or texture may occur due to natural production.</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">2. Order Confirmation</h2>
                <p className="text-muted-foreground">Orders are confirmed only after successful payment.</p>
                <p className="text-muted-foreground">Cash on Delivery (COD) availability depends on the delivery location.</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">3. Pricing & Payment</h2>
                <p className="text-muted-foreground">Prices may change without prior notice</p>
                <p className="text-muted-foreground">Secure online payment gateways are used for all transactions</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">4. Usage</h2>
                <p className="text-muted-foreground">Products are natural; check for personal allergies before use</p>
                <p className="text-muted-foreground">Amatya is not responsible for misuse or improper storage</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">5. Compliance</h2>
                <p className="text-muted-foreground">Operations comply with FSSAI guidelines and legal regulations</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">7. Ethical Business Conduct</h2>
                <p className="text-muted-foreground">Amatya follows all FSSAI guidelines, food safety laws, and government regulations.</p>
                <p className="text-muted-foreground">We promote fair trade, honesty, and respectful partnerships with all farmers and suppliers.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
