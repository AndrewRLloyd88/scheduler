import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";
//setting the initial mode
const FIRST = "FIRST";
//Transition
const SECOND = "SECOND";

//test for initial mode
test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

//This test will initialize the mode to FIRST, then transition to SECOND and then check to see what the current value of mode is.
test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});
