import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ThankYou from "./pages/ThankYou";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Individual project detail pages — open in new tab from gallery */}
      <Route path="/project/:slug" component={ProjectDetail} />
      {/* Post-inquiry thank you page */}
      <Route path="/thankyou" component={ThankYou} />
      {/* Blog post detail pages — open in new tab from homepage blog section */}
      <Route path="/blog/:slug" component={BlogPost} />
      {/* Legal pages */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      {/* 301-style redirects: all old paths → home */}
      <Route path="/about" component={Home} />
      <Route path="/services" component={Home} />
      <Route path="/services/:slug" component={Home} />
      <Route path="/gallery" component={Home} />
      <Route path="/customer-reviews" component={Home} />
      <Route path="/contact" component={Home} />
      <Route path="/service-areas" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
