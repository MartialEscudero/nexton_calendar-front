export const state = () => ({
  user: {},
  users: [],
  projectsList: [],
  projectsListFinished: [],
  projectsListCurrent: [],
  poles: [],
  enabledEndAt: false,
})

export const mutations = {
  setUser(state, args) {
    state.user = args
  },
  
  setUsers(state, args) {
    state.users = []
    args.forEach(element => {
      if (element.role.name === 'Collaborateur') {
        if (element.pole) {
          if (element.pole.name === state.user.pole.name) {
            state.users.push(element)
          }
        } else if (!element.pole) {
          state.users.push(element)
        }
      }
    })

    state.users.sort(function(a,b){return a.blocked-b.blocked});
  },

  setProjectsList(state, args) {
    state.projectsList = []
    state.projectsListCurrent = []
    state.projectsListFinished = []

    for (let i = 0; i < args.data.length; i++) {
      state.projectsList.push(args.data[i].attributes)
      Object.assign(state.projectsList[i], {id: args.data[i].id});
    }

    state.projectsList.sort(function(a,b){return a.finished-b.finished});

    state.projectsList.forEach(element => {
      if (!element.finished) {
        state.projectsListCurrent.push(element)
      } else if (element.finished) {
        state.projectsListFinished.push(element)
      }
    });
  },

  setPoles(state, args) {
    state.poles = []

    for (let i = 0; i < args.data.length; i++) {
      state.poles.push(args.data[i].attributes)
      Object.assign(state.poles[i], {id: args.data[i].id});
    }
  },

  setBooleanEndAt(state, args) {
    state.enabledEndAt = args
  },
}

export const actions = {
}

export const getters = {
  users: state => state.users,
  projectsList: state => state.projectsList,
  projectsListCurrent: state => state.projectsListCurrent,
  projectsListFinished: state => state.projectsListFinished,
  poles: state => state.poles,
  enabledEndAt: state => state.enabledEndAt,
}