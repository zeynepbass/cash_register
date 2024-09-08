import React from "react";
import User from "./KasaPanel";
import { useNavigate } from 'react-router-dom';
const Kasa = () => {
  const navigate=useNavigate()
  const kasaLogin = (item) => {
    localStorage.setItem("kasa",JSON.stringify(item))
    navigate("/dashboard")

  };

    return (
      <div className=" min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Kasa Seç</h1>


 
      <div className="absolute top-4 left-4">
        <img src="./images/Logo.png" alt="Zeynep Eczanesi Logo" width="100" height="100" />
      </div>


      <div className="bg-white p-8 rounded-lg flex space-x-6 border-t-2 " >
        {User.map((item, index) => (
          <div  
            key={index} 
            className="bg-gray-100 p-4 rounded-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105" 
            onClick={() => kasaLogin(item)} 
            style={{ width: "150px", cursor: "pointer" }}
          >
            <img src={item.image} alt="User Icon" className="w-12 h-12 text-gray-600 mb-2" />
            <span className="font-bold">{item.ad}</span>
          </div>
        ))}
      </div>
    </div>
    );
  };
  
  export default Kasa;