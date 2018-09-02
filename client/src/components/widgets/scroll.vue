<template>
    <widget name="" wrap justify-center flat :height="'50vh'">
        <div slot="header">
            <v-layout justify-center class="ma-2">
                <h2 size="medium">РЕКОМЕНДУЕМ</h2>
            </v-layout>   
            <div>
                

            </div>    
        </div>
        <v-divider slot="divider" class="mb-4"/>
        <v-flex v-for="n in 4" :key="n" style="max-width: 250px">
            <v-card color="blue-grey darken-2" class="white--text" :width="200" hover>
            <sui-card>
                <sui-embed
                    icon="fas fa-film embed-icon"
                    id="90Omh7_I8vI"
                    :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                    source="youtube"
                    :iframe="{allowFullScreen: true }"
                />
                <!-- <sui-image src="static/images/avatar/large/matthew.png" /> -->
                <sui-card-content>
                <sui-card-header>Matt Giampietro</sui-card-header>
                <sui-card-meta>Friends</sui-card-meta>
                <sui-card-description>
                    Matthew is an interior designer living in New York.
                </sui-card-description>
                </sui-card-content>
                <sui-card-content extra>
                <sui-icon name="user" /> 75 Friends
                <span slot="right">Joined in 2013</span>
                </sui-card-content>
            </sui-card>
            </v-card>
            <!-- <v-card color="blue-grey darken-2" class="white--text" :width="200" hover>
                <sui-embed
                    icon="fas fa-film embed-icon"
                    id="90Omh7_I8vI"
                    :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                    source="youtube"
                    :iframe="{allowFullScreen: true }"
                />
                
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card> -->
        </v-flex>
    </widget>
</template>

<script>
    import Widget from './class_widget';
    
    export default {
        extends: Widget,
        data: () => ({
            rating: 4
        }),
        methods: {
            onScroll() {
                //this.offsetTop = e.target.scrollTop
                console.log('SCROLLING');
            }
        }
    }
</script>


<style scoped>
    .v-card, .ui.card {
        margin: auto;
    }

    .embed-icon {
        font-family: "Font Awesome 5 Free"!important;
    }

    .embed-icon::before {
        font-size: 4rem!important;
    }
</style>
