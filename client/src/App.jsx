import { useEffect } from "react";
import AdminLogin from "./AdminLogin"
import Appbar from "./Appbar"
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import axios from "axios";
import { userState } from "./store/atoms/user";
import { BASE_URL } from "./config";
import { adminState } from "./store/atoms/admin";
import UserLogin from "./UserLogin";
import Courses from "./Courses";
import Addcourse from "./Addcourse";
import { Loading } from "./Loading";
import Landing from "./Landing";
import Course from "./Course";
import AdminSignup from "./AdminSignup";
import UserSignup from "./UserSignup";
import PaymentSuccess from "./PaymentSuccess";


function App() {
 

  return (
    <>
     <div style={{ backgroundColor:'#eeeeee', height:'100vh', width:'100vw'}}>
    <RecoilRoot>
    <Router>
      <Appbar/>
      <InitUser/>
      <InitAdmin/>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/userlogin" element={<UserLogin/>}/>
        <Route path="/courses"  element={<Courses/>}/>
        <Route path="/addcourse" element={<Addcourse/>}/>
        <Route path="/loading" element={<Loading/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/course/:courseId" element={<Course/>}/>
        <Route path="/adminsignup" element={<AdminSignup/>}/>
        <Route path="/usersignup" element={<UserSignup/>}/>
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>
      </Routes>
     </Router>
    </RecoilRoot>
     </div>
    </>
  )
}

function InitAdmin() {
  const setAdmin = useSetRecoilState(adminState);
  const inits = async() => {
      try {
          const response = await axios.get(`${BASE_URL}/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setAdmin({
                  isLoad: false,
                  adminEmail: response.data.username
              })
          } else {
              setAdmin({
                  isLoad: false,
                  adminEmail: null
              })
          }
      } catch (e) {

          setAdmin({
              isLoad: false,
              adminEmail: null
          })
      }
  };

  useEffect(() => {
      inits();
  }, []);

  return <></>
}



function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`${BASE_URL}/user/u`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              } 
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App
