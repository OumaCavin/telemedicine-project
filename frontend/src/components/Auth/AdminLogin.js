// frontend/src/components/Auth/AdminLogin.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../UI/Loading';
import axios from '../../axios';
import './Auth.css';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', {
        email: values.email,
        password: values.password
      });
      
      const { role_id } = response.data.user;
      
      // Check if user is admin (role_id = 1)
      if (role_id !== 1) {
        toast.error('Access denied. Admin credentials required.');
        setIsLoading(false);
        setSubmitting(false);
        return;
      }
      
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Admin login successful!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed! Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card admin-auth-card">
        <div className="admin-badge">ADMIN</div>
        <h1>Admin Portal</h1>
        <p className="auth-subtitle">Sign in to access the administration dashboard</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <Field 
                name="email" 
                type="email" 
                placeholder="Enter admin email"
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field 
                name="password" 
                type="password" 
                placeholder="Enter password"
                className="form-input"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="auth-button admin-button">
              Admin Login
            </button>
          </Form>
        </Formik>
        <div className="auth-link">
          <p><Link to="/login">Regular User Login</Link></p>
          <p className="back-link"><Link to="/">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;