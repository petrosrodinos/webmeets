import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraUIProvider } from "./components/providers/ChakraUI.tsx";
import { ReactQueryProvider } from "./components/providers/ReactQuery.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ChakraUIProvider>
        <App />
      </ChakraUIProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
