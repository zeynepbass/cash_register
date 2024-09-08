import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Veri } from "./contextApi/data";
const LeftSidebar = () => {
  const { dataSee, fetchData } = useContext(Veri);
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : 0;
  });

  const handlePosetClick = () => {
    const newData = data + 0.25;
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    navigate("/dashboard", { state: { data: newData } });
  };
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 h-auto">
    {dataSee.map((item) => {
      return (
        <div className="img" onClick={() => navigate(`${item.navigate}`)} key={item._id}>
          <img
            src={`./images/${item.selectedFile}`}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      );
    })}
    <div className="img" onClick={handlePosetClick}>
      <img
        src="https://elitsanplastik.com/image/cache/catalog/2020/resim009-766x1000.jpg"
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
  </div>
  
  );
};

export default LeftSidebar;
