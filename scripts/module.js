import { locationAnimation } from "./animations/locationAnimation.js";
import { setupHooks } from "./hooks.js";
import { MODULE_ID } from "./lib/const.js";
import { selectTurnMarkerEnable } from "./lib/turnMarkers.js";
import { setupSettings } from "./settings.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  setupAPI();
  setupSettings();
  setupHooks();

  if (!game.settings.get(MODULE_ID, "config.asked-turn-marker")) {
    await selectTurnMarkerEnable();
  }
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
