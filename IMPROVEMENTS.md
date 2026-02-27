# eFoil Maldives — Improvement Recommendations

Comprehensive audit of the codebase covering security, performance, SEO, code quality, and business value.

---

## CRITICAL — Security Vulnerabilities

### 1. Live Production Secrets Committed to Git

**File:** `.env.vercel`

**Severity:** CRITICAL

The `.env.vercel` file contains **live production credentials** committed to the repository:

- `STRIPE_SECRET_KEY` (live key starting with `sk_live_`)
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live key)
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (secret key starting with `sk.`)
- `VERCEL_OIDC_TOKEN` (JWT token)

**Action required:**
1. **Immediately rotate all exposed keys** (Stripe dashboard, Mapbox dashboard, Vercel)
2. Add `.env.vercel` to `.gitignore`
3. Remove the file from git history using `git filter-branch` or BFG Repo Cleaner
4. Audit git history for any other committed secrets

### 2. Weak Authentication Implementation

**File:** `src/app/api/authenticate/route.ts`

- Password is compared as plaintext (no hashing)
- Auth token is a static string `"authenticated"` — not a signed JWT or session token
- No brute-force protection or rate limiting on the login endpoint
- Anyone who reads the cookie value can forge authentication

**Recommendation:** Use a proper auth library (NextAuth.js / Auth.js) or at minimum use bcrypt for password comparison and signed JWTs for session tokens.

### 3. No CSRF Protection on Forms

The lead capture forms (`RequestAvailabilityForm`, `MembershipApplicationForm`, `WaitlistModal`) submit directly to API routes with no CSRF token validation. While the honeypot field helps with basic bots, it doesn't prevent targeted CSRF attacks.

### 4. Checkout API Input Validation Gap

**File:** `src/app/api/checkout/route.ts`

The `quantity` parameter from the request body is passed directly to Stripe without bounds validation. A negative or zero quantity, or an extremely large number, could cause unexpected behavior.

---

## HIGH — Build & Deployment Issues

### 5. Active Build Failure

**File:** `062931.763.md`

The build is currently **broken** in production. The error is a TypeScript issue:

```
src/app/about/page.tsx:79:45
Type error: 'paddingX' does not exist in type 'FlexBreakpointProps'
```

The `s={{ paddingX: "12" }}` responsive prop is not supported by the Once UI `Column` component's breakpoint type. This blocks all deployments.

**Fix:** Replace `s={{ paddingX: "12" }}` with a valid responsive prop or remove it.

### 6. Conflicting Lock Files

Both `package-lock.json` (npm) and `pnpm-lock.yaml` (pnpm) exist. The Vercel build uses pnpm. Having both can cause dependency resolution inconsistencies.

**Recommendation:** Delete `package-lock.json` and standardize on pnpm.

### 7. Duplicate Linting Tools

Both ESLint (`eslintrc.json`, eslint in devDependencies) and Biome (`biome.json`, @biomejs/biome in devDependencies) are configured. Multiple code in the project uses `biome-ignore` directives. Pick one linter and remove the other.

### 8. Misplaced Dependency

`lint-staged` is in `dependencies` instead of `devDependencies`. It's a development-only tool.

---

## HIGH — SEO Issues

### 9. Contradictory Sitemap vs Robots.txt

**Files:** `src/app/sitemap.ts`, `src/app/robots.ts`

The `/booking/success` page is included in the sitemap (priority 0.3) but explicitly blocked in `robots.txt`. This sends contradictory signals to search engines.

**Fix:** Either remove it from the sitemap or unblock it in robots.txt.

### 10. Missing Canonical Tags on Several Pages

Pages like `/yachts`, `/resorts`, `/crew`, `/partners`, `/events` should have explicit `alternates.canonical` in their metadata. Without canonicals, Google may treat them as duplicates.

### 11. Thin Content Risk

Several pages (from the `sitefix.txt` analysis: 21 pages "crawled but not indexed") likely don't have enough unique content depth. Google considers them not valuable enough to index. Every key page should have 800-1500 words of unique content, clear H-tag hierarchy, internal links, and FAQs.

### 12. Weak Internal Linking

The footer has good cross-linking, but individual pages don't consistently link to related pages in their body content. The homepage has good cross-links, but deeper pages like `/yachts` and `/resorts` may lack reciprocal links.

---

## MEDIUM — Code Quality

### 13. Duplicated Code Across API Routes

The following are copy-pasted across multiple files:

| Code | Files |
|------|-------|
| `esc()` HTML escape function | `leads/availability/route.ts`, `leads/waitlist/route.ts`, `leads/partner/route.ts`, `leads/membership/route.ts` |
| `getResend()` factory | `leads/availability/route.ts`, `leads/waitlist/route.ts`, `leads/partner/route.ts`, `leads/membership/route.ts` |
| `isValidEmail()` | `leads/availability/route.ts`, `leads/waitlist/route.ts` |
| `NOTIFY_EMAIL` constant | All lead routes |
| `instagramUrl` constant | `page.tsx`, `efoil-experiences-maldives/page.tsx`, `learn-efoil-maldives/page.tsx`, `audi-foil-board/page.tsx`, `club/page.tsx` |
| `getStripe()` factory | `api/checkout/route.ts`, `api/webhook/route.ts` |

**Recommendation:** Extract shared utilities:
- `src/utils/email.ts` — `getResend()`, `esc()`, `isValidEmail()`, `NOTIFY_EMAIL`
- `src/utils/stripe.ts` — `getStripe()`
- Add `instagramUrl` to `src/resources/content.tsx` as a shared constant

