const children = () => import('@/components/views/core/childpage');
const viewListEmail = () => import('@/components/views/email/viewListEmail');

const path = {
    path: 'emails',
    component: children,
    redirect: '/emails/',
    children: [
        {
            path: '/',
            name: 'viewEmails',
            component: viewListEmail,
            meta: {
                title: 'List Of Emails',
            },
        },
    ],
};

export default path;
