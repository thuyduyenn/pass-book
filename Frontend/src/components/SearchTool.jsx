import { useContext } from "react";
import {CiSearch} from "react-icons/ci"
import { AuthContext } from "../context/AuthContext";
import {Link} from "react-router-dom"
const SearchTool = () => {
      const {handleChangeSearchText,searchText} = useContext(AuthContext)

  
    return ( 
        <Link to="/" className="search">
              <form>
                    <input type="text" placeholder="Bạn cần tìm sách gì ...." id="search-btn" onChange={(e)=>handleChangeSearchText({
                           ...searchText,
                           text:e.target.value
                    })}/>
                    <label htmlFor="search-btn"><CiSearch/></label>
              </form>
        </Link>
     );
}
 
export default SearchTool;