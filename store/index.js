export const state = () => ({
  authUser: null,
  vote: -1
})

export const getters = {
  getAuthUser: (state) => state.authUser,
  getVote: (state) => state.vote
}

export const mutations = {
  SET_USER: (state, data) => {
    state.authUser = data.userID
    state.vote = data.vote
  },
  ADD_VOTE: (state, data) => {
    state.vote.push(data)
  }
}

export const actions = {
  login: function ({commit}, data) {
    return commit('SET_USER', data)
  },
  logout: function ({commit}) {
    return commit('SET_USER', {userID: null, vote: -1})
  },
  addVote: function ({commit}, data) {
    return commit('ADD_VOTE', data)
  }
}
