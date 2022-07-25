import { KeyedMutator } from 'swr'
import { AxiosResponse } from 'axios'
import React, { Dispatch, SetStateAction } from 'react'

import { Order } from '../../components/Orders/Order.types'

export interface OrderContextProps {
    deliveryDaysOfOrders: string[] | undefined,
    setGetCoordinatesAndOptimisation: (bool: boolean) => void,
    mutate: KeyedMutator<AxiosResponse>,
    optimisationString: string,
    orders: Order[] | AxiosResponse,
    ordersByDeliveryDate: {[deliveryDate: string]: {
            [orderNumber: number]: Order }} | undefined,
    ordersForNextDeliveryDay: Order[] | undefined,
    routeInfo: {[deliveryDate: string]: {
            waypoints: {
                distance: number,
                name: string,
                location: number[],
                waypoint_index: number,
                trips_index: number
            },
            trips: {
            [tripName: string]: {
                distance: number,
                duration: number,
                geometry: string,
                legs: {
                [leg: number]: {
                    distance: number,
                    duration: number,
                    steps: {[step: number]: {
                        distance: number,
                            driving_side: string,
                            duration: number,
                            geometry: string,
                            intersections: {[intersection: number]: {bearings: number[], entry: boolean[], location: number[], out: number}},
                            maneuver: {
                            bearing_after: number,
                                bearing_before: number,
                                instruction: string,
                                location: number[],
                                modifier: string,
                                type: string,
                            },
                            mode: string,
                            name: string,
                            weight: number
                        }},
                    summary: string,
                    weight: number
                }
            },
                weight: number,
                weight_name: string
            }
        }
    }} | undefined,
}

export interface OrderProviderPropTypes {
    children: React.ReactElement
}

export interface OrderProviderStateTypes {
    deliveryDays: [string[] | undefined, Dispatch<SetStateAction<string[] | undefined>> ]
    getCoordinatesAndOptimisation: [boolean, Dispatch<SetStateAction<boolean>>]
    optimisationString: [OrderContextProps['optimisationString'], Dispatch<SetStateAction<OrderContextProps['optimisationString']>>]
    ordersByDeliveryDate: [OrderContextProps['ordersByDeliveryDate'], Dispatch<SetStateAction<OrderContextProps['ordersByDeliveryDate']>>]
    ordersForNext: [Order[] | undefined, Dispatch<SetStateAction<Order[] | undefined>>]
    routeInfo: [OrderContextProps['routeInfo'], Dispatch<SetStateAction<OrderContextProps['routeInfo']>>]
}
