import axios from 'axios';
import { SessionStorage } from 'quasar';

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL || 'https://backend-5yguhx2xkq-ew.a.run.app';

const state = {
  genres: [],
};

const mutations = {

};

const actions = {
  async fetchGenres() {
    const request = await axios.get('/genres');
    return request.data;
  },
  async addGenre(context, { genre }) {
    const user = SessionStorage.getItem('user');
    const request = await axios.post(`/genres/${user._id}/genre`, {
      name: genre,
    });
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
