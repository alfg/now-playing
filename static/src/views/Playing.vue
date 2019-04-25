<template>
  <div class="playing">
    <div class="widget" v-bind:class="position" v-if="isPlaying">
      <TrackInfo :data="data" :theme="theme" />
    </div>
  </div>
</template>

<script>
import TrackInfo from '@/components/TrackInfo.vue';

export default {
  name: 'playing',
  components: {
    TrackInfo,
  },
  data() {
    return {
      id: null,
      isPlaying: true,
      theme: this.$route.query.t || 'f',
      position: this.$route.query.p || 'br',
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
      const url = `/api/playing/${this.id}`;

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
}

.widget.br {
  bottom: 1%;
  right: 1%;
}

.widget.bl {
  bottom: 1%;
  left: 1%;
}

.widget.tr {
  top: 1%;
  right: 1%;
}

.widget.tl {
  top: 1%;
  left: 1%;
}
</style>
