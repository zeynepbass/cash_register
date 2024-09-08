import React,{createContext,useState} from 'react'
import axios from "axios"
export const Veri=createContext()
const Data = (props) => {
   const [dataSee,setData]=useState([])
   const fetchData=()=>{
    try {
         axios.get("http://localhost:6078/post/panel").then((response)=>{
            setData(response.data)
         })
    } catch (error) {
         console.log(error)
    }
   }
  return (
    <Veri.Provider value={{fetchData,dataSee}}>
        {props.children && props.children}
    </Veri.Provider>
  )
}

export default Data