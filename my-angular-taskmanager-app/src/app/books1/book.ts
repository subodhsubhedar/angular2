import { Subject } from './../subject/subject';


export class Book {
    bookId: number;
    title: string;
    price: number;
    volume: number;
    publishDate: Date;
    subject: Subject;

    constructor(bookId: number, title: string, price: number, volume: number, publishDate: Date, subject: Subject) {
        this.bookId = bookId;
        this.title = title;
        this.price = price;
        this.volume = volume;
        this.publishDate = publishDate;
        this.subject = subject;
    }
    
    public toString(): string {
        return "[ bookId:" + this.bookId + "  title:" + this.title + "  publishDate:" + this.publishDate + "  price:" + this.price + "  volume:" + this.volume + "  subject:" + this.subject + "  ]";
    }

}