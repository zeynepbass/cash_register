import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Barkod from "./barkod";
const RightSidebar = () => {
  const [inputValue, setInputValue] = useState("");
  const [barkod, setBarkod] = useState("");
  const [stok, setStok] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("veri");
    return savedData ? JSON.parse(savedData) : 0;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [detay, setDetay] = useState(false);
  const [ciro, setCiro] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setBarkod(e.target.value);
  };
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const value = parseFloat(inputValue);
    setData(value * 0.25);
    localStorage.setItem("veri", JSON.stringify(value * 0.25));
    navigate("/dashboard", { state: { data: value * 0.25, veri: value } });
    setInputValue("");
  };
  const barkodGiris = () => {
    const data = Barkod.find((item) => item.barkod === barkod);

    if (data) {
      const prevArray = JSON.parse(localStorage.getItem("barkod")) || [];

      prevArray.push({ fiyat: data.fiyat, ad: data.ad });

      localStorage.setItem("barkod", JSON.stringify(prevArray));
      setInputValue(""); 
    } else {
      toast.error("Barkod bulunamadı");
    }
  };
  const ciroGoster = JSON.parse(localStorage.getItem("ciro"));
  const Temizle = () => {
    setIsOpen(false);
    setSearch("");
  };
  const Bildir = (item) => {

    const data = JSON.parse(localStorage.getItem("bildir")) || [];

    data.push(item);
  
    localStorage.setItem("bildir", JSON.stringify(data));
  };
  
  return (
    <div className="p-4 h-full flex flex-col">
      <h6 className="text-center text-red-900" onClick={() => setIsOpen(true)}>
        BARKODLU ÜRÜNLERİ GÖR
      </h6>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-md max-h-[80vh]  ">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <img
                src="./images/close.png"
                width="20"
                height="20"
                alt="Close"
              />
            </button>
            <h2 className="text-xl font-semibold mb-4">Barkodlu Ürünler</h2>
            <ToastContainer />

            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="başlık ara"
              />
            </div>

            <div className="mb-4 max-h-[300px] overflow-y-auto">
              <ul>
                {Barkod.filter((memory) => {
                  if (search === "") {
                    return true;
                  } else if (
                    memory.ad.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                }).map((item, index) => {
                  return (
                    <li key={item.id} className="py-2 border-b border-gray-300">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">
                          {item.ad.slice(0, 10)}
                        </span>
                        <span className="text-gray-600 justify-end">
                          {item.barkod}
                        </span>
                        <span className="text-green-700 font-bold">
                          {item.fiyat}₺
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
              onClick={Temizle}
            >
              Tamam
            </button>
          </div>
        </div>
      )}
      {detay && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-md max-h-[80vh]  ">
            <button
              onClick={() => setDetay(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <img
                src="./images/close.png"
                width="20"
                height="20"
                alt="Close"
              />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Stok </h2>
            <ToastContainer />

            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="başlık ara"
              />
            </div>

            <div className="mb-4 max-h-[300px] overflow-y-auto">
              <ul>
                {Barkod.filter((item) => item.adet <= 10)
                  .filter((item) => {

                    if (search === "") {
                      return true;
                    } else if (
                      item.ad.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <li
                        key={item.id}
                        className="py-2 border-b border-gray-300"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            {item.ad.slice(0, 10)}
                          </span>
                          <span className="text-gray-600 justify-end">
                            {item.barkod}
                          </span>
                          <span className="text-green-700 font-bold">
                            {item.adet <= 10 ? (
                              <h6 style={{ textAlign: "center", color: "red" }}>
                                stok azalıyor &nbsp;&nbsp;{` ${item.adet}`}
                              </h6>
                            ) : (
                              `${item.adet} adet mevcut`
                            )}
                          </span>
                          <span>
                            <button
                              className="bg-red-500 text-white py-2 px-4 rounded w-full mt-3"
                              onClick={() => Bildir(item)}
                            >
                              Bildir
                            </button>
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <button
              className="bg-green-500 text-white py-2 px-4 rounded w-full"
              onClick={Temizle}
            >
              Tamam
            </button>
          </div>
        </div>
      )}
      <br />
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
        <button
          className="flex-1 bg-blue-500 text-white py-2 rounded"
          onClick={barkodGiris}
        >
          Giriş
        </button>
        <ToastContainer />
        <button
          className="flex-1 bg-yellow-300 text-white py-2 rounded"
          onClick={handleButtonClick}
        >
          Miktar
        </button>
      </div>

      {isOpen && (
        <div
          className="flex 
                 p-4 bg-white  rounded-md "
        >
          <ul className="list-disc list-inside flex-1">
            <li>Öğe 1</li>
            <li>Öğe 2</li>
            <li>Öğe 3</li>
          </ul>

          <img
            src="./images/close.png"
            onClick={() => setIsOpen(false)}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            alt="Cancel"
          />
        </div>
      )}
      {ciro && (
        <div
          className="flex justify-between
                 p-4 bg-white  rounded-md "
        >
          <p>{ciroGoster} TL</p>

          <img
            src="./images/close.png"
            onClick={() => setCiro(false)}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            alt="Cancel"
          />
        </div>
      )}
      <div className="col-end-12 gap-2 mb-4">
        <button
          className="p-3 bg-green-700 text-white py-2 rounded w-full"
          onClick={() => setCiro(true)}
        >
          Ciroyu Gör
        </button>
        <ToastContainer />
      </div>
      {stok && (
        <div
          className="flex 
                 p-4 bg-white  rounded-md  "
          onClick={() => setDetay(true)}
        >
          <ul className="list-none list-inside flex-1 font-semibold overflow-y-scroll max-h-64 pr-4 ">
            {Barkod.map((item, key) => {
              return (
                <li
                  key={key}
                  className="flex justify-between py-2 border-b cursor-pointer  hover:bg-red-50"
                >
                  <span>{item.ad.slice(0, 7)}</span>
                  <span className="ml-8">
                    {item.adet <= 10 ? (
                      <h6 style={{ textAlign: "center", color: "red" }}>
                        stok azalıyor &nbsp;&nbsp;{` ${item.adet}`}
                      </h6>
                    ) : (
                      `${item.adet}`
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <img
            src="./images/close.png"
            onClick={() => setStok(false)}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            alt="Cancel"
          />
        </div>
      )}
      <div className="col-end-12 gap-2 mb-4">
        <button
          className="p-3 bg-red-700 text-white py-2 rounded w-full"
          onClick={() => setStok(true)}
        >
          Stok Görüntüle
        </button>
        <ToastContainer />
      </div>
      {/* Drawer */}
      <div className="mt-auto  w-full text-center">
        <button
          className="w-full bg-gray-300 py-2 rounded"
          onClick={() => toast.success("çekmece açıldı")}
        >
          Çekmece Aç
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
