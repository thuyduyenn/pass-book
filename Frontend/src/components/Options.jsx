import { useContext } from "react";
import {Link} from "react-router-dom" 
import { AuthContext } from "../context/AuthContext";

const Options = () => {
    const {handleDispatch} = useContext(AuthContext)
    const data = [
      "All",
      "Năm 1",
      "Năm 2",
      "Năm 3",
      "Năm 4"
    ]
    const addChose = (e) => {
         const allOptions = document.querySelectorAll(".options a")
         allOptions.forEach((item)=> {
                    item.classList.remove("choose")            
         })
         const selectItem = e.target
         selectItem.classList.add("choose")
        
    }
    return ( 
      <div className="options">
       {
            data.map((item,index)=>{
                    return (
                        <Link to="/options" key={index}  onClick={(e)=> {
                              handleDispatch({
                                type:`${item}`
                              }),
                              addChose(e)

                              }

                        }>{item}</Link>
                    )
            } )
       }
     
      
</div>
        
     )  ;
}
 
export default Options;