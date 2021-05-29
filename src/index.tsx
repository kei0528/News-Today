import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./stylesheet/css/reset.css";
import "./stylesheet/css/index.css";
// components
import LogInForm from "./components/logIn/LogInForm";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import SubMain from "./components/subMain/SubMain";
import InitialFetchOnError from "./components/onError/InitialFetchOnError";
// state
import useIndexState from "./config/state/indexState";
// models
import * as props from "./config/props/GlobalProps";
// api
import * as api from "./config/function/callNewsApi";
// import dummy-news-data
import dummyGeneral from "./dummyData/dummyGeneral.json";
import dummyBusiness from "./dummyData/dummyBusiness.json";
import dummyTechnology from "./dummyData/dummyTechnology.json";
import dummyScience from "./dummyData/dummyScience.json";
import dummyHealth from "./dummyData/dummyHealth.json";
import dummyEntertainment from "./dummyData/dummyEntertainment.json";
import dummySports from "./dummyData/dummySports.json";

// APP
const App: React.FC = () => {
  // state
  const {
    log,
    setLog,
    menuIsActive,
    setMenuIsActive,
    showSubMain,
    setShowSubMain,
    isSelected,
    setIsSelected,
    showDummy,
    setShowDummy,
    news,
    setNews,
    newsWithImg,
    setNewsWithImg,
    fetchSuccess,
    setFetchSuccess,
    fetchError,
    setFetchError,
    searchNewsValue,
    setSearchNewsValue,
  } = useIndexState();
  // fetch dummy data
  const setDummyData = useCallback(() => {
    if (showDummy) {
      const general = dummyGeneral;
      const business = dummyBusiness;
      const technology = dummyTechnology;
      const health = dummyHealth;
      const science = dummyScience;
      const entertainment = dummyEntertainment;
      const sports = dummySports;
      setNews((prev) => ({ ...prev, general }));
      setNews((prev) => ({ ...prev, business }));
      setNews((prev) => ({ ...prev, technology }));
      setNews((prev) => ({ ...prev, health }));
      setNews((prev) => ({ ...prev, science }));
      setNews((prev) => ({ ...prev, entertainment }));
      setNews((prev) => ({ ...prev, sports }));
      setFetchSuccess(true);
    }
  }, [showDummy, setNews, setFetchSuccess]);
  useEffect(() => {
    setDummyData();
  }, [setDummyData]);
  useEffect(() => {
    console.log(news);
  }, [news]);

  // extract news with images
  const extractNewsWithImg = useCallback(() => {
    if (fetchSuccess) {
      const newsGeneral = news.general as props.HeadlineNewsProps;
      const newsBusiness = news.business as props.HeadlineNewsProps;
      const newsTechnology = news.technology as props.HeadlineNewsProps;
      const newsHealth = news.health as props.HeadlineNewsProps;
      const newsScience = news.science as props.HeadlineNewsProps;
      const newsEntertainment = news.entertainment as props.HeadlineNewsProps;
      const newsSports = news.sports as props.HeadlineNewsProps;
      setNewsWithImg((prev) => ({
        ...prev,
        general: api.extractNewsWithImg(newsGeneral, setFetchError),
      }));
      setNewsWithImg((prev) => ({
        ...prev,
        business: api.extractNewsWithImg(newsBusiness, setFetchError),
      }));
      setNewsWithImg((prev) => ({
        ...prev,
        technology: api.extractNewsWithImg(newsTechnology, setFetchError),
      }));
      setNewsWithImg((prev) => ({
        ...prev,
        health: api.extractNewsWithImg(newsHealth, setFetchError),
      }));
      setNewsWithImg((prev) => ({
        ...prev,
        science: api.extractNewsWithImg(newsScience, setFetchError),
      }));
      setNewsWithImg((prev) => ({
        ...prev,
        entertainment: api.extractNewsWithImg(newsEntertainment, setFetchError),
      }));
      setNewsWithImg((prev) => ({
        ...prev,
        sports: api.extractNewsWithImg(newsSports, setFetchError),
      }));
    }
  }, [fetchSuccess, news, setFetchError, setNewsWithImg]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      extractNewsWithImg();
    }
    return () => {
      unmounted = true;
    };
  }, [extractNewsWithImg]);
  // render
  if (!log.status.isLogged) {
    return (
      <LogInForm
        log={log}
        setLog={setLog}
        setNews={setNews}
        setFetchSuccess={setFetchSuccess}
        setFetchError={setFetchError}
        setShowDummy={setShowDummy}
      />
    );
  } else if (fetchSuccess) {
    return (
      <div>
        <Header
          log={log}
          menuIsActive={menuIsActive}
          setMenuIsActive={setMenuIsActive}
          setIsSelected={setIsSelected}
          setShowSubMain={setShowSubMain}
          searchNewsValue={searchNewsValue}
          setSearchNewsValue={setSearchNewsValue}
        />
        <Main
          showSubMain={showSubMain}
          setShowSubMain={setShowSubMain}
          newsState={newsWithImg}
          setIsSelected={setIsSelected}
        />
        <Footer />
        <SubMain
          log={log}
          menuIsActive={menuIsActive}
          setMenuIsActive={setMenuIsActive}
          showSubMain={showSubMain}
          setShowSubMain={setShowSubMain}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          news={news}
          fetchSuccess={fetchSuccess}
          searchNewsValue={searchNewsValue}
          setSearchNewsValue={setSearchNewsValue}
        />
      </div>
    );
  } else {
    return (
      <div>
        <strong>
          Something happened while connecting to the server. Please try later or
          contact <a href="mailto:keisuketanaka97@gmail.com">here</a>.
        </strong>
      </div>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
