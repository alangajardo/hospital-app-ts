export interface IMenuItem {
    view: string;
    text: string;
    logout?: () => void;
}