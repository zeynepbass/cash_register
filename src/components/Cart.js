import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
const Cart = () => {
  const location = useLocation();
  const initialData = location.state?.data !== undefined ? location.state.data : parseFloat(localStorage.getItem('data')) || 0;
  const initialVeri = location.state?.veri !== undefined ? location.state.veri : parseFloat(localStorage.getItem('veri')) || 0;

  const [data, setData] = useState(initialData);
  const [veri, setVeri] = useState(initialVeri);

  useEffect(() => {
    const storedData = parseFloat(localStorage.getItem('data')) || 0;
    const storedVeri = parseFloat(localStorage.getItem('veri')) || 0;
    setData(storedData);
    setVeri(storedVeri);
  }, [location.state]);
  const Temizle = () => {
    localStorage.clear();
    setData(0);
    setVeri(0);
  };
  return (
    <div className="flex flex-col gap-0">
    <div className=" p-4" style={{ height: '200px' }}>
      <p>Sipariş Al...</p>
{/* <p  className="float-right">{data.toFixed(2)} TL </p>
<p  className="float-right">{veri.toFixed(2)} TL </p> */}
<p  className="float-right">{veri+data} TL </p>
    </div>
    <div className=" p-4" style={{ height: '100px' }}>
      <p>Toplam:<span className="float-right"> 0 TL</span> </p>
      <button className="bg-red-500 text-white py-2 px-4 mt-2 rounded " style={{ width: '100%' }} onClick={Temizle}>Temizle</button>
    </div>
  </div>
  
  )
}

export default Cart