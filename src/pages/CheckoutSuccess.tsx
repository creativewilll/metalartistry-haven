import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import confetti from 'canvas-confetti';

const CheckoutSuccess = () => {
  useEffect(() => {
    // Trigger confetti animation on component mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      // Use bronze/gold/amber colors for confetti
      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 },
        colors: ['#CD7F32', '#FFD700', '#F59E0B'],
      });
      
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-charcoal py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-8">
              <CheckCircle className="h-24 w-24 text-bronze animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold font-cinzel mb-4 bg-gradient-to-r from-amber-300 via-bronze to-amber-500 bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            
            <p className="text-silver text-lg mb-6">
              Thank you for your purchase. We'll start handcrafting your items right away.
            </p>
            
            <div className="bg-zinc-900 rounded-lg p-8 mb-10 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-silver mb-4">What's Next?</h2>
              
              <div className="space-y-4 text-left">
                <div className="flex gap-3 items-start">
                  <div className="bg-zinc-800 rounded-full p-2 mt-0.5">
                    <span className="text-bronze text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-silver">Order Confirmation Email</h3>
                    <p className="text-gray-400">
                      We've sent a confirmation email with your order details.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="bg-zinc-800 rounded-full p-2 mt-0.5">
                    <span className="text-bronze text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-silver">Crafting Process</h3>
                    <p className="text-gray-400">
                      Our artisans will begin handcrafting your custom furniture.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="bg-zinc-800 rounded-full p-2 mt-0.5">
                    <span className="text-bronze text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-silver">Shipping Updates</h3>
                    <p className="text-gray-400">
                      You'll receive updates about your order status and shipping information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto flex items-center gap-2 border-bronze/30 hover:border-bronze text-silver hover:text-bronze"
                >
                  <Home className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>
              
              <Link to="/shop">
                <Button 
                  className="w-full sm:w-auto flex items-center gap-2 bg-bronze hover:bg-amber-600 text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CheckoutSuccess; 