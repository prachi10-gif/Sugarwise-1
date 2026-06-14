import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scan, TrendingDown, Award, Zap } from 'lucide-react';
import GlucoseMolecule from '../components/3d/GlucoseMolecule';
import GlassCard from '../components/ui/GlassCard';
import PageTransition from '../components/layout/PageTransition';
import {
  fadeUpVariants,
  staggerContainer,
  heroHeadingVariants,
  heroSubtitleVariants,
  containerVariants,
  horizontalScrollVariants,
} from '../lib/animations';

// Sample Indian food products for gallery
const indianProducts = [
  { name: 'Parle-G Biscuits', sugar: '25.5g', image: '🍪', category: 'Biscuits' },
  { name: 'Frooti Mango Drink', sugar: '11.5g', image: '🥭', category: 'Beverages' },
  { name: 'Maggi Noodles', sugar: '1.5g', image: '🍜', category: 'Noodles' },
  { name: 'Haldirams Bhujia', sugar: '2.5g', image: '🧂', category: 'Snacks' },
  { name: 'Lay\'s Chips', sugar: '2.0g', image: '🥔', category: 'Potato Chips' },
  { name: 'Horlicks', sugar: '68.0g', image: '🥛', category: 'Health Drink' },
  { name: 'Maaza Drink', sugar: '12.0g', image: '🧃', category: 'Beverages' },
  { name: 'Britannia Bread', sugar: '8.5g', image: '🍞', category: 'Breads' },
];

const testimonials = [
  {
    text: 'Finally understand what I\'m actually eating. SugarScan saved my health!',
    author: 'Priya M.',
    role: 'Fitness Trainer',
  },
  {
    text: 'The AI suggestions are incredibly personalized. Love the multilingual support!',
    author: 'Rajesh K.',
    role: 'Software Engineer',
  },
  {
    text: 'My doctor recommended it. The daily tracking helped me reduce sugar by 40%.',
    author: 'Sneha P.',
    role: 'Healthcare Professional',
  },
];

const steps = [
  {
    number: '1',
    title: 'Scan',
    description: 'Point camera at barcode or manually enter food items',
    icon: <Scan className="w-8 h-8" />,
  },
  {
    number: '2',
    title: 'Calculate',
    description: 'Instant sugar content & impact on daily goal calculated',
    icon: <TrendingDown className="w-8 h-8" />,
  },
  {
    number: '3',
    title: 'Know',
    description: 'Get AI-powered insights & personalized recommendations',
    icon: <Award className="w-8 h-8" />,
  },
];

export default function Home({ onScanClick }: { onScanClick?: () => void }) {
  const containerVariant = useMemo(() => containerVariants, []);
  const itemVariant = useMemo(() => fadeUpVariants, []);

  return (
    <PageTransition>
      <main className="w-full overflow-hidden bg-gradient-deep">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-tealAccent/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amberAccent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: 3D Molecule */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center hidden md:flex"
              >
                <GlucoseMolecule className="w-full max-w-md" />
              </motion.div>

              {/* Right: Text Content */}
              <motion.div
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                <motion.h1
                  variants={heroHeadingVariants}
                  className="text-5xl md:text-6xl font-black tracking-tight leading-tight"
                >
                  What's Really In{' '}
                  <span className="text-gradient-teal">Your Food?</span>
                </motion.h1>

                <motion.p
                  variants={heroSubtitleVariants}
                  className="text-lg text-text-secondary max-w-lg"
                >
                  Scan any packaged food instantly. Get sugar content, AI-powered health insights,
                  and personalized recommendations in Hindi, Tamil, Telugu & Bengali.
                </motion.p>

                <motion.div
                  variants={fadeUpVariants}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <button
                    onClick={onScanClick}
                    className="btn-primary group flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    Scan Now
                  </button>

                  <button className="btn-secondary">Learn More</button>
                </motion.div>

                <motion.div
                  variants={fadeUpVariants}
                  className="pt-4 text-sm text-text-secondary flex gap-4"
                >
                  <div>✓ 50+ Popular Indian Products</div>
                  <div>✓ AI Health Coach</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.h2
                variants={fadeUpVariants}
                className="text-4xl font-bold text-center text-text-primary"
              >
                How It Works
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    className="relative"
                  >
                    <GlassCard
                      glowColor="teal"
                      interactive
                      className="p-8 h-full flex flex-col items-center text-center"
                    >
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full bg-tealAccent/20 flex items-center justify-center text-tealAccent">
                          {step.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-tealAccent text-midnight font-bold flex items-center justify-center">
                          {step.number}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-text-secondary">{step.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Indian Food Gallery */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.h2
                variants={fadeUpVariants}
                className="text-4xl font-bold text-center text-text-primary"
              >
                Popular Indian Products
              </motion.h2>

              <div className="overflow-x-auto pb-4">
                <motion.div
                  className="flex gap-6 w-max md:w-full md:grid md:grid-cols-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {indianProducts.map((product, idx) => (
                    <motion.div
                      key={idx}
                      variants={horizontalScrollVariants}
                      className="flex-shrink-0 w-72 md:w-auto"
                    >
                      <GlassCard glowColor="teal" interactive className="p-6 h-full">
                        <div className="text-6xl mb-4 text-center">{product.image}</div>
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-text-secondary mb-3">{product.category}</p>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold text-tealAccent">{product.sugar}</span>
                          <span className="text-text-secondary">per 100g</span>
                        </div>
                        <button className="w-full btn-secondary text-sm py-2">
                          View Details
                        </button>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.h2
                variants={fadeUpVariants}
                className="text-4xl font-bold text-center text-text-primary"
              >
                Loved by Users
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    className="relative"
                  >
                    <GlassCard glowColor="amber" className="p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xl">
                            ⭐
                          </span>
                        ))}
                      </div>

                      <p className="text-text-secondary italic mb-6">
                        "{testimonial.text}"
                      </p>

                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-text-secondary">{testimonial.role}</p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Free Trial CTA */}
        <section className="relative py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlassCard
                glowColor="teal"
                className="relative overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
              >
                {/* Animated background */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-tealAccent/10 rounded-full blur-3xl animate-float" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-amberAccent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
                </div>

                <motion.h3
                  variants={fadeUpVariants}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  3 Free Scans
                </motion.h3>

                <motion.p
                  variants={fadeUpVariants}
                  className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto"
                >
                  No account needed. No credit card required. Start scanning your food right now
                  and get instant sugar insights.
                </motion.p>

                <motion.div
                  variants={fadeUpVariants}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link to="/scan" className="btn-primary flex-1 sm:flex-none">
                    <Scan className="w-5 h-5" />
                    Try Free Scan
                  </Link>

                  <button className="btn-secondary flex-1 sm:flex-none">
                    Create Account
                  </button>
                </motion.div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-glass-border-teal/40 py-12 px-6">
          <div className="max-w-6xl mx-auto text-center text-text-secondary text-sm">
            <p>© 2026 SugarScan. Made for healthier choices.</p>
          </div>
        </footer>
      </main>
    </PageTransition>
  );
}
