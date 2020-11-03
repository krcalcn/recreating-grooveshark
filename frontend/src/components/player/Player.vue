<template>
  <div class="col-6 row q-mt-sm q-my-md play q-pa-sm" style="border-radius: 1rem;"  >
    <div class="col-lg-2 col-sm-3 q-py-sm q-pl-md ">
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
    <div v-if="$q.screen.width < 1440 " class="col-9 text-center">
      <marquee>
        <a :href="`#/artists/${song ? song.artists[0]._id : ''}`" class="artist-link" >
          {{ song ? song.artists[0].name : ''}}
        </a>
        {{ song ? ' - '+song.name : ''}}
      </marquee>
    </div>
    <div class="col-lg-10 col-sm-12">
      <div v-if="!song" class="q-ml-md">
        <marquee>Add song to queue or play.</marquee>
      </div>
      <div
        v-else
        id="waveform"
        class="col-12 q-ml-md">
        </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import WaveSurfer from 'wavesurfer.js';

export default {
  props: ['song'],
  data() {
    return {
      isLoading: true,
      leftDrawerOpen: false,
      wavesurfer: null,
      isPlaying: false,
    };
  },

  mounted() {
    window.addEventListener('keyup', (event) => {
      if (event.keyCode == 32) {
        this.wavesurfer.playPause();
      }
    });

    // Ctrl + Right Arrow key combination listener:
    // Plays next song on the queue
    // window.addEventListener('keyup', (e) => {
    //   const evtobj = window.event ? event : e;
    //   if (evtobj.keyCode == 39 && evtobj.ctrlKey) this.queue.shift();
    // });
  },
  methods: {
    ...mapActions('songs', ['playNext']),
    createWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barWidth: 1,
        waveColor: 'white',
        progressColor: '#F07040',
        scrollParent: false,
        barGap: 3,
        barHeight: 1.5,
        cursorColor: '#Ff5020',
        cursorWidth: 2.5,
        height: 40,
        hideScrollbar: true,
        mediaControls: true,
        responsive: true,
      });
      this.wavesurfer.on('play', () => {
        this.isPlaying = true;
      });
      this.wavesurfer.on('pause', () => {
        this.isPlaying = false;
      });
      this.wavesurfer.on('finish', () => {
        this.wavesurfer.empty();
        this.playNext();
        this.wavesurfer.on('ready', () => {
          this.wavesurfer.play();
        });
      });
      this.wavesurfer.load(`http://localhost:3000/songs/track/${this.song.trackId}`);
    },
  },
  computed: {
    ...mapState('songs', ['queue']),
  },
  watch: {
    song() {
      this.wavesurfer.empty();
      if (!this.wavesurfer) this.createWaveSurfer();
      this.wavesurfer.load(`http://localhost:3000/songs/track/${this.song.trackId}`);
    },
    queue() {
      setTimeout(() => {
        if (!this.wavesurfer) this.createWaveSurfer();
      }, 100);
    },
  },
};
</script>
<style scoped>
  #waveform {
    cursor: pointer;
    margin-top: 10px;
  }
  .artist-link {
    color: #D65F0A !important;
    text-decoration: none;
  }
  .artist-link:hover {
    color: #Ff8F4A !important;
  }
</style>
