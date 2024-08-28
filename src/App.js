
import {Routes,Route} from "react-router-dom"

import Vegetables from "./components/Vegetables"
import Fruits from "./components/Fruit"
import LeftSidebar from "./components/LeftSidebar"
import Home from "./components/Home"
import "./output.css"
function App() {
  return (
    <div className="App">
       <Routes>

        <Route path="/" element={<Home content={<LeftSidebar />}/>}></Route>
        <Route path="/sebzeler" element={<Home content={<Vegetables/>}/>}></Route>
        <Route path="/meyveler" element={<Home content={<Fruits/>}/>}></Route>
       </Routes>
    </div>
  );
}

export default App;
