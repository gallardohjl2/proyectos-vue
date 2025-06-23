import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listado-clientes',
      component: Inicio, 
      props:{
        titulo:'Listado de Clientes'
      }
    },
    {
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      props:{
        titulo:'Agregar Cliente'
      },
      component: () => import ('../views/NuevoClienteView.vue')
    },

    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      props:{
        titulo:'Editar Cliente'
      },
      component: () => import ('../views/EditarClienteView.vue')
    },
  ],
})

export default router
