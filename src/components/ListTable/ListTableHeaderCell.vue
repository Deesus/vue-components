<template>
    <th class="list-table-header-cell" :style="stylesForTableHeaderCell">

        <span :class="cssClassesForTableHeaderLabel" @click.stop="tableHeaderClick">
            <span>{{ headerText }}</span>
            <eva-icon class="sort-icon"
                      fill="#353535"
                      v-if="isSortable"
                      name="arrow-upward-outline" />
        </span>

    </th>
</template>


<script>
    import { EvaIcon } from 'vue-eva-icons';


    export default {
        name: 'ListTableHeaderCell',


        props: {
            // TODO: replace all these props with object?
            isSortable: {
                type: Boolean
            },

            headerText: {
                type: String,
                required: false
            },

            width: {
                type: Number,
                required: false
            },

            sortFunction: {
                type: String | Function
            },

            currentSortColumn: {
                type: String
            },

            sortDirection: {
                type: String
            },

            columnName: {
                type: String
            }
        },


        components: {
            [EvaIcon.name]: EvaIcon
        },


        // TODO: use dependency injection so that we can reuse the constants from parent component:
        data() {
            return {
                SORT_ASCENDING: 'ASC',
                SORT_DESCENDING: 'DESC',
                SORT_NONE: 'NONE'
            };
        },


        methods: {
            tableHeaderClick() {
                if (this.isSortable === true) {
                    this.$emit('eventTableHeaderClick',
                               { columnName: this.columnName, sortFunction: this.sortFunction });
                }
            }
        },


        computed: {
            stylesForTableHeaderCell() {
                return {
                    'width': `${this.width}px`
                };
            },

            cssClassesForTableHeaderLabel() {
                return {
                    'list-table-header-label':              true,
                    'list-table-header-label--is-sortable': this.isSortable === true,

                    // only apply class if the header name matches the clicked/sorted header name:
                    'list-table-header-label--sort-asc':    (this.currentSortColumn === this.columnName) &&
                                                            (this.sortDirection === this.SORT_ASCENDING),

                    // only apply class if the header name matches the clicked/sorted header name:
                    'list-table-header-label--sort-desc':   (this.currentSortColumn === this.columnName) &&
                                                            (this.sortDirection === this.SORT_DESCENDING)
                    };
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";
    @import "../../styles/blocks/sort-icon";
    @import "../../styles/mixins/mixins";


    .list-table-header-cell {
        @include tableCellGeometry();

        color: $font-color-bold;
        font-weight: $font-weight-bold;
        text-align: left;
        border-top: $table-border;
    }

    .list-table-header-label {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;

        &:hover {
            .sort-icon {
                opacity: 0.3;
            }
        }

        // ---------- modifiers: ----------
        &--is-sortable {
            cursor: pointer;
        }

        &--sort-asc {
            .sort-icon,
            &:hover .sort-icon {
                opacity: 1;
            }
        }

        &--sort-desc {
            .sort-icon,
            &:hover .sort-icon {
                opacity: 1;
                transform: rotate(180deg);
            }
        }
    }
</style>
