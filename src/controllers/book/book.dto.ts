export interface IBookDTO {
    title: string;
    author: string;
    price: number;
    rating: number;
    image: string;
}

export interface IBookFilterDTO {
    searchBy: string;
    searchText: string;
}