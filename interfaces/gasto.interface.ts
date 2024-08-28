export interface Gasto {
    _id: {
        $oid: string
    },
    title: string,
    value: number,
    createdAt: string
    updatedAt: string
}