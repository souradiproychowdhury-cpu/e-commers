# FORMA — Objects for Everyday Living

A complete, professional full-stack e-commerce web application for **FORMA — Objects for Everyday Living**.

- **Frontend:** HTML, CSS, vanilla JavaScript (responsive, premium minimalist UI)
- **Backend:** Node.js + Express JavaScript APIs
- **Database:** PostgreSQL
- **Core features:** product catalogue from database, search/filter, cart with `localStorage` persistence, server-validated checkout, secure server-side price calculation, stock verification and updates, order persistence

---

## 1. Project structure

```text
.
├─ db/
│  ├─ schema.sql            # PostgreSQL schema (products, orders)
│  └─ seed.sql              # Sample seed data (8 premium products)
├─ public/
│  ├─ css/
│  │  └─ styles.css         # Responsive UI styles and animations
│  ├─ js/
│  │  └─ app.js             # Frontend app logic (catalogue, cart, checkout)
│  └─ index.html            # Main single-page storefront UI
├─ server/
│  ├─ routes/
│  │  ├─ products.js        # GET /api/products
│  │  └─ orders.js          # POST /api/orders
│  ├─ utils/
│  │  └─ validation.js      # Checkout validation and shipping calculation helpers
│  ├─ db.js                 # PostgreSQL pool/connection helper
│  └─ index.js              # Express app entrypoint, API + static hosting
├─ .env.example             # Environment variable template
├─ .gitignore
├─ package.json
└─ README.md
```

---

## 2. Features implemented

### Frontend
- Responsive navigation bar with mobile menu
- Hero section with promotional content and highlights
- Product catalogue loaded from backend API
- Product search (name/description/category text)
- Category filtering
- Product cards with premium imagery, prices, badges, and stock status
- Add-to-cart functionality
- Shopping cart drawer
- Increase/decrease product quantity and remove products from cart
- Cart persistence using `localStorage` (`forma_cart_v1`)
- Checkout form with client-side validation and loading/error states
- Order confirmation view with server-returned order details
- Newsletter section with email validation feedback
- Footer and fully responsive desktop/tablet/mobile layouts
- Warm off-white background, charcoal typography, muted sage-green accents
- Playfair Display + DM Sans typography, smooth animations and hover effects

### Backend (JavaScript APIs)
- `GET /api/products` — fetches products from PostgreSQL
- `POST /api/orders` — places an order with full server-side checks
- Validates checkout details (name, email, address, city, postal code, cart items)
- Verifies product existence and stock availability in a database transaction (`SELECT ... FOR UPDATE`)
- **Calculates actual order price on the server** from database product prices (client totals are not trusted)
- Updates stock after successful orders
- Saves order details in PostgreSQL (`orders` table, including itemized JSON)
- Graceful API error responses and health endpoint (`GET /api/health`)

### Business rules
- **Free shipping above $100** (subtotal >= $100.00)
- **$7.50 shipping below $100** (subtotal < $100.00)
- Subtotal, shipping, and total are calculated and returned by the server

### Database (PostgreSQL)
- `products` table: `id, name, category, description, price, image_url, badge, stock, created_at`
- `orders` table: `id, customer_name, email, address, city, postal_code, items, subtotal, shipping, total, status, created_at`
- Seed data includes **8 sample products** with premium Unsplash imagery

---

## 3. Prerequisites

- **Node.js** 18+ (tested with Node 24 in development environment)
- **npm** 9+ (or compatible npm for your Node version)
- **PostgreSQL** 13+ (server + client tools such as `psql` recommended)

> Note: `psql` CLI is required for the provided `npm run db:setup` script. If unavailable, you can run the SQL files using pgAdmin, DBeaver, or another PostgreSQL client.

---

## 4. Local setup and run instructions

### 4.1 Install dependencies
```bash
npm install
```

### 4.2 Configure environment variables
Create a `.env` file in the project root (you can copy from `.env.example`):

```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit `.env` as needed:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/forma
```

You can also use individual `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` variables if `DATABASE_URL` is not set.

### 4.3 Create database and load schema/seed data

#### Option A: using `psql` (recommended)
1. Create the database (if it does not exist):
   ```bash
   createdb -U postgres forma
   ```
   or in `psql`:
   ```sql
   CREATE DATABASE forma;
   ```

2. Run schema and seed scripts:
   ```bash
   psql -U postgres -d forma -f db/schema.sql
   psql -U postgres -d forma -f db/seed.sql
   ```

   If your Postgres user/database differ, adjust the command accordingly.

#### Option B: run SQL files manually
Execute `db/schema.sql` first, then `db/seed.sql` in your PostgreSQL client connected to the `forma` database.

### 4.4 Start the application
```bash
npm start
```

For development with auto-restart (Node watch mode):
```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

- Frontend UI: `http://localhost:3000/`
- Products API: `http://localhost:3000/api/products`
- Health check: `http://localhost:3000/api/health`

---

## 5. API reference

### `GET /api/products`
Returns all products from the database.

