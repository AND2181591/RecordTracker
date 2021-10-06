export interface Order {
    artistName: string;
    album: string;
    image: string;
    orderType: string;
    trackingUrl: string;
    trackingNum?: string; 
    date?: Date,
    late?: boolean;
    afId?: string;
}

// {
//     day: number, 
//     month: number, 
//     year: number
// }