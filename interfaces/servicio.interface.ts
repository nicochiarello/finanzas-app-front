export interface Servicio {
    _id: {
        $oid: string
    },
    title: string,
    value: number,
    createdAt: string
    updatedAt: string
}