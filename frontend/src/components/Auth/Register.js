// frontend/src/components/Auth/Register.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Register = () => {
  const initialValues = { username: '', email: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    // Replace this with your API call
    console.log(values);
    toast.success('Registration successful!');
  };

  return (
    <div>
      <h1>Register</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label>Username</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;

// // frontend/src/components/Auth/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Auth.css';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/auth/register', { email, password });
//             alert("Registration successful! You can log in now.");
//         } catch (error) {
//             console.error("Error during registration", error);
//             alert("Registration failed! Please try again.");
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;
