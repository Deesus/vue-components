<template>
        <table class="list-table">

            <!-- ---------- table header: ---------- -->
            <thead>
                <tr class="list-table__header-row">
                    <list-table-header-cell v-for="(column, index) in columns"
                                            :key="index"
                                            :width="column.width"
                                            :column-name="column.name"
                                            :header-text="column.headerText"
                                            :is-sortable="column.isSortable"
                                            :sort-function="column.sortFunction"
                                            :current-sort-column="currentSortedColumn"
                                            :sort-direction="sortDirection"
                                            @eventTableHeaderClick="handleSortByColumnClick"
                    />
                </tr>
            </thead>

            <!-- ---------- table content: ---------- -->
            <tbody v-if="items.length > 0">
                <tr v-for="(item, rowIndex) in sortedItems"
                    :key="`tr-${rowIndex}`"
                >
                    <slot v-bind="item" />
                </tr>
            </tbody>

            <!-- ---------- no data: ---------- -->
            <tbody v-else>
                <tr  class="list-table__no-data-row">
                    <td :colspan="columns.length + 1">
                        No Data
                    </td>
                </tr>
            </tbody>

            <!-- TODO: create separate named slot for table footer(s) -->
        </table>
</template>


<script>
    import ListTableHeaderCell from './ListTableHeaderCell.vue';


    export default {
        name: 'ListTable',


        props: {
            columns: {
                type: Array,
                required: true,
                validator: (arr) => {
                    return arr.length > 0;
                }
            },

            items: {
                required: true
            }
        },


        components: {
            ListTableHeaderCell
        },


        data() {
            return {
                currentSortedColumn: '',
                sortFunctionToApply: null,
                sortDirection: this.SORT_NONE,

                SORT_ASCENDING: 'ASC',
                SORT_DESCENDING: 'DESC',
                SORT_NONE: 'NONE'
            };
        },


        methods: {
            handleSortByColumnClick({ columnName, sortFunction }) {
                // if clicked column is same as previously clicked column, then toggle sort direction:
                if (this.currentSortedColumn === columnName) {
                    this.sortDirection = this.toggleSortArrowDirection();
                }
                // if the clicked column is different than previous one, always ensure it is initially sorted ascending:
                else {
                    this.sortDirection = this.SORT_ASCENDING;
                }

                // after asc/desc sort direction is determined, set the 'sort the column':
                // if the sort direction is 'NONE', then don't set the `sortFunction` either, otherwise sort by the column name:
                if (this.sortDirection === this.SORT_NONE) {
                    this.sortFunctionToApply = null;
                }
                else {
                    this.sortFunctionToApply = sortFunction;
                }

                // the sorted column now becomes the 'last sorted column':
                this.currentSortedColumn = columnName;
            },

            toggleSortArrowDirection() {
                let newArrowDirection;

                switch (this.sortDirection) {
                    case this.SORT_NONE:
                        newArrowDirection = this.SORT_ASCENDING;
                        break;

                    case this.SORT_ASCENDING:
                        newArrowDirection = this.SORT_DESCENDING;
                        break;

                    case this.SORT_DESCENDING:
                        newArrowDirection = this.SORT_NONE;
                        break;

                    default:
                        newArrowDirection = this.SORT_ASCENDING;
                        break;
                }

                return newArrowDirection;
            }
        },


        computed: {
            sortedItems() {
                // initial table render doesn't have a sorted column yet, so return the list early:
                if (this.currentSortedColumn === '') {
                    return this.items;
                }

                let tableList = [...this.items];

                // default sort function (simple string sort):
                if (this.sortFunctionToApply === null) {
                    tableList = tableList
                        .sort( (row1, row2) => {
                            const val1 = row1[this.currentSortedColumn].toUpperCase();
                            const val2 = row2[this.currentSortedColumn].toUpperCase();

                            if (val1 < val2) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        });
                }
                // apply custom sort function if supplied:
                else {
                    tableList = tableList.sort(this.sortFunctionToApply);
                }

                // reverse the list if sorting in 'descending' direction:
                if (this.sortDirection === this.SORT_DESCENDING) {
                    tableList = tableList.reverse();
                }

                return tableList;
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";
    @import "../../styles/mixins/mixins";


    .list-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 0;
        margin-left: auto;
        margin-right: auto;

        tbody td {
            @include tableCellGeometry();

            border-top: $table-border;
        }

        tbody tr:not([class*="no-data-row"]):hover {
            background: #f9f9f9;
        }

        &__header-row {
            background-color: $table-header-bg-color;
        }

        &__no-data-row {
            td {
                @include tableCellGeometry();

                text-align: center;
            }
        }
    }
</style>
