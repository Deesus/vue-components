<template>
    <div id="app">

        <section>
            <h1>Button</h1>
            <app-button color="blue">Click Me</app-button>
        </section>


        <section>
            <h1>List Table</h1>

            <list-table :columns="columns" :items="data">
                <template scope="item">
                    <td>
                        {{ item.Name }}
                    </td>
                    <td>
                        {{ item.Description }}
                    </td>
                    <td>
                        {{ item.Amount }}
                    </td>
                    <td>
                        {{ item.Date | formatISOTimeToMonthDayYearHourMinutesMeridiem }}
                        <span class="badge" v-if="isUpcomingDueDate(item.Date)">Upcoming</span>
                    </td>
                </template>
            </list-table>
        </section>

    </div>
</template>


<script>
    import AppButton from './components/AppButton.vue';
    import ListTable from './components/ListTable/ListTable.vue';
    import { mapState, mapGetters, mapActions } from 'vuex';
    import moment from 'moment';
    import { formatISOTimeToMonthDayYearHourMinutesMeridiem } from './utils/filters';


    export default {
        name: 'App',


        components: {
            AppButton,
            ListTable
        },


        filters: {
            formatISOTimeToMonthDayYearHourMinutesMeridiem,
        },


        data() {
            return {
                columns: [
                    {
                        name:       'Name',
                        headerText: 'Name',
                        isSortable: true,
                    },
                    {
                        name:       'Description',
                        headerText: 'User Description',
                        isSortable: false,
                    },
                    {
                        name:         'Amount',
                        headerText:   'Amount ($)',
                        width:        200,
                        isSortable:   true,
                        sortFunction: this.sortByAmount,
                    },
                    {
                        name:         'Date',
                        headerText:   'Date',
                        isSortable:   true,
                        sortFunction: this.sortByDate
                    }
                ]
            }
        },


        methods: {
            ...mapActions([
                'getInitialData',
                'instantiateFirebase'
            ]),

            sortByAmount(row1, row2) {
                const val1 = parseFloat(row1['Amount']);
                const val2 = parseFloat(row2['Amount']);

                return val1 - val2;
            },

            sortByDate(row1, row2) {
                const val1 = moment(row1['Date']);
                const val2 = moment(row2['Date']);

                return val1 - val2;
            },

            isUpcomingDueDate(date) {
                const today = moment();
                return moment(date).isAfter(today);
            }
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


<style scoped lang="scss">
    #app {
        margin: 30px auto;
        max-width: 1400px;
    }

    /* TODO: convert to vue component: */
    .badge {
        display: inline-block;
        padding: 4px 6px;
        border-radius: 4px;
        color: white;
        background: #ffbd40;
    }
</style>
