import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
const ChangePassword = () => {
    const {changePasswordVis,handleChangePasswordVis,handlePasswordInfoChange,passwordInfoChange,updateChangePasswordPress,changePasswordLoading,changePasswordError} = useContext(AuthContext)
    const [eye1,setEye1] = useState(false)
    const [eye2,setEye2] = useState(false)
    return ( <form className="form-edit-end" style={{
        display: changePasswordVis ? "flex" : "none"
   }} onSubmit={updateChangePasswordPress}>
      <div>
          <label onClick={()=>setEye1(!eye1)} style={{cursor: "pointer"}}>{eye1 ? <AiFillEye/> : <AiFillEyeInvisible/>}</label>
          <input type={eye1 ? "text" : "password"} placeholder="your password" onChange={(e)=> handlePasswordInfoChange({
                ...passwordInfoChange,
                passwordOld:e.target.value
          })} />
      </div>
      <div>
          <label onClick={()=>setEye2(!eye2)} style={{cursor: "pointer"}}>{eye2 ? <AiFillEye/> : <AiFillEyeInvisible/>}</label>
          <input type={eye2 ? "text" : "password"} placeholder="your new password" onChange={(e)=> handlePasswordInfoChange({
                ...passwordInfoChange,
                passwordNew:e.target.value
          })}/>
      </div>
      <a className="error" style={{
          textDecoration:"none"
      }}>{changePasswordError?.message}</a>
      <button className={changePasswordLoading ? "disable" : ""}>{changePasswordLoading ? "loading" : "save"}</button>
      <a onClick={()=> handleChangePasswordVis()}> quay lại </a>
 </form> );
}
 
export default ChangePassword;