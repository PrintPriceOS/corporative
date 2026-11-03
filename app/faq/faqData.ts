export interface FaqItem {
  id: string;
  role: 'author' | 'editorial' | 'printhouse' | 'paper' | 'logistics';
  questionKey: string;
  answerKey: string;
  docsUrl?: string;
  tags: string[];
}

export const FAQ_REGISTRY: FaqItem[] = [
  // =========================================================================
  // 1. INDEPENDENT AUTHORS & SELF-PUBLISHERS (AUTORES INDEPENDIENTES)
  // =========================================================================
  {
    id: 'author-preflight-spine',
    role: 'author',
    questionKey: 'faq.hub.q_author_1',
    answerKey: 'faq.hub.a_author_1',
    docsUrl: 'https://docs.printprice.pro/docs/engines/preflight-bleed-engine',
    tags: ['preflight', 'spine', 'bleed', 'pdf/x-4', 'caliper', 'geometry']
  },
  {
    id: 'author-pricing-breakdown',
    role: 'author',
    questionKey: 'faq.hub.q_author_2',
    answerKey: 'faq.hub.a_author_2',
    docsUrl: 'https://docs.printprice.pro/docs/engines/pricing-intelligence-engine',
    tags: ['pricing', 'calculator', 'setup', 'plates', 'paper-cost', 'breakdown']
  },
  {
    id: 'author-escrow-protection',
    role: 'author',
    questionKey: 'faq.hub.q_author_3',
    answerKey: 'faq.hub.a_author_3',
    docsUrl: 'https://docs.printprice.pro/docs/platform/escrow-settlement',
    tags: ['escrow', 'payment', 'guarantee', 'soft-proof', 'payout', 'trust']
  },
  {
    id: 'author-minimum-print-runs',
    role: 'author',
    questionKey: 'faq.hub.q_author_4',
    answerKey: 'faq.hub.a_author_4',
    docsUrl: 'https://docs.printprice.pro/docs/engines/pricing-intelligence-engine#digital-vs-offset',
    tags: ['minimums', 'short-runs', 'digital-toner', 'print-on-demand', 'copies']
  },
  {
    id: 'author-rgb-to-cmyk-fogra',
    role: 'author',
    questionKey: 'faq.hub.q_author_5',
    answerKey: 'faq.hub.a_author_5',
    docsUrl: 'https://docs.printprice.pro/docs/engines/preflight-bleed-engine#color-space-normalization',
    tags: ['cmyk', 'rgb', 'fogra39', 'fogra51', 'tac', 'color-profiles']
  },
  {
    id: 'author-3d-soft-proof-viewer',
    role: 'author',
    questionKey: 'faq.hub.q_author_6',
    answerKey: 'faq.hub.a_author_6',
    docsUrl: 'https://docs.printprice.pro/docs/engines/preflight-bleed-engine#3d-soft-proof',
    tags: ['mockup', '3d-viewer', 'webgl', 'virtual-imprimatur', 'preview']
  },

  // =========================================================================
  // 2. PUBLISHING HOUSES & EDITORIALS (SELLOS EDITORIALES & PRODUCCIÓN)
  // =========================================================================
  {
    id: 'editorial-multi-tiered-quotes',
    role: 'editorial',
    questionKey: 'faq.hub.q_editorial_1',
    answerKey: 'faq.hub.a_editorial_1',
    docsUrl: 'https://docs.printprice.pro/docs/engines/pricing-intelligence-engine#tiered-volume-calibration',
    tags: ['tiered-runs', 'reprints', 'bulk-ordering', 'offset-vs-digital', 'crossover']
  },
  {
    id: 'editorial-soft-proof-imprimatur',
    role: 'editorial',
    questionKey: 'faq.hub.q_editorial_2',
    answerKey: 'faq.hub.a_editorial_2',
    docsUrl: 'https://docs.printprice.pro/docs/engines/preflight-bleed-engine#soft-proof-imprimatur',
    tags: ['soft-proof', 'imprimatur', 'contract-proofing', 'iso-12647', 'rip']
  },
  {
    id: 'editorial-einvoicing-en16931',
    role: 'editorial',
    questionKey: 'faq.hub.q_editorial_3',
    answerKey: 'faq.hub.a_editorial_3',
    docsUrl: 'https://docs.printprice.pro/docs/platform/escrow-settlement#electronic-invoicing-matrix',
    tags: ['facturae', 'xrechnung', 'en16931', 'vat-moss', 'accounting', 'erp']
  },
  {
    id: 'editorial-multi-title-catalog',
    role: 'editorial',
    questionKey: 'faq.hub.q_editorial_4',
    answerKey: 'faq.hub.a_editorial_4',
    docsUrl: 'https://docs.printprice.pro/docs/platform/production-pipeline#catalog-management',
    tags: ['catalog', 'backlist', 'isbn', 'batch-quoting', 'editorial-dashboard']
  },
  {
    id: 'editorial-paper-stock-allocation',
    role: 'editorial',
    questionKey: 'faq.hub.q_editorial_5',
    answerKey: 'faq.hub.a_editorial_5',
    docsUrl: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub#reservation-locks',
    tags: ['paper-reservation', 'stock-lock', 'bulk-tonnage', 'price-stability']
  },
  {
    id: 'editorial-split-deliveries-warehousing',
    role: 'editorial',
    questionKey: 'faq.hub.q_editorial_6',
    answerKey: 'faq.hub.a_editorial_6',
    docsUrl: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine#multi-destination-dispatch',
    tags: ['split-dispatch', 'distributors', 'zeitfracht', 'vva', 'direct-to-bookstore']
  },

  // =========================================================================
  // 3. PRINTHOUSES & INDUSTRIAL NODES (IMPRENTAS & TALLERES GRÁFICOS)
  // =========================================================================
  {
    id: 'printhouse-machine-profiling',
    role: 'printhouse',
    questionKey: 'faq.hub.q_printhouse_1',
    answerKey: 'faq.hub.a_printhouse_1',
    docsUrl: 'https://docs.printprice.pro/docs/platform/printhouse-onboarding#machinery-fleet-profiling',
    tags: ['machinery', 'jdf', 'jmf', 'cip4', 'feeder-limits', 'speed-cph']
  },
  {
    id: 'printhouse-webhook-dispatch',
    role: 'printhouse',
    questionKey: 'faq.hub.q_printhouse_2',
    answerKey: 'faq.hub.a_printhouse_2',
    docsUrl: 'https://docs.printprice.pro/docs/api-reference/webhooks-and-events',
    tags: ['webhooks', 'hmac-sha256', 'dispatch', 'routing', 'api', 'ssrf']
  },
  {
    id: 'printhouse-escrow-split',
    role: 'printhouse',
    questionKey: 'faq.hub.q_printhouse_3',
    answerKey: 'faq.hub.a_printhouse_3',
    docsUrl: 'https://docs.printprice.pro/docs/platform/escrow-settlement#printhouse-88-split',
    tags: ['88-split', 'instant-payout', 'pod-release', 'settlement', 'iban']
  },
  {
    id: 'printhouse-substrate-compatibility-gate',
    role: 'printhouse',
    questionKey: 'faq.hub.q_printhouse_4',
    answerKey: 'faq.hub.a_printhouse_4',
    docsUrl: 'https://docs.printprice.pro/docs/platform/printhouse-onboarding#substrate-compatibility',
    tags: ['compatibility', 'b1-feeder', 'web-width', 'rotary', 'caliper-limits']
  },
  {
    id: 'printhouse-private-cost-protection',
    role: 'printhouse',
    questionKey: 'faq.hub.q_printhouse_5',
    answerKey: 'faq.hub.a_printhouse_5',
    docsUrl: 'https://docs.printprice.pro/docs/engines/pricing-intelligence-engine#cost-governance-isolation',
    tags: ['cost-privacy', 'hour-rates', 'commercial-margins', 'tenant-isolation']
  },
  {
    id: 'printhouse-cluster-capacity-oee',
    role: 'printhouse',
    questionKey: 'faq.hub.q_printhouse_6',
    answerKey: 'faq.hub.a_printhouse_6',
    docsUrl: 'https://docs.printprice.pro/docs/engines/routing-decision-engine#plant-oee-scoring',
    tags: ['oee', 'machine-capacity', 'sla-monitoring', 'downtime', 'scheduling']
  },

  // =========================================================================
  // 4. PAPER MANUFACTURERS & MERCHANTS (FABRICANTES Y DISTRIBUIDORES DE PAPEL)
  // =========================================================================
  {
    id: 'paper-catalog-sync',
    role: 'paper',
    questionKey: 'faq.hub.q_paper_1',
    answerKey: 'faq.hub.a_paper_1',
    docsUrl: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub#master-catalog-sync',
    tags: ['paper-variants', 'sheetfed', 'reels', 'bulk-factor', 'caliper', 'fingerprint']
  },
  {
    id: 'paper-realtime-pricing-bpe',
    role: 'paper',
    questionKey: 'faq.hub.q_paper_2',
    answerKey: 'faq.hub.a_paper_2',
    docsUrl: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub#live-tariff-broadcasting',
    tags: ['cost-per-kg', 'tonnage-tariff', 'bpe-injection', 'dynamic-pricing', 'material-price-updated']
  },
  {
    id: 'paper-fsc-traceability',
    role: 'paper',
    questionKey: 'faq.hub.q_paper_3',
    answerKey: 'faq.hub.a_paper_3',
    docsUrl: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub#environmental-custody',
    tags: ['fsc', 'pefc', 'ecolabel', 'chain-of-custody', 'sustainability', 'accreditation']
  },
  {
    id: 'paper-reel-vs-sheetfed-mechanics',
    role: 'paper',
    questionKey: 'faq.hub.q_paper_4',
    answerKey: 'faq.hub.a_paper_4',
    docsUrl: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub#continuous-reels-vs-sheets',
    tags: ['reels', 'web-offset', 'high-speed-inkjet', 'core-diameter', 'cut-sheets']
  },
  {
    id: 'paper-livonia-caliper-standard',
    role: 'paper',
    questionKey: 'faq.hub.q_paper_5',
    answerKey: 'faq.hub.a_paper_5',
    docsUrl: 'https://docs.printprice.pro/docs/engines/preflight-bleed-engine#livonia-spine-calibration',
    tags: ['livonia-reference', 'microns', 'micrometer', 'spine-accuracy', 'bulk-cm3g']
  },
  {
    id: 'paper-procurement-orders-direct',
    role: 'paper',
    questionKey: 'faq.hub.q_paper_6',
    answerKey: 'faq.hub.a_paper_6',
    docsUrl: 'https://docs.printprice.pro/docs/platform/paper-supplier-hub#automated-purchase-orders',
    tags: ['purchase-orders', 'mill-direct', 'automated-procurement', 'palletized-paper']
  },

  // =========================================================================
  // 5. LOGISTICS & TRANSPORT CARRIERS (LOGÍSTICA, PALLETS Y TRANSPORTE)
  // =========================================================================
  {
    id: 'logistics-3d-epal-cubing',
    role: 'logistics',
    questionKey: 'faq.hub.q_logistics_1',
    answerKey: 'faq.hub.a_logistics_1',
    docsUrl: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine',
    tags: ['epal', 'pallet-cubing', 'stacking-height', 'weight-distribution', 'fefco-0201']
  },
  {
    id: 'logistics-geodesic-5axis-routing',
    role: 'logistics',
    questionKey: 'faq.hub.q_logistics_2',
    answerKey: 'faq.hub.a_logistics_2',
    docsUrl: 'https://docs.printprice.pro/docs/engines/routing-decision-engine',
    tags: ['landed-cost', 'freight-scoring', 'geodesic', 'multi-plant', 'routing']
  },
  {
    id: 'logistics-cmr-pod-release',
    role: 'logistics',
    questionKey: 'faq.hub.q_logistics_3',
    answerKey: 'faq.hub.a_logistics_3',
    docsUrl: 'https://docs.printprice.pro/docs/platform/escrow-settlement#cmr-pod-verification',
    tags: ['cmr', 'pod', 'sscc-18', 'gs1-128', 'carrier-payout', 'proof-of-delivery']
  },
  {
    id: 'logistics-zeitfracht-vva-compliance',
    role: 'logistics',
    questionKey: 'faq.hub.q_logistics_4',
    answerKey: 'faq.hub.a_logistics_4',
    docsUrl: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine#distributor-compliance',
    tags: ['zeitfracht', 'vva-arvato', 'amazon-fba', 'pallet-height', 'labeling-spec']
  },
  {
    id: 'logistics-gs1-128-barcode-generation',
    role: 'logistics',
    questionKey: 'faq.hub.q_logistics_5',
    answerKey: 'faq.hub.a_logistics_5',
    docsUrl: 'https://docs.printprice.pro/docs/engines/logistics-cubing-engine#gs1-label-generation',
    tags: ['gs1-128', 'sscc-18', 'a6-labels', 'a4-delivery-note', 'barcode-scan']
  },
  {
    id: 'logistics-freight-cost-segregation',
    role: 'logistics',
    questionKey: 'faq.hub.q_logistics_6',
    answerKey: 'faq.hub.a_logistics_6',
    docsUrl: 'https://docs.printprice.pro/docs/engines/pricing-intelligence-engine#freight-decoupling',
    tags: ['freight-decoupling', 'landed-price', 'carrier-tariffs', 'clean-invoicing']
  }
];
