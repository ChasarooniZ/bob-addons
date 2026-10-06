import {
  isEndlessNight,
  isNight,
  timeTillDawn,
  timeTillNightFall,
} from "../lib/timeHelpers.js";
import { MODULE_ID } from "../module.js";

const effectAnchor = { x: 0.5, y: 0.4 };

const duration = 6000;
const fadeIn = 1000;
const fadeOut = 3000;

const top = "modules/bob-addons/assets/art/misc/hollow-knight-bob-top.webp";
const bot = "modules/bob-addons/assets/art/misc/hollow-knight-bob-bot.webp";

const topWidth = 2101;
const botWidth = 1445;

const borderTint = "#BCAA58";

export async function locationAnimation({ animScale = 1 }) {
  // TODO make this trigger on location of highlighted token otherwise ask you to selection
  const custom = game.i18n.localize(
    "bob-addons.animation.location-title.titles.custom",
  );
  const isNightTime = isNight();

  const optionsHTML = getOptionsHTML(custom);

  const data = await foundry.applications.api.DialogV2.input({
    window: { title: "bob-addons.animation.location-title.title" },
    content: `${optionsHTML}<input type="text" name="custom">
    <div>
      <input type="checkbox" id="timeTo" name="timeTo" />
      <label for="timeTo">${game.i18n.localize(isNightTime ? "bob-addons.animation.location-title.do-time-to-dawn" : "bob-addons.animation.location-title.do-time-to-night")}</label>
    </div>`,
    ok: {
      label: "SEQUENCER.SidebarButtons.Play",
      icon: "fa-solid fa-play",
    },
  });
  let text = data?.choice === custom ? data?.custom : data?.choice;

  const subtitle = text.split("/")?.[1]
    ? ` ${text.split("/")?.[1]?.trim()} `
    : false;
  if (subtitle) {
    text = text.split("/")?.[0]?.trim();
  }

  const addSubtitle = data?.timeTo;

  const textTop = ` ${text.split("|")?.[0]?.trim()} `;
  const textBottom = text.split("|")?.[1]
    ? ` ${text.split("|")?.[1]?.trim()} `
    : false;

  const style = {
    fill: "#BDA536",
    fontFamily: "PopplFrakturCAT",
    lineJoin: "round",
    fontSize: 96 * animScale,
    fontWeight: "bold",
    strokeThickness: 8,
  };

  const subtitleScale = 0.6;

  const subtitleStyle = foundry.utils.mergeObject(
    foundry.utils.deepClone(style),
    {
      fontSize: style.fontSize * subtitleScale,
      fill: "#8E7C29",
    },
  );

  const textMetrics = PIXI.TextMetrics.measureText(
    text,
    new PIXI.TextStyle(style),
  );
  const lineHeight = textMetrics.height;

  const textOffset = lineHeight * 0.3;

  const scale = (lineHeight * 5) / topWidth;

  const subtitleOffsetForBottom =
    (Number(addSubtitle || !!subtitle) * (lineHeight * subtitleScale)) / 2;

  const subtitleOffsetY = textBottom
    ? textOffset + subtitleOffsetForBottom * 0.3 + lineHeight / 2
    : -textOffset + subtitleOffsetForBottom * 0.3 + lineHeight / 2;

  const bottomOffsetY = textBottom
    ? subtitleOffsetForBottom + textOffset + lineHeight / 2
    : subtitleOffsetForBottom - textOffset + lineHeight / 2;

  const seq = new Sequence({
    moduleName: game.modules.get(MODULE_ID)?.name,
    softFail: true,
  })
    .sound()
    .file(`modules/${MODULE_ID}/assets/sfx/region-sting.ogg`)
    //Top Effect
    .effect()
    .file(top)
    .tint(borderTint)
    .scale(scale)
    .duration(duration)
    .fadeIn(fadeIn, { ease: "easeInCubic" })
    .scaleIn(1.5, fadeIn, { ease: "easeOutCubic" })
    .fadeOut(fadeOut)
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor(effectAnchor)
    .screenSpacePosition({ x: 0, y: -textOffset - lineHeight / 2 })
    .anchor({ x: 0.5, y: 1 })
    //Top Text
    .effect()
    .text(textTop, style)
    .duration(duration)
    .fadeIn(fadeIn, { ease: "easeInCubic" })
    .scaleIn(1.5, fadeIn, { ease: "easeOutCubic" })
    .fadeOut(fadeOut)
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor(effectAnchor)
    .screenSpacePosition({ x: 0, y: -textOffset })
    // Bot Effect
    .effect()
    .file(bot)
    .tint(borderTint)
    .scale(scale)
    .duration(duration)
    .fadeIn(fadeIn, { ease: "easeInCubic" })
    .scaleIn(1.5, fadeIn, { ease: "easeOutCubic" })
    .fadeOut(fadeOut)
    .screenSpace()
    .screenSpaceAboveUI()
    .screenSpaceAnchor(effectAnchor)
    .screenSpacePosition({ x: 0, y: bottomOffsetY })
    .anchor({ x: 0.5, y: 0 });
  if (textBottom) {
    seq
      .effect()
      .text(textBottom, style)
      .duration(duration)
      .fadeIn(fadeIn, { ease: "easeInCubic" })
      .scaleIn(1.5, fadeIn, { ease: "easeOutCubic" })
      .fadeOut(fadeOut)
      .screenSpace()
      .screenSpaceAboveUI()
      .screenSpaceAnchor(effectAnchor)
      .screenSpacePosition({ x: 0, y: textOffset });
  }
  if (addSubtitle || !!subtitle) {
    const hours = Math.round(
      isNightTime ? timeTillDawn() : timeTillNightFall(),
    );

    const dawnOrNight = isNightTime ? "dawn" : "night";

    const sub = ` ${game.i18n.format(
      isEndlessNight()
        ? "bob-addons.animation.location-title.endless-night"
        : `bob-addons.animation.location-title.hours-until-${dawnOrNight}`,
      { hours },
    )} `;
    seq
      .effect()
      .text(subtitle || sub, subtitleStyle)
      .duration(duration)
      .fadeIn(fadeIn, { ease: "easeInCubic" })
      .scaleIn(1.5, fadeIn, { ease: "easeOutCubic" })
      .fadeOut(fadeOut)
      .screenSpace()
      .screenSpaceAboveUI()
      .screenSpaceAnchor(effectAnchor)
      .screenSpacePosition({ x: 0, y: subtitleOffsetY });
  }
  seq.play({ preload: true });
}

