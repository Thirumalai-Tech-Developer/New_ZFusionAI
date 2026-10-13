import { Switch, Route, Router as WouterRouter } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeFieldProvider } from "@/context/ThemeFieldContext";

import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import ServicesPage from "@/pages/services";
import IndustriesPage from "@/pages/industries";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import FloatingActions from "@/components/FloatingActions";

import WhatsAppApiPage from "@/pages/services/WhatsAppApiPage";
import AgenticAiPage from "@/pages/services/AgenticAiPage";
import FullStackWebPage from "@/pages/services/FullStackWebPage";

import { seoServiceLinks } from "@/pages/services";

const queryClient = new QueryClient();

// Filter out paths that now have dedicated avant-garde service pages
const dedicatedSlugs = new Set([
  "/services/whatsapp-api",
  "/services/agentic-ai",
  "/services/full-stack-web",
  "/whatsapp-chatbot-dubai",
  "/whatsapp-automation-dubai",
  "/ai-company-dubai",
  "/ai-development-dubai",
  "/web-development-dubai",
]);

const legacySeoRoutes = seoServiceLinks
  .map((item) => item.slug)
  .filter((slug) => !dedicatedSlugs.has(slug));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />

      {/* 3 Dedicated Avant-Garde "Logo Field" Service Pages */}
      <Route path="/services/whatsapp-api" component={WhatsAppApiPage} />
      <Route path="/whatsapp-web-api-integration" component={WhatsAppApiPage} />
      <Route path="/whatsapp-chatbot-dubai" component={WhatsAppApiPage} />
      <Route path="/whatsapp-automation-dubai" component={WhatsAppApiPage} />

      <Route path="/services/agentic-ai" component={AgenticAiPage} />
      <Route path="/ai-agentic-build" component={AgenticAiPage} />
      <Route path="/ai-company-dubai" component={AgenticAiPage} />
      <Route path="/ai-development-dubai" component={AgenticAiPage} />

      <Route path="/services/full-stack-web" component={FullStackWebPage} />
      <Route path="/full-stack-web-development" component={FullStackWebPage} />
      <Route path="/web-development-dubai" component={FullStackWebPage} />

      {/* General Pages */}
      <Route path="/services" component={ServicesPage} />
      <Route path="/industries" component={IndustriesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />

      {/* Remaining SEO Landing Routes */}
      {legacySeoRoutes.map((path) => (
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
            <ThemeFieldProvider>
              <Router />
              <FloatingActions />
            </ThemeFieldProvider>
          </WouterRouter>
          <Toaster />
          <SonnerToaster theme="dark" position="bottom-right" richColors />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
