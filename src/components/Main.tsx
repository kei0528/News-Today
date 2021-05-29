import React from "react";
// models
import { isSelectedProps, NewsWithImgProps } from "../config/props/GlobalProps";
// components
import TopHeadlines from "./main/TopHeadlines";
import NewsContainer from "./main/NewsContainer";

const Main: React.FC<{
  showSubMain: boolean;
  setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
  newsState: NewsWithImgProps;
  setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
}> = ({ showSubMain, setShowSubMain, newsState, setIsSelected }) => {
  return (
    <main className="main">
      <TopHeadlines
        setShowSubMain={setShowSubMain}
        newsByGenre={newsState.general}
        setIsSelected={setIsSelected}
        genre="general"
      />
      <NewsContainer
        setShowSubMain={setShowSubMain}
        title="Wirtschaft"
        newsByGenre={newsState.business}
        setIsSelected={setIsSelected}
        genre={"business"}
      />
      <NewsContainer
        setShowSubMain={setShowSubMain}
        title="Technologie"
        newsByGenre={newsState.technology}
        setIsSelected={setIsSelected}
        genre={"technology"}
      />
      <NewsContainer
        setShowSubMain={setShowSubMain}
        title="Gesundheit"
        newsByGenre={newsState.health}
        setIsSelected={setIsSelected}
        genre={"health"}
      />
      <NewsContainer
        setShowSubMain={setShowSubMain}
        title="Wissenschaft"
        newsByGenre={newsState.science}
        setIsSelected={setIsSelected}
        genre={"science"}
      />
      <NewsContainer
        setShowSubMain={setShowSubMain}
        title="Unterhaltung"
        newsByGenre={newsState.entertainment}
        setIsSelected={setIsSelected}
        genre={"entertainment"}
      />
      <NewsContainer
        setShowSubMain={setShowSubMain}
        title="Sport"
        newsByGenre={newsState.sports}
        setIsSelected={setIsSelected}
        genre="sports"
      />
    </main>
  );
};

export default Main;
