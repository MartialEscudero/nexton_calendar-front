<template>
  <div>
    <!-- Choix mois & année -->
    <div class="my-8 float-right">
      <select 
        class="date_select mr-8 font-bold outline-none bg-gray-900 py-1.5 pr-8 pl-4 cursor-pointer" 
        v-model="monthSelect"
        @change="hiddenOptions(), calendarSetup([yearSelect, monthSelect])"
      >
        <option
          class="font-bold bg-gray-700" 
          v-for="month in monthsNameList" :key="month.item" 
          :value="month.value"
        >{{ month.name }}</option>
      </select>
      <select 
        class="date_select font-bold outline-none bg-gray-900 py-1.5 pr-8 pl-4 cursor-pointer" 
        v-model="yearSelect" 
        @change="hiddenOptions(), calendarSetup([yearSelect, monthSelect])"
      >
        <option
          class="font-bold bg-gray-700" 
          v-for="year in yearsList" :key="year.item" 
          :value="year"
        >{{ year }}</option>
      </select>
    </div>

    <!-- Calendrier -->
    <div>
      <table class="w-full table-fixed">
        <thead>
          <tr>
            <th 
              class="text-xs py-1 text-center bg-slate-800 border-l border-r border-t border-gray-900" 
              v-for="week in weekList" :key="week.item"
              :colspan="week.total"
            >{{ week.number }}</th>
          </tr>
        </thead>
      </table>
      <table class="w-full table-fixed">
        <thead>
          <tr>
            <th
              v-for="day in daysList" :key="day.item"
              :class="day.date === currentDay ? 'bg-gray-700 ' : '' + 'bg-gray-800 text-sm py-1.5 text-center border-l border-r border-t border-gray-900'" 
            >
              <p class="text-xs">{{ daysNameList[day.dayName.$W] }}</p>
              <p>{{ day.dayNumber }}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="day in daysList" :key="day.item">
              <div v-if="!day.weekEnd">
                <div class="mt-4">
                  <div
                    class="m-auto w-4 h-4 rounded-full bg-gray-900 border border-white cursor-pointer" 
                    :style="setColorCode(day.project.am)" 
                    :title="day.project.am"
                    @click="hiddenOptions(), displayToggle(day.date + '-am')"
                  ></div>
                  <div 
                    class="option hidden fixed mt-3 bg-gray-700 border border-white" 
                    :data-id="day.date + '-am'"
                  >
                    <ul>
                      <li
                        class="flex items-center cursor-pointer py-2 pr-16 pl-4 hover:bg-gray-800" 
                        v-for="project in day.projectsListUser" :key="project.item" 
                        @click="hiddenOptions(), setProject(['am', project.code, day])"
                      >
                        <span
                          class="block w-4 h-4 mr-3 -mt-0.5 rounded-full bg-gray-900 border border-white"
                          :style="setColorCode(project.code)" 
                        ></span>{{ project.code }} - {{ project.name }}
                      </li>
                      <li 
                        class="flex items-center cursor-pointer py-2 pr-16 pl-4 hover:bg-gray-800" 
                        @click="hiddenOptions(), setProject(['am', null, day])"
                      >
                        <span class="block w-4 h-4 mr-3 -mt-0.5 rounded-full bg-gray-900 border border-white"></span>Aucun
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mt-4">
                  <div 
                    class="m-auto w-4 h-4 rounded-full bg-gray-900 border border-white cursor-pointer" 
                    :style="setColorCode(day.project.pm)"
                    :title="day.project.pm"
                    @click="hiddenOptions(), displayToggle(day.date + '-pm')"
                  ></div>
                  <div 
                    class="option hidden fixed mt-3 bg-gray-700 border border-white" 
                    :data-id="day.date + '-pm'"
                  >
                    <ul>
                      <li
                        class="flex items-center cursor-pointer py-2 pr-16 pl-4 hover:bg-gray-800" 
                        v-for="project in day.projectsListUser" :key="project.item" 
                        @click="hiddenOptions(), setProject(['pm', project.code, day])"
                      >
                        <span 
                          class="block w-4 h-4 mr-3 -mt-0.5 rounded-full bg-gray-900 border border-white"
                          :style="setColorCode(project.code)"
                        ></span>{{ project.code }} - {{ project.name }}
                      </li>
                      <li
                        class="flex items-center cursor-pointer py-2 pr-16 pl-4 hover:bg-gray-800" 
                        @click="hiddenOptions(), setProject(['pm', null, day])"
                      >
                        <span class="block w-4 h-4 mr-3 -mt-0.5 rounded-full bg-gray-900 border border-white"></span>Aucun
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-else>
                <div title="Week-End" class="block m-auto mt-4 w-4 h-4 rounded-full bg-gray-700 cursor-not-allowed"></div>
                <div title="Week-End" class="block m-auto mt-4 w-4 h-4 rounded-full bg-gray-700 cursor-not-allowed"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const dayjs = require('dayjs')
