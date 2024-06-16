export interface ILoadingStore {
    loading: boolean;
}

const initialState: ILoadingStore = {
    loading: false,
}

export const useLoadingStore = defineStore("loading", {
    state: () => initialState,
    getters: {
        isLoading: state => !!state.loading,
    },
    actions: {
        set(value: boolean) {
            this.$patch({ loading: value })
        }
    }
})
