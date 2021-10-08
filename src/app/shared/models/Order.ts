export interface Order {
    artistName: string;
    album: string;
    image: string;
    orderType: string;
    trackingUrl: string;
    trackingNum?: string; 
    date?: Date,
    variant?: string;
    late?: boolean;
    afId?: string;
}