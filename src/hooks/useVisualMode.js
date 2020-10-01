import { useState } from "react";

//take in an initial mode (initialmode)
export default function useVisualMode(initialmode) {
  //set the mode state with the initial mode provided
  const [mode, setMode] = useState(initialmode);

  //adding the transitition function that will take in a new mode
  const transition = (newmode) => {
    //update the mode state to the newmode value and return
    return setMode(newmode);
  };

  // return an object with a mode property
  //add the transition property to the object that useVisualMode returns
  return { mode, transition };
}
