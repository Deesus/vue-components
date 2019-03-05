<template>
    <tfoot class="list-table-footer">
        <tr>

        </tr>
    </tfoot>
</template>


<script>
    export default {
        name: 'ListTableFooter',


        data() {
            return {};
        },


        methods: {}
    }
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";


    .list-table-footer {
        border: $table-border;
        height: $table-row-height;
        background: $table-header-bg-color;
    }
</style>
