<template>
  <div>
    <Navbar />
    <div class="flex vh-75">
      <div class="m-auto">
        <a href="https://api.devmescudero.nexton-customers.com/api/connect/google" class="transition ease-in-out border focus:ring-4 focus:outline-none font-medium rounded-lg text-l px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 mr-2 mb-2">
          <svg class="w-8 h-8 mr-5 -ml-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Se connecter avec Google
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: 'Accueil',
    }
  },
}
</script>

<style scoped>
.vh-75 {
  height: 75vh
}
</style>