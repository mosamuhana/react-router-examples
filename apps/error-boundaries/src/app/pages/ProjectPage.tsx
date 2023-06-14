import { useLoaderData } from "react-router-dom";

import { Project } from '../types';

export function ProjectPage() {
  const { project } = useLoaderData() as { project: Project; };

  return (
    <>
      <h1>Project Name: {project.name}</h1>
      <p>Owner: {project.owner}</p>
      <p>Deadline: {project.deadline}</p>
      <p>Cost: {project.cost}</p>
    </>
  );
}
