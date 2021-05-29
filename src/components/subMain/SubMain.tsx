import React, { useEffect, useState } from "react";
// models
import {
  isSelectedProps,
  NewsProps,
  SearchInputProps,
  LogProp,
} from "../../config/props/GlobalProps";
// components
import SelectedNews from "./SelectedNews";
import SelectedGenre from "./SelectedGenre";
// function
import { noScrollFunc } from "../../config/function/noScrollFunc";
// img
import backToMain from "../../imgs/previous.svg";

const SubMain: React.FC<{
  log: LogProp;
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  showSubMain: boolean;
  setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
  isSelected: isSelectedProps | undefined;
  setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  news: NewsProps;
  fetchSuccess: boolean;
  searchNewsValue: SearchInputProps;
  setSearchNewsValue: React.Dispatch<React.SetStateAction<SearchInputProps>>;
}> = ({
  log,
  menuIsActive,
  setMenuIsActive,
  showSubMain,
  setShowSubMain,
  isSelected,
  setIsSelected,
  news,
  fetchSuccess,
  searchNewsValue,
  setSearchNewsValue,
}) => {
  // state
  const [isFromGenre, setIsFromGenre] = useState(false);
  // allow not to scroll background of pop-up window
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      noScrollFunc(showSubMain);
    }

    return () => {
      unmounted = true;
    };
  }, [showSubMain]);
  // render option (article or genre)
  const renderOption = () => {
    if (isSelected) {
      if (isSelected.article) {
        return (
          <SelectedNews isSelected={isSelected} setIsSelected={setIsSelected} />
        );
      } else if (isSelected.genre || isSelected.search) {
        return (
          <SelectedGenre
            log={log}
            menuIsActive={menuIsActive}
            setMenuIsActive={setMenuIsActive}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            news={news}
            fetchSuccess={fetchSuccess}
            isFromGenre={isFromGenre}
            setIsFromGenre={setIsFromGenre}
            searchNewsValue={searchNewsValue}
            setSearchNewsValue={setSearchNewsValue}
          />
        );
      }
    }
  };
  // render
  return (
    <aside
      className={"sub-main" + " " + (showSubMain ? "sub-main-is-active" : "")}
    >
      {showSubMain && (
        <div
          className="sub-main-shadow"
          onClick={() => {
            setShowSubMain(false);
            setIsFromGenre(false);
            setIsSelected({ article: null, genre: null, search: null });
          }}
        />
      )}
      <nav
        className={
          "sub-main-nav" +
          " " +
          (isSelected?.genre || isSelected?.search ? "list-genre-nav" : "")
        }
      >
        <button
          onClick={() => {
            setShowSubMain(false);
            setIsSelected({ article: null, genre: null, search: null });
            setSearchNewsValue({ keyword: "" });
          }}
        >
          <img src={backToMain} alt="backToMain" />
        </button>
      </nav>
      <main
        className={
          "sub-main-container" +
          " " +
          (!isSelected?.article ? "sub-main-container-genre" : "")
        }
      >
        {renderOption()}
      </main>
    </aside>
  );
};

export default SubMain;
