const TEMPLATE_PRODUCTS = [
  {
    id: 1,
    name: "Double-Faced Cashmere Wrap Coat",
    category: "Atelier Line",
    description: "Architectural outerwear cut from double-faced virgin cashmere for fluid drape and quiet structure. A signature atelier silhouette for the season.",
    price: 78000,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAocnrYg9nnd0lMcekteOASd06EVZgxbe8bp4KVwLb7Qa1Lwc-k4eEPQEZWBHWQlM-2R12kiHDxkI6heF_H4hzQZrybNWhawCmbomC5L8PwXjyfEHSXlANQQj8NwOKnLKrPYgtM-3kM09vaxu5374F3kH4Jh1ZuuEx-3VpUrQbC_uBBrI-kQRdZR7s0HPmh2BTQu90oGjyGeMc_x0Jo3lqs0qHfn143eIO1kZ4l4Y2r=s1600",
    badge: "New Season",
    stock: 8,
    created_at: "2026-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Draped Silk Blouse",
    category: "Atelier Line",
    description: "An ivory silk blouse with sculptural drape and asymmetrical ease, designed for luminous day-to-evening dressing.",
    price: 29800,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXsEF8viRgxl-8Lres3osl5q0iD7Lfa0FCjNth2he3X3fFV_Xivyb4jJ8xS4aIHjn0DDTIzB-YVBKG1I6PxiQxSnU0s7zpVBVr54-0oQdzqSTSawNEWfFAc-DlMAVh41L-cY81xWReGJMhjzM7I4SwNSWoORjQBpYZ3-uEFZJoOPFnXlzrb23OaZXhYerOSkfmOgUFKOd459cel_3LALla0ozqcl1razuc228Zj3QT=s1600",
    badge: null,
    stock: 12,
    created_at: "2026-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "High-Waist Tailored Trousers",
    category: "Sartorial",
    description: "Tailored high-waist trousers in espresso wool with sharp pleats and a clean, elongating line.",
    price: 36000,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi9BRVQYILL90TK_Fhmc9EYHwv9ZMX_n2HBuduKHtnLGFdwgSQ_1z6BCIgnfE2GvIVPXTqgt7THEkAkBcXWexkRh2ppbNOTgzPK50jdLnyVyiInHVhdlLI7PsFdY3PuHz41ZDJE5mV3_9GHGA_IQpyQ1hs2Bi9OQgqvYlcjiOODhoCrruVToz8Jd5vICD0VDOIOsxI8zOespMhK6RzdmwVDBMju3xrx-PUHKvkM4Oi=s1600",
    badge: null,
    stock: 10,
    created_at: "2026-01-03T00:00:00.000Z"
  },
  {
    id: 4,
    name: "Structured Leather Tote",
    category: "Leathergoods",
    description: "A structured terracotta leather tote with refined hardware and gallery-grade presence for daily carry.",
    price: 64000,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7kofpv3SUEdjZgJGKNy9zMDzHIT0E1IhX8Lcz-v4_y50ifg3A9sH5tCQ1lbqhTuMIZDDbz8HKzgAnKOfpeIBSCRSexf1_RhO7E1r6Q-yipDyJXfjK0T3P-GX2x86yiHa6DEq-NkYwGU40kWbBRaA-LlG3hnTocwPKjNREB5hfeOBzb1u-5p4O2lwJx2y0gQv9RcGVCJCFhPNbRdw8uwQI4pk_bDJ_KvgXMDeSZp8I=s1600",
    badge: "Exclusive",
    stock: 6,
    created_at: "2026-01-04T00:00:00.000Z"
  },
  {
    id: 5,
    name: "Merino Ribbed Turtleneck",
    category: "Knitwear",
    description: "Ultra-fine ribbed merino wool turtleneck in slate grey with a close, tactile hand and elevated ease.",
    price: 24500,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrf_NHB--sotonIdbhO6CSqWE9LGMe6AAuSqFQLRxG8qGooOTtp4lCEJ3pOD7UhnUswiknaeGSqFcW9aKA3BcRwFZ4yduXLCykGsT5LeHoPIKnJdGwPXHxxL4_uloei0p7IfWFxC5sfoCqkdAbH0Uad-IhkUsA_05kYThGOhfSDRQ3FJphvPnCRGv7Egd83b_bxy3mnwdtdaMTU8hofkDeJnrMMgL7MOO7XUt00Knn=s1600",
    badge: null,
    stock: 15,
    created_at: "2026-01-05T00:00:00.000Z"
  },
  {
    id: 6,
    name: "Brushed Mohair Cardigan",
    category: "Knitwear",
    description: "Brushed mohair maxi cardigan in warm ginger terracotta with soft volume and a luminous finish.",
    price: 46000,
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-dEnZCD5FLBq_CfnzpSW3Pv9pjHrdZrkZUafk9J4xPYE4_iNv0iA2-KZYesRdItt-DHcqqDDWloqV4ZzEyIIQoMTGP5LFMr9z8V8bRXWRUEIUjPbAqU79wENX_3JDPvHBCoTKCX8P8kqVwjK9Z3VrpDufz_QTzKxcsGGyoAcXWfoLKADHKJOaCjUBPirT1MGe9Zv7cdV7XjEukbZxVYYAPjDF9Ur1rTOmPMpIgAsX=s1600",
    badge: "Low Stock",
    stock: 2,
    created_at: "2026-01-06T00:00:00.000Z"
  }
];

