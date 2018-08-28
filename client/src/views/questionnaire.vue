<template>
    <div v-if="auth.signed !== 0">
        ОПРОСНИК
        {{ filter }}
    </div>
    <div v-else>
        ДОСТУП ЗАКРЫТ
    </div>
</template>

<script>
    import Layout from '../components/class_layout';

    export default {
        extends: Layout
    }
</script>

<style scoped>

</style>
