export enum Brand {
    VISA,
    MASTERCARD,
    AMERICAN_EXPRESS,
  }

export interface Tarjeta {
    _id: {
        $oid: string
    },
    brand: Brand,
    entity: string,
    createdAt: string
    updatedAt: string
}