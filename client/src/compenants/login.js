import React, {useEffect,useState} from "react";
import axios from 'axios'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function Login (){
    

  const [ username,setUsername] = useState('')
    const [ password,setPassword] = useState('')
    const handelSubmit = async (e)=>{
        e.preventDefault();
      
        try {
            const res = await axios.post('http://127.0.0.1:4000/api/auth/login',{
                identifier:username,password
            })
            console.log(res.data)
            localStorage.setItem('token', res.data.token); // Store token in local storage
            alert('Login done')
            // Redirect to home or dashboard after successful login
            window.location.href = '/'; // Adjust the redirect path as needed
            
        } catch (error) {
            console.log(error.data)
            alert('Login failed')
            
        }
    }

    return(
        <div sx={{margin:40}}>
            <form onSubmit={handelSubmit}>
    
           <FormControl>

      <InputLabel>username</InputLabel>
      <Input 
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      />    </FormControl>


           <FormControl>

      <InputLabel>password</InputLabel>
      <Input 
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />    </FormControl>
          
    <Button type="submit">Login</Button>
    {/* register button */}
    <Link to="/register">
      <Button variant="outlined" sx={{marginLeft: 2}}>Register</Button>
    </Link>
    </form>
        </div>
    )
}