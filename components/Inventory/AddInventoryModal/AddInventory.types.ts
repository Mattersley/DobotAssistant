export interface AddInventoryPropTypes {
    open: boolean,
    setOpen: (boolean: boolean) => void
}

export interface SupplierTypes {
    supplierName: string,
    supplierContactName: string,
    supplierContactEmail: string,
    supplierContactPhone: string,
    supplierCost: number,
    supplierLeadTime: number,
    supplierLeadTimeUnits: 'days' | 'weeks' | 'months' | 'years' | string,
    supplierUrl: string,
    supplierShippingCost: number,
    supplierShippingNotes: string,
}

export interface SupplierType {
    [supplierName: string]: Omit<SupplierTypes, 'supplierName'>
}

export interface AddInventoryTypes {
    alertAtStockLevel: number,
    category: string[] | string,
    formatSize: number,
    formatUnits: 'millilitres' | 'litres' | 'grams' | 'milligrams' | 'units' | string,
    itemName: string,
    inUse: boolean,
    expirationDate: Date,
    expirationQuantity: number,
    parLevel: number,
    partOf: string[],
    perishable: boolean,
    perDough1Donut: number,
    perDough2Donut: number,
    processesInto: string[],
    stockLevel: number,
    suppliers: SupplierType
}

export type AddInventoryValueTypes = Omit<AddInventoryTypes, 'suppliers'> & SupplierTypes & {category: string}

export interface PagePropTypes {
    handleChange: (event: {target: {name: string, value: string}}) => void,
    handleSubmit: () => void,
    setPage: (pageNumber: number) => void
}

export interface AddInventorySuccessPropTypes {
    setOpen: (boolean: boolean) => void,
    setPage: (pageNumber: number) => void,
    setSuccess: (boolean: boolean) => void,
}
