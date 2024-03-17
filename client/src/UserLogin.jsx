
import { Button, Card, TextField, Typography } from '@mui/material'
import { BASE_URL } from './config'
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom' 
import {useSetRecoilState} from "recoil";
import {userState} from "./store/atoms/user";


const UserLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);
  return (
    <div>
         <div  style={{marginTop: 150 , marginBottom: 10 , display: 'flex', justifyContent: 'center' , backgroundColor:'#eeeeee', }}>
        <Typography variant='h6'>Welcome user signin below</Typography>
        </div>
       
     <div style={{ display: 'flex', justifyContent: 'center'}} >
      <Card  variant = {'outlined'} style={{   width: 400 , padding: 20}}>
            <TextField
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
               
                <br/>
                <Button variant='outlined' size="large"
                onClick={async() => {
                  const response = await axios.post(`${BASE_URL}/user/login`, {
                      username: email,
                      password: password
                  }, {
                    headers: {
                        "Content-type": "application/json"
                    }
                  })
                  let data = response.data;
                  
                  localStorage.setItem("token", data.token);
                  // window.location = "/"
                  setUser({
                    userEmail: email, 
                    isLoading: false})
                  navigate("/courses")
              }}
                > Login</Button>
                 <Typography>Not User ? <a onClick={()=> navigate('/usersignup')} style={{ color:'blue', cursor:'pointer'}}> Sign up</a></Typography> 
            </Card>
        </div>
    </div>
  )
}

export default UserLogin