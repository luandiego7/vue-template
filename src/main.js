import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import VueFlatPickr from 'vue-flatpickr-component';
import { VueMaskDirective } from 'v-mask';
import vSelect from 'vue-select';
import store from './store';

import "element-plus/lib/theme-chalk/index.css";
import 'flatpickr/dist/flatpickr.css';
import 'vue-select/dist/vue-select.css';

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(store);
appInstance.use(ArgonDashboard);
appInstance.use(VueFlatPickr);
appInstance.component('v-select', vSelect);
appInstance.directive('mask', vMaskV3);
appInstance.mount("#app");
