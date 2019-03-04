<template>
    <th class="data-table-header-cell" :style="stylesForTableHeaderCell">

        <span :class="cssClassesForTableHeaderLabel" @click.stop="tableHeaderClick">
            <span>{{ columnName }}</span>
            <eva-icon class="sort-icon"
                      fill="#353535"
                      v-if="isSortable"
                      name="arrow-upward-outline" />
        </span>

    </th>
</template>


<script>
    import { EvaIcon } from 'vue-eva-icons';
    import * as CONST from '../../app.constants';


    export default {
        name: 'DataTableHeaderCell',


        props: {
            isSortable: {
                type: Boolean
            },

            columnName: {
                type: String,
                required: false
            },

            lastColumnSorted: {
                type: Object
            },

            align: {
                type: String,
                required: false
            },

            width: {
                type: Number,
                required: false
            }
        },


        components: {
            [EvaIcon.name]: EvaIcon
        },


        methods: {
            tableHeaderClick() {
                if (this.isSortable === true) {
                    this.$emit('eventTableHeaderClick', this.columnName);
                }
            }
        },


        computed: {
            stylesForTableHeaderCell() {
                return {
                    'text-align': this.align,
                    'width': `${this.width}px`
                };
            },

            cssClassesForTableHeaderLabel() {
                return {
                    'data-table-header-label':              true,
                    'data-table-header-label--is-sortable': this.isSortable === true,
                    'data-table-header-label--sort-asc':    (this.lastColumnSorted !== undefined) &&
                                                            (
                                                                (this.lastColumnSorted.columnName === this.columnName) &&
                                                                (this.lastColumnSorted.direction === CONST.DATA_TABLE.SORT_ASCENDING)
                                                            ),

                    'data-table-header-label--sort-desc':   (this.lastColumnSorted !== undefined) &&
                                                            (
                                                                (this.lastColumnSorted.columnName === this.columnName) &&
                                                                (this.lastColumnSorted.direction === CONST.DATA_TABLE.SORT_DESCENDING)
                                                            )
                    };
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";
    @import "../../styles/blocks/sort-icon";
    @import "../../styles/mixins/mixins";


    .data-table-header-cell {
        @include tableCellGeometry();

        color: $font-color-bold;
        font-weight: $font-weight-bold;
        text-align: left;
    }

    .data-table-header-label {
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