// Random chance for Bastion of Blasphemies to be Blasphemy of Bastions randomly or Bastions of Blasphemies
function getOptionsHTML(custom) {
  const options = [
    Math.random() <= 0.01
      ? game.i18n.localize(
          `bob-addons.animation.location-title.fun-titles.${Math.ceil(Math.random() * 2)}`,
        )
      : game.i18n.localize(
            "bob-addons.animation.location-title.title.bastion-of-blasphemies",
          ) ===
          "bob-addons.animation.location-title.title.bastion-of-blasphemies"
        ? "Bastion of |Blasphemies"
        : game.i18n.localize(
            "bob-addons.animation.location-title.title.bastion-of-blasphemies",
          ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-haunted-shore",
    ) === "bob-addons.animation.location-title.title.the-haunted-shore"
      ? "The Haunted Shore"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-haunted-shore",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.castle-grounds",
    ) === "bob-addons.animation.location-title.title.castle-grounds"
      ? "Castle Grounds"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.castle-grounds",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-cellars",
    ) === "bob-addons.animation.location-title.title.the-cellars"
      ? "The Cellars"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-cellars",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-reception-hall",
    ) === "bob-addons.animation.location-title.title.the-reception-hall"
      ? "The Reception Hall"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-reception-hall",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-dungeon",
    ) === "bob-addons.animation.location-title.title.the-dungeon"
      ? "The Dungeon"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-dungeon",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-private-halls",
    ) === "bob-addons.animation.location-title.title.the-private-halls"
      ? "The Private Halls"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-private-halls",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-fallen-temple",
    ) === "bob-addons.animation.location-title.title.the-fallen-temple"
      ? "The Fallen Temple"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-fallen-temple",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-vault",
    ) === "bob-addons.animation.location-title.title.the-vault"
      ? "The Vault"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-vault",
        ),
    game.i18n.localize(
      "bob-addons.animation.location-title.title.the-towers",
    ) === "bob-addons.animation.location-title.title.the-towers"
      ? "The Towers"
      : game.i18n.localize(
          "bob-addons.animation.location-title.title.the-towers",
        ),
    custom,
  ];

  const optionsHTML = options
    .map(
      (o, i) =>
        `<label><input type="radio" name="choice" value="${o}" ${i === 0 ? "checked" : ""}>${o.replace("|", "")}</label>`,
    )
    .join("");
  return optionsHTML;
}
