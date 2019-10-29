<template>
    <div style="height : 100%;">
        <nav-bar></nav-bar>
        <side-bar></side-bar>
        <content-bar>
            <router-view :key="$route.fullPath"></router-view>
        </content-bar>
        <footer-bar></footer-bar>
    </div>
</template>
<script>
const navBar = () => import(/* webpackChunkName: "layouts-chunk" */ '@/components/views/core/navbar');
const sideBar = () => import(/* webpackChunkName: "layouts-chunk" */ '@/components/views/core/sidebar');
const footerBar = () => import(/* webpackChunkName: "layouts-chunk" */ '@/components/views/core/footer');
const contentBar = () => import(/* webpackChunkName: "layouts-chunk" */ '@/components/views/core/content');
export default {
    name: 'homeLayout',
    components: {
        navBar,
        sideBar,
        footerBar,
        contentBar,
    },
    data: () => ({
        test: 'sadsadsa',
    }),
};
</script>
