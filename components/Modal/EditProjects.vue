<template>
  <!-- Main modal -->
  <div id="modal-projects" aria-hidden="true" class="bg-gray-800/90 hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0">
    <div class="relative px-4 w-4/6 h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg shadow bg-gray-700">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-5 rounded-t border-b border-gray-600">
          <h1 class="text-xl font-semibold lg:text-2xl text-white">
            Edition projet
          </h1>
          <a
            class="transition ease-in-out text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white cursor-pointer" 
            @click="toggleModal('modal-projects')"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
          </a>
        </div>
        <!-- Modal body -->
        <div class="px-8 py-8">
          <div class="grid grid-cols-4 gap-12">
            <div class="col-span-2 relative z-0 mb-10 w-full group">
              <input v-if="project" v-model="project.name" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <input v-else v-model="name" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <label for="floating_last_name" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom du projet</label>
            </div>
            <div class="relative z-0 mb-10 w-full group">
              <input v-if="project" v-model="project.code" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <input v-else v-model="code" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <label for="floating_last_name" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code du projet</label>
            </div>
            <div class="relative z-0 mb-10 w-full group">
              <input v-if="project" v-model="project.njp" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <input v-else v-model="njp" type="text" name="floating_last_name" class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-0 peer" placeholder=" "/>
              <label for="floating_last_name" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NJP</label>
            </div>
          </div>
          <client-only>
            <div>
              <p class="text-sm text-white text-center mb-4">Couleur du projet</p>
                <div v-if="project" class="flex items-center justify-around">
                  <client-only>
                    <color-picker v-model="project.color_code" />
                  </client-only>
                  <div v-if="!project.color_code.hex" :style="'background-color:' + project.color_code" class="bg-cyan-400 bloc w-24 h-24 rounded-full"></div>
                  <div v-else :style="'background-color:' + project.color_code.hex" class="bloc w-24 h-24 rounded-full"></div>
                </div>
                <div v-else class="flex items-center justify-around">
                  <client-only>
                    <color-picker v-model="color" />
                  </client-only>
                  <div v-if="!color.hex" :style="'background-color:' + color" class="bg-cyan-400 bloc w-24 h-24 rounded-full"></div>
                  <div v-else :style="'background-color:' + color.hex" class="bloc w-24 h-24 rounded-full"></div>
                </div>
            </div>
          </client-only>
          <div v-if="project" class="z-0 mt-8 flex justify-center">
            <div class="flex flex-col items-center justify-center">
              <span class="text-sm text-white text-center">Status</span>
              <label class="relative">
                <div class="flex items-center mt-2">
                  <div>
                    <input v-model="project.finished" type="checkbox" class="absolute left-0 top-0 w-full h-full peer hidden">
                    <span class="bg-cyan-400 w-10 h-5 rounded-full flex flex-shrink-0 items-center after:bg-white after:w-4 after:h-4 after:rounded-full pl-0.5 peer-checked:bg-gray-400 peer-checked:after:translate-x-5 ease-in-out duration-300 after:duration-300"></span>
                  </div>
                  <span v-if="!project.finished" class="text-xs ml-1">: En cours</span>
                  <span v-else-if="project.finished" class="text-xs ml-1">: Terminé</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-600">
          <a 
            class="font-medium transition ease-in-out text-white bg-lime-500 hover:bg-lime-600 rounded-lg text-sm px-5 py-2.5 text-center focus:z-10 cursor-pointer"
            @click="postProject(), toggleModal('modal-projects')"
          >Enregistrer</a>
          <a 
            class="font-medium transition ease-in-out rounded-lg border text-sm px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 cursor-pointer"
            @click="toggleModal('modal-projects')"
          >Annuler</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Slider } from 'vue-color'

export default {
  components: {
    'color-picker': Slider
  },
  props: {
    projectId: Number,
    project: Object,
  },
  data() {
    return {
      name: null,
      code: null,
      njp: null,
      color: '#22d3ee'
    }
  },
  methods: {
    ...mapMutations('store',['setProjectsList']),

    async postProject() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      if (this.project) {
        this.$axios.$put(`/projects/${this.projectId}`, {
          data: {
            name: this.project.name,
            code: this.project.code,
            njp: this.project.njp,
            color_code: this.project.color_code.hex,
            finished: this.project.finished
          }
        },{
          headers: headers
        })
        .then(async e => {
          const projectsRes = await this.$axios.$get(`/projects/?populate=%2A`, {
            headers: headers
          })
          this.setProjectsList(projectsRes)
        })
      } else {
        this.$axios.$post(`/projects`, {
          data: {
            name: this.name,
            code: this.code,
            njp: this.njp,
            color_code: this.color.hex,
            finished: false
          }
        },{
          headers: headers
        })
        .then(async e => {
          const projectsRes = await this.$axios.$get(`/projects/?populate=%2A`, {
            headers: headers
          })
          this.setProjectsList(projectsRes)
        })
      }
    },

    toggleModal(item) {
      document.querySelector('#' + item).classList.toggle('hidden')
      document.querySelector('#' + item).classList.toggle('flex')
    }
  }
}
</script>