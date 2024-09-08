
import {Routes,Route} from "react-router-dom"
import FecthData from "./components/contextApi/data"
import Ilac from "./components/Ilac"
import Firca from "./components/Firca"
import LeftSidebar from "./components/LeftSidebar"
import Home from "./components/Home"
import Kasa from "./components/Kasa"
import "./output.css"
function App() {
  return (
    <div className="App">
       <Routes>

        <Route path="/" element={<Kasa/>}/>
  
        <Route path="/dashboard" element={<Home content={<FecthData><LeftSidebar /></FecthData>}/>}/>
          
        <Route path="/ilac" element={<FecthData><Home content={<Ilac />} /></FecthData>} />
        <Route path="/firca" element={<FecthData><Home content={<Firca/>}/></FecthData>} />


       </Routes>
    </div>
  );
}

export default App;
