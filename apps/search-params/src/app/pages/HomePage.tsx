/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { randomUser, getGitHubUser } from '../utils';
import { GithubUser } from '../types';
import { GithubUserView } from '../components';

export default function HomePage() {
  const ctrlRef = useRef<AbortController>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const user = searchParams.get('user') ?? undefined;

  function abort() {
    ctrlRef.current?.abort();
    ctrlRef.current = undefined;
  }

  async function fetchUser(user: string) {
    abort();
    ctrlRef.current = new AbortController();
    const info = await getGitHubUser(user, { signal: ctrlRef.current.signal });
    if (info) {
      setUserData(info);
    }
  }

  useEffect(() => {
    if (user) {
      fetchUser(user);
    }
    return () => abort();
  }, [user]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser = formData.get('user') as string | null;
    if (newUser) {
      setSearchParams({ user: newUser });
    }
  }

  function handleRandomSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newUser = randomUser();
    // our new random user is the same as our current one, let's try again
    if (newUser === user) {
      handleRandomSubmit(e);
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

      {userData && <GithubUserView user={userData} />}
    </div>
  );
}
