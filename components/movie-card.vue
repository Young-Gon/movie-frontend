<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="ma-3"
      max-width="300"
      max-height="450px"
      :elevation="hover ? 12 : 2"
    >
      <v-img
        class="white--text align-end"
        :lazy-src="movie.thumb"
        :src="
          movie.image
            ? movie.image
            : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
        "
      >
        <v-card dark color="rgba(0,0,0,.8)">
          <v-card-title>
            {{ movie.title }}
            <v-row align="center" justify="end">
              <v-btn icon @click="onClickDeleteMovie()">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>

              <v-btn icon @click="onClickEditMovie()">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-row>
          </v-card-title>

          <v-card-subtitle class="pb-0">
            <div v-if="movie.genre">장르: {{ movie.genre }}</div>
            <div v-if="movie.director">감독: {{ movie.director }}</div>
            <div v-if="movie.actor">출연: {{ movie.actor }}</div>
          </v-card-subtitle>
          <div class="ml-3">
            <v-rating
              v-model="movie.userRating"
              background-color="orange lighten-3"
              color="orange"
              hover
              half-increments
              readonly
              dense
            />
          </div>
          <v-list-item three-line dense disabled>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ movie.synopsis }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from "vue-property-decorator"
import Movie from "../src/movie"

@Component
export default class MovieCard extends Vue {
  @PropSync("createDialog")
  private dialogCreate!: boolean

  @PropSync("dialogMovieId")
  private movieId!: number

  @PropSync("deleteDialog")
  private dialogDelete!: boolean

  @Prop()
  private movie!: Movie

  public onClickEditMovie() {
    this.dialogCreate = true
    this.movieId = this.movie.id
  }

  public onClickDeleteMovie() {
    this.dialogDelete = true
  }
}
</script>
