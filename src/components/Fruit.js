import React from "react";

const Fruits = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 h-auto ">
      <div className="">
        <img
          src="https://cdn.yemek.com/mncrop/940/625/uploads/2015/04/cilek.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="">
        <img
          src="https://tuncbotanik.com/uploads/p/p/MURDUM-ERIGI-FIDANI-3-ADET-TUPLU-ve-ASILI_1.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="">
        <img
          src="https://www.mctarim.com.tr/upload/yesil-elma-1-6477.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="">
        <img
          src="https://www.verita.com.tr/wp-content/uploads/2014/08/armut.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="">
        <img
          src="https://nebilcdn.blob.core.windows.net/gimatlinux/0010945_karpuz-kg-meyve_510.jpg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Fruits;
