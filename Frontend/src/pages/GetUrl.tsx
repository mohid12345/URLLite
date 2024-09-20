import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUrl } from '../api/userAuth';

function GetUrl() {

  const { id } = useParams();
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    const handleFn = async () => {
      try {
     
        const response = await getUrl(id as string);
        setIsLoading(true)
        if (response.data) {
          window.location.href = response.data;
        } else {
          console.error("No long URL found for this short URL");
        }
      } catch (error) {
        console.error("Error fetching the long URL:", error);
      }
    };
    handleFn();
  },[id]);

  if(!isLoading){
      <div className='bg-yellow-100'>...loading</div>
  }

  return (
    <div className='bg-yellow-100'>
            
    </div>
  )
}

export default GetUrl
