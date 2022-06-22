import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/home',
      component: () => import('../components/Home.vue'),
      children: [
        {
          path: '/historico',
          component: () => import('../components/layouts/Historico.vue')
        },
        {
          name: 'Meus Protocolos',
          path: '/meus-protocolos',
          component: () => import('../components/layouts/MeusProtocolos.vue')
        },
        {
          path: '/novo-protocolo',
          component: () => import('../components/layouts/NovoProtocolo.vue')
        },
        {
          path: '/protocolo/:id',
          component: () => import('../components/layouts/Protocolo.vue')
        },
        {
          path: '/minha-conta',
          component: () => import('../components/layouts/MinhaConta.vue')
        },
      ],
    },
    {
      name: 'Login',
      path: '/',
      component: () => import('../components/layouts/Login.vue'),
    },
    { path: "/:catchAll(.*)", redirect: '/meus-protocolos' }
  ],
})

export default router;