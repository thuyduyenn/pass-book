import { useEffect, useReducer } from "react"
import {createContext, useCallback,useState} from "react"
import swal from 'sweetalert';
import {postRequest,getRequest,baseUrl} from "../../utils/services"
export const AuthContext = createContext()
export const AuthContextProvider = ({children}) => {
        const [user,setUser] = useState(null)
        const [flatNewUpdate,setFlatNewUpdate] = useState(false)
        useEffect(()=> {
                 let user = localStorage.getItem("user") ? localStorage.getItem("user") : null
                 setUser(JSON.parse(user))
        },[])

        const handleConvertToSignIn = useCallback(() => {

            const container = document.getElementById('container');
            container.classList.remove("right-panel-active");
        })
        const handleConvertToSignUp = useCallback(() => {

            const container = document.getElementById('container');
            container.classList.add("right-panel-active");
        })
        const [visMenu,setVisMenu] = useState(false) // hiển thị tool trong menu
        const handleMenu = useCallback(()=> {//xử lí thay đỏi false true trong menu 
            setVisMenu(!visMenu)
        },[visMenu])
        const [visOptions,setVisOptions] = useState(false)//hiênt thị thanh options
        const handleOptions = useCallback(()=> {
            setVisOptions(!visOptions)
        },[visOptions])
        //handle sign uo start
            const [signUpInfo,setSignUpInfo] = useState({
                name:"",
                email:"",
                password:"",
                image:"",
            })
            const handleSignUpChange = useCallback((info)=>{
                setSignUpInfo(info)
            })
                  
           const [registerError,setRegisterError] = useState(null)
           const [registerLoading,setRegisterLoading] = useState(false)
        
          const registerUser = useCallback(async(e)=> {
               e.preventDefault();
               setRegisterError(null)
               setRegisterLoading(true)
               const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(signUpInfo))
               setRegisterLoading(false)
               if(response.error){
                   return setRegisterError(response)
               }
               setUser(response)
               localStorage.setItem("user",JSON.stringify(response))
               setVisMenu(!visMenu)


          }) 
        
          
        //handle signup end
      

        //handle sign in start
           const [signInInfo,setSignInInfo] = useState({
               email:"",
               password:""
            
           })
           const handleSignIn = useCallback((info)=> {
               setSignInInfo(info)
           })
           const [loginError,setLoginError] = useState(null)
           const [loginLoading,setLoginLoading] = useState(false)

           const loginUser = useCallback(async(e)=> {
                     e.preventDefault()
                     setLoginError(null)
                     setLoginLoading(true)
                     const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(signInInfo))
                     setLoginLoading(false)
                     if(response.error){
                         return setLoginError(response)

                     }
                     swal({
                        title: "Đăng nhập thành công", 
                        icon: "success",
                        button: "Ok kay!",
                      });
                     setUser(response)
                     localStorage.setItem("user",JSON.stringify(response))
                     setVisMenu(!visMenu)

                     
           })

        //handle sign in ends


        //handle create starts
            const [createInfo,setCreateInfo] = useState({
                year:"",
                semester:"",
                majors:"",
                face:"",
                "zalo":"",
                "name":"",
                price:"",
                image:"",
                description:""

            })
            const handleCreate = useCallback((info)=>{
                setCreateInfo(info)
            })
            const [uploadError,setUploadError] = useState(null)
            const [uploadLoading,setUploadLoading] = useState(false)
            const [uploadNew,setUploadNew] = useState(null)
            const uploadBook = useCallback(async()=> {
                setUploadLoading(true)
                setUploadError(null)
                const newCreate = {
                      userId:user?._id,
                      nameUser:user?.name,
                      emailUser:user?.email,
                      imageUser:user?.image,
                      ...createInfo

                }
                const response = await postRequest(`${baseUrl}/create/upload`,JSON.stringify(newCreate))
                setUploadLoading(false)
                if(response.error){
                        return setUploadError(response)
                }
                setUploadNew(response)
                setCreateInfo({
                year:"Năm học",
                semester:"Học kì",
                majors:"Ngành học",
                face:"",
                "zalo":"",
                "name":"",
                price:"",
                image:"",
                description:""
                })
                swal({
                    title: "Đăng bài thành công", 
                    icon: "success",
                    button: "Ok kay!",
                  });
                 


            })
        //handle create ends
        

        //handle home list starts
        const [newUpdate,setNewUpdate] = useState(null)
        const [deleteLoading,setDeleteLoading] = useState(false)
        const [bookOptions,setBookOptions] = useState([])
        const [getAllBookRemember,setGetAllRemember] = useState([])// nhớ book 
        const [allBook,setAllBook] = useState([])
        const [getAllBookLoading,setGetAllBookLoading] = useState(false)
        const [errorBook,setErrorBook] = useState(null)
        useEffect(()=> {
              const getAllBook = async()=> {
                    setGetAllBookLoading(true)
                    const response = await getRequest(`${baseUrl}/create/get-all/book`)
                    setGetAllBookLoading(false)
                    if(response.error){
                         return setErrorBook(response)
                    }
                    setAllBook(response)
                    setGetAllRemember(response)
                    setBookOptions(response)

              }
              getAllBook()
        },[deleteLoading,uploadNew,newUpdate])
        
        //handle home list ends


        //handle logout starts
            const logoutUser = useCallback(()=> {
                  localStorage.removeItem("user")
                  swal({
                    title: "Hẹn gặp lại", 
                    icon: "success",
                    button: "Ok kay!",
                  });
                  setUser(null)
                  setVisMenu(!visMenu)
            })
        //handle logout ends

     //handle search starts
        const [searchText,setSearchText] = useState({
              text:""
        })
    
        const handleChangeSearchText = useCallback((info)=> {
                setSearchText(info)
                const text = info?.text
                const textFilter = convertText(text?.trim().toLowerCase())
                if(info?.text !==  ""){
                  const data = allBook?.map((item)=> {
                        const itemName = item.name
                        const itemNameFilter = convertText(itemName?.trim().toLowerCase())
                        const dataVil = itemNameFilter.includes(textFilter)
                        if(dataVil) {
                            return item
                        }else {
                            return null
                        }
                    })

                    const dataList = data?.filter((item)=> item !== null)
                    setAllBook(dataList)
                }else {
                    setAllBook(getAllBookRemember)
                }
                
        })


     
      const convertText = (str)=> {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g," ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    
        return str
   }
       const initial = {
                type:null,
                majors:null
       }
       const reducer = (state,action) => {
             switch (action){
                    case (action.type === "All" && action.majors === null): {
                         return {
                            ...state,
                            type:"All"
                         }
                    }
                    case (action.type === "Năm 1" && action.majors === null): {
                        return  {
                            ...state,
                            type:"Năm 1"
                         }
                    }
                    case (action.type === "Năm 2" && action.majors === null): {
                        
                        return {
                           ...state,
                           type:"Năm 2"
                        }
                   }
                   case  (action.type === "Năm 3" && action.majors === null): {
                       return  {
                           ...state,
                           type:"Năm 3"
                        }
                   }
                   case (action.type === "Năm 4" && action.majors === null): {
                    return  {
                        ...state,
                        type:"Năm 4"
                     }
                }
                default: {
                    return {
                         ...state,
                        ...action
                    }
                }
               }  

       }
       

       const [state,dispatch] = useReducer(reducer,initial)

        const handleDispatch = useCallback((info)=> {
            dispatch(info)
          
        })   
        useEffect(()=> {
               const handleOptions = () => {
                    if(state.type !== null && state.majors === null){
                           if(state.type === "All"){
                              return  setBookOptions(getAllBookRemember)
                           }else {
                                 const data = getAllBookRemember?.filter((item)=> item.year === state.type)
                                return  setBookOptions(data)
                           }
                    }
                    if(state.type !== null && state.majors !== null){
                             if(state.type === "All"){
                                 return setBookOptions(getAllBookRemember)
                             } else {
                                  const data =  getAllBookRemember?.filter((item)=> item.year === state.type && item.majors === state.majors)
                                 
                                  return setBookOptions(data)
                                  
                             }
                    }

               }
               handleOptions()
        },[state])
     
         const [visMajors,setVisMajors] = useState(false)
         const handleVisMajors = useCallback(()=> {
            setVisMajors(!visMajors)
         },[visMajors])


      
       //handle search ends



       //handle delete on dashboard starts
       const [deleteError,setDeleteError] = useState(null)

        const handleDelete = useCallback(async(item)=> {
              const deleteId = item._id
              setDeleteError(null)
              setDeleteLoading(true)
              const response = await getRequest(`${baseUrl}/create/delete/${deleteId}`)
              setDeleteLoading(false)
              if(response.error){
                  return setDeleteError(response)
              }
              console.log(response)
              swal({
                title: "Xoá dữ liệu thành công", 
                icon: "success",
                button: "Ok kay!",
              });

        })
       //handle delete on dashboard ends

       //handle change starts
          const [update,setUpdate] = useState(false)
          const [updateInfo,setUpdateInfo] = useState({
            _id:"",
            year:"",
            semester:"",
            majors:"",
            face:"",
            "zalo":"",
            "name":"",
            price:"",
            image:"",
            description:""
          })
          const handleUpdate = useCallback((item)=>{
            setUpdate(!update)
            if(item){
                setUpdateInfo({
                    ...updateInfo,
                    ...item
                })
            }else {
                setUpdateInfo({
                    _id:"",
                   year:"",
                   semester:"",
                    majors:"",
                   face:"",
                   "zalo":"",
                   "name":"",
                    price:"",
                    image:"",
                    description:""
                })
            }
          },[update])
            const updateChange = useCallback((info)=> {
                  setUpdateInfo(info)
            })

            const [updateLoading,setUpdateLoading] = useState(false)


            const updateBtn = useCallback(async()=> {
                setUpdateLoading(true)
                 
                const response = await postRequest(`${baseUrl}/create/update`,JSON.stringify(updateInfo))
                setUpdateLoading(false)
                setNewUpdate(response)
            },[updateInfo])
           

       //handle change ends
            
            
       //handle change admin starts
       const clickItem = useCallback((e)=> {
        const allItem = document.querySelectorAll(".edit-admin-end-list ul li")
        allItem.forEach((item)=> {
            item.classList.remove("border")
        })
        e.target.classList.add("border")
 })
 const initialItem = {
       type:"Person",
    
 }
 const reducerItem = (state,action) => {
     switch (action.type){
           case "Person": {
                 return {
                     ...state,
                     type:"Person"
                 }
           }
           case "Post" : {
                      return {
                         ...state,
                         type:"Post"
                      }
           }
           
           default: {
              return state
           }
          
 }
 }
 const [stateAdmin,dispatchAdmin] = useReducer(reducerItem,initialItem)
 const dispatchAdminFunc = useCallback((info)=>{
       dispatchAdmin(info)
  
 })

 const [change,setChange] = useState(false)
 const handleChangeAdmin = useCallback(()=> {
         setChange(!change)
 },[change])

 const [changePasswordVis,setChangePasswordVis] = useState(false)
 const handleChangePasswordVis = useCallback(()=> {
    setChangePasswordVis(!changePasswordVis)
 },[changePasswordVis])


 const [editAdminVis,setEditAdminVis] = useState(false)
 const handleEdit = useCallback(()=> {
    setEditAdminVis(!editAdminVis)
 },[editAdminVis])


 const [infoEdit,setInfoEdit] = useState({
       name: user?._name || "",
       email:user?.email || "",
       image:"",
       _id: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : ""

 })



 const handleInfoEdit = useCallback((info)=> {
        setInfoEdit(info)
 })
 const [passwordInfoChange,setPasswordInfoChange] = useState({
       passwordOld:"",
       passwordNew:""
 })
 const handlePasswordInfoChange = useCallback((info)=> {
    setPasswordInfoChange(info)
 })
 const [pressChangeError,setPressChangeError] = useState(null)
 const [pressChangeLoading,setChangeLoading] = useState(false)

 const handlePressSaveName = useCallback(async(e)=> {
         e.preventDefault()
        setPressChangeError(null)
        setChangeLoading(true)
         if(infoEdit?.image !== ""){
               const newInfo = {
                   name: infoEdit?.name,
                   email:infoEdit?.email,
                   image: infoEdit?.image,
                   _id:infoEdit?._id
           

               }
              

               const response =  await postRequest(`${baseUrl}/users/update/admin`,JSON.stringify(newInfo))
               if(response.error){
                  setPressChangeError(response)
               }
               getUser()
               setChangeLoading(false)
               setFlatNewUpdate(!flatNewUpdate)



               
         }else {
              const newInfo = {
                  name: infoEdit?.name,
                  email:infoEdit?.email,
                   _id:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null
              }
           
              
              const response =  await postRequest(`${baseUrl}/users/update/admin`,JSON.stringify(newInfo))
              if(response.error){
                  setPressChangeError(response)
               }
               getUser()
               setChangeLoading(false)
               setFlatNewUpdate(!flatNewUpdate)

             
         }
         
         
 },[infoEdit,user,flatNewUpdate])


