import { AuthContextType } from "./ctx";

export const fakeAuthProvider: AuthContextType = {
  user: null,

  async signin(user: string) {
    await delay(100);
    this.user = user;
  },

  async signout() {
    await delay(100);
    this.user = null;
  },
};

const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
