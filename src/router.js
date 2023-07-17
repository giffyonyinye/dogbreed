import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {path: "/", name: "LandingPage", component:() => import("./components/LandingPage.vue")},
    {path: '/dogInfo/:id/:image', name: 'dogInfo', component:() => import("./components/DogInfo.vue"), props:true},
    {path: '/breed/:breed', name: 'dogBreed', component:() => import("./components/SearchByBreed.vue"), props:true},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;