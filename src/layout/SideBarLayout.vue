<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Home',
            icon: 'ni ni-shop text-primary',
            path: '/',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Icons',
            icon: 'ni ni-planet text-blue',
            path: '/icons',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/tables',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <navbar></navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    Navbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
