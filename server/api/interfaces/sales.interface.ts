import { BaseInterface } from './base.interface';

export interface CreateSales extends BaseInterface {
    userName?: string;
    amount?: number;
    date?: string;
}
