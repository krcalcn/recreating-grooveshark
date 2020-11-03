import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

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
    // TODO: UserId From Session
    const request = await axios.post('/artists/5f97c43e315e8b2414412f0e/artist', {
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
