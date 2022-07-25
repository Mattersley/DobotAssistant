const inventoryInitialValues = {
  alertAtStockLevel: 0,
  category: '',
  formatSize: 1,
  formatUnits: '',
  itemName: '',
  inUse: true,
  expirationDate: Date.now() as unknown as Date,
  expirationQuantity: 0,
  parLevel: 1,
  partOf: [''],
  perishable: false,
  perDough1Donut: 0,
  perDough2Donut: 0,
  processesInto: [''],
  stockLevel: 0,
  supplierName: '',
  supplierContactName: '',
  supplierContactEmail: '',
  supplierContactPhone: '',
  supplierCost: 0,
  supplierLeadTime: 0,
  supplierLeadTimeUnits: '',
  supplierUrl: '',
  supplierShippingCost: 0,
  supplierShippingNotes: '',
}

export default inventoryInitialValues
