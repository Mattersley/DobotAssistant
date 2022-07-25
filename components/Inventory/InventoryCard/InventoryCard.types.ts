import { SupplierType } from '../AddInventoryModal/AddInventory.types'

interface InventoryCardPropTypes {
    item: [
        name: string,
        details: {
            category: string[],
            expirationDate: {seconds: number, nanoseconds: number},
            expiresIn: string,
            formatSize: number,
            formatUnits: string,
            inUse: true,
            manufacturer: string,
            parLevel: number,
            partOf: string[],
            perDough1Donut: number,
            perDough2Donut: number,
            perishable: boolean,
            processesInto: string[],
            suppliers: SupplierType,
            stockLevel: number,
        }
    ]
}

export default InventoryCardPropTypes
