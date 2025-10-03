
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./provider/AppProvider";
import Navbar from "./components/NavBar/NavBar";
import AppRoutes from "./router/AppRouter";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}
