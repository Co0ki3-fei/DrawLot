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
      skillPool: ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8", "skill9", "skill10", "skill11", "skill12"]
    };
  },
  modules:{
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
