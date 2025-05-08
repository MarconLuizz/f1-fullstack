import React, { useContext, useState } from "react";
import { F1Context } from "../contexts/F1Context";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import RaceDetails from "./RaceDetails";

const RaceList = () => {
  const { state, dispatch } = useContext(F1Context);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchRaceResult = async (season, round) => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/${season}/${round}/results.json`
      );
      const data = await response.json();
      const results = data.MRData.RaceTable.Races[0]?.Results;
      dispatch({ type: "SET_RACE_RESULT", payload: results || [] });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Erro ao buscar o resultado da corrida.",
      });
    }
  };

  const handleClickRace = async (race) => {
    dispatch({ type: "SELECT_RACE", payload: race });
    await fetchRaceResult(race.season, race.round);
    setOpenDialog(true);
  };

  if (!state.races.length) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Corridas da Temporada {state.season}
      </Typography>
      <List>
        {state.races.map((race, index) => (
          <ListItemButton key={index} onClick={() => handleClickRace(race)}>
            <ListItemText
              primary={race.raceName}
              secondary={`${race.Circuit.circuitName} - ${race.date}`}
            />
          </ListItemButton>
        ))}
      </List>

      <RaceDetails open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};

export default RaceList;
