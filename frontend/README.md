
# Telemedicine Application

## Overview
The Telemedicine Application is a web-based platform designed to connect patients with healthcare providers through video consultations, appointment scheduling, and access to health services. The application aims to enhance the accessibility of healthcare services and improve patient experiences.

## Features
- User authentication (sign up, log in)
- Patient dashboard for managing profiles and appointments
- Doctor dashboard for managing schedules and patient consultations
- Health center locator to find nearby services
- Admin dashboard for managing users and monitoring system performance
- Audit logging for tracking changes and ensuring data integrity

## Tech Stack
- **Frontend:** React.js, styled-components, Formik, Yup, React Router, Axios
- **Backend:** Node.js, Express.js, MySQL
- **Middleware:** JWT for authentication, custom error handling
- **Other Libraries:** react-toastify for notifications, react-loading for loading indicators

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)


### Installation

#### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/OumaCavin/telemedicine-project.git
   cd telemedicine-project/backend
   ```

2. Install dependencies:
   ```bash
   npm install express mysql2 dotenv body-parser cors jsonwebtoken express-validator morgan bcryptjs winston
   npm install --save-dev nodemon
   ```

3. Create a `.env` file and configure your database connection:
   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=telemedicine
   ```

4. Run the backend server:
   ```bash
   node app.js
   ```

#### Frontend
1. Change to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install axios react-router-dom prop-types dotenv styled-components formik yup react-toastify react-loading
   ```

3. Start the React application:
   ```bash
   npm start
   ```

### Usage
- Visit `http://localhost:3000` in your browser to access the application.
- Sign up as a patient or doctor to explore the features.

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to PLP for their guidance and support throughout the project development.


