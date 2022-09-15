export default {
  namespaced: true,
  state: {
    dialog: false,
  },

  mutations: {
    SHOW_DIALOG(state) {
      state.dialog = true;
    },

    CLOSE_DIALOG(state) {
      state.dialog = false;
    },
  },

  actions: {
    SET_DIALOG({ commit }) {
      commit("SHOW_DIALOG");
    },
    END_DIALOG({ commit }) {
      commit("CLOSE_DIALOG");
      //console.log("enddialog");
    },
  },
};
