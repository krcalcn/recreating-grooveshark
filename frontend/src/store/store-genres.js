import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

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
    const request = await axios.post('/genres/5f97c43e315e8b2414412f0e/genre', {
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
