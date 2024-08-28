import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
const LeftSidebar = () => {
  const navigate=useNavigate()
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : 0;
  });

  const handlePosetClick = () => {
    const newData = data + 0.25;
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    navigate('/', { state: { data: newData } });
  }; 
  return (
<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 h-auto ">

  <div className="" onClick={()=>navigate("/sebzeler")}>
    <img src="https://www.acilameliyat.com/images/blog/ekim-ayinda-taze-tuketebilecegimiz-meyve-ve-sebzeler.webp" className="w-full h-full object-cover"/>
  </div>


  <div className=""  onClick={()=>navigate("/meyveler")}>
    <img src="https://www.organikciyizbiz.com/blog/wp-content/uploads/2016/05/ilac-kalintisina-yakin-takip-48886.jpg"className="w-full h-full object-cover" /></div>

  
    <div className="" onClick={handlePosetClick} >
    <img src= "https://ideacdn.net/shop/bc/36/myassets/products/580/hisir-poset-05.jpg?revision=1722520096" className="w-full h-full object-cover" />
  </div>

</div>


  )
}

export default LeftSidebar