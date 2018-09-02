<template>
  <v-toolbar app color="primary" tabs flat>
    <v-icon large color="background shadow">fab fa-empire</v-icon>
        
    <v-toolbar-title class="toolbar-title">
      <span class="background--text">dombook.ru</span>
    </v-toolbar-title>

    <v-tabs v-if="authenticated && menu" slot="default"
        class="ml-2"
        v-model="active"
        slider-color="accent"
        color="primary"
    >
      <v-tab
        class="background--text"
        v-for="item in menu"
        :key="item.to"
        ripple
        :to="item.to"
      >
        <v-icon v-if="item.icon" small color="background" class="mr-1">{{ item.icon }}</v-icon>
        {{ item.name }}

      </v-tab>
    </v-tabs>

    <v-spacer/>

    <v-toolbar-items v-if="!state.loading && !authenticated">
        <v-btn flat @click="commit('SHOW_MODAL', { signup: void 0 })" color="background">
            <v-icon small class="mr-1">far fa-user-circle</v-icon>РЕГИСТРАЦИЯ
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="authenticated">
        <v-btn flat replace to="account"  color="background" >
            <v-icon small class="mr-1">fas {{ auth.signed === 1 ? 'fa-user-circle' : 'fa-user-secret'}}</v-icon>
            <!-- <v-icon small class="mr-1" :class="{ 'red--text': auth.signed !== 1 }">fas {{ auth.signed === 1 ? 'fa-user-circle' : 'fa-user-secret'}}</v-icon> -->
            {{ auth.email || 'Аноним' }}
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="authenticated">
        <v-btn flat @click="commit('SHOW_MODAL', { signout: void 0 })" color="background">
            Выход<v-icon small class="ml-1">fas fa-sign-out-alt</v-icon>
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="!state.loading && auth && auth.signed !== 1">
        <v-btn flat @click="commit('SHOW_MODAL', { signin: void 0 })" color="background">
            <v-icon small class="mr-1">fas fa-sign-in-alt</v-icon>Войти
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
