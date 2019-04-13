<template>
  <div class="spotify">
    <h1>Spotify</h1>

    <div class="widget" v-if="isPlaying">
      <TrackInfo :data="data" />
    </div>
  </div>
</template>

<script>
import TrackInfo from '@/components/TrackInfo.vue';

const ws = new WebSocket('ws://localhost:4000');

ws.onmessage = function(event) {
  console.log('open', event.data);
};

export default {
  name: 'spotify',
  components: {
    TrackInfo,
  },
  data() {
    return {
      isPlaying: true,
      data: {},
    };
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
