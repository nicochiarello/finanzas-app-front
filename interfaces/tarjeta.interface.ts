export enum Brand {
    VISA,
    MASTERCARD,
    AMERICAN_EXPRESS,
  }

export interface Tarjeta {
    _id: string,
    brand: Brand,
    entity: string,
    createdAt: string
    updatedAt: string
}