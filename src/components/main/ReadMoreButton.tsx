import React from "react";
import { isSelectedProps, GenreProps } from "../../config/props/GlobalProps";

const ReadMoreButton: React.FC<
  GenreProps & {
    setShowSubMain: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSelected: React.Dispatch<React.SetStateAction<isSelectedProps>>;
  }
> = ({ setIsSelected, genre, setShowSubMain }) => {
  return (
    <button
      className="read-more-icon"
      onClick={() => {
        setIsSelected({ article: null, genre, search: null });
        setShowSubMain(true);
      }}
    >
      <div className="read-more-icon-container">
        <div />
        <div />
        <div />
      </div>
    </button>
  );
};

export default ReadMoreButton;
