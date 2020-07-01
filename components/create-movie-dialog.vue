<template>
  <v-dialog v-model="showDialog" max-width="800">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Create Movie
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="movie.title"
                  label="제목*"
                  :rules="[(v) => !!v || '제목을 입력하세요']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="movie.titleEng"
                  label="English Title*"
                  :rules="[(v) => !!v || 'An English title is required']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="movie.grade"
                  :items="[12, 15, 19, 0]"
                  label="등급*"
                  hint="등급 0은 전체 관람가 입니다"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <v-img
                    v-if="movie.thumb != null"
                    :src="movie.thumb"
                    aspect-ratio="0.85"
                    class="grey lighten-2"
                    max-width="50"
                  />
                  <v-text-field
                    v-model="movie.thumb"
                    class="ml-3"
                    label="썸네일"
                  />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row>
                  <v-img
                    v-if="movie.image != null"
                    :src="movie.image"
                    aspect-ratio="0.85"
                    class="grey lighten-2"
                    max-width="50"
                  />
                  <v-text-field
                    v-model="movie.image"
                    class="ml-3"
                    label="포스터"
                  />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="movie.director" label="감독" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="movie.actor" label="배우" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="movie.duration"
                  label="상영시간*"
                  suffix="분"
                  :rules="[(v) => !!v || '상영시간을 입력하세요']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                사용자 평점*
                <v-rating
                  v-model="movie.userRating"
                  background-color="orange lighten-3"
                  color="orange"
                  hover
                  half-increments
                  :rules="[(v) => !!v || '사용자 평점을 입력하세요']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                관람객 평점*
                <v-rating
                  v-model="movie.audienceRating"
                  background-color="orange lighten-3"
                  color="orange"
                  hover
                  half-increments
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                기자·평론가 평점*
                <v-rating
                  v-model="movie.reviewerRating"
                  background-color="orange lighten-3"
                  color="orange"
                  hover
                  half-increments
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="movie.reservationRate"
                  label="예매율*"
                  hint="0% ~ 100%"
                  persistent-hint
                  suffix="%"
                  type="number"
                  :rules="[(v) => !!v || '예매율을 입력하세요']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="movie.reservationGrade"
                  label="예매순위*"
                  suffix="위"
                  type="number"
                  :rules="[(v) => !!v || '예매순위를 입력하세요']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="movie.audience"
                  label="누적 관객수*"
                  suffix="명"
                  type="number"
                  :rules="[(v) => !!v || '누적관객수를 입력하세요']"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="datePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="movie.date"
                      label="출시일*"
                      prepend-icon="event"
                      readonly
                      required
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="movie.date"
                    header-color="blue lighten-1"
                    locale="ko-kr"
                    @input="datePicker = false"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="movie.genre" label="장르" />
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Photos
                  </v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="photoUrl" label="URL" />
                      </v-col>
                      <v-col cols="2">
                        <v-btn
                          color="green darken-1"
                          text
                          @click="onClickAddPhoto()"
                        >
                          ADD
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="d-flex flex-nowrap">
                        <template v-for="(photo, index) in photoList">
                          <v-hover v-slot:default="{ hover }" :key="index">
                            <v-card
                              class="d-flex mb-6 margin-right"
                              flat
                              tile
                              :elevation="hover ? 12 : 2"
                            >
                              <v-img
                                :src="photo"
                                height="74"
                                width="74"
                                aspect-ratio="1"
                                class="grey lighten-2"
                              >
                                <v-row
                                  class="fill-height flex-column"
                                  justify="space-between"
                                >
                                  <div class="align-self-end mr-3">
                                    <v-btn
                                      :class="{ 'show-btns': hover }"
                                      :color="hover ? 'red' : 'transparent'"
                                      fab
                                      elevation="0"
                                      x-small
                                      dark
                                      @click="onClickClosePhoto(index)"
                                    >
                                      <v-icon
                                        :class="{ 'show-btns': hover }"
                                        color="transparent"
                                      >
                                        close
                                      </v-icon>
                                    </v-btn>
                                  </div>
                                </v-row>
                              </v-img>
                            </v-card>
                          </v-hover>
                        </template>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    Video
                  </v-card-title>
                  <v-container fluid>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="videoUrl" label="Youtube URL" />
                      </v-col>
                      <v-col cols="2">
                        <v-btn
                          color="green darken-1"
                          text
                          @click="onClickAddVideo()"
                        >
                          ADD
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="d-flex flex-nowrap">
                        <template v-for="(video, index) in videoList">
                          <v-hover v-slot:default="{ hover }" :key="index">
                            <v-card
                              class="d-flex mb-6 margin-right"
                              flat
                              tile
                              :elevation="hover ? 12 : 2"
                            >
                              <v-img
                                :src="video"
                                height="74"
                                width="74"
                                aspect-ratio="1"
                                class="grey lighten-2"
                              >
                                <v-row
                                  class="fill-height flex-column"
                                  justify="space-between"
                                >
                                  <div class="align-self-end mr-3">
                                    <v-btn
                                      :class="{ 'show-btns': hover }"
                                      :color="hover ? 'red' : 'transparent'"
                                      fab
                                      elevation="0"
                                      x-small
                                      dark
                                      @click="onClickClosevideo(index)"
                                    >
                                      <v-icon
                                        :class="{ 'show-btns': hover }"
                                        color="transparent"
                                      >
                                        close
                                      </v-icon>
                                    </v-btn>
                                  </div>
                                </v-row>
                              </v-img>
                            </v-card>
                          </v-hover>
                        </template>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col>
                <v-textarea
                  v-model="movie.synopsis"
                  name="input-7-1"
                  filled
                  label="시놉시스"
                  auto-grow
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="green darken-1" text @click="showDialog = false">
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
  valid: boolean = false
  datePicker: boolean = false

  @PropSync("isShow")
  private showDialog!: boolean

  @Prop()
  private movieId!: number

  private movie: Movie = new Movie()

  private photoUrl: string = ""

  private videoUrl: string = ""

  @Watch("isShow")
  public async onDialogShow(isShow: boolean) {
    if (isShow === false) {
      return
    }
    if (this.movieId !== 0) {
      try {
        this.movie = await $axios.$get(`/movie/${this.movieId}`)
        // movieStore.addMovie(this.movie)
      } catch (error) {
        console.log(error)

        if (error.response !== undefined) {
          this.$notify({
            title: `code: ${error.response.status}`,
            type: "error",
            text: error.response.data.message
          })
        } else {
          this.$notify({
            type: "error",
            text: error
          })
        }
      }
    } else {
      this.movie = new Movie()
      ;(this.$refs.form as Vue & {
        resetValidation: () => void
      }).resetValidation()
    }
  }

  public async onClickCreateMovie() {
    if (!(this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      return
    }
    try {
      await movieStore.saveMovie(this.movie)
      this.showDialog = false
    } catch (error) {}
  }

  public onClickAddPhoto() {
    if ((this.movie.photos?.length ?? 0) > 0) {
      this.movie.photos += `,${this.photoUrl}`
    } else {
      this.movie.photos = this.photoUrl
    }
    this.photoUrl = ""
  }

  get photoList() {
    return this.movie.photos?.split(",") ?? []
  }

  public onClickClosePhoto(index: number) {
    const newPhotoList = this.movie.photos?.split(",") ?? []
    newPhotoList.splice(index, 1)
    this.movie.photos =
      newPhotoList.length === 0 ? undefined : newPhotoList.join()
  }

  public onLoadImageFailed(event: string) {
    console.log(event)
  }

  get videoList() {
    return (
      this.movie.videos?.split(",").map((url: string) => {
        return `https://i.ytimg.com/vi/${url.replace(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?/g,
          ""
        )}/default.jpg`
      }) ?? []
    )
  }

  public onClickAddVideo() {
    if ((this.movie.videos?.length ?? 0) > 0) {
      this.movie.videos += `,${this.videoUrl}`
    } else {
      this.movie.videos = this.videoUrl
    }
    this.videoUrl = ""
  }

  public onClickCloseVideo(index: number) {
    const newVideoList = this.movie.videos?.split(",") ?? []
    newVideoList.splice(index, 1)
    this.movie.videos =
      newVideoList.length === 0 ? undefined : newVideoList.join()
  }
}
</script>

<style scoped>
.fill-width {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.margin-right {
  margin-right: 12px;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