**Success response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Arc Stoneware Vase",
      "category": "Ceramics",
      "description": "...",
      "price": 68,
      "image_url": "https://...",
      "badge": "Bestseller",
      "stock": 24,
      "created_at": "..."
    }
  ]
}
```

### `POST /api/orders`
Creates an order after validation, stock checks, and server-side price calculation.

**Request body:**
```json
{
  "customerName": "Jane Doe",
  "email": "jane@example.com",
  "address": "123 Market Street",
  "city": "San Francisco",
  "postalCode": "94103",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 5, "quantity": 1 }
  ]
}
```

**Success response (201):**
```json
{
  "message": "Order placed successfully.",
  "order": {
    "id": 42,
    "status": "confirmed",
    "customerName": "Jane Doe",
    "email": "jane@example.com",
    "address": "123 Market Street",
    "city": "San Francisco",
    "postalCode": "94103",
    "items": [
      {
        "productId": 1,
        "name": "Arc Stoneware Vase",
        "unitPrice": 68,
        "quantity": 2,
        "lineTotal": 136,
        "imageUrl": "https://..."
      }
    ],
    "subtotal": 136,
    "shipping": 0,
    "total": 136,
    "createdAt": "2026-..."
  }
}
```

**Validation/error cases:**
- `400` invalid checkout details or unavailable product IDs
- `409` insufficient stock for one or more items
- `500` server/database error

---

## 6. Manual testing checklist

With PostgreSQL running and seed data loaded:

1. **Catalogue load:** open `/` and confirm products load from `GET /api/products` (no static hardcoded catalogue).
2. **Search:** type in search box and verify results filter by name/description/category.
3. **Category filter:** switch categories and verify grid updates.
4. **Add to cart:** add items from product cards; cart count and drawer update.
5. **Cart controls:** increase/decrease quantity, remove items, and verify totals update.
6. **Cart persistence:** refresh the page and confirm cart remains via `localStorage`.
7. **Shipping rule:** verify subtotal < $100 => $7.50 shipping, subtotal >= $100 => free shipping.
8. **Checkout validation:** submit empty/invalid fields and confirm user-facing validation errors.
9. **Successful order:** submit valid checkout details with in-stock items.
   - Expect order confirmation with server-calculated totals
   - Confirm stock decreased in database/UI after refresh
10. **Stock/availability enforcement:** attempt to order more than available stock and confirm `409`/error message.
11. **Newsletter:** submit invalid and valid emails to confirm feedback messages.
12. **Responsive UI:** verify layout on desktop, tablet, and mobile widths.

### Quick API smoke tests (PowerShell examples)
```powershell
# Health check
Invoke-RestMethod http://localhost:3000/api/health

# Products
Invoke-RestMethod http://localhost:3000/api/products

# Place order (adjust ids/quantities based on available stock)
$body = @{
  customerName = "Test Customer"
  email = "test@example.com"
  address = "123 Example Street"
  city = "Austin"
  postalCode = "73301"
  items = @(@{ productId = 1; quantity = 1 })
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/orders -ContentType 'application/json' -Body $body
```

---

## 7. Deployment instructions

The app is a Node.js Express server that serves both the API and static frontend from the same process, which makes it compatible with Hatchable-style Node hosting and other platforms (Render, Railway, Fly.io, Heroku-like PaaS, VPS, etc.).

### 7.1 Hatchable / compatible Node hosting (general)
1. **Provision PostgreSQL** (managed Postgres preferred) and note the connection string.
2. **Upload/deploy the source code** repository contents.
3. **Set environment variables** in the hosting platform:
   - `DATABASE_URL` = your hosted PostgreSQL connection string
   - `NODE_ENV` = `production`
   - `PORT` = platform-provided port if required (the app reads `process.env.PORT`)
   - `PGSSLMODE=require` if your provider requires SSL (the app enables SSL handling for production/require mode)
4. **Build/install step:** `npm install`
5. **Database initialization (one-time):** run `db/schema.sql` then `db/seed.sql` against the hosted database.
   - Via platform shell: `psql "$DATABASE_URL" -f db/schema.sql && psql "$DATABASE_URL" -f db/seed.sql`
   - Or use your provider's SQL console/query tool to execute both files in order
6. **Start command:** `npm start`
7. **Verify after deploy:**
   - `GET /api/health` returns `{ "status": "ok" }`
   - Homepage loads and product catalogue is populated from the database
   - Place a test order to confirm stock updates and order persistence

### 7.2 Production notes
- The backend recalculates prices/totals and verifies stock in a transaction before saving orders.
- For managed Postgres providers that require TLS, set `PGSSLMODE=require` or run in production with a compatible `DATABASE_URL`.
- If hosting frontend and backend on different origins, CORS is already enabled in the API server; update frontend fetch URLs accordingly if you split deployments.
- Use strong database credentials and never commit `.env` files.

### 7.3 Example (Render/Railway-style settings)
- **Runtime:** Node
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Env vars:** `DATABASE_URL`, `NODE_ENV=production`, (`PORT` usually auto-injected)
- **Post-deploy DB setup:** run `db/schema.sql` and `db/seed.sql` once

---

## 8. Notes on implementation quality

- Server-side source of truth for pricing: checkout totals are computed from database product prices.
- Stock checks and stock decrements occur in a transaction to reduce race-condition risk.
- Frontend includes loading and error states for product fetch and checkout submission.
- Cart persists in browser `localStorage` and is reconciled against latest product data on load.
- Form validation is implemented on both client (UX) and server (security/correctness).
- No placeholder/non-functional UI actions were added intentionally.

---

## 9. License

This project is provided as source code for the FORMA e-commerce implementation task.
