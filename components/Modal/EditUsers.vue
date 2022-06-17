<template>
  <!-- Main modal -->
  <div id="modal-users" aria-hidden="true" class="bg-gray-800/90 hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
    <div class="relative px-4 w-4/6 h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg shadow bg-gray-700">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-5 rounded-t border-b border-gray-600">
          <h1 class="text-xl font-semibold lg:text-2xl text-white">
            Edition collaborateur
          </h1>
          <a
            class="transition ease-in-out text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white cursor-pointer" 
            @click="toggleModal('modal-users')"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
          </a>
        </div>
        <!-- Modal body -->
        <div class="px-8 py-8">
          <div class="grid grid-cols-2 xl:gap-16 gap-8">
            <div class="relative z-0 mb-10 w-full group">
              <input v-if="user" v-model="user.name" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <label for="floating_last_name" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom</label>
            </div>
            <div class="relative z-0 mb-10 w-full group">
              <input v-if="user" v-model="user.firstname" type="text" name="floating_first_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <label for="floating_first_name" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prénom</label>
            </div>
          </div>
          <div class="grid grid-cols-5 xl:gap-16 gap-8">
            <div class="col-span-3 relative z-0 mb-10 w-full group">
              <input v-if="user" v-model="user.email" type="email" name="floating_email" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <label for="floating_email" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse Mail</label>
            </div>
            <div class="col-span-2 relative z-0 mb-10 w-full">
              <select 
                class="text-sm date_select_edit mt-1 mr-8 outline-none w-full bg-gray-900 py-2 pr-8 pl-4 cursor-pointer focus:border-cyan-400 focus:outline-none focus:ring-0"
                v-if="user"
                v-model="user.pole.name"
              >
                <option
                  class="bg-gray-600" 
                  v-for="pole in poles" :key="pole.item" 
                  :value="pole.name"
                >Pôle - {{ pole.name }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 xl:gap-16 gap-8">
            <div class="relative z-0 w-full group mb-7">
              <span class="text-sm text-white pl-1">Date d’entrée</span>
              <div class="mt-2">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="mt-7 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
                <date-picker v-if="user" v-model="user.startAt" valueType="format" placeholder="Sélectionner une date" class="date"></date-picker>
              </div>
            </div>
            <client-only>
              <div class="relative z-0 w-full group mb-7">
                <div class="flex items-center">
                  <span class="text-sm text-white pl-1">Date de sortie</span>
                  <label v-if="user" class="relative flex items-center justify-between px-2">
                    <input v-model="user.enabledEndAt" @change="!enabledEndAt ? setBooleanEndAt(true) : setBooleanEndAt(false)" type="checkbox" class="absolute left-0 top-0 w-full h-full peer hidden">
                    <span class="bg-gray-400 w-10 h-5 rounded-full flex flex-shrink-0 items-center after:bg-white after:w-4 after:h-4 after:rounded-full pl-0.5 peer-checked:bg-cyan-400 peer-checked:after:translate-x-5 ease-in-out duration-300 after:duration-300"></span>
                  </label>
                </div>
                <div class="mt-3">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg :class="[enabledEndAt ? 'mt-7 w-5 h-5 text-gray-400' : 'mt-7 w-5 h-5 text-gray-600'] + ''" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                  </div>
                  <date-picker id="date-user-end" v-if="enabledEndAt" v-model="user.endAt" valueType="format" placeholder="Sélectionner une date" class="date">></date-picker>
                  <date-picker disabled  v-if="!enabledEndAt" valueType="format" placeholder="Pas de date de sortie" class="date">></date-picker>
                </div>
              </div>
            </client-only>
          </div>
          <div v-if="user" class="grid grid-cols-2 xl:gap-16 gap-8 my-6">
            <div class="relative">
              <p class="absolute top-0 ml-auto mr-auto left-0 right-0 text-center mb-3 bg-gray-800 py-2 w-3/5">Projets disponibles</p>
              <draggable class="bg-gray-800 pt-10 pb-3 px-3 rounded overflow-y-auto h-52 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-slate-600" :list="projectsFilter" group="people">
                  <div
                    class="list-group-item"
                    v-for="project in projectsFilter"
                    :key="project.item"
                  >
                    <div :style="'border-color:' + project.color_code + ';background-color:' + project.color_code + '12'" class="cursor-pointer mx-auto w-3/5 border-2 my-2.5 p-1.5 rounded-lg text-sm">
                      {{ project.code }} - {{ project.name }}
                    </div>
                  </div>
              </draggable>
            </div>
            <div class="relative">
              <p class="absolute top-0 ml-auto mr-auto left-0 right-0 text-center mb-3 bg-gray-800 py-2 w-3/5">Projets affectés</p>
              <draggable class="bg-gray-800 pt-10 pb-3 px-3 rounded overflow-y-auto h-52 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-slate-600" :list="user.projectsListUser" group="people">
                <div
                  class="list-group-item"
                  v-for="project in user.projectsListUser"
                  :key="project.item"
                >
                  <div :style="'border-color:' + project.color_code + ';background-color:' + project.color_code + '12'" class="cursor-pointer mx-auto w-3/5 border-2 my-2.5 p-1.5 rounded-lg text-sm">
                    {{ project.code }} - {{ project.name }}
                  </div>
                </div>
              </draggable>
            </div>
          </div>
          <div v-if="user" class="z-0 mt-8 flex justify-center">
            <div class="flex flex-col items-center justify-center">
              <span class="text-sm text-white text-center">Status</span>
              <label class="relative">
                <div class="flex items-center mt-2">
                  <div>
                    <input v-model="user.blocked" type="checkbox" class="absolute left-0 top-0 w-full h-full peer hidden">
                    <span class="bg-green-400 w-10 h-5 rounded-full flex flex-shrink-0 items-center after:bg-white after:w-4 after:h-4 after:rounded-full pl-0.5 peer-checked:bg-red-400 peer-checked:after:translate-x-5 ease-in-out duration-300 after:duration-300"></span>
                  </div>
                  <span v-if="!user.blocked" class="text-xs ml-1">: Validé</span>
                  <span v-else-if="user.blocked" class="text-xs ml-1">: Bloqué</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-600">
          <a 
            class="font-medium transition ease-in-out text-white bg-lime-500 hover:bg-lime-600 rounded-lg text-sm px-5 py-2.5 text-center focus:z-10 cursor-pointer"
            @click="postUser(), toggleModal('modal-users')"
          >Enregistrer</a>
          <a 
            class="font-medium transition ease-in-out rounded-lg border text-sm px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 cursor-pointer"
            @click="toggleModal('modal-users')"
          >Annuler</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import draggable from 'vuedraggable'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: {
    draggable,
    DatePicker
  },
  props: {
    userId: Number,
    user: Object,
    projectsFilter: Array,
  },
  methods: {
    ...mapMutations('store',['setUsers', 'setPoles', 'setBooleanEndAt']),

    async getPoles() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      const polesRes = await this.$axios.$get(`/poles/?populate=%2A`, {
        headers: headers
      })
      this.setPoles(polesRes)
    },

    async postUser() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      this.user.projectsListUser.forEach(element => {
        delete element.users
      })

      this.poles.forEach(element => {
        delete element.users
      })

      let indexPole = this.poles.map(function(e) { return e.name }).indexOf(this.user.pole.name)
      if (this.user) {
        this.$axios.$put(`/users/${this.userId}`, {
          name: this.user.name,
          firstname: this.user.firstname,
          email: this.user.email,
          blocked: this.user.blocked,
          startAt: this.user.startAt,
          endAt: this.enabledEndAt ?this.user.endAt : null,
          pole: this.poles[indexPole],
          projectsListUser: this.user.projectsListUser
        },{
          headers: headers
        })
        .then(async e => {
          const usersRes = await this.$axios.$get(`/users/?populate=%2A`, {
            headers: headers
          })
          this.setUsers(usersRes)
        })
      }
    },

    toggleModal(item) {
      document.querySelector('#' + item).classList.toggle('hidden')
      document.querySelector('#' + item).classList.toggle('flex')
    }
  },
  computed: {
    ...mapGetters('store',['users', 'projectsList', 'poles', 'enabledEndAt', 'endAt'])
  },
  mounted() {
    this.getPoles()
  },
}
</script>