export type Product = {
    productId: number,
    quantity: number,
    name: string,
}

export type Item = {
    id: number,
    meta_data: [Record<string, unknown>],
    name: string,
    parent_name: string | null,
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
