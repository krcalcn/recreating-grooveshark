<template>
  <q-page class="row">
    <div class="col-9 q-mx-auto bg-white q-mt-xl q-pa-xl">
      <div class="col-12 text-h5">
        Songs
      </div>
      <song
        v-for="(song, key) in songs"
        v-bind:key="key"
        :song="song"
        :showArtist="true"
        :showGenre="false"/>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import SongVue from '../components/Song.vue';

export default {
  components: {
    song: SongVue,
  },

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
    ...mapActions('songs', ['fetchSongs']),
  },

};
</script>
