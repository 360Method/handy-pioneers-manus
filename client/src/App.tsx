import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ThankYou from "./pages/ThankYou";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Reviews from "./pages/Reviews";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Method360 from "./pages/Method360";
import Method360Translation from "./pages/Method360Translation";
import Method360Walkthrough from "./pages/Method360Walkthrough";
import Method360Referral from "./pages/Method360Referral";
import Method360Membership from "./pages/Method360Membership";
import Method360Offer from "./pages/Method360Offer";
import Membership from "./pages/Membership";
import MembershipCheckout from "./pages/MembershipCheckout";
import MembershipConfirmation from "./pages/MembershipConfirmation";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
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
      {/* 360° Method funnel pages */}
      <Route path="/360-method" component={Method360} />
      <Route path="/360-method/translation" component={Method360Translation} />
      <Route path="/360-method/walkthrough" component={Method360Walkthrough} />
      <Route path="/360-method/referral" component={Method360Referral} />
      <Route path="/360-method/membership" component={Method360Membership} />
      <Route path="/360-method/offer" component={Method360Offer} />
      {/* Canonical membership enrollment flow */}
      <Route path="/membership" component={Membership} />
      <Route path="/membership/checkout" component={MembershipCheckout} />
      <Route path="/membership/confirmation" component={MembershipConfirmation} />
      {/* 360° Roadmap Generator lead magnet (Path B entry) */}
      <Route path="/roadmap-generator" component={RoadmapGenerator} />
      {/* Legacy alias — keep existing email/campaign links alive */}
      <Route path="/priority-translation">{() => <Redirect to="/roadmap-generator" />}</Route>
      {/* Real pages */}
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/services" component={Home} />
      <Route path="/services/:slug" component={Home} />
      <Route path="/gallery" component={Home} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/customer-reviews" component={Reviews} />
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
