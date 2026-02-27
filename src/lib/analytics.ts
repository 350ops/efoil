import { track } from "@vercel/analytics";

/**
 * Typed event tracking for key business actions.
 * Uses Vercel Analytics custom events — privacy-respecting, no cookies, GDPR compliant.
 *
 * Events appear in: Vercel Dashboard → Analytics → Custom Events
 */

export function trackBookNow(source: string) {
  track("book_now_click", { source });
}

export function trackViewPackages(source: string) {
  track("view_packages_click", { source });
}

export function trackCheckout(packageId: string) {
  track("checkout_start", { package: packageId });
}

export function trackEmail(source: string) {
  track("email_click", { source });
}

export function trackInstagram(source: string) {
  track("instagram_click", { source });
}

export function trackLeadSubmit(formType: "availability" | "partner") {
  track("lead_form_submit", { form: formType });
}

export function trackSocialClick(platform: string) {
  track("social_click", { platform });
}
