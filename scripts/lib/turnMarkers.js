import { TURN_MARKERS, MODULE_ID } from "./const.js";

export async function selectTurnMarkerEnable() {
  const data = await foundry.applications.api.DialogV2.input({
    window: { title: "bob-addons.dialog.turn-marker.title" },
    content: `
    <img src="modules/${MODULE_ID}/assets/art/thumb/turn-markers.webp">
    <label><input type="radio" name="choice" value="standard" checked>${game.i18n.localize("bob-addons.dialog.turn-marker.inputs.choice.standard")}</label>
    <label><input type="radio" name="choice" value="circle" checked>${game.i18n.localize("bob-addons.dialog.turn-marker.inputs.choice.with-circle")}</label>
    <label><input type="radio" name="choice" value="none" checked>${game.i18n.localize("bob-addons.dialog.turn-marker.inputs.choice.none")}</label>
    <div>
    </div>`,
    ok: {
      label: "Okay",
      icon: "fa-solid fa-play",
    },
  });
  await game.settings.set(MODULE_ID, "config.asked-turn-marker", true);

  const trackerCFG = game.settings.get("core", "combatTrackerConfig");

  if (data?.choice === "none") return;

  let markers;

  if (data?.choice === "circle") {
    const isStandard =
      game.settings.get("core", "dynamicTokenRingFitMode") === "subject";
    if (isStandard) {
      markers = TURN_MARKERS.CIRCLE.STANDARD_FIT;
    } else {
      markers = TURN_MARKERS.CIRCLE.GRID_FIT;
    }
  } else if (data?.choice === "standard") {
    markers = TURN_MARKERS.STANDARD;
  }

  await game.settings.set(
    "core",
    "combatTrackerConfig",
    foundry.utils.mergeObject(trackerCFG, {
      turnMarker: { src: markers.NORMAL },
    }),
  );

  if (data?.specialForBosses) {
    await setBossTurnMarkers(markers.BOSS);
  }
}

const BOSS_UUIDS = new Set([
  "Actor.wBWh3kFEDBTeqSVu",
  "Actor.nauKeeLKERwPZNDI",
  "Actor.nvkI4G9QR7hAxVy0",
  "Actor.L3vRwN2JcJVk88Ij",
  "Actor.Gva6GAH3WjjRi8Wd",
  //2 -3
  "Actor.xDNjxFXDFtl9thUa",
  "Actor.I5RtQqy4YfR2oMjo",
  "Actor.VQrtNCtgkoNuCaxn",
  "Actor.gbuh5CHc7mr2YU2A",
  "Actor.ns5h9AY1kPboyPln",
  "Actor.6dBcCjhYDsxvP8Lj",
  "Actor.ughj4w37cFYLudzJ",
  "Actor.CzNZG7eukyjlg28r",
  // 4
  "Actor.SudB6sBMNJr8tbaI",
  "Actor.qLUE00lfPwlt5dNM",
  "Actor.Yztj3ptEzuC35z1u",
  "Actor.XhMloMPbPL7IUlG7",
  "Actor.XwUby1tFKvbakwLR",
]);

//Modify this so instead it modifies tokens as they enter combat as that's easier
async function setBossTurnMarkers(marker) {}

export async function resetBossTurnMarkers() {}
