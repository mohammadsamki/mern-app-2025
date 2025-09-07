import axios from "axios"
import { useState,useEffect } from "react"
export default function UserCrud (){
    const [allUsers,setAllUsers] = useState([])
    const [userCount,setUSerCount] = useState(0)
     async function fetchUsers() {
    console.log('user crud')

         const token = localStorage.getItem('token'); // only token; NOT role
      if (!token) {
        console.log('no token')
        return;
      }

        try {
            console.log('start try')
            var res = await axios.get('http://127.0.0.1:4000/api/users',
                {
          headers: { Authorization: `Bearer ${token}` },
        }
            )
            setAllUsers(res.data.users)
            setUSerCount(res.data.count)
            console.log('data for all users',res.data.users)
            
        } catch (error) {
            console.log(error)
            
        }
        
     } 
       useEffect(() => {

         fetchUsers();
       }, []);

    return(
        <div>
            <h1>this is the user crud </h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>email</th>
                        <th>role</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user,index)=>(
                        <tr key={index}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button>update</button>
                                <button>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}