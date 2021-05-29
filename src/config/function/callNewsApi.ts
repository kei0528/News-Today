import { HeadlineNewsProps } from "../props/GlobalProps";

// url
const url = "https://newsapi.org/v2/";

const headlineNewsGeneral = (key: string) =>
  `${url}top-headlines?country=de&category=general&pageSize=50&apiKey=${key}`;
const headlineNewsBusiness = (key: string) =>
  `${url}top-headlines?country=de&category=business&pageSize=50&apiKey=${key}`;
const headlineNewsTechnology = (key: string) =>
  `${url}top-headlines?country=de&category=technology&pageSize=50&apiKey=${key}`;
const headlineNewsHealth = (key: string) =>
  `${url}top-headlines?country=de&category=health&pageSize=50&apiKey=${key}`;
const headlineNewsScience = (key: string) =>
  `${url}top-headlines?country=de&category=science&pageSize=50&apiKey=${key}`;
const headlineNewsEntertainment = (key: string) =>
  `${url}top-headlines?country=de&category=entertainment&pageSize=50&apiKey=${key}`;
const headlineNewsSports = (key: string) =>
  `${url}top-headlines?country=de&category=sports&pageSize=50&apiKey=${key}`;

export const extractNewsWithImg = (
  news: HeadlineNewsProps,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const newsWithImg = [];
  if (news.articles) {
    for (let i = 0; i < news.articles.length; i++) {
      if (news.articles[i].urlToImage) {
        newsWithImg.push(news.articles[i]);
      }
    }
  } else {
    setError(true);
  }
  return newsWithImg;
};

const searchNews = (
  apiKey: string,
  keyword: string,
  from?: string,
  to?: string,
  sortBy?: "relevancy" | "popularity" | "publishedAt" | String,
  page?: number
): string =>
  `${url}everything?q=${keyword}${from && to ? `&from=${from}&to=${to}` : ""}${
    sortBy ? `&sortBy=${sortBy}` : ""
  }${page ? `&page=${page.toString()}` : ""}&language=de&apiKey=${apiKey}`;

export const fetchNews_search = async <T>(
  apiKey: string,
  keyword: string,
  from?: string | undefined,
  to?: string | undefined,
  sortBy?: "relevancy" | "popularity" | "publishedAt" | String | undefined,
  page?: number | undefined
): Promise<T> => {
  let data: any;
  try {
    const res = await fetch(
      searchNews(apiKey, keyword, from, to, sortBy, page)
    );
    data = await res.json();
  } catch (err) {
    data = err;
  }
  return data;
};

export {
  url,
  headlineNewsGeneral,
  headlineNewsBusiness,
  headlineNewsTechnology,
  headlineNewsHealth,
  headlineNewsScience,
  headlineNewsEntertainment,
  headlineNewsSports,
  searchNews,
};
