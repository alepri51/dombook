<template>
    <!-- <div style="flex:1; position: absolute"> -->

        <div class="ui buttons">

            <div class="ui floating dropdown labeled icon top left pointing button secondary white--text" @click="open = !open" icon="filter">
                <i class="icon" :class="filterIcon"></i>
                <div class="text">{{ value }}</div>


                <div @click.stop.prevent class="menu" :style="open ? 'display: block' : 'display: none'">
                    <div v-if="search" class="ui icon search input">
                        <i class="search icon"></i>
                        <input type="text" placeholder="Search tags...">
                    </div>

                    <div v-if="search && header" class="divider"></div>

                    <div v-if="header" class="header">
                        <i class="icon" :class="headerIcon"></i>
                        {{ header }}
                    </div>

                    <slot name="content" v-bind="items">
                        <div v-if="!stepper" @click="open = multi" class="scrolling menu" :style="open ? 'display: block' : 'display: none'">
                            <div class="item" v-for="(item, inx) in items" :key="inx" @click="onSelect(inx, item)" :class="{'accent--text': !!selection[inx]}">
                                <!-- <div class="ui red empty circular label"></div> -->
                                <i class="icon" :class="item.icon || !multi ? 'fas fa-circle' : selection[inx] ? 'fas fa-check-circle' :'far fa-circle'"></i>
                                {{item.text}}
                            </div>
                        </div>
                        <div v-else class="ui mini steps unstackable">
                            <a class="step" :class="{ active: !!selection[inx] }" v-for="(item, inx) in items" :key="inx" @click="onSelect(inx, item)">
                                <!-- <i class="icon" :class="item.icon || !multi ? 'fas fa-circle' : selection[inx] ? 'fas fa-check-circle' :'far fa-circle'"></i> -->
                                <div class="content">
                                    <div class="title">{{ item.text }}</div>
                                    <div v-if="item.description" class="description">{{ item.description }}</div>
                                    <!-- <div v-else class="description">&nbsp</div> -->
                                    
                                </div>
                            </a>
                        </div>
                    </slot>
                </div>

            </div>

            <button v-if="Object.keys(selection).length" class="ui right labeled compact icon button secondary white--text clear-btn" @click="clear">
                <i class="delete icon"></i>
            </button>

        </div>
    <!-- </div> -->
</template>

<script>
    
    export default {
        props: {
            stepper: {
                type: Boolean,
                default: false
            },
            displayCount: {
                type: Number,
                default: 1
            },
            search: {
                type: Boolean,
                default: false
            },
            header: {
                type: String
            },
            headerIcon: {
                type: String,
                default: 'fas fa-circle'
            },
            filterIcon: {
                type: String,
                default: 'fas fa-filter'
            },
            label: {
                type: String,
                default: 'Выбор...'
            },
            items: {
                type: Array
            },
            multi: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                open: false,
                selection: {}
            }
        },
        computed: {
            value() {
                //debugger

                let keys = Object.keys(this.selection);
                let count = keys.length;

                let label = count > 0 && count <= this.displayCount ? keys.map(key => this.selection[key].text).toString() : count ? `выбрано: ${count}` : void 0;

                return `${this.label}${label ? ': ' + label : ''}`;
            }
        },
        created() {
            window.addEventListener('click', this.close)
        },

        beforeDestroy() {
            window.removeEventListener('click', this.close)
        },
        methods: {
            onSelect(inx, item) {
                !this.multi && (this.selection = {});

                this.selection[inx] ? this.$delete(this.selection, inx) : this.$set(this.selection, inx, item);

                this.$emit('select', this.selection);
            },
            clear() {
                this.selection = {};
                this.open = false;
            },
            toggle() {
                this.open = ! this.open
            },
            close(e) {
                if (!this.$el.contains(e.target)) {
                    this.open = false
                }
            }
        }
    }
</script>


<style scoped>
    .fas {
        font-family: "Font Awesome 5 Free"!important;
        font-weight: 600!important;
    }

    .far {
        font-family: "Font Awesome 5 Free"!important;
        font-weight: 400!important;
    }

    .ui.button {
        font-weight: initial;
    }

    .ui.button.clear-btn {
        padding: 13px!important;
    }

    .ui.steps {
        margin: 0;
    }

    .ui.steps .step.active .title {
        color: var(--accent-color)
    }

    .ui.mini.steps .step {
        padding: 1rem;
    }

    .ui.mini.steps .content .title {
        font-size: 11px!important;
        font-weight: 700!important;
        text-transform: uppercase;
    }
</style>
