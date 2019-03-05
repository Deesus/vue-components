// We have both named exports and default exports in order to properly mock Vuex for unit testing. See Vuex docs.

import Vue from 'vue';
import Vuex from 'vuex';

import Firebase from 'firebase/app';
import 'firebase/database';
import * as CONST from "../app.constants";
import * as ACTION from './types.actions';
import * as MUTATION from './types.mutations';

Vue.use(Vuex);



export const state = {
    fbInstance:     null,   // Firebase instance
    data:           [],     // database list of payments
    tableErrored:   false,
    tableLoading:   true
};


export const getters = {
    isTableLoading(state) {
        return state.data.length > 0
    }
};


export const mutations = {
    /**
     * Opens a new Firebase connection and sets instance to Vuex state.
     *
     * @param state
     * @param firebaseInstance
     */
    [MUTATION.INSTANTIATE_FIREBASE](state, firebaseInstance) {
        state.fbInstance = firebaseInstance;
    },

    [MUTATION.UPDATE_TABLE_DATA](state, tableData) {
        state.data = tableData;
    }
};


export const actions = {
    /**
     * Creates a new Firebase instance and saves into Vuex store.
     *
     * @param commit
     */
    [ACTION.INSTANTIATE_FIREBASE]({ commit }) {
        let fb = Firebase.initializeApp({
            apiKey:             CONST.FIREBASE.API_KEY.apiKey,
            authDomain:         CONST.FIREBASE.API_KEY.authDomain,
            databaseURL:        CONST.FIREBASE.API_KEY.databaseURL,
            projectId:          CONST.FIREBASE.API_KEY.projectId,
            storageBucket:      CONST.FIREBASE.API_KEY.storageBucket,
            messagingSenderId:  CONST.FIREBASE.API_KEY.messagingSenderId
        }).database();

        commit(MUTATION.INSTANTIATE_FIREBASE, fb);
    },

    /**
     * Gets initial data from Firebase db and saves into Vuex store.
     *
     * @param commit
     * @param state
     */
    [ACTION.GET_INITIAL_DATA]({ commit, state }) {
        let tableList = [];

        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .once('value')
            .then( (snapshot) => {
                let tableData = snapshot.val();

                // map the tableData object to an array:
                snapshot.forEach( (child) => {
                    tableList.push(child.val());
                });
                commit(MUTATION.UPDATE_TABLE_DATA, tableList);

                state.tableLoading = false;
            })
            .catch( (error) => {
                // TODO: gracefully handle error
                state.tableErrored = false;
            });
    },

    /**
     * Updates (saves) the Firebase db with an updated entry.
     *
     * @param commit
     * @param state
     * @param options {Object}: options.key {String}: The entry ID -- which the db uses as the key in the key-value store.
     *                          options.payloadObj {Object}:
     */
    [ACTION.UPDATE_ENTRY_BY_KEY]({ commit, state }, options) {

        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .child(options.key)
            .update(options.entryObj);
    }
};


// ---------- default exports: ----------
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
