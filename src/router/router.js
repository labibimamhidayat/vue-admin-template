import Vue from 'vue';
import Router from 'vue-router';
import RouterPath from './config';
import GuardRoutesMiddleware from '@/middleware/GuardRoutesMiddleware';


Vue.use(Router);

const PATH = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0 };
    },
    routes: RouterPath,
});

PATH.beforeEach(async (to, _from, next) => {
    const isPageForAuthentication = to.matched.some(eachRoute => eachRoute.meta.needAuthentication);
    // eslint-disable-next-line max-len
    const isPageNotForAuthentication = to.matched.some(eachRoute => eachRoute.meta.notForAuthentication);
    if (isPageForAuthentication) {
        if (await GuardRoutesMiddleware()) {
            next();
        } else {
            next('/login');
        }
    } else if (isPageNotForAuthentication) {
        if (!await GuardRoutesMiddleware()) {
            next();
        } else {
            next('/');
        }
    }
    next();
});

export default PATH;
