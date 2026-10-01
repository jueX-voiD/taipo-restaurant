import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { Suspense, lazy, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import Home from "./pages/Home";

// Home ships in the main bundle; every other page loads on demand.
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Reservation = lazy(() => import("./pages/Reservation"));
const OrderNow = lazy(() => import("./pages/OrderNow"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Reset scroll position to the top on every route change.
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <ReactLenis root options={{ lerp: 0.1 }}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/reservations" element={<Reservation />} />
            <Route path="/order-now" element={<OrderNow />} />
            {/* Old React paths -> URLs carried over from the WordPress site */}
            <Route
              path="/about"
              element={<Navigate to="/about-us" replace />}
            />
            <Route
              path="/contact"
              element={<Navigate to="/contact-us" replace />}
            />
            <Route
              path="/reservation"
              element={<Navigate to="/reservations" replace />}
            />
            <Route
              path="/order"
              element={<Navigate to="/order-now" replace />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ReactLenis>
  </TooltipProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
