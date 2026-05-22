import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteHead } from '../components/layout/SiteHead';
import { BUSINESS_INFO } from '../data/site-images';
import { usePhoneActions } from '../components/contact';

const budgetOptions = [
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Not sure yet',
];

export function ContactForm() {
  const { openPhoneActions } = usePhoneActions();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Netlify form submission
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
        setFormError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setFormStatus('error');
      setFormError('Unable to submit. Please try emailing directly.');
    }
  };

  return (
    <>
      <SiteHead
        title="Project Intake | Matt Coffey Design"
        description="Submit a detailed project inquiry for custom metalwork, railings, gates, furniture, or architectural commissions."
      />

      <section className="min-h-screen bg-forge-black relative">
        {/* Background texture */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-20" />

        {/* Header Bar */}
        <div className="relative z-10 border-b border-brushed-bronze/20 bg-anthracite/50">
          <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
            <Link
              to="/contact"
              className="flex items-center gap-2 text-iron-grey hover:text-chalk transition-colors font-mono text-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brushed-bronze rounded-sm px-2 py-1"
            >
              <ArrowLeft size={16} />
              Back to Contact
            </Link>
            <span className="font-mono text-xs uppercase tracking-widest text-brushed-bronze">
              Project Intake Form
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 relative z-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              Start Your Project
            </h1>
            <p className="text-iron-grey max-w-xl mx-auto leading-relaxed">
              Tell me what you&apos;re imagining. The more details you share, the better I can
              understand your vision and provide an accurate estimate.
            </p>
          </motion.div>

          {/* Contact Tiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="flex items-center gap-4 p-4 bg-anthracite border border-brushed-bronze/20 rounded-sm hover:border-brushed-bronze/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-brushed-bronze/20 flex items-center justify-center group-hover:bg-brushed-bronze/30 transition-colors">
                <Mail size={20} className="text-brushed-bronze" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-iron-grey">Email</p>
                <p className="text-chalk">{BUSINESS_INFO.email}</p>
              </div>
            </a>

            <button
              onClick={openPhoneActions}
              className="flex items-center gap-4 p-4 bg-anthracite border border-brushed-bronze/20 rounded-sm hover:border-brushed-bronze/40 transition-colors group text-left w-full focus:outline-none focus:ring-2 focus:ring-brushed-bronze"
            >
              <div className="w-12 h-12 rounded-full bg-brushed-bronze/20 flex items-center justify-center group-hover:bg-brushed-bronze/30 transition-colors">
                <Phone size={20} className="text-brushed-bronze" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-iron-grey">Phone</p>
                <p className="text-chalk">{BUSINESS_INFO.phoneDisplay}</p>
              </div>
            </button>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-anthracite border border-brushed-bronze/30 rounded-sm overflow-hidden"
          >
            {/* Form header accent */}
            <div className="h-1 bg-gradient-to-r from-cooling-red via-ember-orange to-brushed-bronze" />

            <div className="p-6 md:p-10">
              {/* Success State */}
              {formStatus === 'success' && (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={40} className="text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-display mb-4">Message Forged</h2>
                  <p className="text-iron-grey max-w-md mx-auto mb-8">
                    Your project inquiry has been received. I review all submissions within 48 hours and will be in touch soon.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brushed-bronze text-forge-black font-mono text-sm uppercase tracking-widest hover:bg-chalk transition-colors rounded-sm"
                  >
                    Return Home
                  </Link>
                </div>
              )}

              {/* Error State */}
              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-400 font-medium">Submission failed</p>
                      <p className="text-xs text-red-300/80 mt-1">{formError}</p>
                      <p className="text-xs text-red-300/60 mt-2">
                        Email directly:{' '}
                        <a href={`mailto:${BUSINESS_INFO.email}`} className="underline hover:text-red-300">
                          {BUSINESS_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              {formStatus !== 'success' && (
                <form onSubmit={handleSubmit} data-netlify="true" name="contact-intake" method="POST">
                  <input type="hidden" name="form-name" value="contact-intake" />
                  <input name="bot-field" hidden />

                  <div className="space-y-8">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="intake-name"
                          className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                        >
                          Name <span className="text-ember-orange">*</span>
                        </label>
                        <input
                          id="intake-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk placeholder:text-iron-grey/50 focus:border-brushed-bronze focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="intake-email"
                          className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                        >
                          Email <span className="text-ember-orange">*</span>
                        </label>
                        <input
                          id="intake-email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk placeholder:text-iron-grey/50 focus:border-brushed-bronze focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="intake-phone"
                        className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                      >
                        Phone <span className="text-iron-grey">(optional)</span>
                      </label>
                      <input
                        id="intake-phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="w-full md:w-1/2 bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk placeholder:text-iron-grey/50 focus:border-brushed-bronze focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label
                        htmlFor="intake-budget"
                        className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                      >
                        Budget Range <span className="text-ember-orange">*</span>
                      </label>
                      <select
                        id="intake-budget"
                        name="budget"
                        required
                        className="w-full md:w-1/2 bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk focus:border-brushed-bronze focus:outline-none transition-colors"
                      >
                        <option value="">Select a range</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-iron-grey mt-2">
                        Helps me understand the scope and materials appropriate for your project.
                      </p>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label
                        htmlFor="intake-projectDescription"
                        className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                      >
                        Project Request <span className="text-ember-orange">*</span>
                      </label>
                      <textarea
                        id="intake-projectDescription"
                        name="projectDescription"
                        required
                        rows={6}
                        placeholder="Describe your project: dimensions, materials, timeline, location, any sketches or inspiration images you can share..."
                        className="w-full bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk placeholder:text-iron-grey/50 focus:border-brushed-bronze focus:outline-none transition-colors resize-y"
                      />
                    </div>

                    {/* Extra / Tell me About it */}
                    <div>
                      <label
                        htmlFor="intake-extra"
                        className="block font-mono text-xs uppercase tracking-widest text-brushed-bronze mb-2"
                      >
                        Tell me About it
                      </label>
                      <textarea
                        id="intake-extra"
                        name="extra"
                        rows={4}
                        placeholder="Anything else: your style preferences, how you found me, reference pieces you've seen, budget flexibility, installation site details..."
                        className="w-full bg-forge-black border border-brushed-bronze/30 px-4 py-3 text-chalk placeholder:text-iron-grey/50 focus:border-brushed-bronze focus:outline-none transition-colors resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-brushed-bronze text-forge-black font-mono text-sm uppercase tracking-widest hover:bg-chalk transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brushed-bronze focus:ring-offset-2 focus:ring-offset-anthracite rounded-sm"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-forge-black border-t-transparent rounded-full"
                            />
                            Sending to the Forge...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Submit Project Inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-iron-grey text-sm mt-8"
          >
            All inquiries are reviewed personally. Typical response time: 24-48 hours.
          </motion.p>
        </div>
      </section>
    </>
  );
}
