import axios from 'axios';
import { SessionStorage } from 'quasar';

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL || 'https://backend-5yguhx2xkq-ew.a.run.app';

const state = {
  nowPlaying: '',
  queue: [],
};

const mutations = {
  addToQueue(state, song) {
    state.queue.push(song);
  },
  playFromQueue(state, index) {
    state.queue.splice(0, index);
  },
  playSong(state, song) {
    state.queue = [song];
  },
  playNext(state) {
    state.queue.shift();
  },
  removeFromQueue(state, index) {
    state.queue.splice(index, 1);
  },
};

const actions = {
  addToQueue({ commit }, songs) {
    if (Array.isArray(songs)) {
      songs.forEach((song) => commit('addToQueue', song));
    } else {
      commit('addToQueue', songs);
    }
  },
  playFromQueue({ commit }, songIndex) {
    commit('playFromQueue', songIndex);
  },
  playSong({ commit }, song) {
    commit('playSong', song);
  },
  playNext({ commit }) {
    commit('playNext');
  },
  removeFromQueue({ commit }, index) {
    commit('removeFromQueue', index);
  },
  async addSong(context, data) {
    const user = SessionStorage.getItem('user');
    const request = await axios.post(`songs/${user._id}/song`, data);
    return request;
  },
  async fetchSongs() {
    const request = await axios.get('/songs');
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
