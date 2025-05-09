// src/components/TeamDrivers.jsx
import React, { useContext, useEffect, useState } from "react";
import { F1Context } from "../contexts/F1Context";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const TeamDrivers = () => {
  const { state, dispatch } = useContext(F1Context);
  const { season, constructors, drivers, error } = state;
  const [selectedConstructor, setSelectedConstructor] = useState("");
  const [loading, setLoading] = useState(false);

  // 1) Sempre que a temporada mudar, buscar as equipes
  useEffect(() => {
    if (!season) return;
    const fetchConstructors = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://ergast.com/api/f1/${season}/constructors.json`
        );
        const data = await res.json();
        const list = data.MRData.ConstructorTable.Constructors;
        dispatch({ type: "SET_CONSTRUCTORS", payload: list });
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Erro ao buscar equipes." });
      } finally {
        setLoading(false);
      }
    };
    fetchConstructors();
  }, [season, dispatch]);

  // 2) Quando o usuário escolher uma equipe, buscar os pilotos
  useEffect(() => {
    if (!selectedConstructor) return;
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://ergast.com/api/f1/${season}/constructors/${selectedConstructor}/drivers.json`
        );
        const data = await res.json();
        const list = data.MRData.DriverTable.Drivers;
        dispatch({ type: "SET_DRIVERS", payload: list });
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Erro ao buscar pilotos." });
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, [selectedConstructor, season, dispatch]);

  if (!season) {
    return <Typography>Selecione primeiro uma temporada.</Typography>;
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Pilotos por Equipe — Temporada {season}
      </Typography>

      {loading && <CircularProgress />}

      {!loading && constructors.length > 0 && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Equipe</InputLabel>
          <Select
            value={selectedConstructor}
            label="Equipe"
            onChange={(e) => setSelectedConstructor(e.target.value)}
          >
            {constructors.map((c) => (
              <MenuItem key={c.constructorId} value={c.constructorId}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && drivers.length > 0 && (
        <List>
          {drivers.map((d) => (
            <ListItem key={d.driverId}>
              <ListItemText
                primary={`${d.givenName} ${d.familyName}`}
                secondary={`Nacionalidade: ${d.nationality}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TeamDrivers;
