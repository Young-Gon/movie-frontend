export default class Movie {
  public id: number = 0
  public title: string = ""
  public date: string = ""
  public userRating: number = 0
  public audienceRating: number = 0
  public reviewerRating: number = 0
  public reservationRate: number = 0
  public reservationGrade: number = 0
  public grade: number = 0
  public duration: number = 0
  public audience: number = 0
  public dislike: number = 0
  public titleEng?: string
  public thumb?: string
  public image?: string
  public photos?: string
  public videos?: string
  public genre?: string
  public synopsis?: string
  public director?: string
  public actor?: string
}
