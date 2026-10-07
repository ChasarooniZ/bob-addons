import { EFFECT } from "./lib/const.js";
import { isNight } from "./lib/timeHelpers.js";
import { MODULE_ID } from "./lib/const.js";

export function setupHooks() {
  if (game.settings.get(MODULE_ID, "apply-nightfall-effect")) {
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
      Hooks.on("deleteCombat", (encounter) => {
        if (isNight()) {
          for (const combatant of encounter?.combatants?.contents ?? []) {
            const actor = combatant?.actor;
            const item = actor?.items?.contents?.find(
              (i) => i?.system?.slug === "effect-nightfall",
            );
            item?.delete();
          }
        }
      });
    }
  }
}
