import  {shoolYear,semester,majors}  from "../data/info"
import {BsPencilSquare} from "react-icons/bs"
import {FaFacebookF} from "react-icons/fa"
import {SiZalo} from "react-icons/si"
import {BsArrowRightShort} from "react-icons/bs"
import {AiFillPicture} from "react-icons/ai"
import { useContext,useState } from "react"
import EditAdmin from "../components/EditAdmin"
import { AuthContext } from "../context/AuthContext"
const Create = () => {
     const {handleCreate,createInfo,uploadBook,uploadError,uploadLoading} = useContext(AuthContext)
     const [nameImage,setNameImage] = useState({
            name:""
     })
     const handleImageCreate = (e) => {
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
                    handleCreate({
                          ...createInfo,
                          image:reader.result
                    })
                }
           }
     }
    return ( 
        <div className="create">
            <div className="create-container">
                   <div className="create-main">
                          <form>
                               <h1>Tạo nhanh</h1>
                               <strong>thông tin</strong>
                                <div className="info">
                                        <select  onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                year:e.target.value
                                        })}
                                         value={createInfo.year}
                                        >
                                                 {
                                                    shoolYear.map((year,index) => {
                                                          return <option value={year} key={index}>{year}</option>
                                                    })
                                                 }
                                        </select>
                                        <select onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                semester:e.target.value
                                        })}  value={createInfo.semester}>
                                                 {
                                                    semester.map((item,index) => {
                                                          return <option value={item} key={index}>{item}</option>
                                                    })
                                                 }
                                        </select>
                                        <select onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                majors:e.target.value
                                        })} value={createInfo.majors}>
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
                                            <input type="text" placeholder="link facebook ...." onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                face:e.target.value
                                        })} value={createInfo.face}/>
                                            <input type="text" placeholder="link zalo ...." onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                zalo:e.target.value
                                        })} value={createInfo.zalo}
                                            />
                                         </div>
                                         <div className="file">
                                             <input type="text" placeholder="tên sách..." onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                name:e.target.value
                                        })} value={createInfo.name}/>
                                             <div className="price">
                                                 <input type="text" placeholder="giá.." id="price" onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                price:e.target.value
                                        })} value={createInfo.price}/>
                                                 <label id="price">K</label>
                                             </div>

                                             <input type="file" accept="/image"  id="file" hidden onChange={handleImageCreate}/>
                                             <label htmlFor="file">
                                                   <div>
                                                         {nameImage?.name ? nameImage.name : "chọn ảnh cần đăng" }
                                                   </div>
                                                   <div>Browser</div>
                                             </label>
                                         </div>





                                </div>
                                <strong>Description</strong>
                                <div className="des">
                                    <label><BsPencilSquare/></label>
                                     <input type="text" placeholder="describe the condition of your book.." onChange={(e)=> handleCreate({
                                                ...createInfo,
                                                description:e.target.value
                                        })} value={createInfo.description}/>
                                </div>
                                <div className="error">{uploadError?.message}</div>
                                <div className="submit-btn" style={{
                                      cursor:"pointer"
                                }} onClick={()=> uploadBook()}>
                                       {uploadLoading ? "Loading" : "Upload"}
                                </div>
                          </form>
                          <div className="mask">

                          </div>
                   </div>
                   <div className="success">
                     <div className="mask">

                     </div>

                   <div className="success-form">
                        <h1>Thành phẩm</h1>
                        <div className="success-child">
                           {
                            createInfo?.image ? <img src={createInfo?.image ? createInfo.image : "null"}/> : <div className="box-image"><AiFillPicture/></div>
                           }

                     
                           <div className="content">
                           <div className="name">
                                {createInfo?.name ? createInfo.name : "tên sách" }
                            </div>
                            <div className="top">
                               <p>{createInfo?.price ? createInfo.price : "giá pass sách " }<span>K</span></p>
                              
                            </div>
                            <div className="description">
                                <p> <span>Description: </span>{createInfo?.description ? createInfo.description : "hãy mô tả tình trạng sách của bạn trước khi pass" }</p>
                            </div>
                            <div className="contact">
                                  <div>
                                      Contact<BsArrowRightShort id="arrow"/>
                                  </div>

                                  <div>
                                      <a href={createInfo?.face ? createInfo.face : null }><FaFacebookF/></a>
                                      <a href={createInfo?.zalo ? createInfo.zalo : null }><SiZalo/></a>
                                  </div>
                                
                            </div>

                     </div>
                        </div>
                       
                        
                   </div>
                   </div>
            </div>
            <EditAdmin/>
        </div>
     );
}
 
export default Create;