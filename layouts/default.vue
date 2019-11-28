<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title>Movie</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
      <v-footer :fixed="true" app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-content>
    <notifications position="bottom center" />
  </v-app>
</template>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons");
</style>
