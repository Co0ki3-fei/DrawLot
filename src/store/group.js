const state = () => ({
    compGroup: [],
    bgm: ["BGM1", "BGM2", "BGM3", "BGM4", "BGM5", "BGM6", "BGM7", "BGM8", "BGM9", "BGM10", "BGM11", "BGM12", "BGM13", "BGM14", "BGM15", "BGM16"],
    fistRoundWinners: [],
    secondRoundWinners: [],
    thirdRoundWinners: [],
    finalWinners: []
  });

  const mutations = {
    ADD_TO_GROUP(state, player) {
      state.compGroup.push(player);
    },
    RESET_GROUPS(state) {
      state.compGroup = [];
    },
    ADD_TO_FIST_ROUND_WINNERS(state, player) {
      state.fistRoundWinners.push(player);
    },
    UPDATE_GROUP_FIRST_ROUND_GROUP(state, {playerId, firstRoundGroup}){
      const player = state.compGroup.find(p => p.playerId === playerId);
      if (player) {
        player.firstRoundGroup = firstRoundGroup;
      }
    },
    UPDATE_GROUP_IS_FIRST_WINNER_TO_WIN(state, playerId){
      const player = state.compGroup.find(p => p.playerId === playerId);
      if (player) {
        player.isFirstWinner = true;
      }
    },
    UPDATE_GROUP_IS_FIRST_WINNER_TO_DEFEAT(state, playerId){
      const player = state.compGroup.find(p => p.playerId === playerId);
      if (player) {
        player.isFirstWinner = false;
      }
    }
  };

  const actions = {
    addToGroup({ commit }, player) {
      commit('ADD_TO_GROUP', player);
    },
    resetGroups({ commit }) {
      commit('RESET_GROUPS');
    },
    addToFistRoundWinners({commit},player) {
      commit('ADD_TO_FIST_ROUND_WINNERS', player);
    },
    updateGroupFirstRoundGroup({commit}, obj){
      commit('UPDATE_GROUP_FIRST_ROUND_GROUP', {playerId: obj.playerId, firstRoundGroup: obj.firstRoundGroup})
    },
    updateGroupIsFirstWinnerToWin({commit}, playerId){
      commit('UPDATE_GROUP_IS_FIRST_WINNER_TO_WIN', playerId)
    },
    updateGroupIsFirstWinnerToDefeat({commit}, playerId){
      commit('UPDATE_GROUP_IS_FIRST_WINNER_TO_DEFEAT', playerId)
    }
  };

  const getters = {
    compGroup: (state) => state.compGroup,
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
