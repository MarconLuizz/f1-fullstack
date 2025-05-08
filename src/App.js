import React from "react";
import { F1Provider } from "./contexts/F1Context";
import { Container, Typography } from "@mui/material";
import SeasonSelector from "./components/SeasonSelector";
import RaceList from "./components/RaceList";
import RaceDetails from "./components/RaceDetails";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  return (
    <F1Provider>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Visualizador de Temporadas da Fórmula 1
        </Typography>
        <ErrorMessage />
        <SeasonSelector />
        <RaceList />
        <RaceDetails />
      </Container>
    </F1Provider>
  );
}

export default App;
