import React, { useState, useEffect } from "react";
import useWindowSize from "../config/state/useWindowSize";
// images
import logoSmall from "../imgs/logo_small.svg";
import logo from "../imgs/logo.svg";
import searchIcon from "../imgs/search-icon.svg";
// models
import {
  isSelectedProps,
  SearchInputProps,
  HeadlineNewsProps,
  LogProp,
  FetchErrorProps,
} from "../config/props/GlobalProps";
// function
import { noScrollFunc } from "../config/function/noScrollFunc";
import { fetchNews_search } from "../config/function/callNewsApi";

const Header: React.FC<{
  log: LogProp;
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
  searchNewsValue: SearchInputProps;
  setSearchNewsValue: React.Dispatch<React.SetStateAction<SearchInputProps>>;
}> = ({
  log,
  menuIsActive,
  setMenuIsActive,
  setIsSelected,
  setShowSubMain,
  searchNewsValue,
  setSearchNewsValue,
}) => {
  // state
  const [searchIsActive, setSearchIsActive] = useState<boolean>(null!);
  const [isValidated, setIsValidate] = useState(true);
  const [tooManyRequest, setTooManyRequest] = useState(false);
  const { width } = useWindowSize();
  // don't allow user to scroll main page when hamburger menu is active
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      noScrollFunc(menuIsActive);
    }
    return () => {
      unmounted = true;
    };
  }, [menuIsActive]);

  // focus search input when search is active
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (searchIsActive) {
        document.getElementById("searchInput")!.focus();
      }
    }
    return () => {
      unmounted = true;
    };
  }, [searchIsActive]);
  // validate inputs
  useEffect(() => {
    const validRegExp = /^[a-zA-Z0-9-äüö]*$/;
    if (!searchNewsValue.keyword.match(validRegExp)) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
  }, [searchNewsValue.keyword]);
  // fetch searched news
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidated) {
      setIsValidate(true);
      setSearchIsActive(false);
      setIsSelected({ genre: null, article: null, search: null });
      // fetch start
      const news = await fetchNews_search<HeadlineNewsProps & FetchErrorProps>(
        log.apiKey,
        searchNewsValue.keyword,
        "",
        "",
        "publishedAt"
      );
      // check request limit
      if (news.code === "rateLimited") {
        setTooManyRequest(true);
        return;
      } else {
        setIsSelected({ genre: null, article: null, search: news });
        setTooManyRequest(false);
        setMenuIsActive(false);
        setShowSubMain(true);
      }
    } else {
      setIsValidate(false);
    }
  };
  // render
  return (
    <>
      {tooManyRequest && (
        <div className="search-tmr">
          <div className="search-tmr-container">
            <h1>Request Limit erreicht</h1>
            <p>
              Du hast das Request Limit erreicht. Probier später bitte noch
              einmal oder probier mit anderen API Key.
            </p>
            <button
              onClick={() => {
                setTooManyRequest(false);
              }}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
      <header>
        {/* logo */}
        <h1>
          {width < 480 ? (
            <img src={logoSmall} alt="Nachrichten Heute" />
          ) : (
            <img src={logo} alt="Nachrichten Heute" />
          )}
        </h1>
        {/* hamburger icon */}
        <div className="header-icons">
          {/* search icon */}
          {width >= 480 && width < 768 && (
            <button
              className="header-icons-search"
              onClick={() => {
                setSearchIsActive(!searchIsActive);
                setMenuIsActive(false);
              }}
            >
              <img src={searchIcon} alt="Suchen" />
            </button>
          )}
          {/* menu icon */}
          {width < 768 && (
            <button
              onClick={() => setMenuIsActive(!menuIsActive)}
              className={
                "header-icons-menu" +
                " " +
                (menuIsActive
                  ? "open-menu"
                  : menuIsActive === false
                  ? "close-menu"
                  : "")
              }
            >
              <div />
              <div />
              <div />
            </button>
          )}
        </div>
        {/* search bar */}
        {width >= 480 && (
          <form
            onSubmit={formOnSubmit}
            className={
              "header-search-bar" +
              " " +
              (searchIsActive
                ? "open-search-bar"
                : searchIsActive === false
                ? "close-search-bar"
                : "")
            }
          >
            <input
              type="text"
              placeholder="Suchen"
              id="searchInput"
              autoComplete="off"
              required
              value={searchNewsValue.keyword}
              onChange={(e) =>
                setSearchNewsValue((prev) => ({
                  ...prev,
                  keyword: e.target.value,
                }))
              }
            />
            {!isValidated && (
              <span className="valid-failed">
                Der Suchbegriff darf nur Alphabet, Nummer und - enthalten.
              </span>
            )}
            <button
              type="button"
              onClick={() => setSearchIsActive(!searchIsActive)}
            >
              {" "}
              {/*close button */}
              <div />
              <div />
            </button>
          </form>
        )}
        {/* hamburger shadow */}
        {width < 768 && (
          <div
            className={!menuIsActive ? "shadow-of" : "shadow-on"}
            onClick={() => setMenuIsActive(!menuIsActive)}
          />
        )}
        {/* hamburger menu */}
        <nav
          className={
            width < 768
              ? menuIsActive
                ? "menu-is-active"
                : menuIsActive === false
                ? "menu-is-not-active"
                : ""
              : "menu-desktop"
          }
        >
          <div className="nav-contents">
            {width < 480 && (
              <form onSubmit={formOnSubmit}>
                <input
                  required
                  autoComplete="off"
                  type="text"
                  placeholder="Suchen"
                  value={searchNewsValue.keyword}
                  onChange={(e) =>
                    setSearchNewsValue((prev) => ({
                      ...prev,
                      keyword: e.target.value,
                    }))
                  }
                />
                {!isValidated && (
                  <span className="valid-failed">
                    Der Suchbegriff darf nur Alphabet, Nummer und - enthalten.
                  </span>
                )}
              </form>
            )}

            <ul>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "general",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Nachrichten
              </li>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "business",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Wirtschaft
              </li>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "technology",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Technologie
              </li>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "health",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Gesundheit
              </li>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "science",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Wissenschaft
              </li>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "entertainment",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Unterhaltung
              </li>
              <li
                onClick={() => {
                  setIsSelected({
                    genre: "sports",
                    article: null,
                    search: null,
                  });
                  setShowSubMain(true);
                  setMenuIsActive(false);
                }}
              >
                Sport
              </li>
              {width >= 768 && (
                <li onClick={() => setSearchIsActive(!searchIsActive)}>
                  <img src={searchIcon} alt="Suchen" />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
