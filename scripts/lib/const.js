export const EFFECT = {
  NIGHTFALL: {
    folder: null,
    name: "Effect: Nightfall",
    type: "effect",
    effects: [],
    system: {
      _migration: {
        version: 0.959,
        previous: null,
      },
      description: {
        value:
          "<p>You take a –1 circumstance penalty to all saving throws against fear effects.</p>",
        gm: "<p>All enemies gain a +1 circumstance bonus to initiative checks and all saving throws against holy effects.</p>",
      },
      publication: {
        title: "Pathfinder Adventure Path: Bastion of Blasphemies",
        authors: "",
        license: "ORC",
        remaster: true,
      },
      rules: [
        {
          key: "FlatModifier",
          value: -1,
          predicate: ["self:type:character", "item:trait:fear"],
          selector: ["saving-throw"],
          slug: "nightfall-fear-penalty",
          type: "circumstance",
          hideIfDisabled: true,
        },
        {
          key: "FlatModifier",
          selector: ["initiative"],
          slug: "nightfall-initiative-bonus",
          value: 1,
          predicate: ["self:type:npc"],
          hideIfDisabled: true,
        },
        {
          key: "FlatModifier",
          selector: ["saving-throw"],
          slug: "nightfall-initiative-bonus",
          value: 1,
          predicate: ["item:trait:divine", "self:type:npc"],
          hideIfDisabled: true,
        },
      ],
      slug: "effect-nightfall",
      level: {
        value: 1,
      },
      tokenIcon: {
        show: true,
      },
      unidentified: false,
    },
    img: "icons/environment/cosmos/planet-moon-blue.webp",
    ownership: {
      default: 0,
    },
  },
};
