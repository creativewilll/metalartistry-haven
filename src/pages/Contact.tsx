import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Drop Me a Line</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-muted rounded-md"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-muted rounded-md"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-muted rounded-md"
                  placeholder="Your Phone Number (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-muted rounded-md"
                  required
                >
                  <option value="">Select a project type</option>
                  <option value="railing">I have an Outdoor Project</option>
                  <option value="furniture">I have an Indoor Project</option>
                  <option value="commercial">Something Special</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-muted rounded-md"
                  placeholder="Tell me about your project here! Helpful details would be: "
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 metallic-gradient text-cream rounded-md 
                hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-bronze" />
                  <span>mcdesignart@aol.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-bronze" />
                  <span>+1 (231) 645-0611</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-bronze" />
                  <span>Traverse City, MI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
