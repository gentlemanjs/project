import Vue from "vue";
import Antd from "ant-design-vue";
// import VueCompositionAPI from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

// Vue.use(VueCompositionAPI);
Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
})
  // .use(Antd)
  .$mount("#app");
