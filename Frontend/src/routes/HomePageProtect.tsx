

import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet} from 'react-router-dom'

interface State{
   userStatus:{
      userAuthStatus:boolean
   }
 }

function HomePageProtect() {


   const [isloading,setIsLoading]=useState<Boolean>(true)
   const [status,setStatus]=useState<Boolean>(false)
   const states=useSelector((state:State)=>state.userStatus.userAuthStatus)
   

   useEffect(()=>{
      setIsLoading(false)
      setStatus(states)
   },[])

   if(isloading){
      return <div>...loading</div>
   }

  return (
    <div>
      {status?<Outlet/>:<Navigate to={"/login"}/>}
    </div>
  )


}

export default HomePageProtect



