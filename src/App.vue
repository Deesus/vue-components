<template>
    <div id="app">
        <data-table></data-table>
    </div>
</template>


<script>
    import DataTable from './components/DataTable';

    export default {
        name: 'App',

        components: {
            DataTable
        },

        data() {
            return {};
        }
    }
</script>
