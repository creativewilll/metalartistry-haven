import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-24 h-24 bg-gray-100 rounded-full opacity-50" />
        <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-gray-100 rounded-full opacity-50" />
        <div className="absolute left-1/3 top-1/3 w-16 h-16 bg-gray-100 rounded-full opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          style={{ opacity, scale, y }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/lovable-uploads/MattCoffey.jpg"
                alt="Matt Coffey at work"
                className="object-cover w-full h-full transform scale-[1.02] hover:scale-[1.05] transition-transform duration-500"
                loading="eager"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-500/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
            </div>
            
            <div className="space-y-6 text-lg text-gray-600">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                With a passion for metalwork and an eye for detail, I specialize in creating 
                custom metal designs that blend functionality with artistic excellence. Each 
                project is an opportunity to push the boundaries of what's possible with metal, 
                transforming raw materials into stunning architectural features.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                My approach combines traditional craftsmanship with modern techniques, 
                ensuring every piece not only meets but exceeds expectations. Whether it's 
                a custom railing, architectural feature, or artistic installation, I work 
                closely with clients to bring their vision to life with precision and creativity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-gray-900">15+</span>
                  <span className="text-sm text-gray-500">Years Experience</span>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-gray-900">1000+</span>
                  <span className="text-sm text-gray-500">Projects Completed</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
