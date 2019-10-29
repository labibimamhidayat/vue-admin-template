import welcomeHomePage from '@/router/path/nestedPath/welcomeHomePage.router';

const homeLayouts = () => import(/* webpackChunkName: "homeLayouts-chunks" */'@/components/layouts/home.vue');

const path = {
    path: '/',
    name: 'HomeLayout',
    component: homeLayouts,
    meta: {
        needAuthentication: true,
    },
    children: [
        welcomeHomePage,
    ],
};

export default path;
