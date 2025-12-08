import { Helmet } from 'react-helmet-async';

export default function ShippingReturns() {
  return (
    <>
      <Helmet>
        <title>Shipping & Return Policy - AMATYA</title>
        <meta name="description" content="AMATYA shipping and return policy. Free delivery above ₹2500/-. Learn about our delivery times, shipping charges, and return eligibility." />
      </Helmet>

      <div className="py-16 md:py-24 bg-gradient-warm min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Shipping & Return Policy
            </h1>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8">
              <p className="text-lg font-semibold text-primary mb-4">Free delivery above ₹2500/-</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">Shipping Policy - Amatya</h2>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">1. Delivery Time</h3>
                <p className="text-muted-foreground">Orders are shipped within 1-3 business days</p>
                <p className="text-muted-foreground">Delivery may take 3-7 days depending on location</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">2. Shipping Charges</h3>
                <p className="text-muted-foreground">Fees vary based on order value and delivery area</p>
                <p className="text-muted-foreground">Free shipping may be offered during promotions</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">3. Order Tracking</h3>
                <p className="text-muted-foreground">Customers receive tracking details upon dispatch</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">4. Delivery Delays</h3>
                <p className="text-muted-foreground">Delays caused by weather, logistics, or strikes are beyond company control</p>
                <p className="text-muted-foreground">Customer support assists in resolving delivery issues</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">5. Incorrect Address</h3>
                <p className="text-muted-foreground">Amatya is not responsible for delays due to incorrect or incomplete addresses</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mt-12">Refund & Return Policy - Amatya</h2>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">1. Eligibility</h3>
                <p className="text-muted-foreground">Returns accepted only if products are damaged, leaked, tampered, or incorrect.</p>
                <p className="text-muted-foreground">Return request must be made within 24-48 hours of delivery.</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">2. Non-Returnable Items</h3>
                <p className="text-muted-foreground">Opened, used, or partially consumed products</p>
                <p className="text-muted-foreground">Products damaged due to customer handling</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">3. Refund Process</h3>
                <p className="text-muted-foreground">Approved refunds are processed within 3-7 business days</p>
                <p className="text-muted-foreground">Refunds are issued to the original payment method</p>

                <h3 className="font-heading text-xl font-semibold text-foreground mt-6">4. Replacement</h3>
                <p className="text-muted-foreground">Replacement is provided for genuine cases of product damage or mismatch</p>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mt-12">6. Delivery & Return Policy</h2>
                <p className="text-muted-foreground">Orders are dispatched within 1-3 business days depending on product availability.</p>
                <p className="text-muted-foreground">Returns are accepted only for damaged, leaked, tampered, or incorrect products.</p>
                <p className="text-muted-foreground">Products that are opened, used, or altered are not eligible for return.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
