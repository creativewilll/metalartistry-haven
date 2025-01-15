import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

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
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Let's Create Together
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Ready to start your custom metalwork project? Get in touch with us today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-muted rounded-md"
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
                  <option value="railing">Railing</option>
                  <option value="furniture">Furniture</option>
                  <option value="windows-doors">Windows & Doors</option>
                  <option value="custom">Custom Project</option>
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
                  <span>info@mattcoffeydesign.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-bronze" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-bronze" />
                  <span>123 Metalwork Lane, Portland, OR 97201</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Workshop Hours</h3>
              <div className="flex items-start space-x-4">
                <Clock className="text-bronze mt-1" />
                <div>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: By appointment</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Custom Projects</h3>
              <p className="text-muted-foreground">
                Each piece is uniquely crafted to your specifications. We work closely with our clients
                throughout the entire process to ensure your vision becomes reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
