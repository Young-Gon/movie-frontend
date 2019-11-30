<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" max-width="400" :elevation="hover ? 12 : 2">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-list-item class="grow">
          <v-list-item-content>
            <v-card-title>{{ movie.title }}</v-card-title>
          </v-list-item-content>
          <v-row align="center" justify="end">
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon @click="onClickEditMovie()">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-img>

      <v-card-subtitle class="pb-0">
        Number 10
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>
          Share
        </v-btn>

        <v-btn color="orange" text>
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from "vue-property-decorator"
import Movie from "../src/movie"

@Component
export default class MovieCard extends Vue {
  @PropSync("dialog")
  private dialogname!: boolean

  @PropSync("dialogMovieId")
  private movieId!: number

  @Prop()
  private movie!: Movie

  public onClickEditMovie() {
    this.dialogname = true
    this.movieId = this.movie.id
  }
}
</script>
