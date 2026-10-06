import { locationAnimation } from "./animations/locationAnimation.js";
import { setupHooks } from "./hooks.js";
import { setupSettings } from "./settings.js";

export const MODULE_ID = "bob-addons";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  setupAPI();
  setupSettings();
  setupHooks();
});

function setupAPI() {
  window[MODULE_ID] = {
    api: {
      animations: {
        locationAnimation,
      },
    },
  };
}
