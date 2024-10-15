import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./Context/Context.jsx";
import SocketProvider from "./Context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </ContextProvider>
);
