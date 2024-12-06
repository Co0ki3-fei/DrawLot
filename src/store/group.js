const state = () => ({
    compGroupLeft: [],
    compGroupRight: [],
  });
  
  const mutations = {
    ADD_TO_GROUP_LEFT(state, player) {
      state.compGroupLeft.push(player);
    },
    ADD_TO_GROUP_RIGHT(state, player) {
      state.compGroupRight.push(player);
    },
    RESET_GROUPS(state) {
      state.compGroupLeft = [];
      state.compGroupRight = [];
    },
  };
  
  const actions = {
    addToGroupLeft({ commit }, player) {
      commit('ADD_TO_GROUP_LEFT', player);
    },
    addToGroupRight({ commit }, player) {
      commit('ADD_TO_GROUP_RIGHT', player);
    },
    resetGroups({ commit }) {
      commit('RESET_GROUPS');
    },
  };
  
  const getters = {
    compGroupLeft: (state) => state.compGroupLeft,
    compGroupRight: (state) => state.compGroupRight,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  