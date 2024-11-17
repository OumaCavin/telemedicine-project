

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        const { username, email, password, role_id } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password: hashedPassword, role_id });
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ error: 'User registration failed', details: error.message });
        }
    }

    async login(req, res) {
        const { identifier, password } = req.body; // Accepts either username or email as identifier

        try {
            // Find the user by either username or email
            const user = await User.findOne({
                where: { 
                    [User.sequelize.Op.or]: [{ username: identifier }, { email: identifier }] 
                }
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid username/email or password' });
            }

            // Generate a token upon successful login
            const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Login failed', details: error.message });
        }
    }

    async logout(req, res) {
        // Logout logic can be handled on the client-side by deleting the token.
        res.status(200).json({ message: 'Logout successful' });
    }
}

module.exports = new AuthController();



// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// class AuthController {
//     async register(req, res) {
//         const { email, password, role_id } = req.body;

//         try {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = await User.create({ email, password: hashedPassword, role_id });
//             res.status(201).json({ message: 'User created successfully', user: newUser });
//         } catch (error) {
//             res.status(500).json({ error: 'User registration failed', details: error.message });
//         }
//     }

//     async login(req, res) {
//         const { email, password } = req.body;

//         try {
//             const user = await User.findOne({ where: { email } });

//             if (!user || !(await bcrypt.compare(password, user.password))) {
//                 return res.status(401).json({ error: 'Invalid email or password' });
//             }

//             const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             res.status(200).json({ message: 'Login successful', token });
//         } catch (error) {
//             res.status(500).json({ error: 'Login failed', details: error.message });
//         }
//     }

//     async logout(req, res) {
//         // Logout logic can be handled on the client-side by deleting the token.
//         res.status(200).json({ message: 'Logout successful' });
//     }
// }

// module.exports = new AuthController();
