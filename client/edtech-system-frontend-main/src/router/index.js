import Vue from "vue";
import VueRouter from "vue-router";

// ADMIN PAGE
import AdminPage from "../views/AdminPage.vue";
import TeamView from "../components/AdminPageComponents/TeamView.vue";
import Records from "../components/AdminPageComponents/RecordsView.vue";

// ADMIN SIGN-IN
import AdminSignIn from "../views/AdminSignIn.vue";

// LOGOUT
import LogOut from "../views/LogOut.vue";

// ERROR ROUTES
import AccessDenied from "../components/ErrorComponents/AccessDenied.vue";
import NotFound from "../components/ErrorComponents/404.vue";
Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/admin" },
	{ path: "/admin", component: AdminSignIn },
	{ path: "/logOut", component: LogOut },
	{
		path: "/adminPage",
		redirect: "/records",
		component: AdminPage,
		children: [
			{
				path: "/myteam",
				name: "Team",
				component: TeamView,
			},
			{
				path: "/records",
				component: Records,
			},
		],
	},
	{ path: "/accessdenied", component: AccessDenied },
	{ path: "*", component: NotFound },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
