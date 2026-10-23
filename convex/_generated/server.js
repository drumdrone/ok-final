/**
 * Placeholder — nahradí se automaticky při `npx convex dev`.
 * Convex 1.43+ exportuje factory funkce pod *Generic jménem; po inicializaci
 * jsou vygenerovány typované wrappery. Před init re-exportujeme bez typů.
 */
export {
  mutationGeneric as mutation,
  queryGeneric as query,
  actionGeneric as action,
  internalMutationGeneric as internalMutation,
  internalQueryGeneric as internalQuery,
  internalActionGeneric as internalAction,
} from "convex/server";
