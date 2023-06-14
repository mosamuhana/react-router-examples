import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { randomUser } from '../utils';

interface GithubUser {
  avatar_url: string;
  login: string;
  bio: string;
  name: string;
}

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // searchParams is a URLSearchParams object.
  // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const user = searchParams.get('user');

  const [userData, setUserData] = useState<GithubUser | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function getGitHubUser() {
      const response = await fetch(`https://api.github.com/users/${user}`, {
        signal: abortController.signal
      });
      if (!abortController.signal.aborted) {
        const data = await response.json();
        setUserData(data);
      }
    }

    if (user) {
      getGitHubUser();
    }

    return () => {
      abortController.abort();
    };
  }, [user]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = formData.get('user') as string;
    if (!newUser) return;
    setSearchParams({ user: newUser });
  }

  function handleRandomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newUser = randomUser();
    // our new random user is the same as our current one, let's try again
    if (newUser === user) {
      handleRandomSubmit(event);
    } else {
      setSearchParams({ user: newUser });
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <form onSubmit={handleSubmit}>
          <label>
            <input defaultValue={user ?? undefined} type="text" name="user" />
          </label>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={handleRandomSubmit}>
          <input type="hidden" name="random" />
          <button type="submit">Random</button>
        </form>
      </div>

      {userData && (
        <div
          style={{
            padding: '24px',
            margin: '24px 0',
            borderTop: '1px solid #eaeaea',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <img
            style={{ borderRadius: '50%' }}
            width={200}
            height={200}
            src={userData.avatar_url}
            alt={userData.login}
          />
          <div>
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}
