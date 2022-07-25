import React from 'react'
import { AddInventoryTypes } from '../../components/Inventory/AddInventoryModal/AddInventory.types'
import InventoryCardPropTypes from '../../components/Inventory/InventoryCard/InventoryCard.types'

export interface setInventoryItemPropTypes {
    data: Omit<AddInventoryTypes, 'itemName'>,
    name: AddInventoryTypes['itemName']
}

export interface InventoryContextProps {
    items: InventoryCardPropTypes,
    deleteInventoryItem: (item: string) => void,
    refreshInventory: () => void,
    setInventoryItem: ({ data, name }: setInventoryItemPropTypes) => Promise<void>,
    updateInventory: (itemName: string, edits: Record<any, any>) => void
}

export interface InventoryProviderPropTypes {
    children: React.ReactElement
}
