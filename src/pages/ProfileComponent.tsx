import { useEffect, useState } from "react"
import axios from "axios"


const ProfileComponent = () => {
    const id = window.localStorage.getItem('id')
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')

    const token = window.localStorage.getItem('token')

    useEffect(() => {
    axios.get(`https://poker-club-backend.onrender.com/api/get/${id}` , 

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  .then ( async (res) => {
    console.log(res.data);

    let email =  await res.data[0].email;
    let username =  await res.data[0].username;

    setEmail(email);
    setName(username);

    console.log("Email:", res.data[0].email);
    console.log("Name:", res.data[0].username);
  });

    }, [])

    return(
        <div className="profile-div">
            <p>{name}</p>
          <p>{email}</p>

        </div>
    )
}

export default ProfileComponent