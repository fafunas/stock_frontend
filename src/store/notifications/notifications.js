export default {
  namespaced: true,
      state: {
      text: '',
      type: null,
      visible: false
    },
    mutations: {
      NEW_NOTIFICATION(state, payload) {
        state.text = payload.text;
        state.type = payload.type;
     //   state.title = payload.title;
        state.visible = true;
      },
      CLOSE_NOTIFICATIONS(state) {
        state.visible = false;
      }
    },
    actions: {
      SET_NOTIFICATION: ({ commit }, payload) => {
        commit("NEW_NOTIFICATION", payload);
        setTimeout(function() {
          commit("CLOSE_NOTIFICATIONS");
        }, 5000);
      }
    }
  };