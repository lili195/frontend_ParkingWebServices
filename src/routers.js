import { HomePage } from "./components/HomePage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "HomePage",
        component: HomePage,
        path: "/",
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;