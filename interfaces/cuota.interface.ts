import { Tarjeta } from "./tarjeta.interface"

export interface Cuota {
    _id: string,
    title: string,
    value: number,
    paid: number,
    qty: number,
    card?: Tarjeta,
    createdAt: string
    updatedAt: string
}