import {FaTimes} from "react-icons/fa"
import {BiSolidUserAccount} from "react-icons/bi"
import {MdEmail} from "react-icons/md"
import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../context/AuthContext"
import ChangePassword from "./ChangePassword"
import UpdateImage from "./UpdateImage"
const EditAdmin = () => {
    const {clickItem,dispatchAdminFunc,stateAdmin,handleChangeAdmin,change,handleEdit,editAdminVis,user,allBook,handleInfoEdit,infoEdit} = useContext(AuthContext)
    const [dashboardList,setDashboardList] = useState([])
    useEffect(()=> {
          const dashboardListFunc = () => {
                 const data = allBook?.filter((item)=> item.userId === user?._id)
                 setDashboardList(data)
          }
          dashboardListFunc()
    },[allBook])
    useEffect(()=> {
        handleInfoEdit({
            ...infoEdit,
            name:user?.name,
            email:user?.email
        })
    },[user])

    
 
    return ( 

     <div className="edit-admin" style={{display: editAdminVis ? "flex" : "none"}}>
           <div className="edit-admin-container">  
                 <div className="edit-admin-top">
                      <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1691668490/A%CC%89nh_chu%CC%A3p_Ma%CC%80n_hi%CC%80nh_2023-08-10_lu%CC%81c_10.59.11_q4gck0.png"/>
                      <div className="close" onClick={()=>handleEdit()}><FaTimes/></div>
                      <div className="image">
                            <img src={user?.image}/>
                      </div>

                 </div>
                 <div className="edit-admin-end"  style={{
                     display: change ? "none" : "flex"
                 }}>
                        <div className="edit-admin-end-list">
                               <ul>
                                   <li onClick={(e)=> {
                                         clickItem(e),
                                         dispatchAdminFunc({type: "Person"})
                                   }} className="border">Cá nhân</li>
                                   <li onClick={(e)=> {
                                         clickItem(e),
                                         dispatchAdminFunc({type :"Post"})
                                   }}>Bài đăng</li>
                               </ul>

                        </div>
                        <div className="edit-admin-end-box">
                               <ul className="person"  style={{
                                  display: stateAdmin?.type === "Person" ? "flex" : "none"
                               }}>
                                  <li><BiSolidUserAccount id="person-icon"/>{ user?.name}</li>
                                  <li><MdEmail id="person-icon"/> {user?.email}</li>
                               </ul>
                               <ul className="post"  style={{
                                  display: stateAdmin?.type === "Post" ? "flex" : "none"
                               }}>
                                   <li>số lương: <span>{dashboardList?.length}</span></li>
                               </ul>
                        </div>
                 </div>
                 <div className="change-dashboard"  style={{
                     display: change ? "flex" : "none"
                 }}>
                      <div className='form'>
                           <UpdateImage/>
                           <ChangePassword/>
                      </div>
                 </div>
                 <div className="change" onClick={()=> handleChangeAdmin(!change)}>
                         {change ? "quay lại" : "change"}
                 </div>
           </div>
    </div> );
}
 
export default EditAdmin;