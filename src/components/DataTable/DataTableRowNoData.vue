<template>
    <tr class="data-table-row-no-data">
        <td :colspan="headers.length + 1">
            No Data
        </td>
    </tr>
</template>


<script>
    export default {
        name: 'DataTableRowNoData',


        props: {
            headers: {
                type: Array,
                required: true,
                validator: (arr) => arr.length > 0
            }
        }
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";
    @import "../../styles/mixins/mixins";


    .data-table-row-no-data {
        td {
            @include tableCellGeometry();

            height: 180px;
            text-align: center;
        }
    }
</style>
