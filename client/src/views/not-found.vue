<template>
  <div class="not-found" :title="title">
    <h1>Not found page</h1>
  </div>
</template>

<script>
    import Layout from '../components/class_layout';
    
    export default {
        extends: Layout,
        activated() {
            this.$store.commit('NOT_FOUND');
        }
    }
</script>

<style scoped>
  .not-found h1 {
    text-align: center;
  }
</style>

