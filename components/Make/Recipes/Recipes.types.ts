import { SupplierType } from '../../Inventory/AddInventoryModal/AddInventory.types'

export type IngredientType = {
    [ingredientName: string]: {
        name: string,
        amount: number,
        amountUnits: string,
    }
}

export type RecipeType = {
    directions: string,
    ingredients: Omit<IngredientType, 'name'>,
    productsMadeWithRecipe: string[],
    recipeName: string,
    recipeYield: string,
}

export interface SuppliersPropTypes {
    suppliers: SupplierType
}
