<template>
    <widget name="scroll" wrap>
        <div slot="header">HELLO</div>
        
        
        
        <v-flex v-for="n in 101" :key="n" >
            <v-card color="blue-grey darken-2" class="white--text" :width="200" hover>
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
    //debugger;
    //console.log(SuiVue);
    
    export default {
        extends: Widget,
        
        methods: {
            onScroll() {
                //this.offsetTop = e.target.scrollTop
                console.log('SCROLLING');
            }
        }
    }
</script>


<style scoped>
    .v-card {
        margin: auto;
    }
</style>
