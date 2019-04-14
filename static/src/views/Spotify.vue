<template>
  <div class="spotify">
    <div class="widget" v-if="isPlaying">
      <TrackInfo :data="data" />
    </div>
  </div>
</template>

<script>
import TrackInfo from '@/components/TrackInfo.vue';

export default {
  name: 'spotify',
  components: {
    TrackInfo,
  },
  data() {
    return {
      id: null,
      isPlaying: true,
      data: {},
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.setUpdateTimer();
  },
  methods: {
    setUpdateTimer() {
      if (this.id) this.getNowPlaying();

      setInterval(() => {
        if (this.id) {
          this.getNowPlaying();
        }
      }, 5000);
    },

    getNowPlaying() {
      const url = `/api/now-playing/${this.id}`;

      fetch(url)
        .then(response => (
          response.json()
        ))
        .then((json) => {
          this.isPlaying = json.is_playing;
          this.data = json;
        });
    },
  },
};
</script>


<style scoped>
.widget {
  position: fixed;
  bottom: 1%;
  right: 1%;
}
</style>
