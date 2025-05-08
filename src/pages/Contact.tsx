import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import TypeForm from '@/components/contact/TypeForm';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal/80 to-charcoal/60">
      {/* Header Section */}
      <div className="bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-400 to-orange-600 animate-ember-pulse relative z-10 py-2">
                Contact Us
              </h1>
              <div 
                className="absolute inset-x-0 mx-auto w-full max-w-xs bg-red-600 opacity-50 blur-lg animate-pulse z-0"
                aria-hidden="true"
              />
              <div 
                className="absolute inset-x-0 mx-auto w-full max-w-xs bg-heading-shine bg-[length:400%_100%] animate-shine opacity-70 z-0"
                style={{
                  backgroundSize: '200% 100%',
                  mixBlendMode: 'overlay'
                }}
                aria-hidden="true"
              />
            </div>
            <p className="text-xl text-center text-text-body max-w-3xl mx-auto">
              Got an idea brewing? I'm here to help make it a reality. Let's chat and start crafting something amazing just for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-bronze" />
                  <span className="text-gray-300">mattcoffeydesign@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-bronze" />
                  <span className="text-gray-300">+1 (231) 645-0622</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-bronze" />
                  <span className="text-gray-300">Traverse City, MI</span>
                </div>
              </div>
            </div>
          </div>

          {/* TypeForm Button */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <Button
                asChild
                className="w-full text-xl font-semibold"
              >
                <a
                  href="/contact-form"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-white font-bold">Start Your Project</span>
                  <svg
                    className="w-6 h-6 text-white ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
