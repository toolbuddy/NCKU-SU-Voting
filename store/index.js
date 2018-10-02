export const state = () => ({
  authUser: null,
  isLogin: false
})

export const getters = {

}

export const mutations = {
  SET_USER: (state, data) => {
    state.authUser = data.userID
  }
}

export const actions = {
  login: function ({commit}, data) {
    return commit('SET_USER', data)
  }
}
