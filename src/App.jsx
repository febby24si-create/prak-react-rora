import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { useAuth } from "./contexts/AuthContext";

// Lazy Load Komponen
const Dashboard       = React.lazy(() => import("./pages/Dashboard"));
const Orders          = React.lazy(() => import("./pages/Orders"));
const Customer        = React.lazy(() => import("./pages/Customer"));
const ErrorPage       = React.lazy(() => import("./components/ErrorPage"));
const MainLayout      = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout      = React.lazy(() => import("./layouts/AuthLayout"));
const Login           = React.lazy(() => import("./pages/auth/Login"));
const Register        = React.lazy(() => import("./pages/auth/Register"));
const Forgot          = React.lazy(() => import("./pages/auth/Forgot"));
const Products        = React.lazy(() => import("./pages/Products"));
const ProductDetail   = React.lazy(() => import("./pages/ProductDetail"));
const Notes           = React.lazy(() => import("./pages/notes"));
const Components      = React.lazy(() => import("./pages/Components"));
const FiturXyz        = React.lazy(() => import("./pages/FiturXyz"));
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));

const Error400 = () => <ErrorPage code="400" description="Bad Request" />;
const Error401 = () => <ErrorPage code="401" description="Unauthorized" />;
const Error403 = () => <ErrorPage code="403" description="Forbidden" />;
const NotFound = () => <ErrorPage code="404" description="Page Not Found" />;

function HomeRedirect() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? <Dashboard /> : <Navigate to="/member" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth Routes (public) */}
          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot"   element={<Forgot />} />
          </Route>

          {/* Protected Routes — all authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {/* Member Dashboard */}
              <Route path="/member"        element={<MemberDashboard />} />

              {/* Products — accessible by all authenticated users */}
              <Route path="/products"      element={<Products />} />
              <Route path="/products/:id"  element={<ProductDetail />} />

              {/* Orders — member sees own, admin sees all */}
              <Route path="/orders"        element={<Orders />} />

              {/* Admin-only routes */}
              <Route path="/" element={<HomeRedirect />} />
              <Route element={<AdminRoute />}>
                <Route path="/customers"    element={<Customer />} />
              </Route>

              {/* Common pages */}
              <Route path="/components"    element={<Components />} />
              <Route path="/fitur-xyz"     element={<FiturXyz />} />
              <Route path="/notes"         element={<Notes />} />
              <Route path="/error-400"     element={<Error400 />} />
              <Route path="/error-401"     element={<Error401 />} />
              <Route path="/error-403"     element={<Error403 />} />
              <Route path="*"              element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
