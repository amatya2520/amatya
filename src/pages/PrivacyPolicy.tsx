import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AMATYA</title>
        <meta name="description" content="AMATYA Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="py-16 md:py-24 bg-gradient-warm min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Privacy Policy - Amatya
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <p className="text-muted-foreground text-lg">
                At Amatya, your privacy is our priority. We are committed to protecting your personal information and using it responsibly.
              </p>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">1. Information We Collect</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>Name, contact details, and address for order processing</li>
                  <li>Payment information (securely processed via trusted gateways)</li>
                  <li>Feedback, inquiries, or support messages</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>To process and deliver orders efficiently</li>
                  <li>To enhance customer experience and product quality</li>
                  <li>To send updates, offers, and service notifications</li>
                  <li>For legal and verification purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">3. Data Protection</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>Your information is securely stored and never sold or shared with third parties.</li>
                  <li>Payment details are encrypted and processed through secure systems.</li>
                  <li>Only authorized personnel can access customer data.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground">4. User Rights</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>Customers can request updates, corrections, or deletion of their information.</li>
                  <li>You may opt-out of promotional communications anytime.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
