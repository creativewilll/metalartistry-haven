/**
 * Launch feature flags.
 *
 * These toggle whole surfaces of the site on/off without deleting any code.
 * Everything gated off here is lazy-loaded, so the disabled code is never
 * downloaded or executed by visitors — it sits dormant until you flip the flag.
 *
 * TO REACTIVATE: set the relevant flag to `true`, save, redeploy. That's it.
 *
 *   comingSoonGate -> the pre-launch password wall (ComingSoonGate.tsx)
 *   aboutPage      -> the /about route + every nav/footer/home link to it
 *
 * NOTE: after re-enabling `aboutPage`, regenerate SEO artifacts so the
 * sitemap re-includes /about:  `node scripts/generate-seo-artifacts.mjs`
 * and add `'/about'` back to the prerender ROUTES list if you prerender.
 */
export const FEATURES = {
  comingSoonGate: false,
  aboutPage: false,
} as const;
