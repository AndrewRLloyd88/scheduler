import { useState } from "react";

//take in an initial mode (initialmode)
export default function useVisualMode(initialmode) {
  //set the mode state with the initial mode provided

  const [mode, setMode] = useState(initialmode);

  // return an object with a mode property
  return { mode };
}
