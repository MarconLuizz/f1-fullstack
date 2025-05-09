import React, { useContext, useState } from "react";
import { F1Context } from "../contexts/F1Context";
import { Button, TextField, Box } from "@mui/material";

const SeasonSelector = () => {
  const { dispatch } = useContext(F1Context);
  const [inputYear, setInputYear] = useState("");

  const fetchRaces = async () => {
    if (!inputYear) {
      dispatch({ type: "SET_ERROR", payload: "Informe o ano da temporada." });
      return;
    }

    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${inputYear}.json`
      );
      const data = await response.json();
      dispatch({ type: "SET_SEASON", payload: inputYear });
      dispatch({ type: "SET_RACES", payload: data.MRData.RaceTable.Races });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Erro ao buscar os dados da temporada.",
      });
    }
  };

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label="Ano da Temporada (1950 - 2024)"
        variant="outlined"
        type="number"
        fullWidth
        value={inputYear}
        onChange={(e) => setInputYear(e.target.value)}
      />
      <Button variant="contained" onClick={fetchRaces}>
        Buscar
      </Button>
    </Box>
  );
};

export default SeasonSelector;
