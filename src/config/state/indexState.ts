import { useState } from "react";
import * as props from "../props/GlobalProps";

// state
const useIndexState = () => {
  const [log, setLog] = useState({
    apiKey: "",
    status: { isLogged: false, onFailure: "" },
  });
  const [menuIsActive, setMenuIsActive] = useState<boolean>(null!);
  const [showSubMain, setShowSubMain] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<props.isSelectedProps>(null!);
  const [showDummy, setShowDummy] = useState(false);
  const [news, setNews] = useState<props.NewsProps>({
    general: {},
    business: {},
    technology: {},
    health: {},
    science: {},
    entertainment: {},
    sports: {},
  });
  const [newsWithImg, setNewsWithImg] = useState<props.NewsWithImgProps>({
    general: [],
    business: [],
    technology: [],
    health: [],
    science: [],
    entertainment: [],
    sports: [],
  });
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [searchNewsValue, setSearchNewsValue] = useState<
    props.SearchInputProps
  >({
    keyword: "",
    sortBy: "publishedAt",
  });
  return {
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
  };
};

export default useIndexState;
