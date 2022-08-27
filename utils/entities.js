export const replaceHtmlEntities = (str) =>
  str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
