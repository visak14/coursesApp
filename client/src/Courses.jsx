import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userEmailState } from "./store/selectors/userEmail";


function Courses() {
    const [courses, setCourses] = useState([]);
    

    const init = async () => {
        const response = await axios.get(`http://localhost:3000/admin/courses/`, {
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
            <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
                <Button variant="contained" size="large"
                >purchase</Button>
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
            <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
                <Button variant="contained" size="large" onClick={() => {
                    navigate("/course/" + course._id);
                }}>Edit</Button>
            </div>
        </Card>
    }
   

}

export default Courses;