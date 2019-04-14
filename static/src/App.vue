<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body {
  /* background: rgb(0, 255, 0) none repeat scroll 0% 0%; */
  /* background: white; */
  /* height: 100%; */
  margin: 0;
  /* background: transparent; */
  /* overflow: hidden; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