const products = TEMPLATE_PRODUCTS.map((product) => ({ ...product }));
let nextOrderId = 9000;

function normalizeMessage(error) {
  if (!error) return "Unknown database error";
  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors.map((item) => item.message || String(item)).join("; ");
  }
  return error.message || String(error);
}

function isDbConnectionError(error) {
  if (!error) return false;
  if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND" || error.code === "ETIMEDOUT") {
    return true;
  }
  if (error.code === "28P01" || error.code === "3D000") {
    return true;
  }
  const message = normalizeMessage(error).toLowerCase();
  if (
    message.includes("connect") ||
    message.includes("connection") ||
    message.includes("password authentication failed") ||
    message.includes("database") && message.includes("does not exist")
  ) {
    return true;
  }
  if (Array.isArray(error.errors)) {
    return error.errors.some(isDbConnectionError);
  }
  return false;
}

function getProducts() {
  return products.map((product) => ({ ...product }));
}

function getProductsByIds(ids) {
  const idSet = new Set(ids.map((id) => Number(id)));
  return products.filter((product) => idSet.has(Number(product.id))).map((product) => ({ ...product }));
}

function decrementStock(updates) {
  for (const update of updates) {
    const updateId = Number(update.productId ?? update.id);
    const product = products.find((item) => Number(item.id) === updateId);
    if (!product) {
      throw new Error(`Product ${updateId} not found in fallback store.`);
    }
    if (Number(product.stock) < Number(update.quantity)) {
      throw new Error(`Insufficient stock for ${product.name}.`);
    }
  }
  for (const update of updates) {
    const updateId = Number(update.productId ?? update.id);
    const product = products.find((item) => Number(item.id) === updateId);
    product.stock -= Number(update.quantity);
  }
}

function createOrderRecord(payload) {
  nextOrderId += 1;
  const customer = payload.customer || {};
  const order = {
    id: nextOrderId,
    customer_name: payload.customer_name || payload.customerName || customer.fullName || '',
    email: payload.email || customer.email || '',
    address: payload.address || customer.address || '',
    city: payload.city || customer.city || '',
    postal_code: payload.postal_code || payload.postalCode || customer.postalCode || '',
    items: payload.items || [],
    subtotal: payload.subtotal,
    shipping: payload.shipping,
    total: payload.total,
    status: payload.status || "confirmed",
    created_at: new Date().toISOString(),
  };
  return order;
}

module.exports = {
  isDbConnectionError,
  getProducts,
  getProductsByIds,
  decrementStock,
  createOrderRecord,
};

