// src/App.jsx
import React from "react";
import { F1Provider } from "./contexts/F1Context";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import SeasonSelector from "./components/SeasonSelector";
import RaceList from "./components/RaceList";
import TeamDrivers from "./components/TeamDrivers";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  return (
    <F1Provider>
      {/* Topo fixo com AppBar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div">
            🏎️ F1 HUB
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Conteúdo principal */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Informações sobre Temporadas da F1
          </Typography>
          <ErrorMessage />
        </Box>

        {/* Seletor de temporada */}
        <SeasonSelector />

        {/* Lista de corridas & detalhes */}
        <Box sx={{ mb: 4 }}>
          <RaceList />
        </Box>

        {/* Pilotos por equipe */}
        <TeamDrivers />
      </Container>
    </F1Provider>
  );
}

export default App;
