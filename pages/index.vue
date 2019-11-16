<template>
  <v-container fluid grid-list-xl >
    <v-layout wrap justify-space-around>
      <v-flex v-for="movie in this.$store.state.movie.movieList" :key="movie.id">
        <movie-card 
        :movie="movie"
        :dialog.sync="dialog"
        :dialogMovieId.sync="dialogMovieId"/>
      </v-flex>
    </v-layout>
    <v-btn
      color="pink"
      fab
      large
      dark
      bottom
      right
      fixed
      @click.stop="dialog = true;dialogMovieId=0"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <create-movie-dialog 
      :movieId="dialogMovieId"
      :dialog.sync="dialog"
      v-model="dialog"/>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { movieStore } from '~/store'
import CreateMovieDialog from "@/components/create-movie-dialog.vue"
import MovieCard from "@/components/movie-card.vue"
import Movie from "@/src/Movie"

@Component({
	components: {
    CreateMovieDialog,
    MovieCard,
	},
})
export default class MyComponent extends Vue {
  
  dialogMovieId: number=0
  dialog: boolean = false

  created () {
    movieStore.getMovieList()
  }
}
</script>
