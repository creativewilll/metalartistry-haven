import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const TypeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    notes: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showStepError, setShowStepError] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)[]>([]);

  const steps = [
    {
      title: "What's your name?",
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true }
      ]
    },
    {
      title: "How can we reach you?",
      fields: [
        { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { name: 'email', label: 'Email Address', type: 'email', required: true }
      ]
    },
    {
      title: "Where are you located?",
      fields: [
        { name: 'address', label: 'Address', type: 'text', required: false }
      ]
    },
    {
      title: "What are you looking for?",
      fields: [
        { name: 'projectDescription', label: 'Project Description', type: 'textarea', required: true }
      ]
    },
    {
      title: "When do you want it done?",
      fields: [
        { name: 'timeline', label: 'Timeline', type: 'text', required: false }
      ]
    },
    {
      title: "What's your budget?",
      fields: [
        {
          name: 'budget',
          label: 'Budget Range',
          type: 'select',
          options: [
            { value: '>1k', label: '>$1,000' },
            { value: '1k-5k', label: '$1,000 - $5,000' },
            { value: '5k-10k', label: '$5,000 - $10,000' },
            { value: '10k-25k', label: '$10,000 - $25,000' },
            { value: '>25k', label: '>$25,000' }
          ],
          required: false
        }
      ]
    },
    {
      title: "Any special notes?",
      fields: [
        { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
      ]
    }
  ];

  // Reset currentFieldIndex and errors when step changes
  useEffect(() => {
    setCurrentFieldIndex(0);
    setShowStepError(false);
  }, [currentStep]);

  const validateStep = (stepIndex: number): boolean => {
    const currentStepFields = steps[stepIndex].fields;
    const newErrors: FormErrors = {};
    let isValid = true;

    currentStepFields.forEach(field => {
      if (field.required && !formData[field.name as keyof FormData]) {
        newErrors[field.name] = 'This field is required';
        isValid = false;
      }

      // Phone number validation
      if (field.name === 'phone' && formData.phone && !/^\d+$/.test(formData.phone)) {
        newErrors[field.name] = 'This should not contain any text!';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, fieldIndex: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      const currentStepFields = steps[currentStep].fields;
      
      // If we're not on the last field of the current step
      if (fieldIndex < currentStepFields.length - 1) {
        // Move to the next field
        const nextFieldIndex = fieldIndex + 1;
        setCurrentFieldIndex(nextFieldIndex);
        inputRefs.current[nextFieldIndex]?.focus();
      } else {
        // If we're on the last field of the current step
        if (currentStep < steps.length - 1) {
          // Validate before moving to next step
          if (validateStep(currentStep)) {
            handleNext();
          } else {
            setShowStepError(true);
          }
        } else {
          // If we're on the last step, validate and submit
          if (validateStep(currentStep)) {
            handleSubmit();
          } else {
            setShowStepError(true);
          }
        }
      }
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowStepError(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setShowStepError(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://n8n.spurlocksolutions.ai/webhook/mattcoffeycrm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any, fieldIndex: number) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name as keyof FormData],
      onChange: handleChange,
      onKeyPress: (e: React.KeyboardEvent) => handleKeyPress(e, fieldIndex),
      ref: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => {
        inputRefs.current[fieldIndex] = el;
      },
      className: `w-full px-4 py-3 bg-steel-800/50 border ${
        errors[field.name] ? 'border-red-500' : 'border-bronze/20'
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-bronze/50 focus:border-transparent text-white placeholder-gray-400`,
      placeholder: `Enter your ${field.label.toLowerCase()}`,
      required: field.required,
      autoFocus: fieldIndex === currentFieldIndex
    };

    switch (field.type) {
      case 'textarea':
        return (
          <div>
            <textarea
              {...commonProps}
              rows={4}
              className={commonProps.className + " resize-none"}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
      case 'select':
        return (
          <div>
            <select {...commonProps}>
              <option value="">Select a budget range</option>
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
      default:
        return (
          <div>
            <input type={field.type} {...commonProps} />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        );
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-charcoal/80 to-charcoal/60 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-bronze rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 mb-8">We'll be in touch with you shortly.</p>
          <button
            onClick={() => window.close()}
            className="px-6 py-3 bg-bronze text-white rounded-lg hover:bg-bronze/90 transition-colors"
          >
            Close Window
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal/80 to-charcoal/60">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-steel-900/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-bronze/20"
          >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
            <div className="w-full bg-steel-800 h-1 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-bronze to-amber-500 rounded-full"
              />
            </div>
          </div>

          {showStepError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-center"
            >
              Please fill out all required fields!
            </motion.div>
          )}

          <div className="space-y-6">
            {steps[currentStep].fields.map((field, index) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field, index)}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className={`flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors
                ${currentStep === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-bronze to-amber-500 
                  text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-bronze to-amber-500 
                  text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </button>
            )}
          </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TypeForm; 