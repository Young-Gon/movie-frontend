import { Store } from "vuex"
import { getModule } from "vuex-module-decorators"
import MovieModule from "~/store/movie"

let movieStore: MovieModule

function initialiseStores(store: Store<any>): void {
  movieStore = getModule(MovieModule, store)
}

export { initialiseStores, movieStore }
