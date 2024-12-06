const state = () => ({
    compGroupLeft: [],
    compGroupRight: [],
    bgm: ["BGM1", "BGM2", "BGM3", "BGM4", "BGM5", "BGM6", "BGM7", "BGM8", "BGM9", "BGM10", "BGM11", "BGM12", "BGM13", "BGM14", "BGM15", "BGM16"],
    fistRoundWinners: [],
    secondRoundWinners: [],
    thirdRoundWinners: [],
    finalWinners: []
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
    ADD_TO_FIST_ROUND_WINNERS(state, player) {
      state.fistRoundWinners.push(player);
    }
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
    addToFistRoundWinners({commit},player) {
      commit('ADD_TO_FIST_ROUND_WINNERS', player);
    }
  };
  
  const getters = {
    compGroupLeft: (state) => state.compGroupLeft,
    compGroupRight: (state) => state.compGroupRight,
    getBgm: (state) => state.bgm,
    fistRoundWinners: (state) => state.fistRoundWinners,
    secondRoundWinners: (state) => state.secondRoundWinners,
    thirdRoundWinners: (state) => state.thirdRoundWinners,
    finalWinners: (state) => state.finalWinners
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  