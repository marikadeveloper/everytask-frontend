import ReactDOM from "react-dom/client";
import App from "./app";
import { AppProviders } from "./context/index";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
