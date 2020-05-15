import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import Vue from "vue"
import { $axios } from "~/utils/api"
import Movie from "@/src/Movie"

@Module({
  name: "movie",
  stateFactory: true,
  namespaced: true
})
export default class MovieModule extends VuexModule {
  public movieList: Movie[] = []

  @Mutation
  public setMovieList(movieList: Movie[]) {
    this.movieList = movieList
  }

  @Mutation
  public addMovie(movie: Movie) {
    const movieIndex = this.movieList.findIndex((it) => it.id === movie.id)
    if (movieIndex === -1) {
      this.movieList.push(movie)
    } else {
      this.movieList[movieIndex] = movie
    }
  }

  @Mutation
  public removeMovie(movieId: number) {
    const movieIndex = this.movieList.findIndex((it) => it.id === movieId)
    if (movieIndex !== -1) {
      this.movieList.splice(movieIndex)
    }
  }

  @Action({ commit: "setMovieList" })
  public async getMovieList() {
    try {
      return await $axios.$get("/movie?type=1")
    } catch (error) {
      console.log(error)

      if (error.response !== undefined) {
        Vue.notify({
          title: `code: ${error.response.status}`,
          type: "error",
          text: error.response.data.message
        })
      } else {
        Vue.notify({
          type: "error",
          text: error
        })
      }
    }
  }

  @Action({ commit: "addMovie" })
  public async saveMovie(movie: Movie) {
    try {
      const result: Movie = await $axios.$post("/movie", movie)
      console.log(`movie=${result}`)
      return result
    } catch (error) {
      console.log(error)

      if (error.response !== undefined) {
        Vue.notify({
          title: `code: ${error.response.status}`,
          type: "error",
          text: error.response.data.message
        })
      } else {
        Vue.notify({
          type: "error",
          text: error
        })
      }
    }
  }

  @Action({ commit: "removeMovie" })
  public async deleteMovie(movieId: number) {
    try {
      await $axios.$delete(`/movie/${movieId}`)
      return movieId
    } catch (error) {
      console.log(error)

      if (error.response !== undefined) {
        Vue.notify({
          title: `code: ${error.response.status}`,
          type: "error",
          text: error.response.data.message
        })
      } else {
        Vue.notify({
          type: "error",
          text: error
        })
      }
    }
  }
}
