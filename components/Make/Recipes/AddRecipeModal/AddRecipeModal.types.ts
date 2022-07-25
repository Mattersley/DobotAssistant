import { Dispatch, SetStateAction } from 'react'
import { IngredientType } from '../Recipes.types'

export interface AddRecipeModalTypes {
    props: {
        open: boolean,
        setOpen: (boolean: boolean) => void,
    },
    state: {
        count: [number, Dispatch<SetStateAction<number>>]
        state: [IngredientType[], Dispatch<SetStateAction<IngredientType[]>>]
        values: [AddRecipeModalTypes['values'], Dispatch<SetStateAction<AddRecipeModalTypes['values']>>]
    }
    values: {
        recipeName: string,
        recipeYield: string,
        directions: string,
        [productOrIngredient: string]: string,
    }
}
