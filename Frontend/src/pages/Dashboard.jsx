import {BiDotsVerticalRounded} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import {PiNotePencilBold} from "react-icons/pi"
import {FaTimes} from "react-icons/fa"
import {colors} from "../data/info"
import  {shoolYear,semester,majors}  from "../data/info"
import {BsPencilSquare} from "react-icons/bs"
import { useContext, useEffect,useState } from "react"
import moment from "moment"
import { AuthContext } from "../context/AuthContext"
import {useNavigate}  from "react-router-dom"
import EditAdmin from "../components/EditAdmin"
const Dashboard = () => {
    
    const {allBook,user,handleDelete,deleteError,deleteLoading,handleUpdate,update,updateInfo, updateChange,updateBtn,updateLoading} = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(()=> {
           if(!user?._id){
                     navigate("/")
           }
    },[user,navigate])
    
    const [dashboardList,setDashboardList] = useState([])
    useEffect(()=> {
          const dashboardListFunc = () => {
                 const data = allBook?.filter((item)=> item.userId === user?._id)
                 setDashboardList(data)
          }
          dashboardListFunc()
    },[allBook])

    if(dashboardList?.length === 0 ){
         return (<div>Bạn chưa có tương tác nào </div>)
    } 
    return ( 
        
        <div className="dashboard">
            <div className="light-box" style={{
                   display: update ? "flex" : "none"
            }}>
                 <div className="light-box-container">
                       <div className="light-box-top">
                           <FaTimes onClick={()=>{
                              handleUpdate()
                              }} 
                              style={{
                                cursor:"pointer"
                           }}/>
                       </div>
                       <div className="light-box-main">
                       <form>
                               <h1>Bạn cần thay đổi thông tin nào</h1>
                               <strong>thông tin</strong>
                                <div className="info">
                                        <select onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             year:e.target.value
                                        })} value={updateInfo?.year}>
                                                 {
                                                    shoolYear.map((year,index) => {
                                                          return <option value={year} key={index}>{year}</option>
                                                    })
                                                 }
                                        </select>
                                        <select  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             semester:e.target.value
                                        })} value={updateInfo?.semester}>
                                                 {
                                                    semester.map((item,index) => {
                                                          return <option value={item} key={index}>{item}</option>
                                                    })
                                                 }
                                        </select>
                                        <select  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             majors:e.target.value
                                        })} value={updateInfo?.majors}>
                                                 {
                                                    majors.map((item,index) => {
                                                          return <option value={item} key={index}>{item}</option>
                                                    })
                                                 }
                                        </select>
                                </div>
                                <strong>Contact</strong>
                                <div className="contact">
                                         <div className="social-media">
                                            <input type="text" placeholder="link facebook ...."  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             face:e.target.value
                                        })} value={updateInfo?.face}/>
                                            <input type="text" placeholder="link zalo ...."  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             zalo:e.target.value
                                        })} value={updateInfo?.zalo}/>
                                         </div>
                                         <div className="file">
                                             <input type="text" placeholder="tên sách..."  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             name:e.target.value
                                        })} value={updateInfo?.name}/>
                                             <div className="price">
                                                 <input type="text" placeholder="giá.." id="price"  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             price:e.target.value
                                        })} value={updateInfo?.price}/>
                                                 <label id="price">K</label>
                                             </div>

                                             
                                         </div>





                                </div>
                                <strong>Description</strong>
                                <div className="des">
                                    <label><BsPencilSquare/></label>
                                     <input type="text" placeholder="describe the condition of your book.."  onChange={(e)=>  updateChange({
                                             ...updateInfo,
                                             description:e.target.value
                                        })} value={updateInfo?.description}/>
                                </div>
                                <div  onClick={()=>updateBtn()} className={updateLoading ? "disable submit-btn" : "submit-btn"}>
                                       {updateLoading ? "loading" : "update"}
                                </div>
                          </form>
                       </div>
                 </div>
            </div>
            <h1>My dashboard</h1>
            <div className="dashboard-container">
          
            {
                  dashboardList?.map((item,index)=> {
                    const random = Math.floor(Math.random() * 28);
                      const random1 = Math.floor(Math.random() * 28);
                        return (
                            <div className="dashboard-item" key={index} style={{
                            background:"linear-gradient(to left," + colors[random] + "," + colors[random1] + ")",
                            boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
                          }}>
                     <div className="dashboard-item-left">
                     <div className="image">
                         <img src={item.image.url}/>
                      </div>
                      <div className="content">
                          <p>{item.name}</p>
                          <p>{item.price}<span>K</span></p>
                          <p>Description: <span>{item.description}</span></p>
                          <p>Link facebook : <span>{item.face}</span></p>
                          <p>Link zalo : <span>{item.zalo ? item.zalo : "trống"}</span></p>
                          <p>Ngày đăng <span>{moment(item.createdAt).calendar()}</span></p>
                      </div>

                     </div>
                     <div className="dot">
                        <BiDotsVerticalRounded id="th-dot"/>
                        <div className="detail">
                              <ul>
                                  <li onClick={()=> handleDelete(item)} className={deleteLoading ? "disable" : ""}> <AiFillDelete/>{deleteLoading ? "loading" : "xoá"}</li>
                                  <li onClick={()=>handleUpdate(item)}> <PiNotePencilBold/>thay đổi</li>
                              </ul>
                        </div>
                     </div>
                 </div>
                        )
                  })
            }
            
                 
                      
              
                  </div>
                  <EditAdmin/>
        </div>
     );
}
 
export default Dashboard;