import { Tarjeta } from "./tarjeta.interface"

export interface Cuota {
    _id: {
        $oid: string
    },
    title: string,
    value: number,
    paid: number,
    remaining: number,
    card: Tarjeta,
    createdAt: string
    updatedAt: string
}