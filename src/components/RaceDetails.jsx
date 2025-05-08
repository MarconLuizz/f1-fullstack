import React, { useContext } from "react";
import { F1Context } from "../contexts/F1Context";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RaceDetails = ({ open, onClose }) => {
  const { state } = useContext(F1Context);
  const race = state.selectedRace;
  const results = state.raceResult;

  if (!race) return null;

  const winner = results && results.length > 0 ? results[0] : null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {race.raceName}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">Data: {race.date}</Typography>
        <Typography variant="body1">
          Circuito: {race.Circuit.circuitName}
        </Typography>
        <Typography variant="body2">
          Localização: {race.Circuit.Location.locality},{" "}
          {race.Circuit.Location.country}
        </Typography>

        {winner && (
          <Box mt={3}>
            <Typography variant="h6">🏁 Vencedor</Typography>
            <Typography variant="body1">
              {winner.Driver.givenName} {winner.Driver.familyName} (
              {winner.Driver.nationality})
            </Typography>
            <Typography variant="body2">
              Equipe: {winner.Constructor.name}
            </Typography>
            <Typography variant="body2">
              Tempo: {winner.Time?.time || "N/A"}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RaceDetails;
