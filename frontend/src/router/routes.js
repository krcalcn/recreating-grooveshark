const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'add/song', component: () => import('pages/AddSong.vue') },
      { path: 'artists/:artistId', component: () => import('pages/Artist.vue') },
      { path: 'artists', component: () => import('pages/Artists.vue') },
      { path: 'auth', component: () => import('pages/Auth.vue') },
      { path: 'list', component: () => import('pages/List.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