const getUser = async() => {
             const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null
            
             const response = await getRequest(`${baseUrl}/users/get/user/${userId}`)
           
             localStorage.setItem("user",JSON.stringify(response))
             setUser(response)
            
         
}
  



const [changePasswordLoading,setChangePasswordLoading] = useState(false) 
const [changePasswordError,setChangePasswordError] = useState(null)
const updateChangePasswordPress = useCallback(async(e)=> {
         e.preventDefault()
         const newData = {
            ...passwordInfoChange,
            _id:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null

         }
        setChangePasswordLoading(true)
        setChangePasswordError(null)
        const response = await postRequest(`${baseUrl}/users/change/password`,JSON.stringify(newData))
        setChangePasswordLoading(false)
        if(response.error){
                return setChangePasswordError(response)
        }

   

},[passwordInfoChange])






 
       //handle change admin ends



      return (
        <AuthContext.Provider value={{
               user,
               handleConvertToSignIn,
               handleConvertToSignUp,
               visMenu,
               handleMenu,
               visOptions,
               handleOptions,


               handleSignUpChange,
               signUpInfo,
               registerUser,
               handleSignIn,
               signInInfo,
               loginUser,
               registerError,
               registerLoading,
               loginError,
               loginLoading,
               handleCreate,
               createInfo,
               uploadBook,
               uploadError,
               uploadLoading,
               errorBook,
               allBook,
               getAllBookLoading,
               logoutUser ,

               handleChangeSearchText,
               searchText,
               handleDispatch,
               bookOptions,
               visMajors,
               handleVisMajors,
               state,


               handleDelete,
               deleteError,
               deleteLoading,

               handleUpdate,
               updateLoading,
               update,
               updateInfo,
               updateChange,
               updateBtn,
               clickItem,
               dispatchAdminFunc,
               stateAdmin,
               handleChangeAdmin,
               change,
               handleChangePasswordVis,
               changePasswordVis,
               handleEdit,
               editAdminVis,
               handleInfoEdit,
               infoEdit,
               handlePasswordInfoChange,
               passwordInfoChange,
               handlePressSaveName,
               pressChangeLoading,
               updateChangePasswordPress,
               changePasswordLoading,
               changePasswordError



              



               


        }}>
            {children}
        </AuthContext.Provider>
      )
}