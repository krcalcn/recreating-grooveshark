<template>
  <q-page class="row">
    <div class="col-9 q-mx-auto bg-white q-mt-xl q-pa-xl ">
      <h5>{{artist.name}}</h5>
        <song
        v-for="(song, key) in songs"
        v-bind:key="key"
        :song="song"
        :showArtist="false"
        :showGenre="true"/>

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
  },

};
</script>
<style scoped>
  .song {
    background: linear-gradient(to bottom, #444, #666);
    color: white;
  }
</style>
