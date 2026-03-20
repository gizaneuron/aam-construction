import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KitchenCabinets from "./pages/services/KitchenCabinets";
import BathroomCabinets from "./pages/services/BathroomCabinets";
import OutdoorKitchen from "./pages/services/OutdoorKitchen";
import Pergolas from "./pages/services/Pergolas";
import Backyard from "./pages/services/Backyard";
import PoolCage from "./pages/services/PoolCage";
import CarpenterDesign from "./pages/services/CarpenterDesign";
import ScrollToHash from "./components/ScrollToHash";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* About Us */}
        <Route path="/about" element={<AboutUs />} />

        {/* Services */}
        <Route
          path="/services/kitchen-cabinets"
          element={<KitchenCabinets />}
        />
        <Route
          path="/services/bathroom-cabinets"
          element={<BathroomCabinets />}
        />
        <Route
          path="/services/outdoor-kitchen"
          element={<OutdoorKitchen />}
        />
        <Route
          path="/services/pergolas"
          element={<Pergolas />}
        />
        <Route
          path="/services/backyard"
          element={<Backyard />}
        />
        <Route
          path="/services/pool-cage"
          element={<PoolCage />}
        />
        <Route
          path="/services/carpenter-design"
          element={<CarpenterDesign />}
        />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;