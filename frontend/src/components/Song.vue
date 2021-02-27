<template>
  <div
    class="col-12 song q-my-md q-pa-md rounded-borders cursor-pointer"
    @click="playSong(song)">
    <q-btn
      flat
      :color="user.savedSongs.filter(s => s._id === song._id).length > 0  ? 'primary' : 'white'"
      v-if="user"
      :icon="user.savedSongs.filter(s => s._id === song._id).length > 0 ? 'check' : 'add'"
      @click.stop="user.savedSongs.filter((s) => s._id === song._id).length > 0 ?
      removesongFromLibrary(song) : addSongToLibrary(song)" />
    <q-btn flat icon="play_arrow" @click="playSong(song)" />
    <q-btn
      flat
      icon="queue"
      @click.stop="addToQueue(song)" />
    <div class="inline-block" v-if="showArtist">
      <q-btn
        flat
        dense
        :to="`/artists/${song.artists[0]._id}`"
        class="artist-link"
        no-caps>
        {{ song.artists[0].name }}
      </q-btn>
    </div>
    {{ song.name }}
    <div
      v-if="showGenre"
      class="float-right q-mt-sm text-primary">
      <span
        class=""
        v-for="(genre, key) in song.genres"
        v-bind:key="key">
        {{genre.name}}
      </span>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: ['song', 'showGenre', 'showArtist'],
  data() {
    return {
    };
  },
  mounted() {
    this.user = this.$q.sessionStorage.getItem('user');
  },
  computed: {
    user: {
      set() {
        return this.$q.sessionStorage.getItem('user');
      },
      get() {
        return this.$q.sessionStorage.getItem('user');
      },
    },

  },
  watch: {
    user() {
      console.log('testing');
    },
  },

  methods: {
    ...mapActions('songs', ['addToQueue', 'playSong', 'addSongToLibrary', 'removesongFromLibrary']),
  },

};
</script>
<style scoped>
  .song {
    background: linear-gradient(to bottom, #444, #666);
    color: white;
  }

  .artist-link {
    color: orange !important;
    text-decoration: none;
  }
  .artist-link:hover {
    color: #D65F0A !important;
  }
</style>
