import { MODULE_ID } from "../module";

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
    "bob-addons.animation.location-title.title.custom",
  );

  // Random chance for Bastion of Blasphemies to be Blasphemy of Bastions randomly or Bastions of Blasphemies

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

  const data = await foundry.applications.api.DialogV2.input({
    window: { title: "bob-addons.animation.location-title.title" },
    content: `${optionsHTML}<input type="text" name="custom">`,
    ok: {
      label: "SEQUENCER.SidebarButtons.Play",
      icon: "fa-solid fa-play",
    },
  });
  const text = data?.choice === custom ? data?.custom : data?.choice;

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
  const textMetrics = PIXI.TextMetrics.measureText(
    text,
    new PIXI.TextStyle(style),
  );
  const lineHeight = textMetrics.height;

  const textOffset = lineHeight * 0.3;

  const scale = (lineHeight * 5) / topWidth;

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
    .screenSpacePosition({ x: 0, y: -textOffset + lineHeight / 2 })
    .anchor({ x: 0.5, y: 0 });
  if (textBottom) {
    seq
      .screenSpacePosition({ x: 0, y: textOffset + lineHeight / 2 })
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
  seq.play({ preload: true });
}
