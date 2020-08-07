import Vue from 'vue'

import firebase from 'firebase';
import db from '@/main'

const state = {
  userDetails: {},
  users: {},
  messages: {},
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails)
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails)
  },
}
const actions = {
  authUser(userInfo, payload) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth().signInWithPopup(provider).then(() => {
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
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
      } else {
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
      }
    })
  },
  firebaseUpdateUser(object, payload) {
    if (payload.userId) {
      db.ref('users/' + payload.userId).update(payload.updates)
    }
  },
  firebaseGetUsers({ commit }) {
    db.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })
    db.ref('users').on('child_changed', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },
  firebaseGetMessages({ commit }) {
    firebase.database().ref('chat').on('child_added', snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },
  firebaseSendMessage(messageInfo, payload) {
    let numDigits = 2;
    let userId = state.userDetails.userId
    let hours = payload.createdAt.getHours()
    let minutesStr = payload.createdAt.getMinutes().toString()
    const minutes = numDigits >= minutesStr.length ? Array.apply(null, { length: numDigits - minutesStr.length + 1 }).join("0") + minutesStr : minutesStr.substring(0, numDigits);
    db.ref('chat').push({
      message: payload.newMessage,
      createdAt: `${ hours }:${ minutes }`,
      id: userId,
      from: state.userDetails.name,
      email: state.userDetails.email
    })
  }
}
const getters = {
  users: state => {
    return state.users
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
