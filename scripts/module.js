import { locationAnimation } from "./animations/locationAnimation.js";
import { setupHooks } from "./hooks.js";
import { MODULE_ID } from "./lib/const.js";
import { selectTurnMarkerEnable } from "./lib/turnMarkers.js";
import { setupSettings } from "./settings.js";

Hooks.once("init", async function () {
  Hooks.on("initializeDynamicTokenRingConfig", (ringConfig) => {
    const zapBobRing = new foundry.canvas.placeables.tokens.DynamicRingData({
      label: "Bastardhall Ring (by Zapperroni)",
      spritesheet: `modules/${MODULE_ID}/assets/token-ring/zap-bob-ring.json`,
    });
    ringConfig.addConfig("zapBoBRing", zapBobRing);
  });
});

Hooks.once("ready", async function () {
  setupAPI();
  setupSettings();
  setupHooks();
  if (!game.settings.get(MODULE_ID, "config.asked-dynamic-ring")) {
    const setRing = await foundry.applications.api.DialogV2.confirm({
      window: {
        title: game.i18n.localize("bob-addons.dialog.dynamic-ring.title"),
      },
      content: `<img src="modules/${MODULE_ID}/assets/art/thumb/dynamic-ring.webp">
      <p>${game.i18n.localize("bob-addons.dialog.dynamic-ring.content")}</p>`,
    });

    await game.settings.set(MODULE_ID, "config.asked-dynamic-ring", true);
    if (setRing) {
      await game.settings.set("core", "dynamicTokenRing", "zapBoBRing");
      foundry.utils.debouncedReload();
    }
  }

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
