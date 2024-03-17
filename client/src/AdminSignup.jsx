import { Button, Card, TextField, Typography } from '@mui/material'
import{ useState } from 'react'
import { adminState } from './store/atoms/admin'
import { useSetRecoilState } from 'recoil'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from './config';


const AdminSignup = () => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const setAdmin= useSetRecoilState(adminState);
    const navigate = useNavigate()
  return (
    <div>
          <div style={{marginTop: 150 , marginBottom: 10 , display: 'flex', justifyContent: 'center', backgroundColor:'#eeeeee'}}>
        <Typography variant='h6'>Welcome admin signup below</Typography>
        </div>
       
     <div style={{ display: 'flex', justifyContent: 'center'}} >
      <Card  variant = {'outlined'} style={{   width: 400 , padding: 20}}>
         <div >
            <TextField 
            fullWidth={true} 
            onChange={(e)=>{
                 setEmail(e.target.value)
            }}
            label="Email" 
            variant="outlined"
           />
             <br />
            <TextField    
            fullWidth={true} 
            onChange={(e) =>{
                setPassword(e.target.value)
            }}    
            
            label="password" 
            variant="outlined" 
            type='password' />
            <br />
            <Button
                    size={"large"}
                    variant="contained"
                    onClick={async() => {
                        const response = await axios.post(`${BASE_URL}/admin/signup`, {
                            username: email,
                            password: password
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        setAdmin({adminEmail: email, isLoading: false})
                        navigate("/courses")
                    }}

                > Signup</Button>
        </div>
        </Card>
   </div>
    </div>
  )
}

export default AdminSignup