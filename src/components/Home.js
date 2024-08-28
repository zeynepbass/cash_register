import React from "react";

import RightSidebar from "./RightSidebar";
import Cart from "./Cart";
const Home = (props) => {
  return (
<div className="grid grid-cols-12 bg-gray-200 text-gray p-0 m-0 ">
  <div className="col-span-6">
    {props.content && props.content}
     
  </div>
  <div className="col-span-3">
    <Cart />
  </div>
  <div className="col-span-3">
    <RightSidebar />
  </div>
</div>

  );
};

export default Home;
