import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "./store/selectors/isUserLoading.js";
import {useSetRecoilState, useRecoilValue,} from "recoil";
import { userState } from "./store/atoms/user.js";
import { userEmailState } from "./store/selectors/userEmail"
import { adminState } from "./store/atoms/admin.js";
import { adminEmailState } from "./store/selectors/adminEmail.js";
import { isAdminLoading } from "./store/selectors/iaAdminLoading.js";
import {AddShoppingCartIcon} from '@mui/icons-material/AddShoppingCart';
const Appbar = () => {
  const navigate = useNavigate()
  
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const adminEmail = useRecoilValue(adminEmailState)
  const setAdmin   = useSetRecoilState(adminState)
const adminLoading = useRecoilValue(isAdminLoading)
  if (userLoading) {
      return <></>
  }
  if(adminLoading) {
    return <></>
  }

  if (userEmail) {
      return <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1
      }}>
          <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
              navigate("/")
          }}>
              <Typography variant={"h6"}>Coursera</Typography>
          </div>
  
          <div style={{display: "flex"}}>
              <div style={{marginRight: 10, display: "flex"}}>
                   {/* <div>
                    <img src="../public/ShoppingTrolley.png" alt="" height='40px' />
                    </div>  */}

{/* <div style={{marginRight: 10}}>
                      <Button
                          onClick={() => {
                              navigate("/courses")
                          }}
                      >Purchesed Courses</Button>
                  </div> */}


                  <div style={{marginRight: 10}}>
                      <Button
                          onClick={() => {
                              navigate("/courses")
                          }}
                      >Courses</Button>
                  </div>

                  <Button
                      variant={"contained"}
                      onClick={() => {
                          localStorage.setItem("token", null);
                          setUser({
                              isLoading: false,
                              userEmail: null
                          })
                          navigate('/')
                      }}
                      
                  >Logout</Button>
                
              </div>
              
          </div>
      </div>
  }

  if (adminEmail) {
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1
    }}>
        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
            navigate("/")
        }}>
            <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10, display: "flex"}}>
            <div style={{marginRight: 10}}>
                    <Button
                        onClick={() => {
                            navigate("/addcourse")
                        }}
                    >Add course</Button>
                </div>

                <div style={{marginRight: 10}}>
                    <Button
                        onClick={() => {
                            navigate("/courses")
                        }}
                    >Courses</Button>
                </div>

                <Button
                    variant={"contained"}
                    onClick={() => {
                        localStorage.setItem("token", null);
                        setAdmin({
                            isLoad: false,
                            adminEmail: null
                        })
                        navigate('/')
                    }}
                >Logout</Button>
            </div>
        </div>
    </div>
}


  return (
    <div>
        <div>
         <Button
         onClick={()=>{
           navigate('/adminlogin') 
         }}
         >Admin</Button>  
         <Button
         onClick={()=>{
            navigate('/userlogin')
         }}
         >USER</Button>
        
        </div>
    </div>
  )
}

export default Appbar