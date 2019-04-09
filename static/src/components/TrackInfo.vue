<template>
  <div class="track-info">
    <div class="cover">
      <img :src="data.album_image" />
    </div>
    <div class="song-info">
      <div class="name">{{ data.song_name }}</div>
      <div class="artist">{{ data.artist_name }}</div>
      <div class="album">{{ data.album_name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'track-info',
  components: {
  },
  props: ['data'],
  mounted() {
  },
};
</script>

<style scoped>
.track-info {
  color: #fff;
  width: 400px;
  height: 100px;
  margin: 0 auto;
  background: #191414;
  border: 1px solid #444;
  padding: 10px;
}

.cover {
 float: left;
 width: 30%;
 height: 100%;
}

.cover img {
  height: 100%;
  float: left;
}

.song-info {
  float: right;
  width: 70%;
  height: 100%;
}

.song-info div {
  text-align: left;
}

.song-info .name {
  height: 50%;
  font-weight: bold;
  font-size: 1.2em;
}

.song-info .artist,
.song-info .album {
  height: 25%;
  color: #ccc;
}

/* 1DB954 */
</style>
