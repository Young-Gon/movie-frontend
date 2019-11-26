<template>
  <v-dialog v-model="dialogname" max-width="800">
    <v-card>
      <v-card-title class="headline">
        Create Movie
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="movie.title" label="Title*" required />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal middle name" hint="example of helper text only on focus" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password*" type="password" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="green darken-1" text @click="dialogname = false">
          Disagree
        </v-btn>

        <v-btn color="green darken-1" text @click="onClickCreateMovie()">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch } from "vue-property-decorator"
import Movie from "../src/movie"
import { $axios } from "~/utils/api"
import { movieStore } from "~/store"

@Component
export default class CreateMovieDialog extends Vue {
  @PropSync("dialog")
  private dialogname!: boolean;

  @Prop()
  private movieId!: number;

  private movie: Movie = new Movie(0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0);

  @Watch("movieId")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async onMovieIdChanged (newId: number, oldId: number) {
    if (newId !== 0) {
      console.log(`this.movieId=${this.movieId}`)
      try {
        this.movie = await $axios.$get(`/movie/${this.movieId}`)
        movieStore.addMovie(this.movie)
      } catch (error) {
        console.log(error)

        this.$notify({
          title: `code: ${error.response.status}`,
          type: "error",
          text: error.response.data.message
        })
      }
    } else {
      this.movie = new Movie(0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }
  }

  public async onClickCreateMovie () {
    try {
      await movieStore.saveMovie(this.movie)
    } catch (error) {
      console.log(error)

      if (error.isAxiosError) {
        this.$notify({
          title: `code: ${error.response.status}`,
          type: "error",
          text: error.response.data.message
        })
      }
    }
    this.dialogname = false
  }
}
</script>
