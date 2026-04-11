// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../UI/Loading';
import axios from '../../axios';
import './Auth.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', {
        email: values.email,
        password: values.password
      });
      
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Login successful!');
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
      <div className="auth-card">
        <h1>Welcome Back</h1>
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
                placeholder="Enter your password"
                className="form-input"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </Form>
        </Formik>
        <div className="auth-link">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
