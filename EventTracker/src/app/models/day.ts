export class Day {

    id: number;
    comment: string;
    title: string;
    rating: number;
    createDate: Date | null;
    lastUpdate: Date | null;

    constructor(id: number = 0, comment: string = '', title: string = '', rating: number = 1, createDate: Date | null = null, lastUpdate: Date | null = null ){
      this.id = id;
      this.comment = comment;
      this.title = title;
      this.rating = rating;
      this.createDate = createDate;
      this.lastUpdate = lastUpdate;
    }



}
