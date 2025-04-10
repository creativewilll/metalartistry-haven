import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, CreditCard, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/PageTransition';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';

// Stripe Card Element styling to match our theme
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#E2E8F0",
      fontFamily: 'system-ui, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#64748B"
      }
    },
    invalid: {
      color: "#FF3333",
      iconColor: "#FF3333"
    }
  }
};

// The inner checkout form with Stripe hooks
const CheckoutForm = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    saveInfo: true
  });
  
  // Get Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  
  if (cart.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-charcoal py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-silver mb-6">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Add some products to your cart before checking out.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center px-6 py-3 text-lg font-semibold 
              bg-[linear-gradient(135deg,#18181b_0%,#27272a_70%,#f59e0b_85%,#fbbf24_100%)]
              hover:bg-amber-500 hover:bg-none
              text-white rounded-lg transition-all duration-300
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              border border-bronze/20 hover:border-amber-400"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };
  
  // Function to handle the payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      setIsProcessing(false);
      return;
    }
    
    // Get the Card Element
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setPaymentError("Card information is incomplete");
      setIsProcessing(false);
      return;
    }
    
    // In a real app, you would send the order data to your backend,
    // which would create a payment intent with Stripe API and return the client secret
    // For demo, we're simulating a successful payment
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, simulate a successful payment
      // In real implementation, you would use confirmCardPayment with the client secret
      
      // If successful, clear cart and navigate to success page
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentError(
        error instanceof Error 
          ? error.message 
          : "An unknown error occurred while processing your payment"
      );
      setIsProcessing(false);
    }
  };
  
  const nextStep = () => {
    if (formData.email && formData.name && formData.address && formData.city && 
        formData.state && formData.postalCode && formData.country) {
      setStep(2);
      window.scrollTo(0, 0);
      
      // In a real implementation, this is where you would create a payment intent
      // by sending the order data to your backend, which would return the client secret
    } else {
      // Simple form validation
      alert("Please fill out all required fields");
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-charcoal py-12">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <Link 
              to="/cart" 
              className="flex items-center gap-2 text-silver hover:text-bronze transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 flex rounded bg-zinc-800">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-bronze transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-sm text-silver flex items-center gap-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-bronze text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>Shipping</span>
                </div>
                <div className={`text-sm flex items-center gap-1 ${step === 2 ? 'text-silver' : 'text-gray-500'}`}>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full ${step === 2 ? 'bg-bronze text-white' : 'bg-zinc-800 text-gray-500'}`}>
                    {step === 2 ? <Check className="h-3 w-3" /> : 2}
                  </span>
                  <span>Payment</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold font-cinzel mb-6 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
            {step === 1 ? 'Shipping Information' : 'Payment'}
          </h1>
          
          <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl border border-zinc-800">
            <div className="p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold text-silver">Complete Your Purchase</h2>
                <div className="text-xl font-bold text-amber-500">${getCartTotal().toLocaleString()}</div>
              </div>
              
              <form onSubmit={step === 1 ? (e) => { e.preventDefault(); nextStep(); } : handleSubmit}>
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                        placeholder="Street address"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="city">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                          placeholder="City"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="state">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                          placeholder="State/Province"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="postalCode">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                          placeholder="Postal Code"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="country">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-silver focus:border-bronze focus:outline-none"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="MX">Mexico</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button 
                        type="submit"
                        className="w-full py-6 bg-bronze hover:bg-amber-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div>
                    <div className="mb-6 p-3 bg-zinc-800/60 rounded-md border border-zinc-700/60 flex items-center gap-3">
                      <Lock className="h-4 w-4 text-bronze" />
                      <span className="text-sm text-gray-300">Your payment info is secured with industry-standard encryption</span>
                    </div>
                    
                    {/* Stripe Card Element */}
                    <div className="p-6 border border-zinc-700 rounded-md bg-zinc-800 mb-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-3" htmlFor="card-element">
                          Credit or Debit Card
                        </label>
                        <CardElement
                          id="card-element"
                          options={CARD_ELEMENT_OPTIONS}
                          className="p-4 bg-zinc-900 border border-zinc-700 rounded-md"
                        />
                      </div>
                      
                      {/* Show any payment errors */}
                      {paymentError && (
                        <div className="mt-4 p-3 bg-red-900/40 border border-red-700 rounded-md text-red-200 text-sm">
                          {paymentError}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          className="h-4 w-4 accent-bronze mr-2"
                        />
                        <span className="text-sm text-gray-300">Save payment information for next time</span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-6 bg-bronze hover:bg-amber-600 text-white font-medium rounded-md transition-colors flex items-center justify-center"
                      disabled={isProcessing || !stripe}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        `Pay $${getCartTotal().toLocaleString()}`
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Order Summary - Only show on first step */}
          {step === 1 && (
            <div className="mt-8 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h2 className="text-xl font-semibold text-silver mb-4">Your Order</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-silver font-medium">{item.product.title}</h3>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>${item.product.price.toLocaleString()} × {item.quantity}</span>
                        <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between text-silver mb-2">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-silver mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-amber-500 mt-4 pt-4 border-t border-zinc-800">
                  <span>Total</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

// Main checkout component wrapped with Stripe Elements
const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout; 