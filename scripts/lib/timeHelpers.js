export function isNight() {
  const { hour, minute } = getTime();
  const { dusk, dawn } = getDawnDuskData();
  const currentTime = hourMinuteToTime(hour, minute);

  const duskTime = hourMinuteToTime(dusk.hour, dusk.minute);
  const dawnTime = hourMinuteToTime(dawn.hour, dawn.minute);

  return currentTime >= duskTime || currentTime <= dawnTime;
}
2
export function timeTillNightFall() {
  if (isNight()) {
    return 0;
  } else {
    const { hour, minute } = getTime();
    const { dusk } = getDawnDuskData();
    return dusk.hour + dusk.minute / 60 - (hour + minute / 60);
  }
}

export function timeTillDawn() {
  if (!isNight()) {
    return 0;
  } else {
    const { hour, minute } = getTime();
    const { dawn } = getDawnDuskData();
    return (
      (dawn.hour < hour ? 24 : 0) +
      (dawn.hour + dawn.minute / 60) -
      (hour + minute / 60)
    );
  }
}

export function isEndlessNight() {
  const { dusk, dawn } = getDawnDuskData();
  return dusk.hour === dawn.hour && dusk.minute === dawn.minute;
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
