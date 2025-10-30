วิธีการตั้ง party ID 

prt-{type}-{running_number}

{
  // ✅ กฎการตั้ง Party ID
  // prt-[type]-[running number]
  // type:
  // - jp = juristic person
  // - po = property owner
  // - pm = property manager
  // - pb = property brokerage
  // - pg = property agent
  // - cz = customer
  // - vd = vendor
 

  parties: [
    { id: "prt-jp-001", name: "ABC Juristic Person" },
    { id: "prt-po-001", name: "Somchai Property Owner" },
    { id: "prt-cz-001", name: "Customer A" },
  ]
}