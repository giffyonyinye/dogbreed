import { createStore } from "vuex";

const store = createStore({
    state: {
        allDogs: []
    },

    mutations: {
        allDogs(state, payload) {
            state.allDogs = payload;
        }
    },

    actions: {
        allDogs({commit}, payload) {
            commit("allDogs", payload);
        }
    }
})

export default store;