import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sign-in',
    component: () => import('../views/auth/SignIn'),
    beforeEnter: guardUserUnLogin
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/auth/SignUp'),
    beforeEnter: guardUserUnLogin
  },
  {
    path: '/recovery-password',
    name: 'recovery-password',
    component: () => import('../views/auth/RecoveryPassword'),
    beforeEnter: guardUserUnLogin
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home'),
    redirect: '/home/books',
    children: [
      {
        path: '/home/books',
        name: 'books',
        component: () => import('../views/books/Books'),
        beforeEnter: guardUserRoute
      },
      {
        path: '/home/ready-books',
        name: 'pending-books-form',
        component: () => import('../components/forms/ready-books/PendingBooksForm.vue'),
        beforeEnter: guardUserRoute
      },
      {
        path: '/home/draft-books',
        name: 'draft-books',
        component: () => import('../views/drafts/DraftBooks'),
        beforeEnter: guardUserRoute
      },
      {
        path: '/home/books-editor',
        name: 'books-editor',
        props: true,
        component: () => import('../views/books/BooksEditor'),
        beforeEnter: guardUserRoute
      }
    ]
  },
]

function guardUserUnLogin (to, from, next) {
  const auth = store.state.auth.isLoggedIn

  if (auth) {
    next({
      name: 'home'
    })
  } else {
    next()
  }
}

function guardUserRoute (to, from, next) {
  const auth = store.state.auth.isLoggedIn

  if (!auth) {
    next({
      name: 'sign-in'
    })
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
