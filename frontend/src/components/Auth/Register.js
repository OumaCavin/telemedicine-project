// frontend/src/components/Auth/Register.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axios';
import Loading from '../UI/Loading';
import './Auth.css';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = { username: '', email: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      await axios.post('/auth/register', values);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed! Please try again.';
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
      <div className="auth-card">
        <h1>Create Account</h1>
        <Formik 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field 
                name="username" 
                type="text" 
                placeholder="Choose a username"
                className="form-input"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field 
                name="email" 
                type="email" 
                placeholder="Enter your email"
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field 
                name="password" 
                type="password" 
                placeholder="Create a password"
                className="form-input"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="auth-button" disabled={isLoading}>
              Create Account
            </button>
          </Form>
        </Formik>
        <div className="auth-link">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
