/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { AxiosError } from "axios";
import StyledFavoriteModal from "../styles/FavoriteModal.style";
import FavoriteRecipeInterface from "./FavoriteRecipeInterface";
import useGetFavorite from "../controllers/GetFavoritesController";
import useAddFavorite from "../controllers/AddFavoriteController";
import FavoriteList from "../sharedtypes/FavoriteList";
import ListItem from "../sharedtypes/ListItem";
import ExistingList from "../sharedtypes/ExistingList";
import LoginContext from "../contexts/LoginContext";

type FavoriteModalProps = {
  recipe: ListItem;
  setFavoriteState: (state: string) => void;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
};

function FavoriteModal({
  recipe,
  setFavoriteState,
  showModal,
  setShowModal,
}: FavoriteModalProps) {
  const { isLoggedIn } = useContext(LoginContext);
  const getFavorite = useGetFavorite();
  const addFavorite = useAddFavorite();

  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);

  const handleSubmit = useCallback(
    (idArray: string[], nameArray: string[]) => {
      addFavorite.mutate({
        recipe,
        listIds: idArray,
        listNames: nameArray,
      });
    },
    [addFavorite, recipe]
  );

  const existingLists = useMemo(() => {
    if (getFavorite.isSuccess) {
      return getFavorite.data?.data.map((list: FavoriteList) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { _id, listName, listItems } = list;
        const alreadyFavorite = listItems.some(
          (item: ListItem) => item.recipeId === recipe.recipeId
        );

        return {
          id: _id,
          name: listName,
          alreadyFavorite,
        };
      });
    }
    return [];
  }, [getFavorite.data?.data, getFavorite.isSuccess, recipe.recipeId]);

  useEffect(() => {
    if (addFavorite.isSuccess) {
      closeModal();
    }
    const isFavorite = existingLists.some(
      (list: ExistingList) => list.alreadyFavorite
    );
    setFavoriteState(isFavorite ? "favorite" : "notFavorite");
  }, [addFavorite.isSuccess, closeModal, existingLists, setFavoriteState]);

  return showModal ? (
    <StyledFavoriteModal>
      <div>
        <button type="button" onClick={closeModal}>
          ❌
        </button>
        {!isLoggedIn && <p>Please Log In to Add to Favorites</p>}
        {getFavorite.isLoading && <p>Loading...</p>}
        {addFavorite.isLoading && <p>Loading...</p>}
        {getFavorite.isError && (
          <p>{(getFavorite.error as AxiosError).message}</p>
        )}
        {getFavorite.isError && (
          <p>{(getFavorite.error as AxiosError).message}</p>
        )}
        {getFavorite.isSuccess && (
          <FavoriteRecipeInterface
            existingLists={existingLists}
            onSubmit={handleSubmit}
            loading={addFavorite.isLoading}
          />
        )}
      </div>
    </StyledFavoriteModal>
  ) : null;
}

export default FavoriteModal;
