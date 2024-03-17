import { Button, Card, TextField, Typography } from '@mui/material'
import { BASE_URL } from './config'
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom' 
import {useSetRecoilState} from "recoil";
import {adminState} from "./store/atoms/admin";


const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const setAdmin = useSetRecoilState(adminState);
  return (
    <div>
         <div  style={{marginTop: 150 , marginBottom: 10 , display: 'flex', justifyContent: 'center' , backgroundColor:'#eeeeee', }}>
        <Typography variant='h6'>Welcome admin signin below</Typography>
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
                <Button  
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                            username: email,
                            password: password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                        const data = res.data;

                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setAdmin({
                            adminEmail: email,
                            isLoading: false
                        })
                        navigate("/courses")
                    }}

                > Signin</Button>
                <Typography>Not Admin ? <a onClick={()=> navigate('/adminsignup')} style={{ color:'blue', cursor:'pointer'}}> Sign up</a></Typography> 
            </Card>
        </div>
    </div>
  )
}

export default AdminLogin