<template>
    <section>
        <b-modal :active="isActive" :on-cancel="closeModal" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                    <ValidationObserver ref="observer" v-slot="{ invalid }">
                          <form @submit.prevent="onSubmit">
                            <ValidationProvider rules="min:2|required" name="username"  v-slot="{ errors, valid }">
                                    <b-field
                                        label="Имя"
                                        :message="errors"
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                    >
                                        <b-input
                                            type="text"
                                            v-model="user.name"
                                            placeholder="Ваше имя">
                                        </b-input>
                                    </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="min:2|required" name="surname"  v-slot="{ errors, valid }">
                                <b-field
                                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                    :message="errors"
                                    label="Фамилия">
                                    <b-input
                                        type="text"
                                        v-model="user.surname"
                                        placeholder="Ваша фамилия">
                                        reu
                                    </b-input>
                                </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="min:2|required" name="patronymic"  v-slot="{ errors, valid }">
                                <b-field
                                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                    :message="errors"
                                    label="Отчество">
                                    <b-input
                                        type="text"
                                        v-model="user.patronymic"
                                        placeholder="Ваше отчество">
                                    </b-input>
                                </b-field>
                            </ValidationProvider>
                            <ValidationProvider rules="required" name="dateBirthday"  v-slot="{ errors, valid }">
                                <b-field
                                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                    :message="errors"
                                    label="Дата рождения">
                                    <b-datepicker
                                        placeholder="Нажмите для выбора..."
                                        v-model="user.dateBirthday">
                                    </b-datepicker>
                                </b-field>
                             </ValidationProvider>
                             <ValidationProvider rules="required" name="bornplace"  v-slot="{ errors, valid }">
                                <b-field
                                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                    :message="errors"
                                    label="Место рождения">
                                    <b-input
                                        type="text"
                                        v-model="user.bornplace"
                                        placeholder="Введите место рождения">
                                    </b-input>
                                </b-field>
                               </ValidationProvider>
                               <ValidationProvider rules="required|email" name="email"  v-slot="{ errors, valid }">
                                <b-field
                                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                    :message="errors"
                                    label="Почта">
                                    <b-input
                                        type="email"
                                        v-model="user.email"
                                        placeholder="Ваша почта">
                                    </b-input>
                                </b-field>
                                </ValidationProvider>
                                <ValidationProvider  rules="phone:19|required" name="phone"  v-slot="{ errors, valid }">
                                    <b-field
                                        :type="{ 'is-danger': errors[0], 'is-success': valid }"
                                        :message="errors"
                                        label="Номер телефона">
                                        <b-input
                                            type="text"
                                            v-model="user.phone"
                                            v-mask="'+8 (###) ### ### ##'"
                                            placeholder="Ваш номер телефона">
                                        </b-input>
                                    </b-field>
                                </ValidationProvider>
                                <button :disabled="invalid" type="submit" class="button is-success mt-3">
                                    <span class="icon is-small">
                                        <i class="fas fa-check"></i>
                                    </span>
                                    <span v-if="!user.key"> Отправить</span>
                                    <span v-if="user.key"> Изменить</span>
                                </button>
                          </form>
                    </ValidationObserver>
                    </div>
                </div>
            </div>
        </b-modal>
    </section>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from '../../node_modules/vee-validate'
import { mask } from 'vue-the-mask'
import TutorialDataService from '../dataservice'
import { format } from 'date-fns'
import { defaultUser, UserInterface } from '../interface'

@Component({
    components: { ValidationProvider, ValidationObserver },
    directives: { mask }
})
export default class extends Vue {
    minDate: string | Date
    maxDate: string | Date

    constructor() {
        super()
        this.minDate = new Date()
        this.maxDate = new Date()
    }

    $refs!: {
        observer: InstanceType<typeof ValidationObserver>;
    };

    get isActive(): boolean {
        return this.$store.state.modals.activeAddUser
    }

    get user(): UserInterface {
        return { ...this.$store.getters['users/getActiveUser'] }
    }

    closeModal(): void {
        this.$store.commit('modals/setStateModal', false)
        this.$store.commit('users/setActiveUser', defaultUser)
    }

    async addNew() {
         const user = await { ...this.user }
         user.datereg = await format(new Date(), 'dd/MM/yyyy')
         user.dateBirthday = await format(this.user.dateBirthday, 'dd/MM/yyyy')
         await TutorialDataService.create(user).then(() => {
            this.closeModal()
            this.$buefy.toast.open({
                duration: 5000,
                message: 'Пользователь успешно добавлен',
                position: 'is-top',
                type: 'is-success'
            })
        }).catch(e => {
            console.log(e)
            this.closeModal()
            this.$buefy.toast.open({
                duration: 5000,
                message: 'Произошла ошибка',
                position: 'is-top',
                type: 'is-danger'
            })
        })
        await this.$store.commit('modals/setStateModal', false)
        await this.$store.dispatch('users/fetchUsers')
    }

    async editExist() {
        const user = { ...this.user }
        user.lastvisit = await format(new Date(), 'dd/MM/yyyy hh:mm')
        await TutorialDataService.update(this.user.key, user).then(() => {
            this.$store.commit('users/setActiveUser', defaultUser)
            this.$buefy.toast.open({
                duration: 5000,
                message: 'Пользователь успешно изменён',
                position: 'is-top',
                type: 'is-success'
            })
        })
        await this.$store.commit('modals/setStateModal', false)
        await this.$store.dispatch('users/fetchUsers')
    }

    async onSubmit(): Promise<void> {
         if (this.user.key) {
             return await this.editExist()
         }
         if (!this.user.key) {
             return this.addNew()
         }
    }
}

</script>
