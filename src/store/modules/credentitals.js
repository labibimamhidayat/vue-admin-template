const data = {
    namespaced: true,
    state: {
        credits: {},
    },
    mutations: {
        mutSetCredits(state, payload) {
            state.credits = payload;
        },
    },
    actions: {
        setCredits({ commit }, payload) {
            commit('mutSetCredits', payload);
        },
    },
};
export default data;
