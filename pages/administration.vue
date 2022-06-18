<template>
  <div>
    <Navbar />
    <ModalEditUsers :userId="userIdSelect" :user="userSelect" :projectsFilter="projectsFilter" />
    <ModalEditProjects :projectId="projectIdSelect" :project="projectSelect" />
    <div class="grid grid-cols-4 gap-10 mt-16">
      <div class="text-center bg-gray-800 border-2 border-gray-700 py-4">
        <span class="text-4xl font-bold">{{ users.length }}</span>
        <p class="text-lg mt-3.5">
          <span v-if="users.length > 1">Collaborateurs</span>
          <span v-else>Collaborateur</span>
        </p>
      </div>
      <div class="text-center bg-gray-800 border-2 border-gray-700 py-4">
        <span class="text-4xl font-bold">{{ projectsList.length }}</span>
        <p class="text-lg mt-3.5">
          <span v-if="projectsList.length > 1">Projets</span>
          <span v-else>Projet</span>
        </p>
      </div>
      <div class="text-center bg-gray-800 border-2 border-gray-700 py-4">
        <span class="text-4xl font-bold">{{ projectsListCurrent.length }}</span>
        <p class="text-lg mt-3.5">
          <span v-if="projectsListCurrent.length > 1">Projets en cours</span>
          <span v-else>Projet en cours</span>
        </p>
      </div>
      <div class="text-center bg-gray-800 border-2 border-gray-700 py-4">
        <span class="text-4xl font-bold">{{ projectsListFinished.length }}</span>
        <p class="text-lg mt-3.5">
          <span v-if="projectsListFinished.length > 1">Projets terminés</span>
          <span v-else>Projet terminé</span>
        </p>
      </div>
    </div>
    <div class="flex gap-20 mb-5">
      <div class="grow-2">
        <div class="flex justify-between items-center mt-20 mb-5">
          <h1 class="text-lg font-bold">Liste des collaborateurs</h1>
        </div>
        <table class="border-separate w-full mt-8">
          <thead>
            <tr class="table-row text-sm text-left">
              <th class="border-b border-gray-500 table-cell py-2.5">Status</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Nom</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Prénom</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Adresse Mail</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Date d’entrée</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Date de sortie</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Actions</th>
            </tr>
          </thead>
          <tbody 
            class="table-row-group" 
            v-for="user in users" :key="user.item"
          >
            <tr class="table-row text-sm text-left">
              <td class="table-cell py-2.5">
                <span v-if="!user.firstname || !user.name || !user.pole" class="text-xs text-amber-500 bg-amber-500/10 border border-amber-500 rounded-md p-1">En&nbsp;attente</span>
                <span v-else-if="!user.blocked" class="text-xs text-lime-500 bg-lime-500/10 border border-lime-500 rounded-md p-1">Validé</span>
                <span v-else-if="user.blocked" class="text-xs text-red-500 bg-red-500/10 border border-red-500 rounded-md p-1">Bloqué</span>
              </td>
              <td v-if="user.name" class="table-cell py-2.5">{{ user.name }}</td>
              <td v-else class="table-cell py-2.5">-</td>
              <td v-if="user.firstname" class="table-cell py-2.5">{{ user.firstname }}</td>
              <td v-else class="table-cell py-2.5">-</td>
              <td class="table-cell py-2.5">{{ user.email }}</td>
              <td class="table-cell py-2.5">{{ user.startAt }} </td>
              <td v-if="user.endAt" class="table-cell py-2.5">{{ user.endAt }}</td>
              <td v-else class="table-cell py-2.5">-</td>
              <td class="table-cell py-2.5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="cursor-pointer" viewBox="0 0 16 16"
                  @click="toggleModal('modal-users'), userIdSelect = user.id, getInfosUser()"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707  0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="grow">
        <div class="flex justify-between items-center mt-20 mb-5">
          <h1 class="text-lg font-bold">Liste des projets</h1>
          <a 
            class="rounded-full px-2.5 cursor-pointer bg-lime-500 hover:bg-lime-600 text-4xl transition ease-in-out"
            @click="toggleModal('modal-projects'), projectIdSelect = null, projectSelect = null"
          >+</a>
        </div>
        <table class="border-separate w-full">
          <thead>
            <tr class="table-row text-sm text-left">
              <th class="border-b border-gray-500 table-cell py-2.5">Status</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Code</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Nom</th>
              <th class="border-b border-gray-500 table-cell py-2.5">NJP</th>
              <th class="border-b border-gray-500 table-cell py-2.5">NJR</th>
              <th class="border-b border-gray-500 table-cell py-2.5">Actions</th>
            </tr>
          </thead>
          <tbody 
            class="table-row-group" 
            v-for="project in projectsList" :key="project.item"
          >
            <tr class="table-row text-sm text-left ">
              <td v-if="!project.finished" class="table-cell py-2.5">
                <span class="text-xs text-cyan-500 bg-cyan-500/10 border border-cyan-500 rounded-md p-1">En&nbsp;cours</span>
              </td>
              <td v-else-if="project.finished" class="table-cell py-2.5">
                <span class="text-xs text-stone-500 bg-stone-600/10 border border-stone-500 rounded-md p-1">Terminé</span>
              </td>
              <td class="table-cell py-2.5">
                <span 
                  class="block w-4 h-4 mr-2 rounded-full float-left" 
                  :style="'background-color:' + project.color_code"
                ></span>{{project.code}}
              </td>
              <td class="table-cell py-2.5">{{ project.name }}</td>
              <td class="table-cell py-2.5">
                <span v-if="project.njp === 0">-</span>
                <span v-else >{{ project.njp }}</span>
              </td>
              <td class="table-cell py-2.5">
                <span v-if="project.code === 'OFF'">-</span>
                <span v-else-if="!project.njr">0</span>
                <span v-else-if="project.njr < 0">0</span>
                <span v-else >{{ project.njr }}</span>
                <span v-if="project.code === 'OFF'"></span>
                <span 
                  class="block w-4 h-4 mr-2 rounded-full float-left bg-lime-500" 
                  v-else-if="project.njp === 0"
                ></span>
                <span 
                  class="block w-4 h-4 mr-2 rounded-full float-left bg-red-500" 
                  v-else-if="project.njp < project.njr"
                ></span>
                <span 
                  class="block w-4 h-4 mr-2 rounded-full float-left bg-lime-500" 
                  v-else
                ></span>
              </td>
              <td class="table-cell py-2.5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="cursor-pointer" viewBox="0 0 16 16"
                  @click="toggleModal('modal-projects'), projectIdSelect = project.id, getInfosProject()"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>   
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Administration',
  head() {
    return {
      title: 'Espace Administration',
    }
  },
  data: () => ({
    user: null,
    userIdSelect: null,
    userSelect: null,
    projectIdSelect: null,
    projectSelect: null,
    projectsFilter: [],
  }),
  methods: {
    ...mapMutations('store',['setUser','setUsers', 'setProjectsList', 'setBooleanEndAt']),

    async getInfosUser() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      this.userSelect = await this.$axios.$get(`/users/${this.userIdSelect}/?populate=%2A`, {
        headers: headers
      })

      // filtre les projets terminés
      this.projectsFilter = []
      this.projectsList.forEach(element => {
        if (!element.finished) {
          this.projectsFilter.push(element)
        }
      });

      // si le collaborateur a déjà le projet d'affecté, il ne sera pas dans la liste les projets disponibles
      for (let i = 0; i < this.userSelect.projectsListUser.length; i++) {
        this.projectsFilter.forEach(element => {
          if (element.code === this.userSelect.projectsListUser[i].code) {
            this.projectsFilter.splice(this.projectsFilter.indexOf(element), 1)
          }
        })
      }

      // vérifie si le collaborateur à une date de sortie on fixe un boolean
      if (!this.userSelect.endAt) {
        this.setBooleanEndAt(false)
        Object.assign(this.userSelect, {enabledEndAt: false});
      } else if (this.userSelect.endAt) {
        this.setBooleanEndAt(true)
        Object.assign(this.userSelect, {enabledEndAt: true});
      }

      // si l'utilisateur n'a pas de pole, on lui donne la valeur null
      if (!this.userSelect.pole) {
        this.userSelect.pole = {
          name: null
        }
      }

      // affecte automatiquement au collaborateur le projet "OFF"
      let indexOff = this.projectsList.map(function(e) { return e.code }).indexOf('OFF')
      let isTrue = this.userSelect.projectsListUser.map(function(e) { return e.code }).indexOf('OFF')
      if (isTrue === -1) {
        this.userSelect.projectsListUser.push(this.projectsList[indexOff])
        delete this.userSelect.projectsListUser[this.userSelect.projectsListUser.map(function(e) { return e.code }).indexOf('OFF')].users
        delete this.userSelect.projectsListUser[this.userSelect.projectsListUser.map(function(e) { return e.code }).indexOf('OFF')].poles
      }
    },

    async getInfosProject() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      const projectsRes = await this.$axios.$get(`/projects/${this.projectIdSelect}/?populate=%2A`, {
        headers: headers
      })

      this.projectSelect = projectsRes.data.attributes
    },

    async getInfosUsers() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      const user = this.$auth.$storage.getUniversal('user')

      this.user = await this.$axios.$get(`/users/${user.id}/?populate=%2A`, {
        headers: headers
      })
      this.setUser(this.user)
      
      // si l'utilisateur n'est pas un manager il est automatiquement redirigé
      if (this.user.role.name === 'Collaborateur') {
        this.$router.push(`/calendrier/collaborateur`)
      } else if (this.user.role.name === 'Chef de projet') (
        this.$router.push(`/calendrier/collaborateur`)
      )

      const usersRes = await this.$axios.$get(`/users/?populate=%2A`, {
        headers: headers
      })
      this.setUsers(usersRes)

      const projectsRes = await this.$axios.$get(`/projects/?populate=%2A`, {
        headers: headers
      })
      this.setProjectsList(projectsRes)
    },

    toggleModal(item) {
      document.querySelector('#' + item).classList.toggle('hidden')
      document.querySelector('#' + item).classList.toggle('flex')
    },
  },
  computed: {
    ...mapGetters('store',['users', 'projectsList', 'projectsListCurrent', 'projectsListFinished'])
  },
  async created() {
    await this.getInfosUsers()
  },
}
</script>