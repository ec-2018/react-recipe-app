import React from "react";
import placeholder from "../assets/images/imageplaceholder.jpg";
import StyledRecipeSidebar from "../styles/RecipeSidebar.style";
import FavoriteHeart from "./FavoriteHeart";

type RecipeSidebarProps = {
  imgUrl: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  favoriteState: string;
  setShowModal: (state: boolean) => void;
};

const loading = "Loading...";

function RecipeSideBar({
  imgUrl,
  title,
  readyInMinutes,
  servings,
  sourceUrl,
  favoriteState,
  setShowModal,
}: RecipeSidebarProps) {
  return (
    <StyledRecipeSidebar>
      <img src={imgUrl || placeholder} alt={title} />
      <div>
        <h1>{title || loading}</h1>
        <p>Ready in {readyInMinutes || loading} minutes</p>
        <p>Servings: {servings || loading}</p>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          <p>Original</p>
        </a>
        <FavoriteHeart
          favoriteState={favoriteState}
          setShowModal={setShowModal}
        />
      </div>
    </StyledRecipeSidebar>
  );
}

export default RecipeSideBar;
