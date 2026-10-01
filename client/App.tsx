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
  Outlet,
  useLocation,
} from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import {
  Suspense,
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import PageLoader from "@/components/PageLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";

// Home ships in the main bundle; every other page loads on demand.
const pageLoaders = {
  Menu: () => import("./pages/Menu"),
  About: () => import("./pages/About"),
  Contact: () => import("./pages/Contact"),
  Reservation: () => import("./pages/Reservation"),
  OrderNow: () => import("./pages/OrderNow"),
  NotFound: () => import("./pages/NotFound"),
};
const Menu = lazy(pageLoaders.Menu);
const About = lazy(pageLoaders.About);
const Contact = lazy(pageLoaders.Contact);
const Reservation = lazy(pageLoaders.Reservation);
const OrderNow = lazy(pageLoaders.OrderNow);
const NotFound = lazy(pageLoaders.NotFound);

// Make sure every page chunk is downloaded before a transition swaps to it,
// so the new page never flashes in empty.
const preloadPages = () =>
  Promise.all(Object.values(pageLoaders).map((load) => load())).catch(
    () => undefined,
  );

const FADE_OUT_MS = 200;

type Phase = "in" | "out";
const TransitionContext = createContext<{ phase: Phase; pageKey: string }>({
  phase: "in",
  pageKey: "",
});

// Reset scroll position to the top when the visible page changes.
function ScrollToTop({ pathname }: { pathname: string }) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * Fades only the page content. The layouts below keep the header and footer
 * mounted, so they stay still while the content fades out and the next page
 * fades in.
 */
function FadeOutlet() {
  const { phase, pageKey } = useContext(TransitionContext);
  return (
    <div
      className={cn(
        "page-fade flex-1 flex flex-col",
        phase === "out" && "is-out",
      )}
    >
      <div key={pageKey} className="page-enter flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

// Pages with the shared header and footer.
function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <FadeOutlet />
      <Footer />
    </div>
  );
}

// Full-screen pages (reservation, 404) that have their own chrome.
function BareLayout() {
  return <FadeOutlet />;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    if (location.pathname === shown.pathname) {
      // Same page (e.g. back to where we were mid-transition): just show it.
      setShown(location);
      setPhase("in");
      return;
    }

    // Fade the current page out, then swap once the next page is ready.
    setPhase("out");
    let cancelled = false;
    Promise.all([
      preloadPages(),
      new Promise((resolve) => setTimeout(resolve, FADE_OUT_MS)),
    ]).then(() => {
      if (cancelled) return;
      setShown(location);
      setPhase("in");
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Warm the other pages once the first one is on screen.
  useEffect(() => {
    const id = window.setTimeout(() => void preloadPages(), 1500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <TransitionContext.Provider value={{ phase, pageKey: shown.pathname }}>
      <ScrollToTop pathname={shown.pathname} />
      <Routes location={shown}>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/order-now" element={<OrderNow />} />
        </Route>
        <Route element={<BareLayout />}>
          <Route path="/reservations" element={<Reservation />} />
        </Route>
        {/* Old React paths -> URLs carried over from the WordPress site */}
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route
          path="/contact"
          element={<Navigate to="/contact-us" replace />}
        />
        <Route
          path="/reservation"
          element={<Navigate to="/reservations" replace />}
        />
        <Route path="/order" element={<Navigate to="/order-now" replace />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route element={<BareLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TransitionContext.Provider>
  );
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <ReactLenis root options={{ lerp: 0.1 }}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </ReactLenis>
  </TooltipProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
