<template>
  <q-page class="row">
    <div class="col-9 q-mx-auto bg-white q-mt-xl q-pa-xl row">
      <div class="col-12 text-h4">
        Add Song
      </div>
      <div class="col-9 q-mx-auto">

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-mt-lg"
        >
          <q-input
            v-on:keyup.space.stop
            v-model="name"
            type="text"
            label="Song Name"
            clearable/>

          <q-input
            v-on:keyup.space.stop
            v-model="recordCompany"
            type="text"
            label="Record Company"
            clearable/>

          <q-file
            v-model="song"
            label="Pick Song"
            accept="mp3,mp2,mpeg"
            clearable
            class="q-pr-md"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <q-input
            v-model="releaseDate"
            mask="date"
            :rules="['date']"
            label="Release Date"
            v-on:keyup.space.stop>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="releaseDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            filled
            v-model="selectedArtist"
            use-input
            v-on:keyup.space.stop
            use-chips
            input-debounce="0"
            label="Artist"
            :options="artistOptions"
            @filter="filterArtist"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No artist
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:append>
              <q-btn color="primary" icon="add" @click="openDialog('artist')" />
            </template>

          </q-select>

          <q-select
            filled
            label="Select Genres"
            hint="Separate multiple values by [,;|]"
            v-model="selectedGenre"
            use-input
            v-on:keyup.space.stop
            use-chips
            multiple
            input-debounce="0"
            :options="genreOptions"
            @filter="filterGenre"
          >
            <template v-slot:append>
              <q-btn color="primary" icon="add" @click="openDialog('genre')" />
            </template>
          </q-select>

          <q-dialog v-model="dialog">
            <q-card style="width: 500px; max-width: 80vw;">
              <q-card-section class="items-center">
                <q-input
                  v-model="dialogInput"
                  type="text"
                  :label=" additionType == 'addArtist' ? 'Artist Name' : 'Type Genre'"
                  v-on:keyup.space.stop/>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                  flat
                  :label="additionType == 'addArtist' ? 'Add new Artist' : 'Add new Genre'"
                  color="primary"
                  v-close-popup
                  @click="addArtistOrGenre(additionType)"
                  />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
      </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Dialog } from 'quasar';
import { mapActions } from 'vuex';
import axios from 'axios';

export default {

  data() {
    return {
      isLoading: true,
      name: '',
      releaseDate: '',
      song: null,
      recordCompany: '',
      selectedArtist: null,
      selectedGenre: null,
      artists: [],
      genres: [],
      artistOptions: [],
      genreOptions: [],
      dialog: false,
      additionType: 'addArtist',
      dialogInput: null,
    };
  },

  async mounted() {
    const artists = await this.fetchArtists();
    artists.map((a) => this.artists.push({ label: a.name, value: a._id }));
    this.artistOptions = this.artists;

    const genres = await this.fetchGenres();
    genres.map((g) => this.genres.push({ label: g.name, value: g._id }));

    this.isLoading = false;
  },
  methods: {
    ...mapActions('artists', ['fetchArtists', 'addArtist']),
    ...mapActions('genres', ['fetchGenres', 'addGenre']),

    openDialog(type) {
      this.dialog = true;
      if (type == 'artist') {
        this.additionType = 'addArtist';
      } else {
        this.additionType = 'addGenre';
      }
    },
    filterArtist(val, update) {
      if (val === '') {
        update(() => {
          this.artistOptions = this.artists;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.artistOptions = this.artists.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
      });
    },

    filterGenre(val, update) {
      update(() => {
        if (val === '') {
          this.genreOptions = this.genres;
        } else {
          const needle = val.toLowerCase();
          this.genreOptions = this.genres.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1,
          );
        }
      });
    },

    createGenre(val, done) {
      if (val.length > 0) {
        const selectedGenre = (this.selectedGenre || []).slice();
        val
          .split(/[,;|]+/)
          .map((v) => v.trim())
          .filter((v) => v.length > 0)
          .forEach((v) => {
            if (this.genres.includes(v) === false) {
              this.genres.push(v);
            }
            if (selectedGenre.includes(v) === false) {
              selectedGenre.push(v);
            }
          });
        done(null);
        this.selectedGenre = selectedGenre;
      }
    },

    onSubmit() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('track', this.song);
      formData.append('duration', 123);
      formData.append('releaseDate', this.releaseDate);
      formData.append('artists', [this.selectedArtist.value]);
      formData.append('genres', [...this.selectedGenre.map((g) => g.value)]);
      formData.append('recordCompany', this.recordCompany);

      // TODO: Get userId from session

      // POST /songs/:userId/song

      axios.post('http://localhost:3000/songs/5f97c43e315e8b2414412f0e/song', formData)
        .then((data) => {
          this.$q.notify({
            type: 'positive',
            message: `${this.name} Succesfully Added`,
            position: 'top',
          });
          this.$router.push('/');
        });
    },
    onReset() {
      this.name = null;
      this.recordCompany = null;
      this.song = null;
      this.releaseDate = null;
      this.selectedArtist = null;
      this.selectedGenre = null;
    },

    async addArtistOrGenre(type) {
      if (type == 'addArtist') {
        await this.addArtist({
          artist: this.dialogInput,
        });

        this.artists = [];

        this.$q.notify({
          type: 'positive',
          message: `${this.dialogInput} Added`,
          position: 'top',
        });
        this.dialogInput = [];
        const artists = await this.fetchArtists();
        artists.map((a) => this.artists.push({ label: a.name, value: a._id }));
      } else {
        await this.addGenre({
          genre: this.dialogInput,
        });

        this.genres = [];
        this.$q.notify({
          type: 'positive',
          message: `${this.dialogInput} Added`,
          position: 'top',
        });
        this.dialogInput = [];
        const genres = await this.fetchGenres();
        genres.map((g) => this.genres.push({ label: g.name, value: g._id }));
      }
    },
  },

};
</script>
<style scoped>
  .song {
    background: linear-gradient(to bottom, #444, #666);
    color: white;
  }
</style>
