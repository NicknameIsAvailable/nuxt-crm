import {defineStore} from "pinia";

interface IAuthStore {
    email: string;
    name: string;
    status: boolean;
}

const initialState: { user: IAuthStore } = {
    user: {
        email: "",
        name: "",
        status: false
    }
}

export const useAuthStore = defineStore("auth", {
    state: () => initialState,
    getters: {
        isAuth: state => state.user.status
    },
    actions: {
        clear() {
            this.$patch(initialState)
        },
        set(data: IAuthStore) {
            this.$patch({ user: data })
        }
    }
})
