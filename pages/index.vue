<template>
  <v-card class="mx-auto" flat max-width="1200">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row>
            <movie-card
              v-for="movie in this.$store.state.movie.movieList"
              :key="movie.id"
              :movie="movie"
              :create-dialog.sync="showCreateDialog"
              :delete-dialog.sync="showDeleteDialog"
              :dialog-movie-id.sync="dialogMovieId"
            />
          </v-row>
        </v-col>
      </v-row>
      <v-btn
        color="accent"
        fab
        large
        dark
        bottom
        right
        fixed
        @click.stop="
          showCreateDialog = true
          dialogMovieId = 0
        "
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <create-movie-dialog
        :movie-id="dialogMovieId"
        :is-show.sync="showCreateDialog"
      />
      <delete-movie-dialog
        :movie-id="dialogMovieId"
        :is-show.sync="showDeleteDialog"
      />
    </v-container>
  </v-card>
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
  showCreateDialog: boolean = false
  showDeleteDialog: boolean = false

  created() {
    movieStore.getMovieList()
  }
}
</script>

<style lang="scss" scoped>
.flex {
  flex-grow: 0;
}

.flex-empty {
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: 150px;
  }
}
</style>
