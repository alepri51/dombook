<template>
    <v-container text-xs-center mt-2>
        
        
        <v-layout
        row
        align-center
        justify-center
        class="white--text"
        >
            <v-card hover class="ma-4" :width="300" to="questionnaire">
                <v-card-text class="text-lg-center">
                    <v-icon style="font-size:72px" color="accent" class="shadow">fas fa-magic</v-icon>
                </v-card-text>

                <v-card-title primary-title >
                    <div>
                        <h3 class="headline mb-0 text-lg-center" >ИСКАТЬ ПО НОВОМУ</h3>
                    </div>
                </v-card-title>

                <v-card-media
                    
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                ></v-card-media>

            </v-card>

            <v-card hover class="ma-4" :width="300" to="home">
                <v-card-text class="text-lg-center">
                    <v-icon style="font-size:72px" color="primary" class="shadow">fas fa-filter</v-icon>
                </v-card-text>

                <v-card-title primary-title >
                    <div>
                        <h3 class="headline mb-0 text-lg-center" >ИСКАТЬ ПО СТАРОМУ</h3>
                    </div>
                </v-card-title>

                <v-card-media
                    
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    height="200px"
                ></v-card-media>

            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                search_string: ''
            }
        },
        methods: {
            search() {
                console.log(this.search_string);
                this.search_string = this.search_string || 'Москва';
                this.commit('SHOW_SNACKBAR', {text: this.search_string});
                this.search_string = '';
            }
        }
    }
</script>


<style>
/* .hero-text-header {
  font-family: 'Zilla Slab', serif;
}
.hero-text-sub {
  font-family: 'Raleway', sans-serif;
}
.brand-text {
  font-weight: bold;
} */
</style>
