import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoleAssignment = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [assignment, setAssignment] = useState({ userId: '', roleId: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users and roles to populate the form options
        axios.get('/api/users')
            .then(response => setUsers(response.data))
            .catch(err => setError('Error fetching users'));

        axios.get('/api/roles')
            .then(response => setRoles(response.data))
            .catch(err => setError('Error fetching roles'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send a POST request to create a new role assignment
        axios.post('/api/role-assignments', assignment)
            .then(() => {
                setLoading(false);
                navigate('/role-assignments'); // Redirect to the list of role assignments
            })
            .catch(err => {
                setError('Error creating role assignment');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create Role Assignment</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User</label>
                    <select
                        name="userId"
                        value={assignment.userId}
                        onChange={handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Role</label>
                    <select
                        name="roleId"
                        value={assignment.roleId}
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={loading}>Create Assignment</button>
            </form>
        </div>
    );
};

export default CreateRoleAssignment;
