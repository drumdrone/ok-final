/**
 * Convex API handle.
 *
 * `anyApi` sestaví FunctionReference podle přístupové cesty za runtime
 * (např. `api.jobs.listAll` → "jobs:listAll"), nezávisle na konkrétním
 * deploymentu. ConvexHttpClient / ConvexReactClient je pak zavolá proti
 * URL z `NEXT_PUBLIC_CONVEX_URL`. Funkce samotné nahrává `npx convex
 * deploy` (na Netlify z build commandu) nebo `npx convex dev` lokálně.
 *
 * Tím odpadá závislost na vygenerovaném kódu z `convex dev`/`deploy`,
 * který se v produkčním buildu nemusel objevit — `anyApi` je oficiální
 * Convex utilita přesně pro tento případ.
 */
import { anyApi } from "convex/server";

export const api = anyApi;
export const internal = anyApi;
