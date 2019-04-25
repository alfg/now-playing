<template>
  <div class="settings">
    <h4>Settings</h4>
    <div class="row">
      <div class="six columns">
        <label for="theme">Theme</label>
        <select class="u-full-width" id="theme" v-model="theme">
          <option value="f">Full</option>
          <option value="m">Minimal</option>
        </select>
      </div>

      <div class="six columns">
        <label for="theme">Position</label>
        <select class="u-full-width" id="position" v-model="position">
          <option value="br">bottom-right</option>
          <option value="bl">bottom-left</option>
          <option value="tr">top-right</option>
          <option value="tl">top-left</option>
        </select>
      </div>
    </div>
    <label for="url">Paste this URL into OBS as a Browser Source</label>
    <input
      class="u-full-width"
      id="url"
      type="text"
      :value="url"
      readonly="readonly" />

    <hr />
    <h4>Preview</h4>

    <div v-if="isPlaying">
      <TrackInfo :data="data" :theme="theme" />
    </div>
    <div v-else>
      <h6>Start playing music to see preview!</h6>
    </div>
  </div>

</template>

<script>
import querystring from 'querystring';
import TrackInfo from '@/components/TrackInfo.vue';

export default {
  name: 'settings',
  components: {
    TrackInfo,
  },
  props: ['id', 'data'],
  data() {
    return {
      host: window.location.origin,
      theme: this.$route.query.t || 'f',
      position: this.$route.query.p || 'br',
    };
  },
  computed: {
    url() {
      // Only build query params if theme and position are not defaults.
      if (this.theme !== 'f' || this.position !== 'br') {
        const params = querystring.stringify({ t: this.theme, p: this.position });
        return `${this.host}/playing/${this.id}?${params}`;
      }
      return `${this.host}/playing/${this.id}`;
    },
    isPlaying() {
      return this.data.is_playing;
    },
  },
};
</script>

<style scoped>
.settings {
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
}
</style>
