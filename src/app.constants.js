export const FIREBASE = Object.freeze({
    LIMIT_RESULTS_TO_DEFAULT_NUMBER: 25,
    // see <https://firebase.google.com/docs/reference/js/firebase.database.Reference> about Firebase ref;
    // if a res is not set on your database, the default value should be a slash: `/`
    REFERENCE_NODE: 'payments',

    // TODO: replace the api key with your own Firebase key:
    // the Firebase api key allows users to connect to the db; it's NOT a security risk that we're making it publicly visible
    API_KEY: {
        apiKey: "AIzaSyCvEqnZvO8r1X01CDyvuM2S50r2tHYFccU",
        authDomain: "vue-data-table-2c22f.firebaseapp.com",
        databaseURL: "https://vue-data-table-2c22f.firebaseio.com",
        projectId: "vue-data-table-2c22f",
        storageBucket: "vue-data-table-2c22f.appspot.com",
        messagingSenderId: "1013931864879"
    }
});
