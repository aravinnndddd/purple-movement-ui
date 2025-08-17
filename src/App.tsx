import { Routes, Route } from "react-router-dom";

import Events from "./pages/Events";
import { HomePage } from "./HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage onJoinUs={() => {}} />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
};

export default App;
