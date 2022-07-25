import React, { Dispatch, SetStateAction } from 'react'

export interface DeliveryDateContextProps {
    nextDeliveryDateFromMaster: Date | undefined;
    nextDeliveryDateFromToday: Date | undefined;
    setDeliveryDays: Dispatch<SetStateAction<string[]>>
    setMasterReferenceDay: Dispatch<SetStateAction<Date>>
}

export interface DeliveryDateProviderPropTypes {
    children: React.ReactElement
}
