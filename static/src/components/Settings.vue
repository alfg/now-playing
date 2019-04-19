<template>
  <div class="settings">
    <h4>Settings</h4>
    <div class="row">
      <div class="six columns">
        <label for="theme">Theme</label>
        <select class="u-full-width" id="theme">
          <option value="full">Full</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>

      <div class="six columns">
        <label for="theme">Position</label>
        <select class="u-full-width" id="theme">
          <option value="bottom-right">bottom-right</option>
          <option value="bottom-left">bottom-left</option>
          <option value="top-right">top-right</option>
          <option value="top-left">top-left</option>
        </select>
      </div>
    </div>
    <label for="url">Paste this URL into OBS as a Browser Source</label>
    <input
      class="u-full-width"
      id="url"
      type="text"
      :value="`${host}/spotify/${id}`"
      readonly="readonly" />
  </div>
</template>

<script>
export default {
  name: 'settings',
  props: ['id'],
  data() {
    return {
      host: window.location.origin,
    };
  },
  methods: {
    getSettings() {
      const url = `/api/now-playing/${this.id}/settings`;

      fetch(url)
        .then(response => (
          response.json()
        ))
        .then((json) => {
          console.log(json);
        });
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
