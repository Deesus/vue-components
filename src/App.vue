<template>
    <div id="app">

        <section>
            <h1>Button</h1>
            <app-button color="blue">Click Me</app-button>
        </section>

        <!--<section>-->
            <!--<h1>Data Table</h1>-->
            <!--<data-table :headers="tableHeaders" />-->
        <!--</section>-->

        <section>
            <h1>List Table</h1>
            <list-table :headers="tableHeaders" :items="data" />
        </section>

    </div>
</template>


<script>
    import * as CONST from './app.constants';
    import DataTable from './components/DataTable/DataTable.vue';
    import AppButton from './components/AppButton.vue';
    import ListTable from './components/ListTable/ListTable.vue';
    import { mapState, mapGetters, mapActions } from 'vuex';


    export default {
        name: 'App',


        components: {
            AppButton,
            DataTable,
            ListTable
        },


        data() {
            return {
                tableHeaders: [
                    {
                        headerText: 'Name',
                        align:      'left',
                        isSortable: true,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.NAME
                    },
                    {
                        headerText: 'Description',
                        isSortable: false,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.DESCRIPTION
                    },
                    {
                        headerText: 'Amount ($)',
                        align:      'left',
                        width:      200,
                        isSortable: true,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.AMOUNT
                    },
                    {
                        headerText: 'Date',
                        align:      'right',
                        isSortable: true,
                        fieldName:  CONST.DATA_TABLE.COLUMNS.DATE
                    }
                ]
            }
        },


        methods: {
            ...mapActions([
                'getInitialData',
                'instantiateFirebase'
            ]),
        },

        computed: {
            ...mapState([
                'tableLoading',
                'fbInstance',
                'data'
            ])
        },


        created() {
            // ---------- get data: ----------
            // since Firebase connects to a websocket, and a user can only have 1 connection to FB,
            // we should only attempt connection if one hasn't already been established:
            if (this.fbInstance === null) {
                // establish Firebase connection then get initial data:
                this.instantiateFirebase()
                    .then(() => {
                        this.getInitialData();
                    });
            }
        }
    }
</script>


<style scoped>
    #app {
        margin: 30px auto;
        max-width: 1400px;
    }
</style>
