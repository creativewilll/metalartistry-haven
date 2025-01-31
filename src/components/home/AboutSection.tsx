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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-24 h-24 bg-gray-700/30 rounded-full blur-xl" />
        <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-gray-700/30 rounded-full blur-xl" />
        <div className="absolute left-1/3 top-1/3 w-16 h-16 bg-gray-700/30 rounded-full blur-xl" />
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
                src="/gallery-images/MattCoffey.jpeg"
                alt="Hey, I'm Matt Coffey, working on some cool metalwork!"
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
            className="space-y-8 relative bg-black/40 p-8 rounded-xl border border-orange-400/20 shadow-2xl backdrop-blur-sm"
          >
            {/* Decorative Bolts */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg" />
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg" />
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg" />
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg" />
            
            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)]">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
            </div>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Hey there, I'm Matt Coffey, a specialist blacksmith based in the beautiful state of Michigan! I focus on
              creating unique, custom metalwork that always stands out!
            </p>

            <div className="space-y-6 text-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-gray-300 font-light leading-relaxed bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text"
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
                className="text-gray-300 font-light leading-relaxed bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text"
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
                  <span className="text-4xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)]">15+</span>
                  <span className="text-sm text-gray-400">Years Experience</span>
                </div>
                <div className="w-px h-12 bg-gray-700" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(255,255,255,0.1)]">1000+</span>
                  <span className="text-sm text-gray-400">Projects Completed</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
