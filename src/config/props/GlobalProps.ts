export interface LogProp {
  apiKey: string;
  status: {
    isLogged: boolean;
    onFailure: string;
  };
}

export interface GenreProps {
  genre:
    | "general"
    | "business"
    | "technology"
    | "health"
    | "science"
    | "entertainment"
    | "sports"
    | null;
}

export interface isSelectedProps extends GenreProps {
  article: ArticleProps | null;
  search: HeadlineNewsProps | null;
}

export interface SearchInputProps {
  keyword: string;
  from?: string;
  to?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt" | string;
  page?: string;
}

// fetched items
export interface ArticleProps {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface HeadlineNewsProps {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
}

export interface FetchErrorProps {
  status: "error";
  message: string;
  code: string;
}

export interface NewsProps {
  general: HeadlineNewsProps | {};
  business: HeadlineNewsProps | {};
  technology: HeadlineNewsProps | {};
  health: HeadlineNewsProps | {};
  science: HeadlineNewsProps | {};
  entertainment: HeadlineNewsProps | {};
  sports: HeadlineNewsProps | {};
}

export interface NewsWithImgProps {
  general: ArticleProps[] | [];
  business: ArticleProps[] | [];
  technology: ArticleProps[] | [];
  health: ArticleProps[] | [];
  science: ArticleProps[] | [];
  entertainment: ArticleProps[] | [];
  sports: ArticleProps[] | [];
}
