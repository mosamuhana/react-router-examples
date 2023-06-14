import { useAsyncValue } from "react-router-dom";

export function RenderAwaitedData() {
  const data = useAsyncValue() as string;
  return <p>{data}</p>;
}
