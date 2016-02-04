<template>
  <h1>Opdracht 5: VueJS</h1>

  <nav>
    <ul>
      <li><a v-link="{ path: '/' }">Home</a></li>
      <li><a v-link="{ path: '/best-practices' }">Best Practices</a></li>
    </ul>
  </nav>

  <router-view></router-view>
</template>

<script>
  export default {
    components: {}
  };
</script>

<style lang="sass">
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
  }

  body {
    margin: 0;
    padding: 0;

    font-family: 'Roboto', sans-serif;
  }
</style>
