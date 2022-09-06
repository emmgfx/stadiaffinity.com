export default function diffDays(d1, d2) {
  var ndays;
  var tv1 = d1.valueOf(); // msec since 1970
  var tv2 = d2.valueOf();

  ndays = (tv2 - tv1) / 1000 / 86400;
  ndays = Math.round(ndays - 0.5);
  return ndays;
}
