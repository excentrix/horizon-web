/**
 * Feature flags for the marketing site — read from the backend single source
 * of truth (`/api/config/features/`), shared with the product app.
 *
 * Set NEXT_PUBLIC_HORIZON_API_URL to the backend API base. Falls back to
 * DEFAULT_FLAGS if unset or unreachable, so the site always renders.
 *
 * Used (now) to decide which product narrative leads: VELO vs Horizon.
 */

export type FeatureName =
  | "velo"
  | "chat"
  | "intelligence"
  | "portfolio"
  | "institutions"
  | "dashboard"
  | "onboarding"
  | "plans"
  | "roadmap"
  | "progress"
  | "simulations"
  | "gamification"
  | "knowledge_graph"
  | "semantic_memory";

export type FeatureFlags = Record<FeatureName, boolean>;

export const DEFAULT_FLAGS: FeatureFlags = {
  velo: true,
  chat: true,
  intelligence: true,
  portfolio: true,
  institutions: true,
  dashboard: true,
  onboarding: true,
  plans: false,
  roadmap: false,
  progress: false,
  simulations: false,
  gamification: false,
  knowledge_graph: false,
  semantic_memory: false,
};

function flagsEndpoint(): string | null {
  const base = process.env.NEXT_PUBLIC_HORIZON_API_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/config/features/`;
}

/** Fetch live flags from the backend (server-side). Falls back to defaults. */
export async function getFeatureFlags(): Promise<FeatureFlags> {
  const endpoint = flagsEndpoint();
  if (!endpoint) return DEFAULT_FLAGS;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 300 } });
    if (!res.ok) return DEFAULT_FLAGS;
    const data = (await res.json()) as { features?: Partial<FeatureFlags> };
    return { ...DEFAULT_FLAGS, ...(data.features ?? {}) };
  } catch {
    return DEFAULT_FLAGS;
  }
}