require('dayjs/locale/fr')
let weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
dayjs.locale('fr') 

export default {
  name: 'Calendrier',
  props: {
    projectsListUser : Array,
  },
  data: () => ({
    am: null,
    pm: null,
    currentDay: null,
    yearSelect: null,
    monthSelect: null,
    listExtract: [],
    daysListUser: [],
    daysList: [],
    weekList: [],
    yearsList: [],
    projectsList: [],
    monthsNameList: [
      {name: 'Janvier', value: 1},
      {name: 'Février', value: 2},
      {name: 'Mars', value: 3},
      {name: 'Avril', value: 4},
      {name: 'Mai', value: 5},
      {name: 'Juin', value: 6},
      {name: 'Juillet', value: 7},
      {name: 'Aout', value: 8},
      {name: 'Septembre', value: 9},
      {name: 'Octobre', value: 10},
      {name: 'Novembre', value: 11},
      {name: 'Décembre', value: 12},
    ],
    daysNameList: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  }),
  methods: {
    
    toTimestamp(item) {
      return new Date(item[0], item[1] - 1, item[2]).getTime() / 1000
    },

    toDate(item) {
      return (new Date(item * 1000))
    },

    indexCloserTimestamp(item) {
      return this.daysListUser.indexOf(this.daysListUser.find(element => element.date >= item))
    },

    indexListExtract(item) {
      return this.listExtract.map(function(e) { return e.date }).indexOf(item)
    },

    indexDaysListUser(item) {
      return this.daysListUser.map(function(e) { return e.date }).indexOf(item)
    },

    dayNumberTest(item) {
      if (item < 10) { return "0" + item } else { return item }
    },

    isWeekEnd(item) {
      let day = new Date(this.toDate(item)).getDay()
      if (day === 6 || day === 0) { return true } else { return false }
    },

    sortDaysListUser() {
      this.daysListUser.sort(function (a, b) { return a.date - b.date })
    },

    setColorCode(item) {
      if (!!item) {
        let index = this.projectsList.map(function(e) { return e.code }).indexOf(item)
        let color =  this.projectsList[index].color_code
        return 'background-color:' + color + ';border:none;'
      }
    },

    hiddenOptions() {
      let list = document.querySelectorAll(".option")
      for (let i = 0; i < list.length; ++i) {
        list[i].classList.add('hidden');
      }
    },

    displayToggle(item) {
      document.querySelector("[data-id="+"'"+item+"'"+"]").classList.toggle("hidden")
    },

    async AddNjr(item) {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      const projectsListRes = await this.$axios.$get(`/projects/?populate=%2A`, {
        headers: headers
      })

      this.$axios.$put(`/projects/${this.projectsList[item].id}`, {
        data : {
          njr: parseFloat(projectsListRes.data[item].attributes.njr) + 0.5,
        }
      },{
        headers: headers
      })
    },

    async RemoveNjr(item) {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      const projectsListRes = await this.$axios.$get(`/projects/?populate=%2A`, {
        headers: headers
      })

      this.$axios.$put(`/projects/${this.projectsList[item].id}`, {
        data : {
          njr: parseFloat(projectsListRes.data[item].attributes.njr) - 0.5,
        }
      },{
        headers: headers
      })
    },

    currentDate() {
      // récupère la date actuelle au chargement de la page
      let date = new Date()
      this.yearSelect = date.getFullYear()
      this.monthSelect = date.getMonth() + 1

      // défini le timestamp du jour
      this.currentDay = this.toTimestamp([date.getFullYear(), (date.getMonth()+1),  date.getDate()])

      // liste les années - actuelle + 2 précédentes
      for (let i = 0; i < 3; i++) {
        this.yearsList.push(this.yearSelect - i)
      }
    },

    async getUser() {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      };

      this.user = await this.$axios.$get(`/users/me/?populate=%2A`, {
        headers: headers
      });

      if (this.user.daysListUser) {
        this.daysListUser = this.user.daysListUser
      } else {
        this.daysListUser.push({
          "date": this.toTimestamp([this.yearSelect,this.monthSelect, 1]),
          "project": {
            "am": null,
            "pm": null
          }
        })
      }

      const projectsListRes = await this.$axios.$get(`/projects/?populate=%2A`, {
        headers: headers
      })

      for (let i = 0; i < projectsListRes.data.length; i++) {
        this.projectsList.push(projectsListRes.data[i].attributes)
        Object.assign(this.projectsList[i], {id: projectsListRes.data[i].id});
      }

      this.calendarSetup([this.yearSelect,this.monthSelect])
    },

    async calendarSetup(item) {
      // donne le nombre de jours dans le mois sélectionné
      let monthStart = new Date(item[0], item[1] - 1, 1)
      let monthEnd = new Date(item[0], item[1], 1)
      let nbDay = Math.round((monthEnd - monthStart) / (1000 * 60 * 60 * 24))

      // isoler les timestamp du mois sélectionné
      this.sortDaysListUser()
      let calendarStart = this.toTimestamp([item[0], item[1], 1])
      let calendarEnd = this.toTimestamp([item[0], item[1] + 1, 1])
      if (this.indexCloserTimestamp(calendarEnd) < 0) {
        this.listExtract = this.daysListUser.slice(this.indexCloserTimestamp(calendarStart))
      } else {
        this.listExtract = this.daysListUser.slice(this.indexCloserTimestamp(calendarStart), this.indexCloserTimestamp(calendarEnd))
      }

      // liste les jours du mois sélectionné, définit si c'est un jour du w-e ou non
      this.daysList = []
      this.weekList = []
      for (let i = 1; i <= nbDay; i++) {
        let timestamp = this.toTimestamp([this.yearSelect,this.monthSelect, i])

        if (this.weekList.length === 0) {
          this.weekList.push({
            number: dayjs(dayjs.unix(this.toTimestamp([this.yearSelect,this.monthSelect, 1]))).week(),
            total: 1
          })
        } else {
          let index = this.weekList.map(function(e) { return e.number }).indexOf(dayjs(dayjs.unix(timestamp)).week())
          if (index != -1) {
            this.weekList[index].total = this.weekList[index].total + 1
          } else {
            this.weekList.push({
              number: dayjs(dayjs.unix(timestamp)).week(),
              total: 1
            })
          }
        }

        if (this.indexListExtract(timestamp) != -1) {
          let index = this.indexListExtract(timestamp)
          this.daysList.push({
            date: timestamp,
            project: this.listExtract[index].project,
            projectsListUser: this.projectsListUser,
            dayNumber: this.dayNumberTest(i),
            dayName: dayjs.unix(timestamp),
            weekEnd: this.isWeekEnd(timestamp),
          })
        } else {
          this.daysList.push({
            date: timestamp,
            project: { am: null, pm: null },
            projectsListUser: this.projectsListUser,
            dayNumber: this.dayNumberTest(i),
            dayName: dayjs.unix(timestamp),
            weekEnd: this.isWeekEnd(timestamp),
          })
        }
      }
    },

    // ajoute le projet sélectionné
    async setProject(item) {
      const headers = {
        Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
      }

      let index = this.indexListExtract(item[2].date)
      if (this.listExtract[index]) {
        let nouveau = item[1]
        let ancien = this.listExtract[index].project[item[0]]
        let indexProNew = this.projectsList.map(function(e) { return e.code }).indexOf(nouveau)
        let indexProOld = this.projectsList.map(function(e) { return e.code }).indexOf(ancien)
        // am ou pm jamais défini donc +0.5 nouveau
        if ((nouveau) && (ancien === undefined)) {
          this.AddNjr(indexProNew)
          setTimeout(() => {
            this.AddNjr(indexProNew)
          }, 1000);
        }
        if ((nouveau !== ancien) && (ancien !== undefined)) {
          // Différent donc -0.5 ancien et +0.5 nouveau'
          if (nouveau && ancien) {
            this.AddNjr(indexProNew)
            this.RemoveNjr(indexProOld)
          }
          // Différrent donc ancien null et +0.5 nouveau'
          if (!ancien) {
            this.AddNjr(indexProNew)
          }
          // Différent donc -0.5 ancien et null nouveau'
          if (!nouveau) {
            this.RemoveNjr(indexProOld)
          }
        }
      } else {
        // Jamais défini donc +0.5 nouveau
        let nouveau = item[1]
        let indexProNew = this.projectsList.map(function(e) { return e.code }).indexOf(nouveau)
        this.AddNjr(indexProNew)
        setTimeout(() => {
          this.AddNjr(indexProNew)
        }, 1000);
      }
      
      let indexDays = this.indexDaysListUser(item[2].date)
      if (indexDays >= 0) {
        if (this.daysListUser[indexDays].project[item[0]] === null) {
          this.daysListUser[indexDays].project[item[0]] = item[1]
          this.daysListUser[indexDays].project['pm'] = item[1]
        } else {
          this.daysListUser[indexDays].project[item[0]] = item[1]
        }
      } else {
        this.daysListUser.push({
          date: item[2].date, 
          project: { 
            [item[0]]: item[1],
            pm: item[1]
          }
        })
      }
      
      this.calendarSetup([this.yearSelect,this.monthSelect])
      
      this.$axios.$put(`/users/${this.user.id}`, {
        daysListUser: this.daysListUser,
      },{
        headers: headers
      })
    },
  },
  async mounted() {
    this.currentDate()
    await this.getUser()
  },
}
</script>