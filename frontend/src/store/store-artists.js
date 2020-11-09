import axios from 'axios';
import { SessionStorage } from 'quasar';

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL || 'https://backend-5yguhx2xkq-ew.a.run.app';

const state = {
  artists: [],
};

const mutations = {
};

const actions = {
  async fetchArtists() {
    const request = await axios.get('/artists');
    return request.data;
  },

  async findArtist(context, { _id }) {
    const request = await axios.get(`/artists/${_id}`);
    const songsRequest = await axios.get(`/songs/artist/${_id}`);
    const data = { artist: request.data, songs: songsRequest.data };
    return data;
  },

  async addArtist(context, { artist }) {
    const user = SessionStorage.getItem('user');
    const request = await axios.post(`/artists/${user._id}/artist`, {
      name: artist,
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
