import React, { createContext, useReducer } from "react";

const initialState = {
  season: "",
  races: [],
  selectedRace: null,
  raceResult: null, // resultado da corrida
  constructors: [], // lista de equipes
  drivers: [], // lista de pilotos por equipe
  error: null,
  raceDetailsOpen: false, // controle do modal de detalhes da corrida
};

function f1Reducer(state, action) {
  switch (action.type) {
    case "SET_SEASON":
      return { ...state, season: action.payload };
    case "SET_RACES":
      return { ...state, races: action.payload, error: null };
    case "SELECT_RACE":
      return { ...state, selectedRace: action.payload };
    case "SET_RACE_RESULT":
      return { ...state, raceResult: action.payload };
    case "SET_CONSTRUCTORS":
      return { ...state, constructors: action.payload, error: null };
    case "SET_DRIVERS":
      return { ...state, drivers: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "OPEN_RACE_DETAILS":
      return { ...state, raceDetailsOpen: true };
    case "CLOSE_RACE_DETAILS":
      return { ...state, raceDetailsOpen: false };
    default:
      return state;
  }
}

export const F1Context = createContext();

export const F1Provider = ({ children }) => {
  const [state, dispatch] = useReducer(f1Reducer, initialState);

  return (
    <F1Context.Provider value={{ state, dispatch }}>
      {children}
    </F1Context.Provider>
  );
};
