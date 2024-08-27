import { Button } from '@mui/base'
import { Card, TextField} from '@mui/material'
import  { useState } from 'react'
import { BASE_URL } from './config'

const Addcourse = () => {
    const [title , setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState(null)
  return (
  
 <div style={{ display: 'flex', justifyContent: 'center',}} >
  <Card  variant = {'outlined'} style={{   width: 400 , padding: 20}}>

        <TextField  
        fullWidth={true} 
        onChange={(e)=>{
             setTitle(e.target.value)
        }}
        label="Title" 
        variant="outlined"
       />
         <br />
        <TextField  
        fullWidth={true} 
        onChange={(e) =>{
            setDescription(e.target.value)
        }}    
        
        label="Description" 
        variant="outlined" 
        />
         <TextField  
        fullWidth={true} 
        onChange={(e) =>{
            setImage(e.target.value)
        }}    
        
        label="Image Link" 
        variant="outlined" 
        />

         <TextField  
        fullWidth={true} 
        onChange={(e) =>{
            setPrice(e.target.value)
        }}    
        
        label="price" 
        variant="outlined" 
        />

        <br />
        <Button  size="large" variant="contained" 
        onClick={()=>{
           function callback2(data){
           alert('course added successfully')
            window.location = '/courses'

           }
           function callback1(res) {
            res.json().then(callback2)
           }
            fetch (`${BASE_URL}/admin/courses`, {
                method: 'POST',
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: image,
                  price: parseFloat(price.replace('$','$+')),
                  published:true
                }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(callback1)
        }}>Add Course</Button>
  
    </Card>

</div>
  )
}

export default Addcourse