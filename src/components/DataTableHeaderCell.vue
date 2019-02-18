<template>
    <th class="data-table-header-cell">

        <span :class="tableHeaderLabelCssClasses" @click="tableHeaderClick">
            <span>{{ columnName }}</span>
            <eva-icon class="sort-icon"
                      fill="#353535"
                      v-if="isSortable"
                      name="arrow-upward-outline"
                      @click="tableHeaderClick"/>
        </span>

    </th>
</template>


<script>
    import { EvaIcon } from 'vue-eva-icons';
    import { FIREBASE } from '../app.constants';


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
            tableHeaderLabelCssClasses() {
                return {
                    'table-header-label': true,
                    'table-header-label--is-sortable': this.isSortable === true,
                    'table-header-label--sort-ascending': (this.lastColumnSorted !== undefined) &&
                                                          (
                                                            (this.lastColumnSorted.columnName === this.columnName) &&
                                                            (this.lastColumnSorted.direction === FIREBASE.SORT_ASCENDING)
                                                          ),

                    'table-header-label--sort-descending': (this.lastColumnSorted !== undefined) &&
                                                           (
                                                             (this.lastColumnSorted.columnName === this.columnName) &&
                                                             (this.lastColumnSorted.direction === FIREBASE.SORT_DESCENDING)
                                                           )
                }
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";
    @import "../styles/blocks/_sort-icon";
    @import "../styles/mixins/mixins";


    .data-table-header-cell {
        @include tableCellGeometry();

        font-weight: $font-weight-bold;
        text-align: left;
        color: $font-color-bold;
    }

    .table-header-label {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;

        &:hover {
            .sort-icon {
                opacity: 0.3;
            }
        }

        &--is-sortable {
            cursor: pointer;
        }

        &--sort-ascending {
            .sort-icon,
            &:hover .sort-icon {
                opacity: 1;
            }
        }

        &--sort-descending {

            .sort-icon,
            &:hover .sort-icon {
                opacity: 1;
                transform: rotate(180deg);
            }
        }
    }
</style>
