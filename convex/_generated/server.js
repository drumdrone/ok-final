/**
 * Placeholder — nahradí se automaticky při `npx convex dev`.
 * Convex generuje typované wrappery; před inicializací re-exportujeme
 * netypované builtin z `convex/server`.
 */
export {
  mutation,
  query,
  action,
  internalMutation,
  internalQuery,
  internalAction,
} from "convex/server";
