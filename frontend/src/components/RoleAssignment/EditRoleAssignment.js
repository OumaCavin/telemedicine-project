import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditRoleAssignment = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [assignment, setAssignment] = useState({ userId: '', roleId: '' });
    const [loading, setLoading] = useState(true);
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

        // Fetch the existing role assignment data to populate the form
        axios.get(`/api/role-assignments/${id}`)
            .then(response => {
                setAssignment(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role assignment data');
                setLoading(false);
            });
    }, [id]);

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

        // Send PUT request to update the role assignment
        axios.put(`/api/role-assignments/${id}`, assignment)
            .then(() => {
                setLoading(false);
                navigate(`/role-assignments/${id}`); // Redirect to the assignment view page
            })
            .catch(err => {
                setError('Error updating role assignment');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Role Assignment</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditRoleAssignment;
