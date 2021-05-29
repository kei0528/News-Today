import React from "react";
// function
import convertDate from "../../config/function/convertTime";
// model
import { isSelectedProps } from "../../config/props/GlobalProps";
// img
import backImg from "../../imgs/previous.svg";

const SelectedNews: React.FC<{
  isSelected: isSelectedProps;
  setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  isFromGenre?: boolean;
  setIsFromGenre?: React.Dispatch<boolean>;
}> = ({ isSelected, setIsSelected, isFromGenre, setIsFromGenre }) => {
  // function
  const backToList = () => {
    if (setIsFromGenre) {
      setIsFromGenre(false);
      setIsSelected((prev) => ({ ...prev, article: null }));
    }
  };
  return (
    <article
      className={"sub-main-news" + " " + (isFromGenre ? "news-from-genre" : "")}
    >
      {/* show back icon if news was selected from news-list */}
      {isFromGenre && (
        <nav className="back-to-list" onClick={backToList}>
          <button>
            <img src={backImg} alt="back to list" />
          </button>
        </nav>
      )}
      {isFromGenre && (
        <button
          className="sub-main-news-from-genre-shadow"
          onClick={backToList}
        />
      )}
      <div>
        <h2>{isSelected.article?.title}</h2>
        <aside>
          {isSelected.article && (
            <time>{convertDate(isSelected.article.publishedAt)}</time>
          )}
          <a
            href={isSelected.article?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isSelected.article?.source.name ? (
              <span>{isSelected.article?.source.name}</span>
            ) : (
              "source"
            )}
            {isSelected.article?.author ? (
              <span> / {isSelected.article?.author}</span>
            ) : (
              ""
            )}
          </a>
        </aside>
        <hr />
        {isSelected.article?.urlToImage ? (
          <img
            src={isSelected.article?.urlToImage}
            alt={isSelected.article?.title}
          />
        ) : (
          ""
        )}
        {isSelected.article?.description ? (
          <p className="sub-main-news-description">
            {isSelected.article?.description}
          </p>
        ) : (
          ""
        )}
        {isSelected.article?.content ? (
          <p className="sub-main-news-content">{isSelected.article?.content}</p>
        ) : (
          ""
        )}
        <a
          href={isSelected.article?.url}
          className="sub-main-news-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          mehr lesen
        </a>
      </div>
    </article>
  );
};

export default SelectedNews;
