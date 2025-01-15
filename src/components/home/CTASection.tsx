import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cream">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-silver mb-8">
            Let's collaborate to create something extraordinary. Contact us to discuss your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold 
            bg-gradient-to-r from-bronze to-silver hover:from-silver hover:to-bronze
            text-charcoal rounded-md transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};