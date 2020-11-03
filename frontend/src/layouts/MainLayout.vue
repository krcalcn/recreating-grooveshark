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
        <q-btn text-color="white" label="Add Song" class="q-mr-md bg-content" to="/add/song" />

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
        <q-item-label>
          <b>Links</b>
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="bg-content"/>
      <q-spinner
        v-if="isLoading"
        class="absolute-center"
        color="grey"
        size="5em"/>
    </q-page-container>

    <q-footer
      elevated
      class="bg-grad-player text-white row">
      <div class="col-12 row">
        <q-toolbar-title class="row">

          <div
            v-if="$q.screen.width < 1440"
            class="col-3 player-toggle-area"
            @click="queueToggle = !queueToggle">
          </div>

          <div
            v-if="$q.screen.width >= 1440"
            class="col-3 text-center q-pt-lg q-pl-md overflow-hidden">
            <q-icon name="album" size="54px" class="float-left"/>
            <marquee>
              <q-btn
                flat
                dense
                size="lg"
                :to="`/artists/${queue[0] ? queue[0].artists[0]._id : ''}`"
                class="artist-link q-pr-sm"
                :label="queue[0] ? queue[0].artists[0].name : ''" no-caps/>

              {{ queue[0] ? ' - '+queue[0].name : '' }}
            </marquee>
          </div>

          <player v-if="queue" :song="queue[0]" />

          <q-space class="player-toggle-area" @click="queueToggle = !queueToggle"/>
          <div
            class="player-toggle-area"
            @click="queueToggle = !queueToggle"></div>
          <q-btn
            :icon="queueToggle ? 'expand_more' : 'expand_less'"
            @click="queueToggle = !queueToggle"
            class="q-ma-md bgcolor: #D65F0A !important;-grad-btn"
          />
        </q-toolbar-title>
      </div>
      <transition
        appear
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown">

        <q-toolbar v-if="queueToggle" class="bg-grad queue">
            <div
              v-for="(song,key) in queue"
              v-bind:key="key"
              class="queue-item col-lg-1 col-md-2 col-sm-6 col-xs-12 q-pa-sm text-center"
              @click="playFromQueue(key)">
                  <q-btn
                    flat
                    dense
                    icon="close"
                    @click.stop="removeFromQueue(key)" />
              <div class="col-12">
                <q-icon :name="key == 0 ? 'volume_up' : 'album'" size="5em"/>
              </div>
              {{ song.name }}
              <p class="text-primary">
                {{ song.artists[0].name }}
              </p>
            </div>
        </q-toolbar>

      </transition>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PlayerVue from '../components/player/Player';

export default {
  name: 'MainLayout',
  components: {
    player: PlayerVue,
  },
  data() {
    return {
      isLoading: true,
      leftDrawerOpen: false,
      queueToggle: true,
    };
  },
  computed: {
    ...mapState('songs', ['queue']),
  },
  async mounted() {
    // await this.addToQueue([...this.songs]); // dummy songs
    this.isLoading = false;
  },
  methods: {
    ...mapActions('songs', ['addToQueue', 'playFromQueue', 'removeFromQueue']),
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
    padding: 0px;
    margin: 0px;
  }
  @media only screen and (max-width: 760px) {
    .queue {
      overflow: scroll;
    }
  }
  .play {
    box-shadow: inset 0px 0px 20px #121212;
  }
  .queue-item {
    box-shadow: 0px 0px 8px #121212;
    height: 90%;
    box-sizing: border-box;
    cursor: pointer;
  }
  .queue-item:hover {
    box-shadow: inset 0px 0px 8px #555;
  }
  .artist-link {
    color: #D65F0A !important;
  }
  .artist-link:hover {
    color: #Ff8F4A !important;
  }
</style>
