/**
 * Method360Membership.tsx — /360-method/membership
 * Legacy route. Permanently redirects to the canonical /membership page.
 */

import { Redirect } from "wouter";

export default function Method360Membership() {
  return <Redirect to="/membership" />;
}
