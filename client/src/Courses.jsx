import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userEmailState } from "./store/selectors/userEmail";
import { BASE_URL } from "./config";

function Courses() {
    const [courses, setCourses] = useState([]);

    const init = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/courses/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(course => (
                <Course key={course._id} course={course} />
            ))}
        </div>
    );
}

export function Course({ course }) {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);

    const handlePurchase = async () => {
        try {
            const { data: keyData } = await axios.get(`${BASE_URL}/user/checkout/getkey`);
            const { data: orderData } = await axios.post(`${BASE_URL}/user/checkout`, { amount: course.price });

            const options = {
                key: keyData.key,
                amount: orderData.order.amount,
                currency: "INR",
                name: "vishal keshri",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orderData.order.id,
                callback_url: `${BASE_URL}/user/checkout/paymentverification`,
                prefill: {
                    name: "Gaurav Kumar",
                    email: userEmail,
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error initiating payment", error);
        }
    };

    return (
        <Card style={{ margin: 10, width: 300, minHeight: 200, padding: 20 }}>
            <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <img src={course.imageLink} alt="course" style={{ width: 300 }} />
            <Typography textAlign={"center"} variant="h5">Rs/-{course.price}</Typography>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                {userEmail ? (
                    <Button variant="contained" size="large" onClick={handlePurchase}>Purchase</Button>
                ) : (
                    <Button variant="contained" size="large" onClick={() => navigate(`/course/${course._id}`)}>Edit</Button>
                )}
            </div>
        </Card>
    );
}

export default Courses;
