import {BsArrowRightShort} from "react-icons/bs"
import {FaFacebookF} from "react-icons/fa"
import {SiZalo} from "react-icons/si"
import {MdOutlineKeyboardArrowUp,MdOutlineKeyboardArrowDown} from "react-icons/md"
import  {majors} from "../data/info"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import EditAdmin from "../components/EditAdmin"
import moment from "moment"
const OptionsPage = () => {
    const {handleDispatch, bookOptions,visMajors,handleVisMajors,state} = useContext(AuthContext)

    const addChose = (e) => {
            const allItem = document.querySelectorAll(".majors-item")
            allItem.forEach((item)=> {
                   item.classList.remove("choose")
            })
            const selectItem = e.target
            selectItem.classList.add("choose")
      }
        return ( 
        <div className="options-page">
              <div className="options-container">
                     <div className="options-choose" style={{
                           display: state.type === "All" || state.type === null  ? "none" : "flex"
                     }}>
                               <div className="list-main" onClick={()=>handleVisMajors()}>
                                       {state.type} 
                                       {
                                        visMajors ? <MdOutlineKeyboardArrowDown id="list-main-icon"/> : <MdOutlineKeyboardArrowUp id="list-main-icon"/>
                                      }

                               </div>
                               <div className="list-majors" style={{
                                   display: visMajors ? "flex" : "none"
                               }}>
                                    {
                                        majors.map((item,index)=> {
                                            if(index !== 0){
                                                return  <div className="majors-item" key={index} onClick={(e)=> {
                                                    handleDispatch({
                                                     ...state,
                                                     majors:item

                                                    }),
                                                    addChose(e)

                                                }}>{item}</div>
                                            }

                                        })
                                    }

                               </div>
                     </div>
                     <div className="options-list">
                     
                     {
                    bookOptions?.length === 0 && (<div className="empty">Không có sách cần pass</div>)
                       
                    
                       
                    
                }
                {
                    bookOptions?.map((item,index)=> {
                        
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
                                   <p> <span>Description: </span>{item.description}</p>
                               </div>
                               <div className="contact">
                                     <div>
                                         Contact<BsArrowRightShort id="arrow"/>
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
              </div>
              <EditAdmin/>
        </div>
     );
}
 
export default OptionsPage;