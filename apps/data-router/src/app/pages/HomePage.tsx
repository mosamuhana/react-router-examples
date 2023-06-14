import { useLoaderData } from "react-router-dom";

import { HomeLoaderData } from "../types";

export function HomePage() {
  const data = useLoaderData() as HomeLoaderData;
  return (
    <>
      <h2>Home</h2>
      <p>Date from loader: {data.date}</p>
    </>
  );
}
