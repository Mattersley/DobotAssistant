export type Order = {
    _links: { [key: string]: [{ href: string }] },
    billing: {
        address_1: string
        address_2: string
        city: string
        company: string
        country: string
        email: string
        first_name: string
        last_name: string
        phone: string
        postcode: string
        state: string
    },
    cart_hash: string,
    cart_tax: string,
    coordinates?: { lat: number, lng: number } | null,
    coupon_lines: [{
        code: string,
        discount: string,
        discount_tax: string,
        id: number,
        meta_data: [Record<string, unknown>]
    }],
    created_via: string,
    currency: string,
    currency_symbol: string,
    customer_id: number,
    customer_ip_address: string,
    customer_note: string,
    customer_user_agent: string,
    date_completed: Date,
    date_completed_gmt: Date,
    date_created: Date,
    date_created_gmt: Date,
    date_modified: Date,
    date_modified_gmt: Date,
    date_paid: Date,
    date_paid_gmt: Date,
    discount_tax: string,
    discount_total: string,
    encodedAddress?: string,
    fee_lines: [{
        amount: number,
        id: number,
        meta_data: Record<string, unknown>,
        name: string,
        tax_class: string,
        tax_status: string,
        taxes: Record<string, unknown>,
        total: number,
        total_tax: number
    }],
    id: number,
    line_items: [
        {
            id: number,
            meta_data: [Record<string, unknown>],
            name: string,
            parent_name: string,
            price: number,
            product_id: number,
            quantity: number,
            sku: string,
            subtotal: string,
            subtotal_tax: string,
            tax_class: string,
            taxes: [],
            total: string,
            total_tax: string,
            variation_id: number,
        }
    ],
    meta_data: [Record<string, unknown>],
    number: string,
    order_key: string,
    parent_id: number,
    payment_method: string,
    payment_method_title: string,
    prices_include_tax: boolean,
    refunds: [Record<string, unknown>],
    shipping: {
        address_1: string
        address_2: string
        city: string
        company: string
        country: string
        first_name: string
        last_name: string
        phone: string
        postcode: string
        state: string
    },
    shipping_lines: [Record<string, unknown>],
    shipping_tax: string,
    shipping_total: string,
    status: string,
    tax_lines: [],
    total: string,
    total_tax: string,
    transaction_id: string,
    version: string,
}

export interface OrderData {
    data: {
        data: Order[]
    }
}
