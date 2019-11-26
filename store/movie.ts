import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AxiosError } from 'axios'
import { $axios } from '~/utils/api'
import Movie from '@/src/Movie'

@Module({
  name: 'movie',
  stateFactory: true,
  namespaced: true
})
export default class MovieModule extends VuexModule {
  public movieList: Movie[] = []

  @Mutation
  public setMovieList (movieList: Movie[]) {
    this.movieList = movieList
  }

  @Mutation
  public addMovie (movie: Movie) {
    const movieIndex = this.movieList.findIndex(it => it.id == movie.id)
    if (movieIndex == -1) { this.movieList.push(movie) } else { this.movieList[movieIndex] = movie }
  }

  @Action({ commit: 'setMovieList' })
  public async getMovieList () {
    try {
      return await $axios.$get('/movie?type=1')
    } catch (error) {
      console.log(error)

      if (error.isAxiosError) {
        const axiosError = error as AxiosError
        axiosError.code
      }
    }
  }

  @Action({ commit: 'addMovie' })
  public async getMovieDetail (movieId: number) {
    return await $axios.$get(`/movie/${movieId}`)
  }

  @Action({ commit: 'addMovie' })
  public async saveMovie (movie: Movie) {
    return await $axios.$post('/movie', movie)
  }
}
