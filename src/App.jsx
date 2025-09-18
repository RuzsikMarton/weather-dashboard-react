import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Forecast from "./components/Forecast";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/forecast/:latitude/:longitude/:city"
          element={<Forecast />}
        />
        <Route path="/forecast/*" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
