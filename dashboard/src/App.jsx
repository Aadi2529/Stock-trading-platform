import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <ProtectedRoute>

            <Home />
          </ProtectedRoute>
          } />
      </Routes>
    // {/* </BrowserRouter> */}
  );
}

export default App;
