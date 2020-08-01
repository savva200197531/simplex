import firebase from 'firebase';
import db from '@/main'

// import router from '@/router';

const state = {
  userDetails: {},
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  }
}
const actions = {
  authUser(userInfo, payload) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth().signInWithPopup(provider).then(result => {
      console.log(result)
      let userId = firebase.auth().currentUser.uid
      db.ref(`users/` + userId).set({
        name: payload.name,
        email: firebase.auth().currentUser.email,
        online: true
      })
    }).catch(error => {
      console.error(error)
    });
  },
  logoutUser() {
    firebase.auth().signOut();
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let userId = firebase.auth().currentUser.uid
        db.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId,
          })
        })
        dispatch('fireBaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        this.$router.push('/')
      } else {
        dispatch('fireBaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    })
  },
  fireBaseUpdateUser(object, payload) {
    db.ref('users/' + payload.userId).update(payload.updates)
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
