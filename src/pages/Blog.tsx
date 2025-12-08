import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    slug: 'benefits-of-raw-honey',
    title: 'Benefits of Raw Honey: Nature\'s Golden Elixir',
    excerpt: 'Discover the incredible health benefits of raw, unprocessed honey and why it\'s superior to commercial varieties.',
    category: 'Health & Wellness',
    readTime: '5 min read',
    date: 'December 2024',
  },
  {
    slug: 'how-to-use-bilona-ghee',
    title: 'How to Use Bilona Ghee in Your Daily Cooking',
    excerpt: 'Learn the best ways to incorporate traditional Bilona method ghee into your meals for maximum flavor and health benefits.',
    category: 'Cooking Tips',
    readTime: '4 min read',
    date: 'December 2024',
  },
  {
    slug: 'traditional-indian-food-wisdom',
    title: 'Traditional Indian Food Wisdom: Lessons from Our Ancestors',
    excerpt: 'Explore the ancient knowledge behind traditional Indian food preparation methods and their modern-day relevance.',
    category: 'Culture & Heritage',
    readTime: '7 min read',
    date: 'December 2024',
  },
  {
    slug: 'understanding-a2-ghee',
    title: 'Understanding A2 Ghee: Why Gir Cow Milk Matters',
    excerpt: 'Learn about the difference between A1 and A2 proteins and why A2 Gir Cow ghee is considered superior for health.',
    category: 'Education',
    readTime: '6 min read',
    date: 'December 2024',
  },
  {
    slug: 'natural-sweeteners-vs-refined-sugar',
    title: 'Natural Sweeteners vs Refined Sugar: Making the Switch',
    excerpt: 'Why choosing natural sweeteners like Khaand Shree and jaggery over refined sugar is better for your health.',
    category: 'Health & Wellness',
    readTime: '5 min read',
    date: 'December 2024',
  },
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog - AMATYA | Health Tips, Recipes & Traditional Wisdom</title>
        <meta name="description" content="Explore articles about raw honey benefits, Bilona ghee usage, traditional Indian food wisdom, and natural wellness tips from AMATYA." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-medium text-accent tracking-wider uppercase">Our Blog</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
              Articles & Insights
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Tips on using our products, traditional Indian food wisdom, and the benefits of natural living.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-gradient-warm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video bg-gradient-golden/20 flex items-center justify-center">
                  <span className="font-heading text-2xl text-primary/50">AMATYA</span>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-earth text-cream">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-honey-light mb-4">
              Stay Updated
            </h2>
            <p className="text-cream/80 mb-6">
              Subscribe to receive health tips, recipes, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-honey-light"
              />
              <Button variant="golden" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
