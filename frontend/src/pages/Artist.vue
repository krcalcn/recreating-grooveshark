<template>
  <q-page class="row">
    <div class="col-9 q-mx-auto bg-white q-mt-xl q-pa-xl ">
      <h5>{{artist.name}}</h5>
      <div
        v-for="(song, key) in songs"
        v-bind:key="key"
        @click="playSong(song)"
        class="song q-my-md q-pa-md rounded-borders cursor-pointer">
        <q-btn flat icon="play_arrow" @click="playSong(song)" />
        <q-btn flat icon="queue" @click.stop="addToQueue(song)"/>
        {{song.name}}
        <span
          class="float-right q-mt-sm text-primary"
          v-for="(genre, key) in song.genres"
          v-bind:key="key">
          {{genre.name}}
        </span>
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
      data: null,
      artist: null,
      songs: null,
    };
  },

  async mounted() {
    // console.log(this.$route.params);
    this.data = await this.findArtist({
      _id: this.$router.history.current.params.artistId,
    });
    this.artist = this.data.artist;
    this.songs = this.data.songs;
    this.isLoading = false;
  },
  watch: {
    'this.$route.params.artistId': () => {
      // console.log(this.$route.params);
    },
  },

  methods: {
    ...mapActions('artists', ['findArtist']),
    ...mapActions('songs', ['addToQueue', 'playSong']),
  },

};
</script>
<style scoped>
  .song {
    background: linear-gradient(to bottom, #444, #666);
    color: white;
  }
</style>
