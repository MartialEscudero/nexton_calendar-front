<template>
  <div class="container m-auto">
    <div class="flex justify-between items-center mt-14">
      <div>
        <Nuxt-link v-if="$route.name === 'calendrier-manager' && userRole === 'Manager'" to="/administration" class="text-sm cursor-pointer">Administration</Nuxt-link>
        <Nuxt-link v-if="$route.name === 'administration' && userRole === 'Manager'" to="/calendrier/manager" class="text-sm cursor-pointer">Calendrier</Nuxt-link>
        <Nuxt-link v-if="$route.name === 'calendrier-collaborateur' && userRole === 'Chef de projet'" to="/calendrier/chefdeprojet" class="text-sm cursor-pointer">Équipe projet</Nuxt-link>
        <Nuxt-link v-if="$route.name === 'calendrier-chefdeprojet' && userRole === 'Chef de projet'" to="/calendrier/collaborateur" class="text-sm cursor-pointer">Calendrier</Nuxt-link>
      </div>
      <div class="text-center">
        <h1 class="font-bold text-4xl">NEXTON</h1>
        <h2 class="text-lg">Calendrier de production</h2>
        <div class="text-center mt-2">
          <span v-if="userRole === 'Manager'" class="rounded-full py-1 px-7 text-sm bg-red-500">Administration</span>
          <span v-if="(userRole === 'Collaborateur') || (userRole === 'Chef de projet')" class="rounded-full py-1 px-7 text-sm bg-cyan-400">Pôle {{ user.pole.name }}</span>
        </div>
      </div>
      <div>
        <a @click="logout" v-if="user" class="text-sm cursor-pointer">Déconnexion</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default {
  name:'Navbar',
  data() {
    return {
      user: null,
      userRole: null
    }
  },
  methods: {
    logout() {
      this.$auth.$storage.removeUniversal('user')

      this.$auth.$storage.removeUniversal('jwt')

      this.$router.push(`/`)

      const notyf = new Notyf();
      notyf.error({
        message: 'Vous êtes déconnecté.',
        duration: 3000,
        position: {
          x: 'center',
          y: 'bottom',
        },
      });
    },

    async getRole() {
      if (this.$route.name !== 'index') {
        const user = this.$auth.$storage.getUniversal('user')

        const headers = {
          Authorization: `Bearer ${ this.$auth.$storage.getUniversal('jwt') }`
        }

        this.user = await this.$axios.$get(`/users/${user.id}/?populate=%2A`, {
          headers: headers
        })

        this.userRole = this.user.role.name
      }
    }
  },
  async created() {
    await this.getRole()
  },
}
</script>