import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/authAPI';
import FormValidator, {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../components/FormValidation';
import '../assets/register.css'

const Register = () => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationRules = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters'
      }
    },
    email: {
      required: 'Email is required',
      validate: validateEmail
    },
    password: {
      required: 'Password is required',
      validate: validatePassword
    },
    confirmPassword: {
      required: 'Please confirm your password',
      validate: (value, formData) => validateConfirmPassword(value, formData)
    }
  };

  const handleRegister = async (formData) => {
    setApiError('');
    setLoading(true);

    try {
      const { token, user } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      login(token, user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div>
          <h2 className="register-title">Create a new account</h2>
          <p className="register-subtext">
            Or <Link to="/login" className="register-link">sign in to your existing account</Link>
          </p>
        </div>

        {apiError && (
          <div className="error-box">
            <p className="error-text">{apiError}</p>
          </div>
        )}

        <FormValidator validationRules={validationRules} onSubmit={handleRegister}>
          {({ formData, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-field">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                  />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                  <p className="password-hint">
                    Must be at least 6 characters with one uppercase letter and one number
                  </p>
                </div>

                <div className="form-field">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword || ''}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                  />
                  {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="form-terms">
                <input id="terms" name="terms" type="checkbox" className="checkbox" />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`submit-btn ${loading ? 'disabled' : ''}`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}
        </FormValidator>
      </div>
    </div>

  );
};

export default Register;