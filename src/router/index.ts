import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import MainLayout from "@/layouts/MainLayout.vue"

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("@/pages/Posts.vue"),
		meta: { layout: MainLayout },
		props: true,
	},
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
