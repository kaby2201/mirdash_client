import Router from 'vue-router';
import Vue from 'vue';


import Register from "../components/UserManager/Register";
import Users from "../components/UserManager/Users";
import AddRobot from "../components/Dashboard/Add";
import Robots from "../components/Dashboard/Robots"

import About from '../views/About';
import Login from '../views/Login';
import Notfound from "../views/Notfound";
import Dashboard from "../views/Dashboard";
import Home from "../components/Dashboard/Home";
import Stats from "../components/Dashboard/Stats";
import Profile from "../components/Profile/Profile";
import Missions from "../components/Dashboard/Missions";
import Edit from "../components/UserManager/Edit"

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login', component: Login, name: 'Authentication'
        },
        {
            // Licenses and description
            path: '/about', component: About, name: 'About'
        },
        {
            // Dashboard
            path: '/', component: Dashboard, children: [
                {path: '/', component: Home},
                {path: '/dashboard', component: Home, name: 'Main dashboard'},
                {path: '/stats', component: Stats},
                {path: '/missions', component: Missions}
            ]
        },
        {
            // Robots
            path: '/robots', component: Dashboard, children: [
                { path: '/', component: Robots},
                { path: '/robots/add', component: AddRobot}
            ]
        },
        {
            // User manager pages
            path: '/', component: Dashboard, children: [
                {path: '/usermanager', component: Users, name: 'Manger users'},
                {path: 'register', component: Register, name: 'Add new User'},
                {path: 'edit', component: Edit, name: 'Edit User'},
                {path: 'groups', comment: Users}
            ]
        },
        {
            // Account page
            path: '/account', component: Dashboard, children: [
                {path: '/', component: Profile, name: 'User Profile'}
            ]
        },
        {
            // 404 - Page not found
            path: '*', component: Notfound
        }
    ]
});

router.beforeEach((to, from, next) => {
    // Redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/about'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    // Update the page title
    document.title = to.name || 'Dashboard'
    next();
});