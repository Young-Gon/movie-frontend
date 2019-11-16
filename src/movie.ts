export default class Movie {
    constructor(
        public id: number,
        public title: string,
        public titleEng: string,
        public userRating: number,
        public audienceRating: number,
        public reviewerRating: number,
        public reservationRate: number,
        public reservationGrade: number,
        public grade: number,
        public duration: number,
        public audience: number,
        public dislike: number,
        public date?: string,
        public thumb?: string,
        public image?: string,
        public photos?: string,
        public videos?: string,
        public genre?: string,
        public synopsis?: string,
        public director?: string,
        public actor?: string
    ){}
}