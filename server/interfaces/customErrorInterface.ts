export interface CustomErrorInterface extends Error {
    status?: number;
    title?: string;
    message: string;
}