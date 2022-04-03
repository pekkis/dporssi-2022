import create from "zustand";
import axios from "axios";
import { append } from "ramda";

export type UserDataInterface = {
  ranking: string[];
  numberOfVotes: number;
};

type UserInterface = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  email: string | null;
  picture: string | null;
  token?: string;
  data?: UserDataInterface;
};

type UserState = {
  user: UserInterface;
  ranking: RankingItemInterface[];
  isDirty: boolean;
  isSaving: boolean;
  setToken: (token: string) => void;
  listDictator: (id: string) => void;
  unlistDictator: (id: string) => void;
  setUser: (user?: UserInterface) => void;
  setData: (data: UserDataInterface) => void;
  setRanking: (ranking: RankingItemInterface[], setDirty: boolean) => void;
  saveRanking: () => void;
};

export type RankingItemInterface = {
  id: string;
  text: string;
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    isInitialized: false,
    isAuthenticated: false,
    email: null,
    picture: null
  },
  ranking: [],
  isDirty: false,
  isSaving: false,

  setRanking: (ranking, setDirty) => {
    set({ ranking: ranking, isDirty: setDirty });
  },
  saveRanking: async () => {
    set({ isSaving: true });
    const rankingToSave = get().ranking.map((r) => r.id);

    await axios.post(`${process.env.GATSBY_API}/ranking`, {
      token: get().user.token,
      ranking: rankingToSave
    });

    set({ isSaving: false, isDirty: false });
  },

  listDictator: (id) => {
    set((state) => ({
      ranking: append({ id, text: id }, state.ranking),
      isDirty: true
    }));
  },

  unlistDictator: (id) => {
    set((state) => ({
      ranking: state.ranking.filter((r) => r.id !== id),
      isDirty: true
    }));
  },

  setToken: (token) =>
    set((state) => ({
      user: {
        ...state.user,
        token
      }
    })),
  setUser: (user) => set(() => ({ user })),
  setData: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        data,
        ranking: data.ranking.map((r) => ({
          id: r,
          text: r
        }))
      }
    }))
}));

/*
() => {
  setRanking(
    ranking.filter((r) => r.id !== d.contentful_id)
  );
};

listDictator();

setRanking(
  append(
    {
      id: d.contentful_id,
      text: d.contentful_id
    },
    ranking
  )
);
}}
*/
