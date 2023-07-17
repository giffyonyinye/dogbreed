import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {path: "/", name: "all-dogs", component:() => import("./components/AllDogs.vue")}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;