### 14. Unnecessary Client-Side Rendering

**File:** `src/app/audi-foil-board/page.tsx`

The entire Audi eFoil product page is marked `"use client"` solely because of `useRouter()` for button `onClick` handlers. This prevents server-side rendering of the entire page, hurting SEO and initial load performance.

**Fix:** Remove `"use client"`, replace `onClick={() => router.push('/path')}` with `href="/path"` on the Button components (which already support `href`).

### 15. Zero Test Coverage

There are no test files, no testing framework configured, and no CI pipeline that runs tests. For a site handling payments and lead capture, this is risky.

**Recommendation:** Add at minimum:
- Unit tests for API routes (authentication, checkout, webhook, lead forms)
- Integration tests for the Stripe payment flow
- Visual regression tests for key landing pages

### 16. Stale/Unnecessary Files in Repository Root

| File | Issue |
|------|-------|
| `062931.763.md` | Build error log — should not be committed |
| `sitefix.txt` | Strategy notes — should be in a wiki or docs, not the codebase |
| `.env.vercel` | Contains production secrets — must be removed (see #1) |
| `.cursor/worktrees.json` | IDE-specific file — should be in `.gitignore` |

---

## MEDIUM — Incomplete Features

### 17. Stripe Webhook Missing Notification Logic

**File:** `src/app/api/webhook/route.ts`

The webhook handler has TODO comments where notification logic should be:

```typescript
// TODO: Add your notification logic here
// Options:
// 1. Send email notification (using Resend, SendGrid, etc.)
// 2. Send notification
// 3. Save to database
// 4. Send to Slack/Discord
```

When a customer completes checkout, the only action is `console.log()`. No confirmation email is sent to the customer or the business. Failed payments are also only logged.

**Recommendation:** Use the already-configured Resend integration to send:
- Booking confirmation email to the customer
- Notification email to the business (NOTIFY_EMAIL)
- Failed payment alerts

### 18. No Data Persistence

Leads and bookings are only sent via email. There is no database storing:
- Customer information
- Booking history
- Lead form submissions
- Membership applications

If an email fails silently, the data is lost. Consider adding a lightweight database (Vercel Postgres, Supabase, or even a Google Sheet integration) as a backup.

### 19. CTAs Redirect to Instagram Instead of On-Site Forms

The primary CTAs on `/efoil-experiences-maldives` and `/learn-efoil-maldives` send users to Instagram DMs for booking. Meanwhile, the `RequestAvailabilityForm` component exists but is only used on a few pages.

This creates friction: users leave the site, may not have Instagram, and the conversion is untrackable.

**Recommendation:** Use the on-site `RequestAvailabilityForm` as the primary CTA on all experience/learn pages, with Instagram as a secondary option.

---

## LOW — Performance & UX

### 20. Large Inline SVGs on Homepage

**File:** `src/app/page.tsx` (lines 494-567)

Four detailed SVG icons are inlined in the JSX for the product specs section. These should be extracted to separate SVG files or a shared icon component.

### 21. No Error Boundary

There is no React error boundary wrapping the application. If a component throws during render, the entire page crashes with no fallback UI.

### 22. Rate Limiter Resets on Cold Start

**File:** `src/utils/rateLimit.ts`

The rate limiter uses an in-memory `Map`. On serverless platforms (Vercel), each function invocation may get a fresh instance, making the rate limiter ineffective against distributed attacks.

**Recommendation:** For production-grade rate limiting, use Vercel KV, Upstash Redis, or a similar persistent store.

### 23. Missing Next.js Middleware Migration Warning

The `sitefix.txt` build log shows:

```
The "middleware" file convention is deprecated. Please use "proxy" instead.
```

Next.js 16 is deprecating `middleware.ts` in favor of the new proxy API. Plan for migration.

### 24. Unused Dependencies

- `mapbox` and `mapbox-gl` (+ `@mapbox/mapbox-gl-geocoder`) — The booking/location page exists at `src/app/book/location/page.tsx` but the `/book` route redirects to `/work`. If the map-based booking flow is abandoned, remove these heavy dependencies.
- `transliteration` — Check if this is still used.

---

## Summary — Priority Order

| Priority | Item | Effort |
|----------|------|--------|
| P0 | Rotate exposed production secrets (#1) | 1 hour |
| P0 | Fix build failure (#5) | 15 min |
| P1 | Remove `.env.vercel` from repo + gitignore (#1) | 30 min |
| P1 | Implement webhook notifications (#17) | 2-3 hours |
| P1 | Use on-site forms instead of Instagram CTAs (#19) | 1-2 hours |
| P2 | Fix sitemap/robots.txt contradiction (#9) | 15 min |
| P2 | Make Audi page server-rendered (#14) | 30 min |
| P2 | Extract duplicated utilities (#13) | 1 hour |
| P2 | Remove stale files (#16) | 15 min |
| P2 | Fix lock file conflict (#6) | 15 min |
| P3 | Add canonical tags (#10) | 1 hour |
| P3 | Improve internal linking (#12) | 2-3 hours |
| P3 | Add error boundary (#21) | 30 min |
| P3 | Add basic test coverage (#15) | 4-6 hours |
| P3 | Strengthen auth implementation (#2) | 2-3 hours |
| P4 | Add data persistence (#18) | 4-6 hours |
| P4 | Persistent rate limiting (#22) | 1-2 hours |
| P4 | Remove unused dependencies (#24) | 30 min |
