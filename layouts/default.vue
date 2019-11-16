<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title >Movie</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
      <v-footer
        fixed=true
        padless=true
        color="transparent">
            <v-row
            align="end"
            justify="center">
            <notifications />
            </v-row>
      </v-footer>
    </v-content>
  </v-app>
</template>

