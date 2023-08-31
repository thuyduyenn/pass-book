
import {FaFacebookF} from "react-icons/fa"
import {SiZalo} from "react-icons/si"
import {BsArrowRightShort} from "react-icons/bs"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import EditAdmin from "../components/EditAdmin"
import moment from "moment"
const Home = () => {
    const {allBook,getAllBookLoading} = useContext(AuthContext)
    if(getAllBookLoading){
          return <div className="loading"><div className="lds-ellipsis" ><div></div><div></div><div></div><div></div></div></div>
    }
    return ( 
        <div className="home">
             <div className="home-container">
                {
                    allBook?.length === 0 && (<div className="empty">Không có sách cần pass</div>)
    
                }
                {
                    allBook?.map((item,index)=> {
                        
                        return (
                
                        <div className="item" key={index}>
                        <img src={item.image.url}/>
                        <div className="name">
                              {item.name}
                        </div>
                        <div className="content">
                               <div className="top">
                                  <p>{item.price}<span> K</span></p>
                                  <p>{moment(item.createdAt).calendar()}</p>
                               </div>
                               <div className="description">
                                   <p>Description: <span>{item.description}</span></p>
                               </div>
                               <div className="contact">
                                     <div>
                                         Contact <BsArrowRightShort id="arrow"/>
                                     </div>

                                     <div>
                                         <a href={item.face}><FaFacebookF/></a>
                                         {
                                           item.zalo && <a href={item.zalo ? item.zalo : null}><SiZalo/></a>
                                         }

                                     </div>
                                   
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
 
export default Home;