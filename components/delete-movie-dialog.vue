<template>
  <v-dialog v-model="showDialog" max-width="500">
    <v-card>
      <v-card-title>
        Delete Movie
      </v-card-title>
      <v-card-text>
        삭제하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="showDialog = false">
          취소
        </v-btn>
        <v-btn color="error" text @click="onClickDeleteMovie()">
          삭제
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from "vue-property-decorator"
import { movieStore } from "../store"

@Component
export default class DeleteMovieDialog extends Vue {
  @PropSync("isShow")
  private showDialog!: boolean

  @Prop()
  private movieId!: number

  public onClickDeleteMovie() {
    movieStore.deleteMovie(this.movieId)
    this.showDialog = false
  }
}
</script>
