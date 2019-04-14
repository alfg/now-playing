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
  mounted() {
    if (EventSource) {
      const eventSource = new EventSource('/api/now-playing/events');
      eventSource.onmessage = (event) => {
        const { data } = JSON.parse(event.data);
        this.data = data.msg;
      };
    }
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
