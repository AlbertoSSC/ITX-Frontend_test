import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "@/components";
import { ProductListPage, ProductDetailPage } from "@/pages";

export const AppRouter = () => (
  <BrowserRouter>
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
