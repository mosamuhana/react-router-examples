import { GithubUser } from './types';

export function randomUser() {
  const users = ['chaance', 'jacob-ebey', 'mcansh', 'mjackson', 'ryanflorence'];
  return users[Math.floor(Math.random() * users.length)];
}

export async function getGitHubUser(user: string, { signal }: Pick<RequestInit, 'signal'> = {}): Promise<GithubUser | undefined> {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`, { signal });
    if (!signal?.aborted) {
      const data = await response.json() as GithubUser;
      return data;
    }
  } catch (ex) {}
  return undefined;
}
