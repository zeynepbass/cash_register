import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const userData = { email: "", password: "" };
  const [user, setUser] = useState(userData);
  const location = useLocation();
  const initialData =
    location.state?.data !== undefined
      ? location.state.data
      : parseFloat(localStorage.getItem("data")) || 0;
  const initialVeri =
    location.state?.veri !== undefined
      ? location.state.veri
      : parseFloat(localStorage.getItem("veri")) || 0;

  const [data, setData] = useState(initialData);
  const [veri, setVeri] = useState(initialVeri);
  const [barkodFiyatlar, setBarkodFiyatlar] = useState([]);
  const [barkodAdlar, setBarkodAdlar] = useState([]);
  const [toplamFiyat, setToplamFiyat] = useState(0);
  useEffect(() => {
    const storedData = parseFloat(localStorage.getItem("data")) || 0;
    const storedVeri = parseFloat(localStorage.getItem("veri")) || 0;

    setData(storedData);
    setVeri(storedVeri);

    const updateData = () => {
      const fiyatlar = JSON.parse(localStorage.getItem("barkod")) || [];
      setBarkodFiyatlar(fiyatlar);

      const toplam = fiyatlar.reduce((acc, curr) => acc + (curr.fiyat || 0), 0);
      setToplamFiyat(toplam);

      const adlar = new Set(fiyatlar.map((item) => item.ad));
      setBarkodAdlar(Array.from(adlar));
    };

    updateData();
    const intervalId = setInterval(updateData, 1000);

    return () => clearInterval(intervalId);
  }, [location.state]);

  const handleDeleteItem = (id) => {
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    const updatedSepet = sepet.filter((item) => item._id !== id);
    localStorage.setItem("sepet", JSON.stringify(updatedSepet));
  };

  const veriler = JSON.parse(localStorage.getItem("sepet")) || [];
  const fiyatlariTopla = () => {
    if (!veriler.length) return 0;

    return veriler.reduce((acc, item) => acc + (item.fiyat || 0), 0);
  };

  const groupedItems = veriler.reduce((acc, item) => {
    if (acc[item.adi]) {
      acc[item.adi].count += 1;
    } else {
      acc[item.adi] = { ...item, count: 1 };
    }
    return acc;
  }, {});

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    try {
      axios.post("http://localhost:6078/user/signin", user).then((response) => {
        setUser(response.data);
        toast.success("Silindi");

        setData(0);
        setVeri(0);
        setToplamFiyat(0);
        localStorage.clear();
      });
    } catch (error) {
      console.log(error);
    }

    setIsOpen(false);
  };
  const toplam = fiyatlariTopla() + toplamFiyat + veri + data;
  const formatliToplam =
    typeof toplam === "number" ? toplam.toFixed(2) : "0.00";
  localStorage.setItem("ciro", JSON.stringify(formatliToplam));
  const handleClickPoset = () => {
    setData(0);

    localStorage.removeItem("data");
  };

  return (
    <div className="flex flex-col gap-0 ">
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-md">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <img
                src="./images/cancel.png"
                width="20"
                height="20"
                alt="Close"
              />
            </button>
            <h2 className="text-xl font-semibold mb-4">Yönetici Girişi</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mail
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Email adresinizi girin"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Parola
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Parolanızı girin"
                />
              </div>

              <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
                Tamam
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="p-4 ">
        <div className="mb-4">
          {veri + data > 0 && (
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Poşet</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-600">
                  {(veri + data).toFixed(2)} TL
                </span>
                <button
                  onClick={handleClickPoset}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">{barkodAdlar.join(", ")}</span>
            <span className="font-bold text-gray-900">
              {toplamFiyat ? toplamFiyat.toFixed(2) + " TL" : ""}
            </span>
          </div>
        </div>

        <div>
          {Object.values(groupedItems).map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <span className="text-gray-700">
                {item.adi} -{" "}
                <span className="text-sm text-gray-500">{item.count} adet</span>
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-blue-600">
                  {(item.fiyat * item.count).toFixed(2)} TL
                </span>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <p>
          Toplam: <span className="float-right">{formatliToplam} TL</span>
        </p>

        <button
          className="bg-red-500 text-white py-2 px-4 mt-2 rounded"
          style={{ width: "100%" }}
          onClick={() => setIsOpen(true)}
        >
          Temizle
        </button>
      </div>
    </div>
  );
};

export default Cart;
