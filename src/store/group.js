const state = () => ({
	compGroup: [],
	bgm: ["恋咏樱", "华阳炎", "华恋月", "无名的怪物", "Melt(10thANNIVERSARY MIX)",
		"The Everlasting Guilty Crown", "内秘心书", "ambiguous", "anicca",
		"cross illusion", "绊之奇跡", "INNOCENCE", "樱满月", "Revolution",
		"winning the soul", "supernova"],
	bgm2: [
		"轮回 v.w.p", "五月窗边的花绿青", "FUN FUN RE-BOOT",
		"你不知道的故事", "熙熙攘攘、我们的城市", "将手",
		"地球最后的告白", "光放て!", "黎明に咲",
		"walking with you", "六兆年零一夜物语", "Preserved roses"
	],
	bgm3: ["大声钻石", "Star Divine", "Chase！", "fire flower"],
	bgm4: [
		"火炎", "sparkling daydream", "Return to zero", "决意之光",
		"IMAGINARY LIKE THE JUSTICE", "shout", "N.O.S", "future star"
	],
	bgm5: [
		"影色舞", "暴力扳机", "百鬼夜行", "Youthful Beautiful",
		"海色", "星が瞬くこんな夜に ~ゲ-ムVer.~", "明日夜空的哨戒班", "金鱼泪"
	],
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
	UPDATE_GROUP_FIRST_ROUND_GROUP(state, { playerId, firstRoundGroup }) {
		const player = state.compGroup.find(p => p.playerId === playerId);
		if (player) {
			player.firstRoundGroup = firstRoundGroup;
		}
	},
	UPDATE_GROUP_IS_FIRST_WINNER_TO_WIN(state, playerId) {
		const player = state.compGroup.find(p => p.playerId === playerId);
		if (player) {
			player.isFirstWinner = true;
		}
	},
	UPDATE_GROUP_IS_FIRST_WINNER_TO_DEFEAT(state, playerId) {
		const player = state.compGroup.find(p => p.playerId === playerId);
		if (player) {
			player.isFirstWinner = false;
		}
	},
	UPDATE_PLAYER_SECOND_ROUND_SCORE(state, { playerId, score }) {
		const player = state.compGroup.find(p => p.playerId === playerId)
		if (player) {
			player.secondRoundScore = score
		}
	},
	UPDATE_PLAYER_SECOND_ROUND_ORDER(state, { playerId, order }) {
		const player = state.compGroup.find(p => p.playerId === playerId)
		if (player) {
			player.secondRoundOrder = order
		}
	},
	UPDATE_PLAYER_THIRD_ROUND_SCORE(state, { playerId, score }) {
		const player = state.compGroup.find(p => p.playerId === playerId)
		if (player) {
			player.thirdRoundScore = score
		}
	},
	UPDATE_PLAYER_IS_THIRD_WINNER_TO_WIN(state, playerId) {
		const player = state.compGroup.find(p => p.playerId === playerId)
		if (player) {
			player.isThirdWinner = true
		}
	},
	UPDATE_PLAYER_IS_THIRD_WINNER_TO_DEFEAT(state, playerId) {
		const player = state.compGroup.find(p => p.playerId === playerId)
		if (player) {
			player.isThirdWinner = false
		}
	},
	UPDATE_PLAYER_FIRST_ROUND_SCORE(state, { playerId, score }) {
		const player = state.compGroup.find(p => p.playerId === playerId);
		if (player) {
			player.firstRoundScore = score;
		}
	},
	UPDATE_PLAYER_FIRST_ROUND_SKILL(state, { playerId, skill }) {
		const player = state.compGroup.find(p => p.playerId === playerId);
		if (player) {
			player.firstRoundSkill = skill;
		}
	},
	CLEAR_PLAYER_SECOND_ROUND_ORDER(state) {
		state.compGroup.forEach(player => {
			player.secondRoundOrder = 0;
		});
	},
	CLEAR_PLAYER_IS_THIRD_WINNER(state) {
		state.compGroup.forEach(player => {
			player.isThirdWinner = false;
		});
	}
};

const actions = {
	addToGroup({ commit }, player) {
		commit('ADD_TO_GROUP', player);
	},
	resetGroups({ commit }) {
		commit('RESET_GROUPS');
	},
	addToFistRoundWinners({ commit }, player) {
		commit('ADD_TO_FIST_ROUND_WINNERS', player);
	},
	updateGroupFirstRoundGroup({ commit }, obj) {
		commit('UPDATE_GROUP_FIRST_ROUND_GROUP', { playerId: obj.playerId, firstRoundGroup: obj.firstRoundGroup })
	},
	updateGroupIsFirstWinnerToWin({ commit }, playerId) {
		commit('UPDATE_GROUP_IS_FIRST_WINNER_TO_WIN', playerId)
	},
	updateGroupIsFirstWinnerToDefeat({ commit }, playerId) {
		commit('UPDATE_GROUP_IS_FIRST_WINNER_TO_DEFEAT', playerId)
	},
	updatePlayerSecondRoundScore({ commit }, payload) {
		commit('UPDATE_PLAYER_SECOND_ROUND_SCORE', payload)
	},
	updatePlayerSecondRoundOrder({ commit }, payload) {
		commit('UPDATE_PLAYER_SECOND_ROUND_ORDER', payload)
	},
	clearPlayerSecondRoundOrder({ commit }) {
		commit('CLEAR_PLAYER_SECOND_ROUND_ORDER')
	},
	updatePlayerThirdRoundScore({ commit }, payload) {
		commit('UPDATE_PLAYER_THIRD_ROUND_SCORE', payload)
	},
	updatePlayerIsThirdWinnerToWin({ commit }, playerId) {
		commit('UPDATE_PLAYER_IS_THIRD_WINNER_TO_WIN', playerId)
	},
	updatePlayerIsThirdWinnerToDefeat({ commit }, playerId) {
		commit('UPDATE_PLAYER_IS_THIRD_WINNER_TO_DEFEAT', playerId)
	},
	updatePlayerFirstRoundScore({ commit }, payload) {
		commit('UPDATE_PLAYER_FIRST_ROUND_SCORE', payload);
	},
	updatePlayerFirstRoundSkill({ commit }, payload) {
		commit('UPDATE_PLAYER_FIRST_ROUND_SKILL', payload);
	},
	clearPlayerIsThirdWinner({ commit }) {
		commit('CLEAR_PLAYER_IS_THIRD_WINNER')
	}
};

const getters = {
	compGroup: (state) => state.compGroup,
	getBgm: (state) => state.bgm,
	fistRoundWinners: (state) => state.fistRoundWinners,
	secondRoundWinners: (state) => state.secondRoundWinners,
	thirdRoundWinners: (state) => state.thirdRoundWinners,
	finalWinners: (state) => state.finalWinners,
	getBgm2: (state) => state.bgm2,
	getBgm3: (state) => state.bgm3,
	getBgm4: (state) => state.bgm4,
	getBgm5: (state) => state.bgm5,
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
