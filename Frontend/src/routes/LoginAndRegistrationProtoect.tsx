import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface State{
  userStatus:{
     userAuthStatus:boolean
  }
}


function LoginAndRegistrationProtoect() {

  const [isloading,setIsLoading]=useState<Boolean>(true)
  const [authStatus,setAuthStatus]=useState<Boolean>(false)
  const states=useSelector((state:State)=>state.userStatus.userAuthStatus)

  useEffect(()=>{
    console.log(states)
    setIsLoading(false)
    setAuthStatus(states)
  },[])

  if(isloading){
    return <div>...loading</div>
  }

  return (
    <div>
       {!authStatus?<Outlet/>:<Navigate to={"/"}/>}
    </div>
  )
}

export default LoginAndRegistrationProtoect
