<template>
  <div>
    <Navbar />
    <div>
      <!-- Liste des projets -->
      <div class="flex items-center justify-between w-full bg-cyan-400 py-3 px-5 mt-8 font-bold">
        <h1 class="text-base">Liste des projets</h1>
        <img 
          class="cursor-pointer transform" 
          src="~assets/img/arrow.png" 
          @click="e => e.target.classList.toggle('rotate-180') & ((!showProjets) ? showProjets = true : showProjets = false)"
        />
      </div>
      <div 
        class="w-full bg-gray-700 py-4" 
        v-if="!!showProjets"
      >
        <div class="container grid grid-cols-6 gap-4">
          <div 
            class="flex items-center m-auto" 
            v-for="project in projectsListUser" :key="project.item"
          >
            <span
              class="block w-4 h-4 mr-3 -mt-0.5 rounded-full bg-gray-900 border boder-white" 
              :style="setColorCode(project.code)"
            ></span>
            <p class="text-sm">
              {{ project.code }} - {{ project.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- Calendrier -->
      <CalendarEditCollab :projectsListUser="projectsListUser" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  head() {
    return {
      title: this.user ? this.user.firstname || this.user.name ? this.user.firstname + ' ' + this.user.name : 'Collaborateur '  : 'Collaborateur ',
    }
  },
  data: () => ({
    user: null,
    showProjets: false,
    projectsListUser: [],
  }),
  methods: {
    ...mapMutations('store',['setProjectsList']),
    setColorCode(item) {
      if (!!item) {
        let index = this.projectsList.map(function(e) { return e.code }).indexOf(item)
        let color =  this.projectsList[index].color_code
        return 'background-color:' + color + ';border:none;'
      }
    },

    async getInfosUser() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      const user = this.$auth.$storage.getUniversal('user')

      this.user = await this.$axios.$get(`/users/${user.id}/?populate=%2A`, {
        headers: headers
      })

      // si l'utilisateur n'est pas un collaborateur il est automatiquement redirigé
      if (this.user.role.name === 'Manager') {
        this.$router.push(`/calendrier/manager`)
      }

      this.projectsListUser = this.user.projectsListUser

      const projectsRes = await this.$axios.$get(`/projects/?populate=%2A`, {
        headers: headers
      })
      this.setProjectsList(projectsRes)
    }
  },
  computed: {
    ...mapGetters('store',['projectsList'])
  },
  async created() {
    await this.getInfosUser()
  },
}
</script>