<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-6xl font-bold">Erreur 404</h1>
    <Nuxt-link to="/" class="mt-10 hover:text-cyan-400 transition ease-in-out text-xl">Retour à la page d'accueil</Nuxt-link>
  </div>
</template>

<script>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default {
  props: ['error'],
  head: () => ({
    title: 'Erreur 404',
  }),
  mounted() {
    // si l'erreur à le status 401 Unauthorized, redirection + msg
    if (this.error.statusCode === 401) {
      this.$router.push(`/`)

      const notyf = new Notyf();
      notyf.error({
        message: 'Vous êtes bloqué.',
        duration: 3000,
        position: {
          x: 'center',
          y: 'bottom',
        },
      })
    }
  },
}
</script>