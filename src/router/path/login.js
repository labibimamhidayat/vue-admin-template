import login from '@/components/layouts/login.vue';

const path = {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
        notForAuthentication: true,
    },
};

export default path;
