<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap justify-space-around>
      <v-flex
        v-for="movie in this.$store.state.movie.movieList"
        :key="movie.id"
      >
        <movie-card
          :movie="movie"
          :create-dialog.sync="createDialog"
          :delete-dialog.sync="deleteDialog"
          :dialog-movie-id.sync="dialogMovieId"
        />
      </v-flex>
    </v-layout>
    <v-btn
      color="accent"
      fab
      large
      dark
      bottom
      right
      fixed
      @click.stop="
        createDialog = true
        dialogMovieId = 0
      "
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <create-movie-dialog
      :movie-id="dialogMovieId"
      :dialog.sync="createDialog"
    />
    <delete-movie-dialog
      :movie-id="dialogMovieId"
      :dialog.sync="deleteDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { movieStore } from "~/store"
import CreateMovieDialog from "@/components/create-movie-dialog.vue"
import DeleteMovieDialog from "@/components/delete-movie-dialog.vue"
import MovieCard from "@/components/movie-card.vue"

@Component({
  components: {
    CreateMovieDialog,
    DeleteMovieDialog,
    MovieCard
  }
})
export default class MyComponent extends Vue {
  dialogMovieId: number = 0
  createDialog: boolean = false
  deleteDialog: boolean = false

  created() {
    movieStore.getMovieList()
  }
}
</script>
