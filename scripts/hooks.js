import { EFFECT } from "./lib/const.js";
import { isNight } from "./lib/timeHelpers.js";

export function setupHooks() {
  if (true) {
    if (game.user.isGM) {
      Hooks.on("createCombatant", async (combatant) => {
        if (isNight()) {
          const actor = combatant?.actor;
          actor.createEmbeddedDocuments("Item", [EFFECT.NIGHTFALL]);
        }
      });
      Hooks.on("deleteCombatant", async (combatant) => {
        if (isNight()) {
          const actor = combatant?.actor;
          const item = actor?.items?.contents?.find(
            (i) => i?.system?.slug === "effect-nightfall",
          );
          item?.delete();
        }
      });
    }
  }
}
