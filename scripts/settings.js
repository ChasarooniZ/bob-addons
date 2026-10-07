import { MODULE_ID } from "./lib/const.js";

export function setupSettings() {
  game.settings.register(MODULE_ID, "apply-nightfall-effect", {
    name: `${MODULE_ID}.module-settings.apply-nightfall-effect.name`,
    hint: `${MODULE_ID}.module-settings.apply-nightfall-effect.hint`,
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "config.asked-turn-marker", {
    name: `${MODULE_ID}.module-settings.config.asked-turn-marker.name`,
    hint: `${MODULE_ID}.module-settings.config.asked-turn-marker.hint`,
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
}
