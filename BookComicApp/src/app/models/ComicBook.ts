export class ComicBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  price: number;

  constructor() {
    this.id = 0;
    this.title = '';
    this.author = '';
    this.genre = '';
    this.publicationDate = new Date();

    this.price = 0; 
  }
}
