import { Switch, Route, Router as WouterRouter } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import ServicesPage from "@/pages/services";
import IndustriesPage from "@/pages/industries";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import FloatingActions from "@/components/FloatingActions";
import { seoServiceLinks } from "@/pages/services";

const queryClient = new QueryClient();
const seoServiceRoutes = seoServiceLinks.map((item) => item.slug);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/industries" component={IndustriesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      {seoServiceRoutes.map((path) => (
        <Route key={path} path={path} component={ServicesPage} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <FloatingActions />
          </WouterRouter>
          <Toaster />
          <SonnerToaster theme="dark" position="bottom-right" richColors />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
