import { useState, useEffect } from 'react';

const FormValidator = ({ children, validationRules, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form whenever formData changes
  useEffect(() => {
    if (isSubmitting) {
      validateForm();
    }
  }, [formData, isSubmitting]);

  const validateForm = () => {
    const newErrors = {};

    Object.keys(validationRules).forEach(field => {
      const value = formData[field] || '';
      const rules = validationRules[field];
      
      // Required validation
      if (rules.required && !value.trim()) {
        newErrors[field] = rules.required;
        return;
      }
      
      // Pattern validation
      if (rules.pattern && value && !rules.pattern.value.test(value)) {
        newErrors[field] = rules.pattern.message;
        return;
      }
      
      // Min length validation
      if (rules.minLength && value.length < rules.minLength.value) {
        newErrors[field] = rules.minLength.message;
        return;
      }
      
      // Custom validation
      if (rules.validate) {
        const customError = rules.validate(value, formData);
        if (customError) newErrors[field] = customError;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Pass validation functions and state to children
  return children({
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFormData
  });
};

export default FormValidator;

// Helper validation functions
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? '' : 'Invalid email format';
};

export const validatePassword = (password) => {
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password needs at least one number';
  return '';
};

export const validateConfirmPassword = (confirm, { password }) => {
  return confirm === password ? '' : 'Passwords do not match';
};