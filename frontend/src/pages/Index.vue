<template>
  <q-page class="row">
    <div class="col-9 q-mx-auto bg-white q-mt-xl q-pa-xl">
      <div class="col-12 text-h5">
        Songs
      </div>
      <div
        class="col-12 song q-my-md q-pa-md rounded-borders cursor-pointer"
        @click="playSong(song)"
        v-for="(song, key) in songs"
        v-bind:key="key">

        <q-btn flat icon="play_arrow" @click="playSong(song)" />
        <q-btn
          flat
          icon="queue"
          @click.stop="addToQueue(song)" />
        <a
                :href="`#/artists/${song.artists[0]._id}`"
                class="artist-link" >
          {{ song.artists[0].name }}
        </a>
        {{ song.name }}

      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {

  data() {
    return {
      isLoading: true,
      songs: [],
    };
  },

  async mounted() {
    this.songs = await this.fetchSongs();
    this.isLoading = false;
  },

  methods: {
    ...mapActions('songs', ['fetchSongs', 'addToQueue', 'playSong']),
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
