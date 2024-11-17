const pool = require('../config/db');

class User {
    constructor(user_id, username, email, password, role_id) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
    }

    // Creating a new user with username included
    static async create(username, email, password, role_id) {
        const query = 'INSERT INTO Users (username, email, password, role_id) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [username, email, password, role_id]);
        return new User(result.insertId, username, email, password, role_id);
    }

    // Finding a user by ID
    static async findById(user_id) {
        const query = 'SELECT * FROM Users WHERE user_id = ?';
        const [rows] = await pool.execute(query, [user_id]);
        return rows[0] 
            ? new User(rows[0].user_id, rows[0].username, rows[0].email, rows[0].password, rows[0].role_id) 
            : null;
    }

    // Retrieve all users
    static async findAll() {
        const query = 'SELECT * FROM Users';
        const [rows] = await pool.execute(query);
        return rows.map(row => new User(row.user_id, row.username, row.email, row.password, row.role_id));
    }

    // Update user details with username included
    async update() {
        const query = 'UPDATE Users SET username = ?, email = ?, password = ?, role_id = ? WHERE user_id = ?';
        await pool.execute(query, [this.username, this.email, this.password, this.role_id, this.user_id]);
    }

    // Delete user by ID
    static async delete(user_id) {
        const query = 'DELETE FROM Users WHERE user_id = ?';
        await pool.execute(query, [user_id]);
    }
}

module.exports = User;

// const pool = require('../config/db');

// class User {
//     constructor(user_id, email, password, role_id) {
//         this.user_id = user_id;
//         this.email = email;
//         this.password = password;
//         this.role_id = role_id;
//     }

//     static async create(email, password, role_id) {
//         const query = 'INSERT INTO Users (email, password, role_id) VALUES (?, ?, ?)';
//         const [result] = await pool.execute(query, [email, password, role_id]);
//         return new User(result.insertId, email, password, role_id);
//     }

//     static async findById(user_id) {
//         const query = 'SELECT * FROM Users WHERE user_id = ?';
//         const [rows] = await pool.execute(query, [user_id]);
//         return rows[0] ? new User(rows[0].user_id, rows[0].email, rows[0].password, rows[0].role_id) : null;
//     }

//     static async findAll() {
//         const query = 'SELECT * FROM Users';
//         const [rows] = await pool.execute(query);
//         return rows.map(row => new User(row.user_id, row.email, row.password, row.role_id));
//     }

//     async update() {
//         const query = 'UPDATE Users SET email = ?, password = ?, role_id = ? WHERE user_id = ?';
//         await pool.execute(query, [this.email, this.password, this.role_id, this.user_id]);
//     }

//     static async delete(user_id) {
//         const query = 'DELETE FROM Users WHERE user_id = ?';
//         await pool.execute(query, [user_id]);
//     }
// }

// module.exports = User;
