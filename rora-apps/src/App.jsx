import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Load Komponen Existing
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customer = React.lazy(() => import("./pages/Customer"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Import Lazy Load untuk Halaman Produk Baru
const Products = React.lazy(() => import("./pages/Products")); // Sesuaikan dengan folder tempat Anda menyimpan Products.jsx
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

// Halaman error
const Error400 = () => <ErrorPage code="400" description="Bad Request" />;
const Error401 = () => <ErrorPage code="401" description="Unauthorized" />;
const Error403 = () => <ErrorPage code="403" description="Forbidden" />;
const NotFound = () => <ErrorPage code="404" description="Page Not Found" />;

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Layout / Authenticated Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          
          {/* RUTE BARU: Halaman Produk */}
          <Route path="/products" element={<Products />} />
          
          <Route path="/orders" element={<Orders />} />
          
          {/* Diselaraskan menjadi /customers (jamak) agar sesuai dengan NavLink di Sidebar */}
          <Route path="/customers" element={<Customer />} />
          
          <Route path="/error-400" element={<Error400 />} />
          <Route path="/error-401" element={<Error401 />} />
          <Route path="/error-403" element={<Error403 />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products/:id" element={<ProductDetail />} /> 
        </Route>

        {/* Auth Layout / Non-Authenticated Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;