import React, {useEffect,useState} from "react";
import axios from 'axios'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
export default function Register (){

    const [ username,setUsername] = useState('')
    const [ name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [ password,setPassword] = useState('')
    const [ confermPassword,setConfermPassword] = useState('')
    const handelSubmit = async (e)=>{
        e.preventDefault();
        console.log(name,username,email,password,confermPassword)
        if (password !== confermPassword){
            alert('please chek the pass')
            return;
        }
        try {
            const res = await axios.post('http://127.0.0.1:4000/api/auth/register',{
                name,username,email,password
            })
            console.log(res.data)
            alert('reg done')
            // Redirect to login or home after successful registration
            window.location.href = '/login'; // Adjust the redirect path as needed
            
        } catch (error) {
            console.log(error.data)
            alert('register failed')
            
        }
    }

    return(
        <div sx={{margin:40}}>
            <form onSubmit={handelSubmit}>
           <FormControl>
      <InputLabel>Email address</InputLabel>
      <Input 
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />

    </FormControl>
           <FormControl>

      <InputLabel>username</InputLabel>
      <Input 
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      />    </FormControl>
           <FormControl>

      <InputLabel>name</InputLabel>
      <Input 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />    </FormControl>
           <FormControl>

      <InputLabel>password</InputLabel>
      <Input 
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />    </FormControl>
           <FormControl>

      <InputLabel>conferm pass </InputLabel>
      <Input 
      type="password"
      value={confermPassword}
      onChange={(e)=>setConfermPassword(e.target.value)}
      />
    </FormControl>
    <Button type="submit">Register</Button>
    </form>
        </div>
    )
}