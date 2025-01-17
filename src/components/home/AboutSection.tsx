import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] overflow-hidden rounded-lg shadow-xl">
            <img
              src="/lovable-uploads/MattCoffey.jpg"
              alt="Matt Coffey at work"
              className="object-cover w-full h-full transform scale-[1.02] hover:scale-[1.05] transition-transform duration-500"
              loading="eager"
              onError={(e) => {
                console.error("Image failed to load:", e);
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Meet Matt Coffey</h2>
            <p className="text-lg text-gray-600">
              With over a decade of experience in metal artistry, Matt Coffey brings unparalleled craftsmanship to every project. His passion for metalwork began in his early years and has evolved into a masterful blend of traditional techniques and modern innovation.
            </p>
            <p className="text-lg text-gray-600">
              From custom architectural elements to intricate artistic pieces, Matt's work reflects his commitment to quality and attention to detail. Each creation is thoughtfully designed and meticulously crafted to exceed expectations.
            </p>
            <div className="pt-4">
              <Link to="/contact">
                <Button size="lg" className="text-lg">
                  Work With Matt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};