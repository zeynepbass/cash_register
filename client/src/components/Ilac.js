import React, { useContext, useEffect } from "react";
import { Veri } from "./contextApi/data";
const Firca = () => {
  const { dataSee, fetchData } = useContext(Veri);
  useEffect(() => {
    fetchData();
  }, []);
  const Sepet=(item)=>{
    const sepet = JSON.parse(localStorage.getItem("sepet"));
  const prevData  = sepet || [];
  
  prevData.push(item);
  localStorage.setItem("sepet", JSON.stringify(prevData));
  };
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 h-auto ">
      {dataSee && dataSee[1] && dataSee[1].altKategoriler
        ? dataSee[1].altKategoriler.map((item, index) => (
            <div className="img" onClick={()=>Sepet(item)} key={index}>
              <img
                key={index}
                src={`./images/${item.selectedFile}`}
                className="w-full h-full object-cover"
                alt={item.adi}
              />
            </div>
          ))
        : ""}
    </div>
  );
};

export default Firca;
