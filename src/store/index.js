import { createStore } from "vuex";

const store = createStore({
    state: {
        dogList: [],
        allBreeds: [],
       searchResult: [],
       breedName: "bulldog",
       searchedBreedName: ""
    },

    mutations: {
        dogList(state, payload) {
            state.dogList = payload;
        },
         allBreeds(state, payload) {
            state.allBreeds = payload;
        },

        searchResult(state, payload) {
            state.searchResult = payload;
        },
        breedName(state, payload) {
            state.breedName = payload;
        },
        searchedBreedName(state, payload) {
            state.searchedBreedName = payload;
        },
    },

    actions: {
        dogList({commit}, payload) {
            commit("dogList", payload);
        },
        allBreeds({commit}, payload) {
            commit('allBreeds', payload)
        },

        searchResult({commit}, payload) {
            commit('searchResult', payload)
        },
        breedName({commit}, payload) {
            commit('breedName', payload)
        },
        searchedBreedName({commit}, payload) {
            commit('searchedBreedName', payload)
        },
    }
})

export default store;