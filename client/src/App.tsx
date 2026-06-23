import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Analytics from "./components/Analytics";
import ConsentBanner from "./components/ConsentBanner";
import PromoBanner from "./components/PromoBanner";
import PromoModal from "./components/PromoModal";
import InquiryModal from "./components/InquiryModal";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PromoProvider } from "./contexts/PromoContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ThankYou from "./pages/ThankYou";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Reviews from "./pages/Reviews";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Guarantee from "./pages/Guarantee";
import Method360 from "./pages/Method360";
import Method360Walkthrough from "./pages/Method360Walkthrough";
import Method360Referral from "./pages/Method360Referral";
import Method360Membership from "./pages/Method360Membership";
import Method360Offer from "./pages/Method360Offer";
import Membership from "./pages/Membership";
import MembershipCheckout from "./pages/MembershipCheckout";
import MembershipConfirmation from "./pages/MembershipConfirmation";
import BaselineDetails from "./pages/BaselineDetails";
import BaselineOffer from "./pages/BaselineOffer";
import BaselineConfirmation from "./pages/BaselineConfirmation";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import RoadmapDetails from "./pages/RoadmapDetails";
import RoadmapOffer from "./pages/RoadmapOffer";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import ServicePage from "./pages/ServicePage";
import ServicesIndex from "./pages/ServicesIndex";
import CityPage from "./pages/CityPage";
import ServiceAreasIndex from "./pages/ServiceAreasIndex";
import Contact from "./pages/Contact";
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Individual project detail pages - open in new tab from gallery */}
      <Route path="/project/:slug" component={ProjectDetail} />
      {/* Post-inquiry thank you page */}
      <Route path="/thankyou" component={ThankYou} />
      {/* Blog index + post detail pages */}
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      {/* Legal pages */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/guarantee" component={Guarantee} />
      {/* 360° Method funnel pages */}
      <Route path="/360-method" component={Method360} />
      {/* Legacy - consolidated into /roadmap-generator */}
      <Route path="/360-method/translation">{() => <Redirect to="/roadmap-generator" />}</Route>
      <Route path="/360-method/walkthrough" component={Method360Walkthrough} />
      <Route path="/360-method/referral" component={Method360Referral} />
      <Route path="/360-method/membership" component={Method360Membership} />
      <Route path="/360-method/offer" component={Method360Offer} />
      {/* Canonical membership enrollment flow */}
      <Route path="/membership" component={Membership} />
      <Route path="/membership/checkout" component={MembershipCheckout} />
      <Route path="/membership/confirmation" component={MembershipConfirmation} />
      {/* Baseline-walkthrough funnel: Step 1 popup -> details -> upsell -> confirm */}
      <Route path="/baseline/details" component={BaselineDetails} />
      <Route path="/baseline/offer" component={BaselineOffer} />
      <Route path="/baseline/confirmed" component={BaselineConfirmation} />
      {/* Stripe success/cancel redirect targets - the backend builds /360/* URLs.
          Without these, the post-payment redirect falls through to the home page. */}
      <Route path="/360/confirmation" component={MembershipConfirmation} />
      <Route path="/360/checkout" component={MembershipCheckout} />
      {/* 360° Roadmap Generator lead magnet (Path B entry) - 3-step funnel:
          popup (step 1) -> /roadmap/details (step 2) -> /roadmap/offer (step 3) */}
      <Route path="/roadmap-generator" component={RoadmapGenerator} />
      <Route path="/roadmap/details" component={RoadmapDetails} />
      <Route path="/roadmap/offer" component={RoadmapOffer} />
      {/* Legacy alias - keep existing email/campaign links alive */}
      <Route path="/priority-translation">{() => <Redirect to="/roadmap-generator" />}</Route>
      {/* Real pages */}
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/services" component={ServicesIndex} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/gallery" component={Home} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/customer-reviews" component={Reviews} />
      <Route path="/contact" component={Contact} />
      <Route path="/service-areas" component={ServiceAreasIndex} />
      <Route path="/service-areas/:slug" component={CityPage} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PromoProvider>
          <TooltipProvider>
            <Toaster />
            <Analytics />
            <PromoBanner />
            <Router />
            <InquiryModal />
            <PromoModal />
            <ConsentBanner />
          </TooltipProvider>
        </PromoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
