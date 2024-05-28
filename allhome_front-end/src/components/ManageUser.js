import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanelNavigation from './AdminPanelNavigation';

function ManageUser() {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [userList, setUserList] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [currAdminSession, setCurrAdminSession] = useState(null);
    const [mainAdmin, setMainAdmin] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const inputPassRef = useRef(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchUserList();
    }, []);

    React.useEffect(() => {
        if (userList) {
            const su = userList.find(user => user.userId === 1);
            setMainAdmin(su);
        }
    }, [userList]);

    async function fetchUserList() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user_list',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (!response.ok) {
                throw new Error('Failed to retrieve users');
            }

            const data = await response.json();

            if (data.status === 200) {
                setUserList(data.data);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    React.useEffect(() => {
        // check if is in session
        const adminSession = JSON.parse(sessionStorage.getItem('adminSession'));

        if (!adminSession) {
            navigate('/admin/login');
        } else {
            setCurrAdminSession(adminSession);
        }
    }, [navigate]);

    function handleInputChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const url = editingUserId ? `http://127.0.0.1:8000/api/user/${editingUserId}/edit` : `http://127.0.0.1:8000/api/user/add`;
            const method = editingUserId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password
                }),
            });

            if (!response.ok) {
                throw new Error('Error occured!');
            }

            const data = await response.json();

            if (data.status === 201 || data.status === 200) {
                console.log(data.message);

                // clear user input
                setUserData({ username: '', password: '' });
                setEditingUserId(null);
                // updated list
                fetchUserList();
            } else if (data.errors) {
                // Construct error message from validation errors
                let errorMessage = 'Validation errors:';
                for (const field in data.errors) {
                    errorMessage += `\n${field}: ${data.errors[field][0]}`;
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    function handleEdit(user) {
        setUserData({
            username: user.username,
            password: user.password
        });
        setEditingUserId(user.userId);
    };

    async function handleDelete(userId) {
        const response = window.confirm('Are you sure to remove the user?');

        if (response) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}/remove`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to remove user');
                }

                const data = await response.json();

                if (data.status === 200) {
                    console.log(data.message);

                    fetchUserList();
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }
    };

    function handleCancel() {
        setUserData({ username: '', password: '' });
        setEditingUserId(null);
    };

    function handleClickChangeType(e) {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className='container'>
            <AdminPanelNavigation />
            <h1 className='lbl'>Manage User</h1>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                 <div className = "col-sm-4">
                    <input
                      class="form-control"
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className = "col-sm-3">
                    <input
                      class="form-control"
                        ref={inputPassRef}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="col-sm-2">
                    <button class="form-control btn btn-primary" onClick={handleClickChangeType}>{showPassword ? 'Hide Password' : 'Show Password'}</button>
                </div>
                <div className="col-sm-2">
                    <button class="form-control add-update" type="submit">{editingUserId ? 'Update User' : 'Add User'}</button>
                </div>
                <div className="col-sm-1"> 
                    {editingUserId && 
                    <button class="form-control btn btn-danger" onClick={handleCancel}>Cancel</button>}
                </div>
                </div>
            </form>
            <br/>
            <table className='table'>
            <thead>
                <tr>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>
                <tbody>
                {userList && userList.map((user) => {
                    if (user && user.username !== currAdminSession.username && user.username !== mainAdmin?.username) {
                        return (
                            
                                <tr key={user.userId}>
                                     <td>{user.username} </td>
                                     <td>{user.password} </td>
                                    <td><button className = "btn btn-primary editbtn" onClick={() => handleEdit(user)}>Edit</button> </td>
                                   <td> <button className="btn btn-danger" onClick={() => handleDelete(user.userId)}>Delete</button></td>
                                </tr>
                             
                        );
                    }

                    return null;
                })}
            </tbody>
        </table>
        </div>
    );
};

export default ManageUser;