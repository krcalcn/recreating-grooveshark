import axios from 'axios';

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL || 'https://backend-5yguhx2xkq-ew.a.run.app';

const state = {
  user: null,
  register: null,
};

const mutations = {
  login(state, user) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }, { usernameOrMail, password }) {
    const request = await axios.post('/users/login', {
      usernameOrMail,
      password,
    });
    commit('login', request.data);
    return request.data;
  },
  async register({ commit }, {
    name, username, email, password,
  }) {
    const request = await axios.post('/users/', {
      name,
      userName: username,
      email,
      password,
    });
    commit('login', request.data);
    return request.data;
  },
};

const getters = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
