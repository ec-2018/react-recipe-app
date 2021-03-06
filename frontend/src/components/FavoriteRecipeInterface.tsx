import React, { useCallback, useState } from "react";
import ExistingList from "../sharedtypes/ExistingList";
import StyledButton from "../styles/Button.style";
import StyledFavoriteRecipeInterface from "../styles/FavoriteRecipeInterface.style";
import StyledScrollContainer from "../styles/ScrollContainer.style";
import AddFavoriteOptionButton from "./AddFavoriteOptionButton";
import FavoriteOption from "./FavoriteOption";

type FavoriteRecipeInterfaceProps = {
  existingLists: ExistingList[];
  onSubmit: (idArray: string[], nameArray: string[]) => void;
  loading: boolean;
};

function FavoriteRecipeInterface({
  existingLists,
  onSubmit,
  loading,
}: FavoriteRecipeInterfaceProps) {
  const [idArray, setIdArray] = useState<string[]>([]);
  const [nameArray, setNameArray] = useState<string[]>([]);
  const [newLists, setNewLists] = useState<JSX.Element[]>([]);

  const selectExisting = useCallback(
    (id: string) => {
      setIdArray(idArray.concat(id));
    },
    [idArray]
  );

  const selectNew = useCallback(
    (name: string) => {
      setNameArray(nameArray.concat(name));
    },
    [nameArray]
  );

  const deselectExisting = useCallback(
    (id: string) => {
      setIdArray(idArray.filter(item => item !== id));
    },
    [idArray]
  );

  const deselectNew = useCallback(
    (name: string) => {
      setNameArray(nameArray.filter(item => item !== name));
    },
    [nameArray]
  );

  const createNewList = useCallback(
    (name: string) => {
      const sanitizedName = name.trim();
      const duplicateListName =
        existingLists.some(list => list.name === sanitizedName) ||
        nameArray.includes(sanitizedName);
      if (duplicateListName) throw Error("Duplicate List Name");
      const newList = (
        <FavoriteOption
          key={`${Date.now()}${sanitizedName}`}
          id=""
          name={sanitizedName}
          alreadyFavorite
          onSelect={selectNew}
          onDeselect={deselectNew}
        />
      );
      setNewLists(newLists.concat(newList));
    },
    [existingLists, nameArray, selectNew, deselectNew, newLists]
  );

  const handleSubmit = useCallback(() => {
    onSubmit(idArray, nameArray);
  }, [idArray, nameArray, onSubmit]);

  return (
    <>
      <StyledScrollContainer>
        <StyledFavoriteRecipeInterface>
          <AddFavoriteOptionButton createNewList={createNewList} />
          {newLists}
          {existingLists.map(list => (
            <FavoriteOption
              key={list.id}
              id={list.id}
              name={list.name}
              alreadyFavorite={list.alreadyFavorite}
              onSelect={selectExisting}
              onDeselect={deselectExisting}
            />
          ))}
        </StyledFavoriteRecipeInterface>
      </StyledScrollContainer>
      <StyledButton type="button" onClick={handleSubmit} disabled={loading}>
        Submit
      </StyledButton>
    </>
  );
}

export default FavoriteRecipeInterface;
