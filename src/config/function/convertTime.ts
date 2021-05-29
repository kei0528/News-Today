// convert article-published-date to local-string
const convertDate = (d: Date | string) => {
  return new Date(d).toLocaleString();
};

export default convertDate;
