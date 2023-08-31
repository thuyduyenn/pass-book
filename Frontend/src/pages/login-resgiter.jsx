import { useContext, useEffect} from "react";
import {useNavigate}  from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

const Login = () => {
      
     const navigate = useNavigate()
    const {handleConvertToSignIn,handleConvertToSignUp,handleSignUpChange,signUpInfo,registerUser,handleSignIn,signInInfo,loginUser,user,registerError,registerLoading,loginError,loginLoading} = useContext(AuthContext)
    useEffect(()=> {
          if(user?._id){
              navigate("/")
          }
     },[user,navigate])
    //handle image in sign up start
      const handleImage = (e) => {
             const file = e.target.files[0]
              TransformFile(file)
      }
      const  TransformFile = (file) => {
           const reader = new FileReader();
           if(file){
                 reader.readAsDataURL(file)
                 reader.onloadend = () => {
                    handleSignUpChange({
                          ...signUpInfo,
                          image: reader.result
                    })
                 } 
           }
      }
    //handle image in sign up end
    return ( 
        <div className="login-register">
            <div className="container" id="container">
            <div className="form-container sign-up-container" >
                   <form onSubmit={registerUser}>
                        <h1>Create Account</h1>
                         <input type="text" placeholder="Name" onChange={(e)=>handleSignUpChange({
                               ...signUpInfo,
                               name:e.target.value
                         })}/>
                         <input type="email" placeholder="Email"  onChange={(e)=>handleSignUpChange({
                               ...signUpInfo,
                               email:e.target.value
                         })}/>
                         <input type="password" placeholder="Password"  onChange={(e)=>handleSignUpChange({
                               ...signUpInfo,
                               password:e.target.value
                         })}/>
                         <input type="file" accept="/image" onChange={handleImage}/>
                         <div className="error">{registerError?.message}</div>
                         <button className={registerLoading ? "disable" : ""}>{registerLoading ? "Loading" : " Sign up"}</button>
                   </form>
            </div>
            <div className="form-container sign-in-container">
                  <form onSubmit={loginUser}>
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" onChange={(e)=>handleSignIn({
                              ...signInInfo,
                              email:e.target.value
                        })}/>
                        <input type="password" placeholder="Password" onChange={(e)=>handleSignIn({
                              ...signInInfo,
                              password:e.target.value
                        })}/>
                        <div className="error">{loginError?.message}</div>
                        <a href="#">Forgot your password</a>
                        <button className={loginLoading ? "disable" : ""}>{loginLoading ? "Loading" : "Sign in"}</button>
                  </form>
            </div>
            <div className="overlay-container">
                    <div className="overlay">
                          <div className="overlay-panel overlay-left">
                                <h1>Welcome back</h1>
                                <p>To keep connected with us please with your personal info</p>
                                <button className="ghost" id="signIn" onClick={()=> handleConvertToSignIn()}>Sign In</button>
                          </div>
                          <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp"  onClick={()=> handleConvertToSignUp()}>Sign Up</button>
                          </div>
                    </div>
            </div>
        </div>
        </div>
        
     );
}
 
export default Login;