// src/App.jsx
import React from "react";
import { F1Provider } from "./contexts/F1Context";
import { Container, Typography } from "@mui/material";
import SeasonSelector from "./components/SeasonSelector";
import RaceList from "./components/RaceList";
import TeamDrivers from "./components/TeamDrivers";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  return (
    <F1Provider>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          F1 HUB - Informações sobre temporadas da F1
        </Typography>
        <ErrorMessage />
        <SeasonSelector />
        <RaceList />
        <TeamDrivers />
      </Container>
    </F1Provider>
  );
}

export default App;
