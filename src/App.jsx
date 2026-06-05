import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";


// Lazy Load Komponen Existing
const Dashboard    = React.lazy(() => import("./pages/Dashboard"));
const Orders       = React.lazy(() => import("./pages/Orders"));
const Customer     = React.lazy(() => import("./pages/Customer"));
const ErrorPage    = React.lazy(() => import("./components/ErrorPage"));
const MainLayout   = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout   = React.lazy(() => import("./layouts/AuthLayout"));
const Login        = React.lazy(() => import("./pages/auth/Login"));
const Register     = React.lazy(() => import("./pages/auth/Register"));
const Forgot       = React.lazy(() => import("./pages/auth/Forgot"));
const Products     = React.lazy(() => import("./pages/Products"));
const ProductDetail= React.lazy(() => import("./pages/ProductDetail"));

// ✅ Pertemuan 10 — Components Page
const Components   = React.lazy(() => import("./pages/Components"));
const FiturXyz      = React.lazy(() => import("./pages/FiturXyz"));

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
          <Route path="/"           element={<Dashboard />} />
          <Route path="/products"   element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders"     element={<Orders />} />
          <Route path="/customers"  element={<Customer />} />

          {/* ✅ Pertemuan 10 */}
          <Route path="/components" element={<Components />} />
          <Route path="/fitur-xyz" element={<FiturXyz />} />

          <Route path="/error-400"  element={<Error400 />} />
          <Route path="/error-401"  element={<Error401 />} />
          <Route path="/error-403"  element={<Error403 />} />
          <Route path="*"           element={<NotFound />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot"   element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;