<template>
        <table class="list-table">

            <thead>
                <tr class="list-table__header-row">
                    <list-table-header-cell v-for="(header, index) in headers"
                                            :key="index"
                                            :align="header.align"
                                            :width="header.width"
                                            :header-text="header.headerText"
                                            :is-sortable="header.isSortable"
                                            :current-sort-column="currentSortColumn"
                                            :sort-direction="sortDirection"
                                            @eventTableHeaderClick="handleSortByColumnClick"
                    />
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, rowIndex) in items" :key="`tr-${rowIndex}`">
                    <slot v-bind="item" />
                </tr>

                <!-- TODO: If no data: -->
                <!--<tr class="list-table__no-data-row">-->
                    <!--<td :colspan="headers.length + 1">-->
                        <!--No Data-->
                    <!--</td>-->
                <!--</tr>-->
            </tbody>


            <!-- TODO: create separate named slot for table footer(s): -->
            <list-table-footer />
        </table>
</template>


<script>
    import * as CONST from '../../app.constants';
    import ListTableHeaderCell from './ListTableHeaderCell.vue';
    import ListTableFooter from './ListTableFooter.vue';


    export default {
        name: 'ListTable',


        props: {
            headers: {
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
            ListTableHeaderCell,
            ListTableFooter
        },


        data() {
            return {
                currentSortColumn: '',
                sortDirection: CONST.DATA_TABLE.SORT_NONE,
                sortByColumn: '',
                DATA_TABLE_COLUMNS: CONST.DATA_TABLE.COLUMNS,
            };
        },


        methods: {
            handleSortByColumnClick(columnName) {
                // if clicked column is same as previously clicked column, then toggle sort direction:
                if (this.currentSortColumn === columnName) {
                    this.sortDirection = this.toggleSortArrowDirection();
                }
                // if the clicked column is different than previous one, always ensure it is initially sorted ascending:
                else {
                    this.sortDirection = CONST.DATA_TABLE.SORT_ASCENDING;
                }

                // after asc/desc sort direction is determined, set the 'sort the column':
                // if the sort direction is 'NONE', then don't set the `sortByColumn` either, otherwise sort by the column name:
                if (this.sortDirection === CONST.DATA_TABLE.SORT_NONE) {
                    this.sortByColumn = '';
                }
                else {
                    this.sortByColumn = columnName;
                }

                // the sorted column now becomes the 'last sorted column':
                this.currentSortColumn = columnName;
            },

            toggleSortArrowDirection() {
                let newArrowDirection;

                switch (this.sortDirection) {
                    case CONST.DATA_TABLE.SORT_NONE:
                        newArrowDirection = CONST.DATA_TABLE.SORT_ASCENDING;
                        break;

                    case CONST.DATA_TABLE.SORT_ASCENDING:
                        newArrowDirection = CONST.DATA_TABLE.SORT_DESCENDING;
                        break;

                    case CONST.DATA_TABLE.SORT_DESCENDING:
                        newArrowDirection = CONST.DATA_TABLE.SORT_NONE;
                        break;

                    default:
                        newArrowDirection = CONST.DATA_TABLE.SORT_ASCENDING;
                        break;
                }

                return newArrowDirection;
            }
        },


        computed: {

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
            vertical-align: top;
        }

        // TODO: possibly need a separate component for 'header-row' and 'table-body-row'?
        &__header-row {
            background-color: $table-header-bg-color;
        }

        &__no-data-row {
            td {
                @include tableCellGeometry();

                height: 180px;
                text-align: center;
            }
        }
    }
</style>
