import { GithubUser } from "../types";

type Props = {
  user: GithubUser;
};

export function GithubUserView({ user }: Props) {
  return (
    <div
      style={{
        padding: '24px',
        margin: '24px 0',
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <img
        style={{ borderRadius: '50%' }}
        width={200}
        height={200}
        src={user.avatar_url}
        alt={user.login}
      />
      <div>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
}
