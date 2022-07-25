import React, { Dispatch, SetStateAction } from 'react'
import { RecipeType } from '../../components/Make/Recipes/Recipes.types'
import { Product } from '../../components/Make/Counts/DonutTotals/DonutTotals.types'

export interface setRecipePropTypes {
    data: { ingredients: Record<string, string | number | { amount: number; amountUnits: string; }> }
    name: RecipeType['recipeName']
}

export interface DoughCountTypes {
    doughCount: { [p: string]: number } | undefined,
    state: [
        doughCount: { [dough: string]: number } | undefined,
        setDoughCount: Dispatch<SetStateAction<{ [dough: string]: number } | undefined>>
    ],
    doughTypes: {
        [id: number]: string
    }
    returnTypes: {
        doughCount: { [p: string]: number } | undefined,
    }
}

export interface MakeProviderPropTypes {
    children: React.ReactElement
}

export interface MakeContextProps {
    addRecipe: ({ data, name }: setRecipePropTypes) => Promise<void>,
    deleteRecipe: (recipe: string) => void,
    donutTotals: Product[] | undefined,
    doughCount: { [p: string]: number } | undefined,
    featureDonutName: string,
    featureDoughType: string,
    setFeatureDoughType: (dough: string) => void,
    recipes: RecipeType[],
    refreshRecipes: () => void,
    updateRecipes: (recipeName: string, edits: Record<any, any>) => void
}
