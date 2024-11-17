// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Loading from '../UI/Loading';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
    }, 2000);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={handleLogin}
        >
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" />
            <button type="submit">Login</button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default Login;



// // frontend/src/components/Auth/Login.js
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import './Auth.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const history = useHistory();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/auth/login', { email, password });
//             localStorage.setItem('token', response.data.token);
//             history.push('/patient/dashboard');
//         } catch (error) {
//             console.error("Error logging in", error);
//             alert("Login failed! Please check your credentials.");
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2>Login</h2>
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
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
