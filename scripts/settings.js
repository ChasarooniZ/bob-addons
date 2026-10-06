import { MODULE_ID } from "./module.js";

export function setupSettings() {
  game.settings.register(MODULE_ID, "apply-nightfall-effect", {
    name: `${MODULE_ID}.module-settings.apply-nightfall-effect.name`,
    hint: `${MODULE_ID}.module-settings.apply-nightfall-effect.hint`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
}
