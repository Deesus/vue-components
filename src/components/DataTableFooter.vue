<template>
    <tfoot class="data-table-footer">
        <tr>

        </tr>
    </tfoot>
</template>


<script>
    export default {
        name: 'DataTableFooter',


        data() {
            return {};
        },


        methods: {}
    }
</script>


<style scoped lang="scss">
    @import "../styles/base/constants";


    .data-table-footer {
        border: $table-border;
        height: $table-row-height;
        background: $table-header-bg-color;
    }
</style>
