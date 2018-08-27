<template>
  <v-toolbar app>
    <v-icon large class="primary--text">fas fa-home</v-icon>
        
    <v-toolbar-title class="toolbar-title">
      <span>ВСЕ</span>
      <span class="secondary--text">Новостройки</span>
    </v-toolbar-title>

    <v-tabs v-if="menu"
        class="ml-2"
        v-model="active"
        slider-color="secondary"
    >
      <v-tab
        class="primary--text"
        v-for="item in menu"
        :key="item.to"
        ripple
        :to="item.to"
      >
        <v-icon v-if="item.icon" small color="primary" class="mr-1">{{ item.icon }}</v-icon>
        {{ item.name }}

      </v-tab>
    </v-tabs>

    <v-spacer/>

    <v-toolbar-items v-if="!authenticated">
        <v-btn flat @click="commit('SHOW_MODAL', { signup: void 0 })" color="primary">
            <v-icon small class="mr-1">far fa-user-circle</v-icon>РЕГИСТРАЦИЯ
        </v-btn>

        <v-btn flat @click="commit('SHOW_MODAL', { signin: void 0 })" color="primary">
            <v-icon small class="mr-1">fas fa-sign-in-alt</v-icon>Войти
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="authenticated">
        <v-btn flat replace to="account"  color="primary" >
            <v-icon small class="mr-1" :class="{ 'red--text': auth.signed !== 1 }">fas {{ auth.signed === 1 ? 'fa-user-circle' : 'fa-user-secret'}}</v-icon>
            {{ auth.email || 'Аноним' }}
        </v-btn>

        <v-btn flat @click="commit('SHOW_MODAL', { signout: void 0 })" color="primary">
            Выход<v-icon small class="ml-1">fas fa-sign-out-alt</v-icon>
        </v-btn>
    </v-toolbar-items>

    <signin/>
    <signup/>
    <signout/>
  </v-toolbar>
</template>

<script>
    import Base from './class_base';

    export default {
        extends: Base,
        props: ['menu'],
        components: {
            signin: () => import('./modals/signin'),
            signup: () => import('./modals/signup'),
            signout: () => import('./modals/signout')
        },
        data() {
            return {
                active: void 0
            }
        }
    }
</script>

<style scoped>
    .toolbar-title {
        overflow: unset;
    }
</style>
