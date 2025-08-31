//  create home page contant with welcome message 
import React,{useEffect} from 'react';
import { Typography, Button } from '@mui/material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
export default function Home() {
        const token = localStorage.getItem('token');
        const [user, setUser] = React.useState(null);
        const [currentPassword, setCurrentPassword] = React.useState('');
        const [newPassword, setNewPassword] = React.useState('');

    const homeFun = async () => {
          const res =  await axios.get('http://127.0.0.1:4000/api/auth/home', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res);
        if (res.status === 200) {
            setUser(res.data.user);
            console.log(res.data.user); // Log the user object for debugging
            // You can use the user data as needed in your component
            // For example, display the user's name or email
        }
        else {
            window.location.href = '/login';
        }
    }
    useEffect( () => {
        // You can add any side effects or data fetching here if needed
        if (!token) {
            // Redirect to login if not authenticated
            window.location.href = '/login';
        }
        homeFun();
    }, []);
    const handleUpdate = async(event)=>{
        event.preventDefault();
        const updatedUser = {
            name: user.name,
            username: user.username,
            email: user.email
        };
        try {
            const res = await axios.put("http://127.0.0.1:4000/api/users/update", updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data);
            alert('User information updated successfully');
            
        } catch (error) {
            console.error('Error updating user:', error.message);
            alert('Failed to update user information');
            
        }
        
    }
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        const updatedPassword = {
            currentPassword,
            newPassword
        };
        try {
            const res = await axios.put("http://127.0.0.1:4000/api/users/updatePassword", updatedPassword, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            alert('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error.message);
            alert('Failed to update password');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Home Page!
            </Typography>
            <Typography variant="body1" gutterBottom>
                This is the home page of our application.
            </Typography>
            {user && (
                <>
                <Typography variant="body2" gutterBottom>
                    Logged in as: {user.name} ({user.email})
                </Typography>
                <form onSubmit={handleUpdate}>
                <TextField
                    label="Name"
                    value={user.name}
                    onChange={(e)=>setUser({...user, name: e.target.value})}
                />
                <TextField
                    label="Username"
                    value={user.username}
                    onChange={(e)=>setUser({...user, username: e.target.value})}
                />
                <TextField
                    label="Email"
                    value={user.email}
                    onChange={(e)=>setUser({...user, email: e.target.value})}
                />
                <Button type='submit'>Update</Button>
            </form>
            {/* update password */}
            <form onSubmit={handleUpdatePassword}>
                <TextField
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type='submit'>Update Password</Button>
            </form>
            
                </>
                
            )}
            {/*  form to update usename ,name and email  */}
            
            <Button variant="contained" color="primary" onClick={() =>{ 
                localStorage.removeItem('token'); // Clear token from local storage
                setUser(null); // Clear user state
                window.location.href = '/login'}}>
                Logout
            </Button>
          
        </div>
    );
}