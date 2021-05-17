// store/modules/foo.ts
import TutorialDataService from '../../dataservice'
// Import base classes
import { Getters, Mutations, Actions, Module } from 'vuex-smart-module'

import { defaultUser, UserInterface } from '../../interface'

// State
class UsersState {
  users: Array<any> = []
  activeUser: UserInterface = defaultUser
}

// Getters
// Extend 'Getters' class with 'FooState' type
class UsersGetters extends Getters<UsersState> {
  // You can declare both getter properties or methods
  get users() {
    // Getters instance has 'state' property
    return this.state.users
  }

  get getActiveUser() {
    return this.state.activeUser
  }
}
// Mutations
// Extend 'Mutations' class with 'FooState' type
class UsersMutations extends Mutations<UsersState> {
  setUsers(value: []) {
    // Mutations instance has 'state' property.
    // You update 'this.state' by mutating it.
    this.state.users = value
  }

  setActiveUser(value: UserInterface) {
    this.state.activeUser = value
  }
}

// Actions
// Extend 'Actions' class with other module asset types
// Note that you need to specify self action type (FooActions) as a type parameter explicitly
class UsersActions extends Actions<
  UsersState,
  UsersGetters,
  UsersMutations,
  UsersActions
> {
    async fetchUsers() {
        const users = await TutorialDataService.getAll()
        const arrayUsers = [] as any
        await users.once('value', (snapshot) => {
            snapshot.forEach(function(childSnapshot) {
                const item = childSnapshot.val()
                    item.key = childSnapshot.key
                    item.dateBirthday = new Date(item.dateBirthday)
                    item.fio = item.name + ' ' + item.surname + ' ' + item.patronymic
                    arrayUsers.push(item)
                })
        })
        this.commit('setUsers', arrayUsers)
    }

    async deleteSelectedUsers(data: any): Promise<boolean> {
        try {
            await data.forEach(user => {
                TutorialDataService.delete(user.key).then(() => {
                    return true
                })
            })
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async deleteSingleUser(data: string): Promise<boolean> {
        return await TutorialDataService.delete(data).then(() => {
            return true
        }).catch(e => {
            console.log(e)
            return false
        })
    }
}

// Create a module with module asset classes
export const users = new Module({
  state: UsersState,
  getters: UsersGetters,
  mutations: UsersMutations,
  actions: UsersActions
})
