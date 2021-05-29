import React, { useState, useEffect, useCallback } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
// models
import {
  isSelectedProps,
  NewsProps,
  HeadlineNewsProps,
  SearchInputProps,
  LogProp,
} from "../../config/props/GlobalProps";
// function
import SelectedNews from "./SelectedNews";
import ListItem from "./ListItem";
import { fetchNews_search } from "../../config/function/callNewsApi";
// img
import sortImg from "../../imgs/sort.svg";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const SelectedGenre: React.FC<{
  log: LogProp;
  isSelected: isSelectedProps;
  setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  isFromGenre: boolean;
  setIsFromGenre: React.Dispatch<React.SetStateAction<boolean>>;
  news: NewsProps;
  fetchSuccess: boolean;
  searchNewsValue: SearchInputProps;
  setSearchNewsValue: React.Dispatch<React.SetStateAction<SearchInputProps>>;
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  log,
  menuIsActive,
  setMenuIsActive,
  isSelected,
  setIsSelected,
  news,
  fetchSuccess,
  isFromGenre,
  setIsFromGenre,
  searchNewsValue,
  setSearchNewsValue,
}) => {
  // state
  const [selectedFromList, setSelectedFromList] = useState<isSelectedProps>(
    null!
  );
  const [dateValue, setDateValue] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<boolean>(!null);
  const [searchPage, setSearchPage] = useState(2);
  // SEARCH //
  // close sort-window when hamburger-menu is closed
  useEffect(() => {
    if (!menuIsActive) {
      setSort(false);
    }
  }, [menuIsActive]);
  // form
  const selectDate = useCallback(() => {
    if (dateValue && dateValue.length === 2) {
      setSearchNewsValue((prev) => ({
        ...prev,
        from: dateValue[0].toISOString(),
        to: dateValue[1].toISOString(),
      }));
    }
  }, [dateValue, setSearchNewsValue]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      selectDate();
    }
    return () => {
      unmounted = true;
    };
  }, [selectDate]);
  // fetch filtered news
  const buttonOnClick = async () => {
    setSort(false);
    try {
      const news = await fetchNews_search<HeadlineNewsProps>(
        log.apiKey,
        searchNewsValue.keyword,
        searchNewsValue.from ? searchNewsValue.from : "",
        searchNewsValue.to ? searchNewsValue.to : "",
        searchNewsValue.sortBy
      );
      setIsSelected({ genre: null, article: null, search: news });
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreButton = async () => {
    setLoading(true);
    setSearchPage((prev) => prev + 1);
    console.log(searchPage);
    const newArticles = isSelected;
    try {
      const news = await fetchNews_search<HeadlineNewsProps>(
        log.apiKey,
        searchNewsValue.keyword,
        searchNewsValue.from ? searchNewsValue.from : "",
        searchNewsValue.to ? searchNewsValue.to : "",
        searchNewsValue.sortBy,
        searchPage
      );
      console.log(news);
      news.articles?.forEach((article) => {
        newArticles.search?.articles.push(article);
      });
      setIsSelected(newArticles);
      console.log(isSelected.search);
      setLoading(false);
    } catch (err) {
      console.log(err);
      console.log("failed");
      setSearchPage(searchPage - 1);
      setLoading(false);
    }
  };
  // GENRE //
  // get selected news
  const genreSelector: () => HeadlineNewsProps | undefined = () => {
    switch (isSelected.genre) {
      case "general":
        return news.general as HeadlineNewsProps;
      case "business":
        return news.business as HeadlineNewsProps;
      case "technology":
        return news.technology as HeadlineNewsProps;
      case "health":
        return news.health as HeadlineNewsProps;
      case "science":
        return news.science as HeadlineNewsProps;
      case "entertainment":
        return news.entertainment as HeadlineNewsProps;
      case "sports":
        return news.sports as HeadlineNewsProps;
      default:
        return;
    }
  };
  // title translate
  const translateGenreTitle = () => {
    switch (isSelected.genre) {
      case "general":
        return "Aktuelle Nachrichten";
      case "business":
        return "Wirtschaft";
      case "technology":
        return "Technologie";
      case "health":
        return "Gesundheit";
      case "science":
        return "Wissenschaft";
      case "entertainment":
        return "Unterhaltung";
      case "sports":
        return "Sport";
      default:
        return "";
    }
  };
  // display news
  const newsListGenre = () => {
    const newsSortedByGenre = genreSelector();
    if (newsSortedByGenre!.articles) {
      return newsSortedByGenre!.articles.map((news) => {
        return (
          <ListItem
            key={Math.random()}
            news={news}
            sectionOnClick={() => {
              setIsFromGenre(true);
              setSelectedFromList({
                genre: isSelected.genre,
                article: news,
                search: null,
              });
            }}
          />
        );
      });
    } else {
      return (
        <h3>
          Konnte keine Nachricht finden. Versuche später bitte noch einmal.
        </h3>
      );
    }
  };
  const newsListSearch = () => {
    if (isSelected.search?.articles && isSelected.search.articles.length) {
      return isSelected.search.articles.map((news) => {
        return (
          <ListItem
            key={Math.random()}
            news={news}
            sectionOnClick={() => {
              setIsFromGenre(true);
              setSelectedFromList({
                genre: "general",
                article: news,
                search: isSelected.search,
              });
            }}
          />
        );
      });
    } else if (isSelected.search && isSelected.search.totalResults === 0) {
      return (
        <span className="no-news-found">
          Es wurden keine Ergebnisse gefunden.
        </span>
      );
    } else {
      return (
        <span className="no-news-found">
          Tut mir leid! Da das Request Limit erreicht ist, kannst du gerade
          keine Nachrichten suchen.
        </span>
      );
    }
  };
  // render
  return (
    <React.Fragment>
      <section className="sub-main-genres">
        {isSelected.genre ? (
          <h2>{translateGenreTitle()}</h2>
        ) : isSelected.search ? (
          <div className="search-sort">
            <h2 style={{ fontWeight: 300 }}>
              Suchergebnis für "
              {
                <span style={{ fontWeight: 500 }}>
                  {searchNewsValue.keyword}
                </span>
              }
              "
            </h2>
            <nav className="search-sort-nav">
              <button
                className="search-sort-nav-icon"
                onClick={() => setSort(true)}
              >
                <img src={sortImg} alt="sortieren" />
              </button>
              <div
                className={
                  "search-sort-nav-form" +
                  " " +
                  (sort
                    ? "search-sort-nav-form-is-active"
                    : sort === null
                    ? ""
                    : "search-sort-nav-form-is-not-active")
                }
              >
                <div
                  className="search-sort-nav-form-shadow"
                  onClick={() => setSort(false)}
                />
                <div className="search-sort-nav-form-inputs">
                  <div>
                    <label htmlFor="sortBy">sortieren nach:</label>
                    <select
                      name="sort-by"
                      id="sortBy"
                      onChange={(e) => {
                        setSearchNewsValue((prev) => ({
                          ...prev,
                          sortBy: e.target.value,
                        }));
                      }}
                    >
                      <option value="publishedAt">Neueste</option>
                      <option value="popularity">Meist Gelesen</option>
                      <option value="relevancy">Am Relevantesten</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sortCalendar">Zeitraum:</label>
                    <Flatpickr
                      id="sortCalendar"
                      options={{
                        mode: "range",
                        maxDate: new Date(),
                        dateFormat: "d-m-Y",
                      }}
                      onChange={(e) => setDateValue(e)}
                      placeholder="--.--.---- 〜 --.--.----"
                    />
                  </div>
                  <button className="sort-submit" onClick={buttonOnClick}>
                    Sortieren
                  </button>
                </div>
              </div>
            </nav>
          </div>
        ) : (
          ""
        )}
        <hr />
        <div className="sub-main-genres-news-list">
          {fetchSuccess && isSelected.genre && newsListGenre()}
          {fetchSuccess && isSelected.search && newsListSearch()}
          {fetchSuccess &&
          isSelected.search &&
          isSelected.search?.articles.length < 100 &&
          isSelected.search.totalResults > isSelected.search.articles?.length &&
          !loading ? (
            <button className="load-more-button" onClick={loadMoreButton}>
              <div>
                <div />
                <div />
                <div />
              </div>
              <span>Mehr</span>
            </button>
          ) : loading ? (
            <div className="loading-icon" />
          ) : (
            ""
          )}
        </div>
      </section>
      <div>
        {selectedFromList?.article ? (
          <SelectedNews
            isSelected={selectedFromList}
            setIsSelected={setSelectedFromList}
            isFromGenre={isFromGenre}
            setIsFromGenre={setIsFromGenre}
          />
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default SelectedGenre;
