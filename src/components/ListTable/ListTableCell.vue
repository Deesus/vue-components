<template>
    <td class="list-table-cell">{{ content }}</td>
</template>


<script>
    export default {
        name: 'ListTableCell',


        props: {
            id: {
                required: false
            },

            content: {
                // type: String,
                required: false
            }
        }
    };
</script>


<style scoped lang="scss">
    @import "../../styles/base/constants";
    @import "../../styles/mixins/mixins";


    .list-table-cell {
        @include tableCellGeometry();

        border-top: $table-border;
        vertical-align: top;
    }
</style>
