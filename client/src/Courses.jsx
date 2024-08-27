import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userEmailState } from "./store/selectors/userEmail";
import { BASE_URL } from "./config";


function Courses() {
    const [courses, setCourses] = useState([]);
    

    const init = async () => {
        const response = await axios.get(`${BASE_URL}/admin/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

     

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>

        {courses.map(course => {
            return <Course course={course} />

        }
        )}
        
    </div>
}

let extractkey
let extractorder
export function Course({course}) {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    if(userEmail){
        return <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20
        }}>
            <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <img src={course.imageLink} style={{width: 300}} ></img>
            <Typography textAlign={"center"} variant="h5">Rs/-{course.price}</Typography>
            <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
                <Button variant="contained" size="large"
                onClick={() =>{
                  axios.get(`${BASE_URL}/user/checkout/getkey`).then(res =>{
                    const{data} = res
                    const {key} = data
                    extractkey  = key
                    
                  })
                  axios.post(`${BASE_URL}/user/checkout`,{ amount : course.price}).then(res =>{
                    const {data} = res
                    const {order} = data
                    extractorder = order
                  })

                    const options  = {
                        key : extractkey , // Enter the Key ID generated from the Dashboard
                        amount: extractorder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        name: "vishal keshri",
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: extractorder.id, 
                        callback_url: `${BASE_URL}/user/checkout/paymentverification',
                        prefill: {
                            "name": "Gaurav Kumar",
                            "email": "gaurav.kumar@example.com",
                            "contact": "9000090000"
                        },
                        notes: {
                            "address": "Razorpay Corporate Office"
                        },
                        theme: {
                            "color": "#3399cc"
                        }
                    };
                    const razor  = new window.Razorpay(options)
                     razor.open()
                }}> purchase</Button>
                
            </div>
        </Card>
    }

    else {
        return <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20
        }}>
            <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <img src={course.imageLink} style={{width: 300}} ></img>
            <Typography textAlign={"center"} variant="h5">Rs/-{course.price}</Typography>
            <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
                <Button variant="contained" size="large" onClick={() => {
                    navigate("/course/" + course._id);
                }}>Edit</Button>
            </div>
        </Card>
    }
   

}

export default Courses;