<template>
    <div>
        <h1 class="title">Пользователи</h1>
        <div v-if="users.length" class="if-exist mb-5 box">
                <b-table class="table" default-sort="user.fio" default-sort-direction="asc" checkable :checked-rows.sync="selected" focusable :bordered="false" :data="users" >
                    <b-table-column  width="200" :sticky="true" field="fio" label="ФИО" v-slot="props">
                       {{props.row.fio}}
                    </b-table-column>
                    <b-table-column  field="dateBirthday" label="Дата рождения" v-slot="props">
                      {{formatDate(props.row.dateBirthday)}}
                    </b-table-column>
                    <b-table-column field="bornplace" label="Место рождения" v-slot="props">
                      {{props.row.bornplace}}
                    </b-table-column>
                    <b-table-column field="email" label="E-mail" v-slot="props">
                      {{props.row.email}}
                    </b-table-column>
                    <b-table-column width="280" field="phone" label="Телефон" v-slot="props">
                       {{props.row.phone}}
                    </b-table-column>
                    <b-table-column field="datereg" label="Зарегистрирован" v-slot="props">
                       {{props.row.datereg}}
                    </b-table-column>
                    <b-table-column  width="200" field="lastvisit" label="Изменен" v-slot="props">
                       <span v-if="props.row.lastvisit">   {{props.row.lastvisit}} </span>
                       <span v-else> &#8212; </span>
                    </b-table-column>
                    <b-table-column field="delete" label="" v-slot="props">
                        <b-button
                            label="Изменить"
                            type="is-warning"
                            size="is-small"
                            class="mr-2"
                            @click="editOneUser(props.row.key)"
                        />
                    </b-table-column>
                    <b-table-column field="edit" label="" v-slot="props">
                        <b-button
                            label="Удалить"
                            type="is-danger"
                            size="is-small"
                            @click="deleteOneUser(props.row.key)" />
                    </b-table-column>
            </b-table>
        </div>
        <div v-else class="if-not-exist box">
            <h2 class="mb-2">Добавленных пользователей не найдено</h2>
            <b-button @click="addNewUser" size="is-medium" class="mt-2" icon-left="account-check-outline">
                Добавить пользователя
            </b-button>
        </div>
        <div class="box" v-if="users.length">
            <b-button v-if="selected.length" @click="removeSelectedUsers" size="is-small" class="mt-5 ml-2" icon-left="account-check-outline">
                Удалить выбранных пользователей
            </b-button>
            <b-button @click="removeAllUsers" size="is-small" class="mt-5 ml-2" icon-left="account-check-outline">
                Удалить всех пользователей
            </b-button>
        </div>
        <AddUserModal/>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Provide } from 'vue-property-decorator'
import AddUserModal from './AddUserModal.vue'
import TutorialDataService from '../dataservice'
import { defaultUser, UserInterface } from '@/interface'
import format from 'date-fns/format'
// import format from 'date-fns/format'
// const user: UserInterface = defaultUser

@Component({
  components: {
    AddUserModal
  }
})
export default class UsersList extends Vue {
    selected: []
    sortIcon: string
    sortIconSize: string
    userEdit: any

    constructor() {
        super()
        this.selected = []
        this.sortIcon = 'arrow-up'
        this.sortIconSize = 'is-small'
    }

    @Provide() columns = [
        {
            field: 'fio',
            label: 'ФИО'
        },
        {
            field: 'dateBirthday',
            label: 'Дата рождения'
        },
        {
            field: 'bornplace',
            label: 'Место рождения'
        },
        {
            field: 'email',
            label: 'Почта'
        },
        {
            field: 'phone',
            label: 'Номер телефона'
        },
        {
            field: 'datereg',
            label: 'Дата регистрации'
        },
        {
            field: 'lastvisit',
            label: 'Последнее посещение'
        },
        {
            field: 'delete',
            label: '',
            width: '40',
            icon: 'delete'
        },
        {
            field: 'edit',
            label: '',
            width: '40',
            icon: 'edit'
        }
    ]

    // getter
    get users(): [] {
        return this.$store.state.users.users
    }

    // getter
    get modalStatus(): [] {
        return this.$store.state.modals.activeAddUser
    }

    // getter
    get activeUser(): UserInterface {
        return this.$store.state.users.getActiveUser
    }

    // open modal to add a single user
    addNewUser(): void {
        this.$store.commit('users/setActiveUser', defaultUser)
        this.openAddModal()
    }

    // open modal
    openAddModal(): void {
        this.$store.commit('modals/setStateModal', true)
    }

    // format date style
    formatDate(date: any) {
        return format(date, 'dd/MM/yyyy')
    }

    // delete single user
    deleteOneUser(key: string): void {
        this.$buefy.dialog.confirm({
            title: 'Удаление пользователя',
            message: 'Вы уверены что хотите <b>удалить</b> пользователя ? Действие отменить невозможно.',
            confirmText: 'Удалить',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: async () => {
                const resultDelete = await this.$store.dispatch('users/deleteSingleUser', key)
                if (resultDelete === true) {
                    this.$buefy.toast.open('Пользователь удалён!')
                    await this.$store.dispatch('users/fetchUsers')
                }
            }
        })
    }

    // edit single user
    editOneUser(key): void {
        const users: any[] = this.users
        const userToEdit = { ...users.find(el => el.key === key) }
        this.$store.commit('users/setActiveUser', userToEdit)
        this.openAddModal()
    }

    // get all users
    async mounted(): Promise<void> {
        await this.$store.dispatch('users/fetchUsers')
    }

    // remove user
    async removeSelectedUsers(): Promise<void> {
        this.$buefy.dialog.confirm({
            title: 'Удаление пользователей',
            message: 'Вы уверены что хотите <b>удалить</b> выбранных пользователей ? Действие отменить невозможно.',
            confirmText: 'Удалить',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: async () => {
                const resultDelete = await this.$store.dispatch('users/deleteSelectedUsers', this.selected)
                if (resultDelete === true) {
                    this.$buefy.toast.open('Пользователи удалены!')
                    await this.$store.dispatch('users/fetchUsers')
                }
            }
        })
    }

    // remove all users
    async removeAllUsers(): Promise<void> {
         this.$buefy.dialog.confirm({
            title: 'Удаление пользователей',
            message: 'Вы уверены что хотите <b>удалить</b> всех пользователей ? Действие отменить невозможно.',
            confirmText: 'Удалить',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: async () => {
                await TutorialDataService.deleteAll().then(() => {
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: 'Пользователи успешно удалены',
                        position: 'is-top',
                        type: 'is-success'
                    })
                })
                await this.$store.dispatch('users/fetchUsers')
            }
        })
     }
    }
</script>

<style scoped>
    /* .table {
        overflow-x: scroll;
    } */
</style>
