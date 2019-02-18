import Vue from 'vue';
import Vuex from 'vuex';

import Firebase from 'firebase/app';
import 'firebase/database';
import SECRETS_FIREBASE from '../../env.SECRETS';
import * as CONST from "../app.constants";
import * as ACTION from './types.actions';
import * as MUTATION from './types.mutations';

Vue.use(Vuex);



export const state = {
    limitResultsTo: CONST.FIREBASE.LIMIT_RESULTS_TO_DEFAULT_NUMBER,
    fbInstance: null,
    data: null
};


export const getters = {
    getFirebaseInstance(state) {
        return state.fbInstance;
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
            apiKey:             SECRETS_FIREBASE.apiKey,
            authDomain:         SECRETS_FIREBASE.authDomain,
            databaseURL:        SECRETS_FIREBASE.databaseURL,
            projectId:          SECRETS_FIREBASE.projectId,
            storageBucket:      SECRETS_FIREBASE.storageBucket,
            messagingSenderId:  SECRETS_FIREBASE.messagingSenderId
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
        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .limitToFirst(state.limitResultsTo)
            .once('value')
            .then( (snapshot) => {
                let tableData = snapshot.val();
                commit(MUTATION.UPDATE_TABLE_DATA, tableData);
            })
            .catch( (error) => {
                // TODO: gracefully handle error
            });
    },

    /**
     * Sorts and retrieves db entries by given column and ascending/descending option.
     *
     * @param commit
     * @param state
     * @param options {Object}: options.direction {String}: 'ASC' || 'DESC' for ascending or descending sort order.
     *                          options.columnName {String}: Name of data-table column to sort.
     */
    [ACTION.SORT_BY_COLUMN]({ commit, state }, options) {
        // set default direction:
        if (!options.direction) {
            options.direction = CONST.FIREBASE.SORT_ASCENDING;
        }

        let results = [];

        state.fbInstance
            .ref(CONST.FIREBASE.REFERENCE_NODE)
            .orderByChild(options.columnName)
            .once('value')
            .then( (snapshot) => {

                snapshot.forEach( (child) => {
                    results.push(child.val());
                });

                if (options.direction.toUpperCase() === CONST.FIREBASE.SORT_ASCENDING) {
                    commit(MUTATION.UPDATE_TABLE_DATA, [...results]);
                }
                else {
                    commit(MUTATION.UPDATE_TABLE_DATA, [...results].reverse());
                }
            })
            .catch( (error) => {
                // TODO: gracefully handle error; early return
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


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
