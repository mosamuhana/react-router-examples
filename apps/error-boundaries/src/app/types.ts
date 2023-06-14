export interface Project {
  id: string;
  name: string;
  owner: string;
  deadline: string;
  cost: string;
}

export interface ProjectErrorResponseData {
  contactEmail: string;
}
