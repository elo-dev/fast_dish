export const getTimeFromMins = (mins) => {
  if (mins <= 59) {
    return `${mins}m.`
  } else {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return `${hours}h. ${minutes}m.`
  }
}
