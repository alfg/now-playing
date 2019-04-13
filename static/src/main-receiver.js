import Vue from 'vue';
import App from './ReceiverApp.vue';
import router from './router-receiver';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
