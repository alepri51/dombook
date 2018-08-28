<template>
    <widget name="календарь" >
        <v-card flat fill-height>
            <v-card-text class="pa-2">
                <v-date-picker 
                    color="secondary"
                    full-width
                    locale="ru-ru"
                    v-model="picker" 
                    :show-current="today" 
                    :landscape="landscape" 
                    :reactive="reactive" 
                    flat 
                    style="" class="elevation-0"
                    :event-color="date => date[9] % 2 ? 'red' : 'blue'"
                    :events="events"
                    :allowed-dates="allowedDates"
                    first-day-of-week="1"
                />
            </v-card-text>

            <v-divider/>

            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" @click="$emit('date-changed', void 0), picker = void 0">Сбросить</v-btn>
            </v-card-actions>
        </v-card>
    </widget>
</template>

<script>
    import Widget from './class_widget';

    export default {
        extends: Widget,
        data: () => 
        {
            let current_date = new Date();
            current_date.setTime( current_date.getTime() - current_date.getTimezoneOffset() * 60 * 1000 );

            return {
                current_date,
                today: current_date.toISOString().slice(0, 10),
                picker: void 0, //new Date().toISOString().slice(0, 10),
                landscape: false,
                reactive: true,
                events: ['2018-07-10', '2018-07-11', '2018-07-21'],
            }
        },
        created() {
            let cd = new Date();
            cd.setTime( cd.getTime() - cd.getTimezoneOffset() * 60 * 1000 );
            console.log('CURRENT DATE:', cd.toISOString().slice(0, 10));
        },
        methods: {
            allowedDates: val => true//['2018-07-10', '2018-07-11', '2018-07-21'].indexOf(val) !== -1
        },
        watch: {
            'picker': function(new_val) {
                this.$emit('date-changed', new_val);
            }
        }
    }
</script>

<style scoped>
    .v-date-picker-table__event {
        bottom: 0px!important;
    }

    .widget-caption {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .v-card {
        flex: 1;
    }
</style>

