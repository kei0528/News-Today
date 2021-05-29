import React from "react";
// models
import { isSelectedProps, ArticleProps } from "../../config/props/GlobalProps";
// function
import convertDate from "../../config/function/convertTime";

const NewsWrapper: React.FC<{
  article: ArticleProps;
  setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowSubMain, article, setIsSelected }) => {
  // on click, show sub-main-page
  const clickHandler = () => {
    setShowSubMain(true);
    setIsSelected({ genre: null, article, search: null });
  };
  // const
  return (
    <section className="news-wrapper" onClick={clickHandler}>
      <img
        src={article.urlToImage}
        alt=""
        onError={(e) => {
          e.currentTarget.onerror = null;
        }}
      />
      <article className="news-wrapper-contents">
        <h3>{article.title}</h3>
        {article.description ? <p>{article.description}</p> : ""}
        <aside>
          {article.author ? <p>{article.author},</p> : ""}

          <time
            dateTime={convertDate(article.publishedAt)}
            itemProp="datepublished"
          >
            {convertDate(article.publishedAt)}
          </time>
        </aside>
      </article>
    </section>
  );
};

export default NewsWrapper;
