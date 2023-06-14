import { useLoaderData, useParams } from 'react-router-dom';

export function TodoPage() {
  const params = useParams();
  const todo = useLoaderData() as string;

  return (
    <>
      <h2>Nested Todo Route:</h2>
      <p>id: {params.id}</p>
      <p>todo: {todo}</p>
    </>
  );
}
