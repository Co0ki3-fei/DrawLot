import { createStore } from 'vuex';
import group from './group';
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state() {
    return {
      // 定义全局状态变量
      message: 'Hello from Vuex!',
      user: {
        name: '',
        age: null,
      },
      skillPool: ["迅速スネイク/迅速蛇", "東北クライシス/东北危机", "ナギナタ/薙刀",
        "アマテラス（旧）/旧天照", "ラピッドクロウ/迅捷乌鸦", "虎振徹",
        "メテオロロジスト/星象仪", "ななえる/娜娜艾露", "RAISON/铁塔猫",
        "キャノン砲/加农炮", "不知火", "ロマンス/Romance"]
    };
  },
  modules: {
    group
  },
  mutations: {
    // 定义修改状态的同步方法
    setMessage(state, newMessage) {
      state.message = newMessage;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    // 定义异步方法
    async fetchUser({ commit }) {
      // 假设这里是一个异步请求
      const userData = { name: 'John Doe', age: 30 }; // 模拟数据
      commit('setUser', userData);
    },
  },
  getters: {
    // 定义获取状态的计算属性
    upperCaseMessage(state) {
      return state.message.toUpperCase();
    },
  },
  plugins: [createPersistedState()],
});
