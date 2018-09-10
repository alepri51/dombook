<template>
    <widget name="" class="elevation-0 pa-2">
        <div slot="header">
            <h3>ПАРАМЕТРЫ ПОИСКА</h3>
                    <!-- <vue-slider ref="slider" v-model="value" :min="0" :max="100" process-dragable :fixed="fixed" @drag-end="onDragStart"></vue-slider> -->
        </div>

        <div style="flex:1; position: absolute">
            <dropdown-filter 
                @select="onFilterChanged"
                :name="'price'"
                @toggle="onOpen" 
                class="pa-1" 
                :label="label" 
                :header="`Бюджет покупки: от ${(value[0] / 1000000).toFixed(2)} до ${(value[1] / 1000000).toFixed(2)} млн`" 
                header-icon="fas fa-ruble-sign"
                filter-icon="fas fa-funnel-dollar" 
                :items="languages" 
                @clear="onClear">
                
                <div slot="divider" class="divider"></div>
                <div slot="content" slot-scope="{ items, onSelect }">
                    <vue-slider v-if="so" 
                        :dot-size="8" 
                        :height="4" 
                        v-model="value" 
                        :min="min" 
                        :max="max" 
                        process-dragable 
                        :width="550" 
                        @callback="onChange(arguments[0], onSelect)" 
                        piecewise-label
                        :piecewise="false"
                        :interval="100000"
                        :tooltipDir="[
                            'bottom',
                            'bottom'
                        ]"
                        :process-style="{
                            'backgroundColor': 'var(--accent-color)',
                        }"
                        :tooltipStyle="[
                            {
                                'backgroundColor': '#f05b72',
                                'borderColor': '#f05b72'
                            },
                            {
                                'backgroundColor': '#3498db',
                                'borderColor': '#3498db'
                            }
                        ]"
                        :tooltip-merge="false"
                        style="margin: 32px 56px 36px 48px">
                        
                        
                        <div slot="tooltip" 
                            slot-scope="{ value, index }" 
                            class="accent" 
                            style="font-size: 11px; padding: 2px 4px 2px 4px; position: absolute"
                            :style="index === 0 && 'right: 50%; position: absolute'"
                            >
                            
                            {{ `${value && (value / 1000000).toFixed(2)} млн` }}
                        </div>
                        
                        <span slot="label" 
                            v-if="label % 5000000 === 0"
                            slot-scope="{ label, active }" 
                            class="" 
                            style="font-size: 11px; top: -20px; position: absolute; color: #888">
                            {{ `${label && (label / 1000000)} млн` }}
                        </span>
                    </vue-slider>
                </div>
            </dropdown-filter>

            <dropdown-filter @select="onFilterChanged" :name="'rooms'" class="pa-1" label="Комнатность" header="Количество комнат" stepper :items="rooms"/>
            <dropdown-filter @select="onFilterChanged" :name="'types'" class="pa-1" label="Тип лота" header="Что ищем ?" multi :items="lotTypes" :display-count="1"/>
            <!-- <dropdown-filter @select="onFilterChanged" :name="'lotType'" class="pa-1" label="Тип лота" header="Что ищем ?" :items="lotTypes" :display-count="2"/> -->

            <!-- <br> -->
            <div class="mt-2">
                <dropdown-filter :name="'sort'" class="secondary--text pa-1" multi inline :selected-index="0" label="Сортировка" header="параметры сортировки" filter-icon="fas fa-sort" :items="sort" :display-count="2"/>
                <dropdown-filter :name="'sort1'" class="secondary--text pa-1" inline :selected-index="0" label="Сортировка" header="параметры сортировки" filter-icon="fas fa-sort" :items="sort"/>
            </div>
        </div>
    </widget>
</template>

