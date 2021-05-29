import React from "react";
// models
import { ArticleProps } from "../../config/props/GlobalProps";
// function
import convertTime from "../../config/function/convertTime";

interface Props {
  news: ArticleProps;
  sectionOnClick:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
}

const ListItem: React.FC<Props> = ({ news, sectionOnClick }) => {
  return (
    <section
      key={news.url}
      className="sub-main-genres-news-list-content"
      onClick={sectionOnClick}
    >
      <div className="sub-main-genres-news-list-content-title">
        <h3 className={news.urlToImage ? "news-tilte-width-img" : ""}>
          {news.title}
        </h3>
        <span>{convertTime(news.publishedAt)}</span>
      </div>
      {news.urlToImage ? (
        <img
          src={news.urlToImage}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
          }}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default ListItem;
