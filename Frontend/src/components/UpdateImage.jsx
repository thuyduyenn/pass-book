import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {FaCameraRetro} from "react-icons/fa"
import {BiSolidUserAccount} from "react-icons/bi"
import {MdEmail} from "react-icons/md"

const UpdateImage = () => {
    const {infoEdit,handleInfoEdit,changePasswordVis,handlePressSaveName,handleChangePasswordVis,pressChangeLoading} = useContext(AuthContext)
    const [nameImage,setNameImage] = useState({
        name:""
 })
 const handleImageChange = (e) => {
       const fileName = e.target.files[0].name
       setNameImage({
           ...nameImage,
           name:fileName
       })
       const file = e.target.files[0]
       TransformFile(file)
 }
 const TransformFile = (file) => {
       const reader = new FileReader();
       if(file){
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                handleInfoEdit({
                      ...infoEdit,
                      image:reader.result
                })
            }
       }
 }


    return ( 
        <form className="form-edit-top" style={{display:changePasswordVis ? "none" : "flex"}} onSubmit={handlePressSaveName}>

                            <div>
                                 <label><BiSolidUserAccount/></label>
                                 <input type="text" placeholder="Enter new your name.." onChange={(e)=> handleInfoEdit({
                                    ...infoEdit,
                                    name:e.target.value
                                 })} ></input>

                            </div>
                            <div>
                                  <label><MdEmail/></label>
                                  <input type="text" placeholder="Enter your email" onChange={(e)=> handleInfoEdit({
                                    ...infoEdit,
                                    email:e.target.value
                                 })}></input>
                            </div>
                            <div className="image-edit">
                                   <input type="file" accept="/image" hidden id="image-edit" onChange={handleImageChange}/>
                                 <label htmlFor="image-edit">
                                     <div><FaCameraRetro/></div>
                                    <div>{nameImage?.name ? nameImage.name : "chọn ảnh đại diện mới"}</div>
                                 </label>

                               
                            </div>
                            <button className={pressChangeLoading ? "disable" : ""}>{pressChangeLoading ? "loading" : "save"}</button>
                            <a onClick={()=> handleChangePasswordVis()}>change password</a>
        </form>
                            
                           
     );
}
 
export default UpdateImage;