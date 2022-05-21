import { createRouter, createWebHashHistory } from "vue-router";

import SideBarLayout from "../layout/SideBarLayout.vue";
import AuthLayout from "../layout/AuthLayout.vue";

import Home from "../views/Home.vue";
import Icons from "../views/Icons.vue";
import Profile from "../views/profile/Profile.vue";
import Tables from "../views/Tables.vue";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ConfirmEmail from "../views/auth/reset_password/ConfirmEmail.vue";
import ConfirmPassword from "../views/auth/reset_password/ConfirmPassword.vue";

import beforeEach from "./beforeEach";

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: SideBarLayout,
    children: [
      {
        path: "/",
        name: "home",
        components: { default: Home },
      },
      {
        path: "/icons",
        name: "icons",
        components: { default: Icons },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
      {
        path: "/reset/confirm-email",
        name: "confirm-email",
        components: { default: ConfirmEmail },
      },
      {
        path: "/reset/confirm-password/:token",
        name: "confirm-password",
        components: { default: ConfirmPassword },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach(beforeEach);

export default router;
