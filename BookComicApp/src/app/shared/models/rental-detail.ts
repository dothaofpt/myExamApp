import { Rental } from './rental';
import { ComicBook } from './comic-book';

export class RentalDetail {
  RentalDetailID: number = 0;
  RentalID: number = 0;
  ComicBookID: number = 0;
  Quantity: number = 0;
  PricePerDay: number = 0;
  Rental: Rental = new Rental();
  ComicBook: ComicBook = new ComicBook();
}
