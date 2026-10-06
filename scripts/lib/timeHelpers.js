export function isNight() {
  const { hour, minute } = getTime();
  const { dusk, dawn } = getDawnDuskData();
  const currentTime = hourMinuteToTime(hour, minute);

  const duskTime = hourMinuteToTime(dusk.hour, dusk.minute);
  const dawnTime = hourMinuteToTime(dawn.hour, dawn.minute);

  return currentTime >= duskTime || currentTime <= dawnTime;
}

export function timeTillNightFall() {
  if (isNight()) {
    return 0;
  } else {
    const { hour, minute } = getTime();
    const { dusk } = getDawnDuskData();
    return dusk.hour + dusk.minute / 60 - (hour + minute / 60);
  }
}

function hourMinuteToTime(hour, minute) {
  return hour * 60 + minute;
}

function getTime() {
  return game.pf2e.worldClock.worldTime;
}

function getDawnDuskData() {
  const { dawn, dusk } = game.settings.get(
    "pf2e-bastion-of-blasphemies",
    "campaign",
  ).activeArea.timeEvents;

  return { dawn, dusk };
}
