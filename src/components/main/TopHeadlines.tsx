import React from "react";
// props
import {
  isSelectedProps,
  GenreProps,
  ArticleProps,
} from "../../config/props/GlobalProps";
// components
import NewsWrapper from "./NewsWrapper";
import ReadMoreButton from "../main/ReadMoreButton";

const TopHeadlines: React.FC<
  GenreProps & {
    setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
    newsByGenre: ArticleProps[] | [];
    setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  }
> = ({ setShowSubMain, newsByGenre, setIsSelected, genre }) => {
  // h2 click-handler
  const h2ClickHandler = () => {
    setShowSubMain(true);
    setIsSelected({ genre, article: null, search: null });
  };

  // return NewsWrapper for top-news
  const topNewsDropper = () => {
    if (Object.keys(newsByGenre).length) {
      return (
        <NewsWrapper
          setShowSubMain={setShowSubMain}
          article={newsByGenre[0]}
          setIsSelected={setIsSelected}
        />
      );
    } else {
      return "";
    }
  };
  // return NewsWrapper for slider bar
  const newsDropper = () => {
    // check article exists
    if (Object.keys(newsByGenre).length) {
      const obj = [];
      // max article length should be 4
      if (newsByGenre.length < 5) {
        for (let i = 1; i < newsByGenre.length; i++) {
          const article = newsByGenre[i];
          obj.push(
            <NewsWrapper
              key={Math.random()}
              setShowSubMain={setShowSubMain}
              article={article}
              setIsSelected={setIsSelected}
            />
          );
        }
        return obj;
      } else {
        for (let i = 1; i < 5; i++) {
          const article = newsByGenre[i];
          obj.push(
            <NewsWrapper
              key={Math.random()}
              setShowSubMain={setShowSubMain}
              article={article}
              setIsSelected={setIsSelected}
            />
          );
        }
        return obj;
      }
    } else {
      return;
    }
  };
  return (
    <div>
      <h2 className="headline-sp" onClick={h2ClickHandler}>
        Aktuelle Nachrichten
      </h2>
      <section className="top-headlines-container">
        {topNewsDropper()}
        <h2 className="headline-desktop" onClick={h2ClickHandler}>
          Aktuelle Nachrichten
        </h2>
        <div className="slider">
          <div className="slider-contents">
            {/* here comes news x4 */}
            {newsDropper()}
            <ReadMoreButton
              setIsSelected={setIsSelected}
              setShowSubMain={setShowSubMain}
              genre={"general"}
            />
          </div>
        </div>
      </section>
      <ReadMoreButton
        setIsSelected={setIsSelected}
        setShowSubMain={setShowSubMain}
        genre={"general"}
      />
    </div>
  );
};

export default TopHeadlines;
