<template>
    <widget name="scroll" wrap>
        <div slot="header">
            <v-layout justify-center class="ma-2">
                <h2 size="medium">YOUTUBE</h2>
            </v-layout>   
            <div>
                <sui-dropdown class="ui floating labeled icon dropdown button">
                    <i class="filter icon"></i>
                    <span class="text">Filter</span>
                    <sui-menu>
                        <div class="header">
                        Search Issues
                        </div>
                        <div class="ui left icon input">
                        <i class="search icon"></i>
                        <input type="text" name="search" placeholder="Search...">
                        </div>
                        <div class="header">
                        <i class="tags icon"></i>
                        Filter by tag
                        </div>
                        <div class="item">
                        <div class="ui red empty circular label"></div>
                        Important
                        </div>
                        <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                        </div>
                        <div class="item">
                        <div class="ui black empty circular label"></div>
                        Discussion
                        </div>
                    </sui-menu>
                    </sui-dropdown>

            </div>    
        </div>
        
        <v-flex v-for="n in 101" :key="n" >
            <!-- <sui-image :src="`https://placeimg.com/300/${200 + n}/nature`" /> -->
            <!-- <sui-card>
                
                <sui-embed
                
                icon="far fa-eye"
                id="90Omh7_I8vI"
                :placeholder="`https://placeimg.com/300/${200 + n}/nature`"
                source="youtube"
                />
                <sui-card-content>
                    <sui-card-header>Kristy</sui-card-header>
                    <sui-card-meta>Joined in 2013</sui-card-meta>
                    <sui-card-description>Kristy is an art director living in New York.</sui-card-description>
                    <sui-rating icon="star" :max-rating="5" :rating="rating" @rate="rating = arguments[1].rating"/>
                </sui-card-content>
                <sui-card-content extra>
                    <sui-icon name="user" />
                    22 Friends
                </sui-card-content>
                
            </sui-card> -->
            <v-card color="blue-grey darken-2" class="white--text" :width="200" hover>
                <sui-embed
                    icon="fas fa-eye embed-icon"
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
            </v-card>
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


<style>
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
