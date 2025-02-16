import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>,
);
