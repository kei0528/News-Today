import React from "react";
// models
import {
  isSelectedProps,
  GenreProps,
  ArticleProps,
} from "../../config/props/GlobalProps";
// components
import ReadMoreButton from "./ReadMoreButton";
import NewsWrapper from "./NewsWrapper";

const NewsContainer: React.FC<
  GenreProps & {
    setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    newsByGenre: ArticleProps[];
    setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  }
> = ({ title, setShowSubMain, newsByGenre, setIsSelected, genre }) => {
  // return NewsWrapper
  const newsDropper = () => {
    if (Object.keys(newsByGenre).length) {
      const obj = [];
      if (newsByGenre.length < 4) {
        for (let i = 0; i < newsByGenre.length; i++) {
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
      } else {
        for (let i = 0; i < 4; i++) {
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
      }
      return obj;
    } else {
      return;
    }
  };
  return (
    <div>
      <h2
        onClick={() => {
          setShowSubMain(true);
          setIsSelected({ genre, article: null, search: null });
        }}
      >
        {title}
      </h2>
      <section>
        <div className="slider">
          <div className="slider-contents">
            {newsDropper()}
            <ReadMoreButton
              setIsSelected={setIsSelected}
              setShowSubMain={setShowSubMain}
              genre={genre}
            />
          </div>
        </div>
      </section>
      <ReadMoreButton
        setIsSelected={setIsSelected}
        setShowSubMain={setShowSubMain}
        genre={genre}
      />
    </div>
  );
};

export default NewsContainer;
