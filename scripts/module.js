import { locationAnimation } from "./animations/locationAnimation.js";

export const MODULE_ID = "bob-addons";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  setupAPI();
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
