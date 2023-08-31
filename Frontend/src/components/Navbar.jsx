import {Link} from "react-router-dom"
import {AiTwotoneHome,AiOutlineUserAdd} from "react-icons/ai"
import {CiSquarePlus} from "react-icons/ci"
import {FaTimes} from "react-icons/fa"
import {GiHamburgerMenu} from "react-icons/gi"
import {FiLogOut} from "react-icons/fi"
import {PiNotePencilDuotone} from "react-icons/pi"
import SearchTool from "./SearchTool"
import Options from "./Options"
import {AiOutlineSearch} from "react-icons/ai"
import {MdKeyboardDoubleArrowDown,MdKeyboardDoubleArrowUp} from "react-icons/md"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
const Navbar = () => {
   const { visMenu,handleMenu,visOptions,handleOptions,user,logoutUser,handleChangeSearchText,searchText,handleEdit} = useContext(AuthContext)
    return ( 
        <div className="header">
             <div className="header-top">
               <Link to="/" className="logo res">
                    <img src="https://res.cloudinary.com/doquwihm4/image/upload/v1691668490/A%CC%89nh_chu%CC%A3p_Ma%CC%80n_hi%CC%80nh_2023-08-10_lu%CC%81c_10.59.11_q4gck0.png" alt="logo"/>
                    <div className="seen" style={{display:"none"}}>
                          <form>
                              <input type="text" placeholder="bạn cần tìm sách gì..." id="search-res" onChange={(e)=> handleChangeSearchText({
                                       ...searchText,
                                       text:e.target.value
                              })}/>
                              <label htmlFor="search-res"><AiOutlineSearch/></label>
                          </form>
                          <div className="list">
                          {
                               visOptions ? <MdKeyboardDoubleArrowDown onClick={()=> handleOptions()}/> : <MdKeyboardDoubleArrowUp onClick={()=> handleOptions()}/> 
                          }

                          </div>
                    </div>
               </Link>
               <div className="navbar">
                    <div className="item-search">
                           <SearchTool/>
                    </div>
                    <div className={visOptions ? "item-options options-res" : "item-options"}>
                          <Options/>
                    </div>
                    <div className="item-home"> 
                            <Link to="/"><AiTwotoneHome id="icons"/><span id="legend1">Home</span></Link>
                    </div>
                    <div className="item-create"> 
                            <Link to="/create"><CiSquarePlus id="icons"/><span id="legend1">Create</span></Link>
                    </div>
                    <div className="item-dashboard"> 
                            <Link to={user ? "/dashboard" : "/login/register"}> 
                            <div className="user">
                                  <img src={user ? user.image : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png"}/>
                            </div>
                            <span id="legend1">Dashboard</span>
                            </Link>
                    </div>
               </div>
            </div>
            <div className="header-bottom">
                  <div className="more" >
                  <div>
                  {
                        visMenu ?  <FaTimes  onClick={()=> handleMenu()} id="menu"/> : <GiHamburgerMenu onClick={()=> handleMenu()} id="menu"/>
                  }
                  </div>
                {
                  user ?   <div className="logout" style={{
                                display: visMenu ? "flex" : "none"
                        }}>
                            <span id="legend" onClick={()=>handleEdit()}><PiNotePencilDuotone/><span id="legend1">Sửa hồ sơ</span></span>
                            <span id="legend" onClick={()=> logoutUser()}><FiLogOut/><span id="legend1"> Logout</span></span>
                        </div> 
                        : <Link className="login-btn" to="/login/register" style={{
                              color:"#111",
                             display: visMenu ? "flex" : "none"

                        }}>
                            <span id="legend"><AiOutlineUserAdd/><span id="legend1">Login/Register</span></span>

                        </Link>

                }
                        
                       
                      

                  </div>
            </div>
              
        </div>
     );
}
 
export default Navbar;