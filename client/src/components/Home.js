import React, { useState, useEffect } from "react";

import RightSidebar from "./RightSidebar";
import Cart from "./Cart";
const Home = (props) => {

  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
    day: "",
  });

  useEffect(() => {

    const updateDateTime = () => {
      const now = new Date();
      const optionsDate = { year: "numeric", month: "long", day: "numeric" };
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const optionsDay = { weekday: "long" };

      setCurrentDateTime({
        date: now.toLocaleDateString(undefined, optionsDate),
        time: now.toLocaleTimeString(undefined, optionsTime),
        day: now.toLocaleDateString(undefined, optionsDay),
      });
    };

    updateDateTime(); 
    const intervalId = setInterval(updateDateTime, 1000); 

    return () => clearInterval(intervalId); 
  }, []);
  const UserKasa=JSON.parse(localStorage.getItem("kasa"));
  return (
<>
  <div className="flex justify-between bg-white p-4 shadow-md">
    <div className="flex items-center">
      <img src="./images/Logo.png" width="100" height="100" alt="Market Logo" />
    </div>

    <div className="flex items-center space-x-4">
      <div className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2">
        <img src="./images/user.png" width="24" height="24" alt="User Icon" />
        <span className="font-semibold">{UserKasa.ad}</span>
      </div>
      <div className="text-green-600 text-right">
        <p className="text-lg font-semibold">{currentDateTime.date}</p>
        <p className="text-lg font-semibold">{currentDateTime.time}</p>
        <p className="text-lg font-semibold">{currentDateTime.day}</p>
      </div>
    </div>
  </div>

  <div className="grid grid-cols-12 gap-4 bg-white text-gray-800 p-4">
    <div className="col-span-5 bg-white p-6 shadow-lg rounded-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Ürünler</h2>
      {props.content && props.content}
    </div>
    <div className="col-span-4 bg-gray-100 p-6 shadow-lg rounded-lg flex flex-col ">
      <h2 className="text-2xl font-bold mb-4 text-center">Sepet</h2>
      <Cart />
    </div>
    <div className="col-span-3 bg-gray-100 shadow-lg rounded-lg flex flex-col">

      <RightSidebar />
    </div>
  </div>
</>

  
  );
};

export default Home;
