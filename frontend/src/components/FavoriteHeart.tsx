import React, { useCallback } from "react";

type FavoriteHeartProps = {
  favoriteState: string;
  setShowModal: (state: boolean) => void;
};

function FavoriteHeart({ favoriteState, setShowModal }: FavoriteHeartProps) {
  const loading = favoriteState === "loading";
  const isFavorite = favoriteState === "favorite";
  const isNotFavorite = favoriteState === "notFavorite";

  const handleClick = useCallback(() => setShowModal(true), [setShowModal]);

  return (
    <button type="button" disabled={loading} onClick={handleClick}>
      {isFavorite && (
        <span role="img" aria-label="heart">
          ❤️
        </span>
      )}
      {isNotFavorite && (
        <span role="img" aria-label="heart">
          🖤
        </span>
      )}
    </button>
  );
}

export default FavoriteHeart;
