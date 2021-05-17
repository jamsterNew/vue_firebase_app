// store/modules/foo.ts

// Import base classes
import { Getters, Mutations, Actions, Module } from 'vuex-smart-module'

// State
class ModalState {
  activeAddUser = false
}

// Getters
// Extend 'Getters' class with 'FooState' type
class ModalGetters extends Getters<ModalState> {
  // You can declare both getter properties or methods
  get activeAddUser() {
    // Getters instance has 'state' property
    return this.state.activeAddUser
  }
}
// Mutations
// Extend 'Mutations' class with 'FooState' type
class ModalMutations extends Mutations<ModalState> {
  setStateModal(value: boolean) {
    // Mutations instance has 'state' property.
    // You update 'this.state' by mutating it.
    this.state.activeAddUser = value
  }
}

// Actions
// Extend 'Actions' class with other module asset types
// Note that you need to specify self action type (FooActions) as a type parameter explicitly
class ModalActions extends Actions<
  ModalState,
  ModalGetters,
  ModalMutations,
  ModalActions
> {
}

// Create a module with module asset classes
export const modals = new Module({
  state: ModalState,
  getters: ModalGetters,
  mutations: ModalMutations,
  actions: ModalActions
})
