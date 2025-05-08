import React, { useContext } from "react";
import { F1Context } from "../contexts/F1Context";
import { Button, TextField } from "@mui/material";

const SeasonSelector = () => {
  const { state, dispatch } = useContext(F1Context);

  const handleSelectSeason = (e) => {
    const season = e.target.value;
    if (season) {
      dispatch({ type: "SET_SEASON", payload: season });
    }
  };

  return (
    <div>
      <TextField
        label="Ano da Temporada"
        variant="outlined"
        type="number"
        onChange={handleSelectSeason}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={() => fetchRaces(state.season, dispatch)}
        disabled={!state.season}
      >
        Buscar Corridas
      </Button>
    </div>
  );
};

const fetchRaces = (season, dispatch) => {
  const url = `https://ergast.com/api/f1/${season}.json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: "SET_RACES", payload: data.MRData.RaceTable.Races });
    })
    .catch((error) => {
      dispatch({
        type: "SET_ERROR",
        payload: "Erro ao carregar dados da temporada.",
      });
    });
};

export default SeasonSelector;
