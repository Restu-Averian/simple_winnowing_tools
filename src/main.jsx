import ErrorBoundary from "antd/es/alert/ErrorBoundary.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ConfigProviderWinnowing from "./ConfigProviderWinnowing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProviderWinnowing>
      <BrowserRouter>
        <ErrorBoundary fallback={({ err }) => <>Error : {err}</>}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ConfigProviderWinnowing>
  </React.StrictMode>
);
