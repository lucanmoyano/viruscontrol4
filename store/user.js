export const state = () => ({
  loggedUser: null
})

export const mutations = {
  saveUser(state, user) {
    state.loggedUser = user;
  },
  deleteUser(state) {
    state.loggedUser = null;
  }
}


export default {
  state,
  mutations,
}
