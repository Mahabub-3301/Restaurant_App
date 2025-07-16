import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/authAPI';
import FormValidator, { validateEmail } from '../components/FormValidation';
import '../assets/login.css'

const Login = ({ setLogin, setIsAdmin }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const validationRules = {
    email: {
      required: 'Email is required',
      validate: validateEmail
    },
    password: {
      required: 'Password is required'
    }
  };

  const handleLogin = async (formData) => {
    setApiError('');
    setLoading(true);

    try {
      const { token, user } = await loginUser({
        email: formData.email,
        password: formData.password
      });

      login(token, user);
      navigate(from, { replace: true });
      if (user.role === 'admin') {
        navigate('/admin');
        setIsAdmin(true)
      } else {
        navigate('/dashboard');
        setIsAdmin(false)
      }
      console.log(user);
      setLogin(true)
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div>
          <h2 className="login-title">Sign in to your account</h2>
          <p className="login-subtext">
            Or <Link to="/register" className="login-link">create a new account</Link>
          </p>
        </div>

        {apiError && (
          <div className="error-box">
            <p className="error-text">{apiError}</p>
          </div>
        )}

        <FormValidator validationRules={validationRules} onSubmit={handleLogin}>
          {({ formData, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'form-error' : ''}`}
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-field">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`form-input ${errors.password ? 'form-error' : ''}`}
                  />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" name="remember-me" />
                  Remember me
                </label>
                <a href="#" className="forgot-link">Forgot your password?</a>
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`login-button ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          )}
        </FormValidator>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-buttons">
          <a href="#" className="social-btn">Facebook</a>
          <a href="#" className="social-btn">Google</a>
          <a href="#" className="social-btn">Apple</a>
        </div>
      </div>
    </div>

  );
};

export default Login;