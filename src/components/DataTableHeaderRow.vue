<template>
    <tr class="data-table-header-row">
        <!-- sort icon's column header should be empty: -->
        <data-table-header-cell :is-sortable="false" />

        <data-table-header-cell v-for="(header, index) in headers"
                                :key="index"
                                :column-name="header.name"
                                :is-sortable="header.isSortable"
                                :last-column-sorted="lastColumnSorted"
                                @eventTableHeaderClick="handleSortByColumnClick"
        />
    </tr>
</template>


<script>
    import DataTableHeaderCell from './DataTableHeaderCell.vue';


    export default {
        name: 'DataTableHeaderRow',


        props: {
            headers: {
                type: Array,
                required: true
            }
        },


        components: {
            DataTableHeaderCell
        }
    }
</script>
