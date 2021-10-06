import React, { useEffect } from "react";
import { MutableSnapshot, RecoilRoot, RecoilState, useRecoilValue } from "recoil";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { THEME } from "./theme";

export function testRoot(
  children: React.ReactNode,
  initialRecoilState?: (snap: MutableSnapshot) => void
): RenderResult {
  return render(
    <RecoilRoot initializeState={initialRecoilState}>
      <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    </RecoilRoot>
  );
}

interface RecoilObserverProps<T> {
  atom: RecoilState<T>;
  onUpdate: (arg: T) => void;
}

export function RecoilObserver<T>({ atom, onUpdate }: RecoilObserverProps<T>): null {
  const value = useRecoilValue(atom);

  useEffect(() => {
    onUpdate(value);
  }, [value, onUpdate]);

  return null;
}
