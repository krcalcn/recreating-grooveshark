<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-grad">
      <q-toolbar>
        <q-btn flat icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>
           <q-btn
            flat
            class="text-h5 q-px-md"
            label="Grooveshark"
            icon="music_video"
            to="/" no-caps />
        </q-toolbar-title>

        <q-toolbar-title align="right">
        <!--  <q-btn
          dense
          label="User"
          :icon="playerToggle ? 'expand_more' : 'expand_less'"
          @click="playerToggle = !playerToggle"
        />  -->
        <q-btn text-color="white" label="Add Song" class="q-mr-md bg-content" />

        <q-btn-dropdown auto-close flat label="User" class="bg-content">
          <q-list padding style="width: 250px">
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar icon="account_circle" size="40px" font-size="40px" text-color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Profile</q-item-label>
                <q-item-label caption>{{ new Date(0) }}</q-item-label>
              </q-item-section>
              <!-- <q-item-section side>
                <q-icon name="info" color="amber" />
              </q-item-section> -->
            </q-item>
          </q-list>
        </q-btn-dropdown>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      content-class="bg-dark text-white"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="bg-content"/>
    </q-page-container>

    <q-footer
      elevated
      class="bg-grad-player text-white row">
      <div class="col-12 row">
        <q-toolbar-title class="row">

          <div
            class="col-3 player-toggle-area"
            @click="playerToggle = !playerToggle">
          </div>
          <div class="col-6 row q-mt-sm q-my-md play q-pa-sm" style="border-radius: 1rem;"  >
            <div class="col-2 q-py-sm q-pl-md">
              <q-btn
                color="primary"
                flat
                round
                icon="fast_rewind"
                size="md"
                @click="() => {
                  wavesurfer.skipBackward(1);
                  wavesurfer.play();
                  isPlaying = true;
                  }"
              />
              <q-btn
                color="primary"
                round
                :icon="isPlaying ? 'pause' : 'play_arrow'"
                size="md"
                @click="() => {
                  wavesurfer.playPause();
                  isPlaying = !isPlaying;
                  }"
              />
              <q-btn
                color="primary"
                flat
                round
                icon="fast_forward"
                size="md"
                @click="() => {
                  wavesurfer.skipForward(1)
                  wavesurfer.play();
                  isPlaying = true;
                  }"
              />
            </div>

            <div class="col-10">
              <div
                id="waveform"
                class="col-12 q-ml-md"
                @click="doYaThing">
                </div>
            </div>

<!-- QUASAR MEDIA PLAYER TEST -->

            <!-- <q-media-player
              key="audio"
              type="audio"
              :dense="true"
              :dark="true"
              background-color="black"
              :muted="false"
              :playsinline="false"
              :loop="false"
              radius="1rem"
              :autoplay="false"
              :show-big-play-button="true"
              :sources="this.sources"
              :poster="this.poster"
              :tracks="this.tracks"
              class="col-12"
            >
            </q-media-player> -->

<!-- QUASAR MEDIA PLAYER TEST -->

          </div>
          <q-space class="player-toggle-area" @click="playerToggle = !playerToggle"/>
          <div
            class="player-toggle-area"
            @click="playerToggle = !playerToggle"></div>
          <q-btn
            :icon="playerToggle ? 'expand_more' : 'expand_less'"
            @click="playerToggle = !playerToggle"
            class="q-ma-md bg-grad-btn"
          />
        </q-toolbar-title>
      </div>
      <transition
        appear
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown">

        <q-toolbar v-if="playerToggle" class="bg-grad queue">

        </q-toolbar>

      </transition>
    </q-footer>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import WaveSurfer from 'wavesurfer.js';
import axios from 'axios';

const linksData = [
  {
    title: 'My Musics',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'My Favorites',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Playlists',
    icon: '',
    link: 'https://github.com/quasarframework',
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      playerToggle: true,
      wavesurfer: null,
      song: null,
      isPlaying: false,
      // audio: {
      //   sources: [
      //     {
      //       // src: 'http://localhost:3000/users/track/5f8dfcfb30926bb64406a077',
      //       src: 'https://raw.githubusercontent.com/quasarframework/quasar-ui-qmediaplayer/dev/demo/public/media/Scott_Holmes_-_04_-_Upbeat_Party.mp3',
      //       type: 'audio/mp3',
      //     },
      //   ],
      // },
      // sources: [],
      // tracks: [],
      // poster: '',
    };
  },
  mounted() {
    this.fetchSong('5f8dfcfb30926bb64406a08d');
    if (!this.wavesurfer) this.createWaveSurfer();
    axios
      .get('http://localhost:3000/songs/track/5f8dfcfb30926bb64406a077')
      .then((data) => {
        this.song = data.config.url;
        // console.log(data);
      });
    window.addEventListener('keyup', (event) => {
      if (event.keyCode == 32) {
        this.wavesurfer.playPause();
        this.isPlaying = !this.isPlaying;
      }
    });

    // window.addEventListener('keydown', (event) => {
    //   if (event.keyCode == 17) {
    //     console.log('ctrl');
    //     window.addEventListener('keydown', (e) => {
    //       if (e.keyCode == 39) {
    //         this.wavesurfer.skipForward(1);
    //       }
    //       if (e.keyCode == 37) {
    //         this.wavesurfer.skipBackward(1);
    //       }
    //     });
    //   }
    // });
  },
  // created() {
  //   this.setSource();
  // },

  // watch: {
  //   videoType(val) {
  //     this.setSource();
  //   },
  // },
  methods: {
    doYaThing() {
      this.wavesurfer.play();
    },
    fetchSong(songId) {
      axios.get(`http://localhost:3000/songs/${songId}`)
        .then((data) => {
          console.log(data.data);
        }).catch((e) => {
          console.log(e);
        });
    },
    // setSource() {
    //   if (this.videoType) {
    //     this.sources.splice(0, this.sources.length, ...this.video[this.videoIndex].sources);
    //     this.tracks.splice(0, this.tracks.length, ...this.video[this.videoIndex].tracks);
    //     this.poster = this.video[this.videoIndex].poster;
    //   } else {
    //     this.sources.splice(0, this.sources.length, ...this.audio.sources);
    //     this.tracks.splice(0, this.tracks.length);
    //     this.poster = '';
    //   }
    // },
    createWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barWidth: 1,
        waveColor: 'white',
        progressColor: '#F05020',
        scrollParent: false,
        barGap: 3,
        barHeight: 1.5,
        cursorColor: '#FFFFFF',
        cursorWidth: 2.5,
        height: 40,
        hideScrollbar: true,
        mediaControls: true,
        responsive: true,
      });
      this.wavesurfer.load('http://localhost:3000/songs/track/5f8dfcfb30926bb64406a077');
      this.wavesurfer.on('ready', () => {

      });
    },
  },
};
</script>
<style scoped>
  .bg-grad-player {
    background: linear-gradient(to bottom, #202020, #424242)
  }
  .bg-grad {
    background: linear-gradient(to bottom, #202020, #323232)
  }
  .player-toggle-area {
    cursor: pointer;
  }
  .bg-grad-btn {
    background: linear-gradient(to bottom, #353535, #202020)
  }
  .bg-content {
    background: linear-gradient(to bottom, #F2A62F ,#F57028)
  }
  .queue {
    min-height: 150px;
  }
  #waveform {
    cursor: pointer;
    margin-top: 10px;
  }
  .play {
    box-shadow: inset 0px 0px 20px #121212;
  }
</style>
