// from stackoverflow
const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const getRelativeTime = (d1, d2 = new Date()) => {
  var elapsed = new Date(d1) - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (let u in units)
    if (Math.abs(elapsed) > units[u] || u == "second")
      // return rtf.format(Math.round(elapsed / units[u]), u);
      return rtf.format(Math.round(elapsed / units[u]), u);
};

export default getRelativeTime;
