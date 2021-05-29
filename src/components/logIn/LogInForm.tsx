import React, { useState, useEffect, useCallback } from "react";
import * as props from "../../config/props/GlobalProps";
import * as api from "../../config/function/callNewsApi";
// imgs
import logo from "../../imgs/logo.svg";
import transImg from "../../imgs/translating.svg";

interface Props {
  log: props.LogProp;
  setLog: React.Dispatch<React.SetStateAction<props.LogProp>>;
  setNews: React.Dispatch<React.SetStateAction<props.NewsProps>>;
  setFetchSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDummy: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogInForm: React.FC<Props> = ({
  log,
  setLog,
  setNews,
  setFetchSuccess,
  setFetchError,
  setShowDummy,
}) => {
  // state
  const [continueBtn, setContinueBtn] = useState(false);
  const [lang, setLang] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [loadStatus, setLoadStatus] = useState({
    loading: false,
    wrongKey: false,
    tooManyRequest: false,
  });

  // function
  const mount = useCallback(
    (boolean) => {
      setUnmounted(boolean);
    },
    [setUnmounted]
  );
  useEffect(() => {
    mount(false);
    return () => {
      mount(true);
    };
  });

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getData = async (
      url: string
    ): Promise<props.HeadlineNewsProps[] & props.FetchErrorProps> => {
      const res = await fetch(url);
      const body = await res.json();
      return body;
    };

    const setData = async () => {
      try {
        const dataGeneral = await getData(api.headlineNewsGeneral(log.apiKey));
        // check api key is correct
        if (dataGeneral.code === "apiKeyInvalid") {
          setLoadStatus({
            loading: false,
            wrongKey: true,
            tooManyRequest: false,
          });
          return;
        } else {
          setLoadStatus({
            loading: true,
            wrongKey: false,
            tooManyRequest: false,
          });
          setNews((prev) => ({ ...prev, general: dataGeneral }));
          const dataBusiness = await getData(
            api.headlineNewsBusiness(log.apiKey)
          );
          setNews((prev) => ({ ...prev, business: dataBusiness }));
          const dataTechnology = await getData(
            api.headlineNewsTechnology(log.apiKey)
          );
          setNews((prev) => ({ ...prev, technology: dataTechnology }));
          const dataHealth = await getData(api.headlineNewsHealth(log.apiKey));
          setNews((prev) => ({ ...prev, health: dataHealth }));
          const dataScience = await getData(
            api.headlineNewsScience(log.apiKey)
          );
          setNews((prev) => ({ ...prev, science: dataScience }));
          const dataEntertainment = await getData(
            api.headlineNewsEntertainment(log.apiKey)
          );
          setNews((prev) => ({ ...prev, entertainment: dataEntertainment }));
          const dataSports = await getData(api.headlineNewsSports(log.apiKey));
          // check request limit
          if (dataSports.code === "rateLimited") {
            setLoadStatus({
              loading: false,
              wrongKey: false,
              tooManyRequest: true,
            });
            return;
          } else {
            setNews((prev) => ({ ...prev, sports: dataSports }));
            setLog((prev) => ({
              ...prev,
              status: { ...prev.status, isLogged: true },
            }));
            setFetchSuccess(true);
            setLoadStatus({
              loading: false,
              wrongKey: false,
              tooManyRequest: false,
            });
          }
        }
      } catch (err) {
        setFetchError(true);
        console.log(err);
      }
    };
    if (!unmounted) {
      setData();
    }
  };

  // render
  return (
    <>
      <div className="log-in">
        {!loadStatus.loading && (
          <button className="log-in-lang-button" onClick={() => setLang(!lang)}>
            <img src={transImg} alt="translate" />
          </button>
        )}
        {/* register */}
        <div
          className={
            "log-in-message1" +
            " " +
            (continueBtn ? "log-in-hide-message1" : "")
          }
        >
          <div className="log-in-message1-container">
            {/* h1 */}
            {!lang ? <h1>Herzlich Willkommen!</h1> : <h1>Welcome!</h1>}
            {/* message */}
            {!lang ? (
              <p>
                Freut mich dich hier auf der Seite zu sehen! Dieser Application
                benutzt "News API". Damit du die Nachrichten abrufen kannst,
                muss du <a href="https://newsapi.org/">hier</a> regirstrieren.
              </p>
            ) : (
              <p>
                Nice to see you here on my application. This application uses
                "News API". Please register{" "}
                <a href="https://newsapi.org/">here</a>, to get access to news.
              </p>
            )}
            <p>
              {!lang
                ? " Möchtest du ohne das API Key fortfahren? Du kannst die Seite mit Dummy Nachrichten probieren."
                : "You can visit website with dummy-news, if you don´t want to register"}
            </p>
            {/* buttons */}
            <div className="log-in-message1-container-buttons">
              <button onClick={() => setContinueBtn(true)}>
                {!lang ? "API Key eingeben" : "Enter API Key"}
              </button>
              <button
                onClick={() => {
                  setShowDummy(true);
                  setLog((prev) => ({
                    ...prev,
                    status: { ...prev.status, isLogged: true },
                  }));
                }}
              >
                {!lang ? "Ohne API Key fortfahren" : "Continue without API Key"}
              </button>
            </div>
          </div>
        </div>
        {/* enter api key */}
        <div
          className={
            "log-in-message2" +
            " " +
            (continueBtn ? "log-in-show-message2" : "")
          }
        >
          <div>
            <h2>{!lang ? "Nur noch ein Schritt!" : "Just one more step!"}</h2>

            {!lang ? (
              <p>
                Wenn du registriert hast, hast du sicherlich ein API Key. <br />
                Den kannst du hier eingeben
              </p>
            ) : (
              <p>
                "If you are registered, you have definitely an API Key. <br />{" "}
                You can enter this here:
              </p>
            )}

            <form onSubmit={formOnSubmit}>
              <input
                type="text"
                placeholder="API Key"
                onChange={(value) =>
                  setLog((prev) => ({ ...prev, apiKey: value.target.value }))
                }
              />
              <span>
                {loadStatus.wrongKey && !lang
                  ? "API Key ist falsch"
                  : loadStatus.wrongKey && lang
                  ? "API Key is wrong"
                  : ""}
              </span>
              <span>
                {loadStatus.tooManyRequest && !lang
                  ? "Du hast das Request-Limit erreicht. Probier bitte später noch einmal oder probier mit einem anderen API Key."
                  : loadStatus.tooManyRequest && lang
                  ? "You have been rate limited. Back off for a while before trying the request again or try another API Key."
                  : ""}
              </span>
              <button type="submit">
                {!lang ? "Los geht's!" : "Let's go!"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {loadStatus.loading && (
        <div className="log-in-loading">
          <img src={logo} alt="Nachrichten Heute" />
          <div className="loading-icon" />
        </div>
      )}
    </>
  );
};

export default LogInForm;
