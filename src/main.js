import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

// socket IO

// vuex
import store from './store'

// firebase
import firebase from 'firebase';

require("firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyA6DxHECxq5JENko95YbeUJH6ZLoQc8yjQ",
  authDomain: "simplex-ced4e.firebaseapp.com",
  databaseURL: "https://simplex-ced4e.firebaseio.com",
  projectId: "simplex-ced4e",
  storageBucket: "simplex-ced4e.appspot.com",
  messagingSenderId: "899938723722",
  appId: "1:899938723722:web:a5843e4ee7eccad8c78a73"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')



export default db;