<script>
    import Widget from './class_widget';
    import dropdownFilter from '../elements/filter';
    //import vueSlider from 'vue-slider-component';
    import vueSlider from '../elements/slider';
    
    export default {
        extends: Widget,
        components: {
            dropdownFilter,
            vueSlider
        },
        methods: {
            onClear() {
                this.value = this.init_value;
                this.label = `Бюджет: ${(this.value[0] / 1000000).toFixed(2)} - ${(this.value[1] / 1000000).toFixed(2)}`;
            },
            onFilterChanged(value) {
                //debugger;
                if(value.price) {
                    value = value.price[0];
                    value.price = value.range;
                    delete value.range;
                }

                /* if(value.types) {
                    value.types = Object.entries(value.types).reduce((memo, entry) => {
                        let [key, value] = entry;

                        memo.push(value.text);
                        return memo;
                    }, []);
                } */

                Object.assign(this.filters, value);
                console.log('FILTERS', this.filters);

                this.filters.price && (this.label = `Бюджет: ${(this.filters.price[0] / 1000000).toFixed(2)} - ${(this.filters.price[1] / 1000000).toFixed(2)}`);

                this.execute({ endpoint: 'home', payload: this.filters, method: 'post' });
            },
            onOpen(open) {
                this.so = open;
            },
            onChange(context, onSelect) {
                //console.log(context.currentSlider);
                let [min, max] = context.currentValue;
                let restrict = max - min > 5000000;
                if(restrict) {
                    context.currentSlider === 1 && context.setValue([max - 5000000, max]);
                    context.currentSlider === 0 && context.setValue([min, min + 5000000]);
                }
                else {
                    if(onSelect) {
                        this.timer && clearTimeout(this.timer);

                        this.timer = setTimeout(() => {
                            this.timer = void 0;

                            onSelect(0, { range: this.value });
                        }, 1000);
                    }
                }
            }
        },
        watch: {
            
        },
        mounted() {
            //this.$refs.slider.refresh();
            //this.max = 1000;
        },
        data() {
            return {
                timer: void 0,
                filters: {},
                init_value: [
                    5000000,
                    10000000
                ],
                label: `Бюджет: ${(5000000 / 1000000).toFixed(2)} - ${(10000000 / 1000000).toFixed(2)}`,
                so: false,
                fixed: false,
                min: 0,
                max: 30000000,
                value: [
                    5000000,
                    10000000
                ],
                show: {
                    '1': false,
                    '2': false
                },
                current: null,
                languages: [
                    { key: 'Arabic', text: 'Arabic', value: 'Arabic' },
                    { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
                    { key: 'Danish', text: 'Danish', value: 'Danish' },
                    { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
                    { key: 'English', text: 'English', value: 'English' },
                    { key: 'French', text: 'French', value: 'French' },
                    { key: 'German', text: 'German', value: 'German' },
                    { key: 'Greek', text: 'Greek', value: 'Greek' },
                    { key: 'Hungarian', text: 'Hungarian', value: 'Hungarian' },
                    { key: 'Italian', text: 'Italian', value: 'Italian' },
                    { key: 'Japanese', text: 'Japanese', value: 'Japanese' },
                    { key: 'Korean', text: 'Korean', value: 'Korean' },
                    { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
                    { key: 'Persian', text: 'Persian', value: 'Persian' },
                    { key: 'Polish', text: 'Polish', value: 'Polish' },
                    { key: 'Portuguese', text: 'Portuguese', value: 'Portuguese' },
                    { key: 'Russian', text: 'Russian', value: 'Russian' },
                    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
                    { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
                    { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
                    { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
                ],
                rooms: [
                    { text: 'Студия+' },
                    { text: '1+' },
                    { text: '2+' },
                    { text: '3+' },
                    { text: '4+' },
                    { text: 'СП+' },
                ],
                lotTypes: [
                    { text: 'Квартира' },
                    { text: 'Апартаменты' },
                    { text: 'Машиноместо' },
                    { text: 'Кладовка' }
                ],
                sort: [
                    { text: 'по дате' },
                    { text: 'по стоимости' },
                    { text: 'по площади' },
                    { text: 'по плюшкам' }
                ],

            };
        },
    }
</script>


<style scoped>
</style>
