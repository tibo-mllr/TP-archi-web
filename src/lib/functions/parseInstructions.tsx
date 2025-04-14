import { ReactElement } from "react";

export function parseInstructions(
  instructions?: string,
): ReactElement<{ children: ReactElement[] }> {
  const lines = instructions?.split("\n");
  let isList = false;
  const elements = lines?.map((line, index) => {
    if (line.startsWith("-")) {
      isList = true;
      return <li key={index}>{line.slice(1).trim()}</li>;
    }
    return <p key={index}>{line}</p>;
  });

  if (isList) return <ul>{elements}</ul>;

  return <div>{elements}</div>;
}
