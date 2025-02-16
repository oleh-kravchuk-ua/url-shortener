import type React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import RedirectBySlug from "./components/RedirectBySlug/RedirectBySlug";
import UrlShortener from "./components/URLShortener/URLShortener";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/:slug" element={<RedirectBySlug />} />
          {/*<Route path="*" element={<NotFoundPage />} />*/}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
