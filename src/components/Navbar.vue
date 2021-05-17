<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo-firebase.svg"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Главная
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a @click="openModal" class="button is-primary">
                        <strong> Добавить пользователя </strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
    openModal(): void {
        this.$store.commit('modals/setStateModal', true)
    }
}

</script>

<style scoped lang="scss">
</style>
