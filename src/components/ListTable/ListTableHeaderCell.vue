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
    import * as CONST from '../../app.constants';


    export default {
        name: 'ListTableHeaderCell',


        props: {
            isSortable: {
                type: Boolean
            },

            headerText: {
                type: String,
                required: false
            },

            lastColumnSortedName: {
                type: String
            },

            sortDirection: {
                type: String
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
                    this.$emit('eventTableHeaderClick', this.headerText);
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
                    'list-table-header-label':              true,
                    'list-table-header-label--is-sortable': this.isSortable === true,
                    'list-table-header-label--sort-asc':    (this.lastColumnSortedName === this.headerText) &&
                                                            (this.sortDirection === CONST.DATA_TABLE.SORT_ASCENDING),

                    'list-table-header-label--sort-desc':   (this.lastColumnSortedName === this.headerText) &&
                                                            (this.sortDirection === CONST.DATA_TABLE.SORT_DESCENDING)
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
