import React, { useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
const RightSidebar = () => {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('veri');
    return savedData ? JSON.parse(savedData) : 0;
  });


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
const navigate=useNavigate()
// const handlePosetClick = () => {
//   const newData = data + 0.25;
//   setData(newData);
//   localStorage.setItem('data', JSON.stringify(newData));
//   navigate('/', { state: { data: newData } });
// }; 
  const handleButtonClick = () => {
    const value = parseFloat(inputValue);
    setData(value * 0.25); // Örnek hesaplama
    localStorage.setItem("veri", JSON.stringify(value * 0.25));
    navigate('/', { state: { data: value * 0.25, veri: value } });
  };
  return (
    <div className="p-4 h-full flex flex-col">
      <p>Hesaplanan Değer: {data.toFixed(2)}</p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Lütfen değer giriniz."
          className="w-full p-2 border border-gray-300 rounded"
          name="data"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded">
          Giriş
        </button>
        <button
          className="flex-1 bg-red-500 text-white py-2 rounded"
          onClick={handleButtonClick}
        >
          Miktar
        </button>
      </div>

      {/* Drawer */}
      <div className="mt-auto  p-4 w-full text-center">
        <button
          className="w-full bg-gray-300 py-2 rounded"
          onClick={() => alert("çekmece açıldı")}
        >
          Çekmece Aç
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
