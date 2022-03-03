export const title = "Stadiaffinity";
export const sepparator = "-";
export const formatTitle = (pageTitle = "") =>
  pageTitle.length === 0 ? title : `${pageTitle} ${sepparator} ${title}`;
