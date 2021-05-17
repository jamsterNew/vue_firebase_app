// store/index.ts
import Vue from 'vue'
import * as Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { modals } from './modules/modals'
import { users } from './modules/users'

Vue.use(Vuex)
// The 1st argument is root module.
// Vuex store options should be passed to the 2nd argument.

// Root module
const root = new Module({
  modules: {
    modals,
    users
  }
})

export const store = createStore(
  // Root module
  root,
  // Vuex store options
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)
