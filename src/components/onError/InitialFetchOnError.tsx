import React from "react";

const InitialFetchOnError: React.FC<{
  setShowDummy: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowDummy }) => {
  const buttonHandler = () => {
    setShowDummy(true);
  };
  return (
    <div className="initial-fetch-on-error">
      <div className="initial-fetch-on-error-container">
        <h1>Oh nein!</h1>
        <div className="initial-fetch-on-error-de">
          <p>
            Da das Request Limit erreicht ist, konnte keine Nachtichten abgeruft
            werden. Möchest du die Seite mit Dummy Nachrichten schauen?
            {/* Die Nachrichten können nur unter Localhost abgeruft werden. Willst
            du weiter mit Dummy Nachrichten lesen? */}
          </p>
          <button onClick={buttonHandler}>JA</button>
          {/* <p>
            Wenn nicht, ladet bitte den Code
            <a href="mailto:keisuketanaka97@gmail.com">hier</a> und probiert in
            deinem Gerät auf Localhost.
          </p> */}
        </div>
        <hr />
        <div className="initial-fetch-on-error-en">
          <p>
            Request limit reached and could not fetch any news. Would you like
            visit Website with dummy-news?
            {/* News can be fetched only on localhost environment. Would you like
            visit Website with dummy-news? */}
          </p>
          <button onClick={buttonHandler}>YES</button>
          {/* <p>
            If not, please download code
            <a href="mailto:keisuketanaka97@gmail.com">here</a> and try on your
            machine on localhost.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default InitialFetchOnError;
