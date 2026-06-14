# SugarScan Database Schema Documentation

## Overview
Complete MySQL 8.0 database schema for the SugarScan application, implemented using Sequelize ORM with migrations and seeders.

## Architecture Summary
- **ORM**: Sequelize 6.x
- **Database**: MySQL 8.0
- **Timezone**: Indian Standard Time (IST +05:30)
- **Connection Pooling**: Enabled for production
- **Migrations**: 6 sequential migrations for table creation
- **Seeders**: 1 comprehensive seeder with 50 Indian food products

---

## Table Specifications

### 1. users (Table)
**Purpose**: Store user account information and health profile data

**Columns**:
| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY, DEFAULT UUIDV4 | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email validation enforced |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed (12 rounds) |
| name | VARCHAR(100) | NOT NULL | User full name |
| phone | VARCHAR(15) | NULL | Optional phone number |
| date_of_birth | DATE | NULL | Used for age-based AI recommendations |
| diabetes_type | ENUM | DEFAULT 'none' | 'none', 'pre-diabetic', 'type1', 'type2' |
| weight_kg | DECIMAL(5,1) | NULL | User weight in kilograms |
| height_cm | DECIMAL(5,1) | NULL | User height in centimeters |
| preferred_language | ENUM | DEFAULT 'en' | 'en', 'hi', 'ta', 'te', 'bn' |
| daily_sugar_goal_tsp | DECIMAL(4,1) | DEFAULT 6.0 | WHO recommended limit: 6 tsp/day |
| is_admin | BOOLEAN | DEFAULT FALSE | Admin privilege flag |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last modification time |

**Indexes**: 
- Primary Key: id
- Unique: email

**Relationships**:
- hasMany: Scan (cascade on delete → SET NULL)
- hasMany: ManualEntry (cascade on delete → CASCADE)
- hasMany: Conversation (cascade on delete → CASCADE)

---

### 2. products (Table)
**Purpose**: Store packaged food product nutritional and barcode data

**Columns**:
| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY, DEFAULT UUIDV4 | Product identifier |
| barcode | VARCHAR(50) | UNIQUE, NULL | EAN-13/EAN-8 format, nullable for manual entries |
| name | VARCHAR(255) | NOT NULL | Product display name |
| brand | VARCHAR(150) | NULL | Manufacturer name |
| category | VARCHAR(100) | NULL | e.g., "Biscuits", "Cold Drinks", "Namkeen" |
| serving_size_grams | DECIMAL(7,2) | NULL | Default serving size in grams |
| total_sugar_per_100g | DECIMAL(7,2) | NULL | Total sugar content (g) per 100g |
| added_sugar_per_100g | DECIMAL(7,2) | NULL | Added sugar (g) per 100g |
| ingredients_text | TEXT | NULL | Full ingredients list |
| image_url | VARCHAR(500) | NULL | Product image URL |
| data_source | ENUM | DEFAULT 'open_food_facts' | 'open_food_facts', 'admin_manual', 'user_submitted' |
| verified | BOOLEAN | DEFAULT FALSE | Verification flag for data quality |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last modification time |

**Indexes**:
- Primary Key: id
- Unique: barcode
- Index: barcode (fast scan lookups)
- Index: name (product search)

**Relationships**:
- hasMany: Scan
- hasMany: ManualEntry

**Seeded Data**: 50 popular Indian packaged food products with verified sugar content including:
- Parle-G, Britannia biscuits, Maggi noodles
- Haldiram's, Lays, Kurkure snacks
- Frooti, Maaza, Thums Up, Paper Boat beverages
- Horlicks, Bournvita, Complan health drinks
- Nutella, bread, dairy products, and more

---

### 3. scans (Table)
**Purpose**: Record barcode scans and product consumption events

**Columns**:
| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY, DEFAULT UUIDV4 | Scan event identifier |
| user_id | UUID | NULL, FK → users(id) | Null for anonymous scans |
| session_id | VARCHAR(100) | NULL | Session ID for anonymous users |
| product_id | UUID | NULL, FK → products(id) | Null if product not matched |
| barcode_raw | VARCHAR(50) | NULL | Raw scanned barcode string |
| total_sugar_tsp | DECIMAL(5,2) | NOT NULL | Calculated sugar in teaspoons |
| added_sugar_tsp | DECIMAL(5,2) | NULL | Added sugar in teaspoons |
| quantity_grams | DECIMAL(7,2) | DEFAULT 100 | Amount of product consumed |
| scanned_at | TIMESTAMP | DEFAULT NOW() | Scan timestamp |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last modification time |

**Indexes**:
- Primary Key: id
- Composite: (user_id, scanned_at) - For user history queries sorted by time
- Index: session_id - For anonymous session lookups

**Relationships**:
- belongsTo: User (optional, ON DELETE SET NULL)
- belongsTo: Product (optional, ON DELETE SET NULL)

---

### 4. manual_entries (Table)
**Purpose**: Store manually entered food items when barcode scan fails

**Columns**:
| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY, DEFAULT UUIDV4 | Entry identifier |
| user_id | UUID | NOT NULL, FK → users(id) | Owner of entry (cascade delete) |
| item_name | VARCHAR(255) | NOT NULL | User-entered food name |
| input_type | ENUM | NOT NULL | 'grams', 'bowl', 'glass', 'cup', 'piece' |
| input_amount | DECIMAL(7,2) | NOT NULL | Amount entered in selected unit |
| input_amount_grams | DECIMAL(7,2) | NOT NULL | Normalized to grams for calculation |
| total_sugar_tsp | DECIMAL(5,2) | NOT NULL | Calculated sugar in teaspoons |
| product_id | UUID | NULL, FK → products(id) | Linked product if matched |
| entered_at | TIMESTAMP | DEFAULT NOW() | Entry timestamp |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last modification time |

**Indexes**:
- Primary Key: id
- Composite: (user_id, entered_at) - For user history queries

**Relationships**:
- belongsTo: User (ON DELETE CASCADE)
- belongsTo: Product (optional, ON DELETE SET NULL)

---

### 5. ai_conversations (Table)
**Purpose**: Store AI chatbot conversation threads with metadata

**Columns**:
| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY, DEFAULT UUIDV4 | Conversation identifier |
| user_id | UUID | NOT NULL, FK → users(id) | Conversation owner (cascade delete) |
| title | VARCHAR(200) | NULL | Auto-generated from first message |
| language | ENUM | DEFAULT 'en' | 'en', 'hi', 'ta', 'te', 'bn' |
| created_at | TIMESTAMP | DEFAULT NOW() | Conversation start time |
| last_message_at | TIMESTAMP | DEFAULT NOW() | Last message timestamp |

**Indexes**:
- Primary Key: id
- Composite: (user_id, last_message_at) - For listing conversations sorted by recency

**Relationships**:
- belongsTo: User (ON DELETE CASCADE)
- hasMany: Message

---

### 6. ai_messages (Table)
**Purpose**: Store individual messages within AI conversations

**Columns**:
| Column | Type | Constraints | Notes |
|--------|------|-----------|-------|
| id | UUID | PRIMARY KEY, DEFAULT UUIDV4 | Message identifier |
| conversation_id | UUID | NOT NULL, FK → ai_conversations(id) | Parent conversation (cascade delete) |
| role | ENUM | NOT NULL | 'user' or 'assistant' |
| content | TEXT | NOT NULL | Full message text |
| created_at | TIMESTAMP | DEFAULT NOW() | Message timestamp |

**Indexes**:
- Primary Key: id
- Composite: (conversation_id, created_at) - For chronological message retrieval

**Relationships**:
- belongsTo: Conversation (ON DELETE CASCADE)

---

## Sugar Calculation Formula

Sugar content is calculated and stored in **teaspoons (tsp)** for user-friendly display:

```
Sugar (tsp) = Sugar (grams) / 4

Where:
  - 1 teaspoon of sugar ≈ 4 grams
  - Formula applied to total_sugar_per_100g and added_sugar_per_100g
  - Adjusted for actual quantity consumed
```

**Example**:
- Product: 8g total sugar per 100g
- Quantity consumed: 30g
- Sugar in product: (8g / 100g) × 30g = 2.4g
- Sugar in teaspoons: 2.4g / 4 = **0.6 tsp**

---

## WHO Sugar Guidelines
- Daily recommended limit: **6 teaspoons (25g) per day** for adults
- Stored in `users.daily_sugar_goal_tsp` column

---

## Migration & Seeding Commands

### Setup Database
```bash
# Install dependencies
npm install

# Run all pending migrations
npm run db:migrate

# Seed database with 50 products
npm run db:seed:all
```

### Undo Operations
```bash
# Undo last migration
npm run db:migrate:undo

# Undo all migrations
npm run db:migrate:undo:all

# Undo all seeds
npm run db:seed:undo:all
```

---

## Seeded Products (50 Indian Food Items)

### Categories:
1. **Biscuits** (7): Parle-G, Bourbon, Digestive, Banana, Monaco, Hide & Seek, Almond
2. **Spreads** (4): Nutella, Kissan jams (Mixed Fruit, Pineapple)
3. **Noodles** (3): Maggi Masala, Chicken, Vegetable Atta
4. **Namkeen/Chips** (10): Haldirams (Bhujia, Moong Dal, Aloo, Mixture), Lays (Classic, Magic Masala, American Style), Doritos, Pringles, Kurkure
5. **Cold Drinks** (4): Frooti, Maaza, Thums Up, Sprite, Mirinda
6. **Fruit Juices** (4): Real Juice (Orange, Mixed), Minute Maid, Paper Boat Mango
7. **Breads** (2): Britannia White, Whole Wheat
8. **Dairy** (4): Amul (Butter, Dahi, Kool), Mother Dairy Paneer
9. **Health Drinks** (3): Horlicks, Bournvita, Complan
10. **Chocolates** (2): Cadbury (Dairy Milk, 5 Star)
11. **Cereals** (2): Kellogg Corn Flakes, Quaker Oats

All products marked with:
- `data_source: 'admin_manual'` (manually verified)
- `verified: true`

---

## Database Performance Optimization

### Indexing Strategy
- **Composite indexes** for common query patterns (user_id + timestamp)
- **Unique indexes** for lookups (email, barcode)
- **Selective indexes** for high-cardinality searches (barcode, name)

### Connection Pooling (Production)
```javascript
pool: {
  max: 5,        // Max connections
  min: 0,        // Min connections
  acquire: 30000, // Acquire timeout (ms)
  idle: 10000    // Idle timeout (ms)
}
```

### Timezone Handling
- All timestamps stored in UTC internally
- Application timezone: IST (+05:30)
- Configured in `config.js`

---

## Sequelize Models

All models include:
- Proper field naming (camelCase in code, snake_case in DB)
- Timestamps (createdAt, updatedAt)
- Associations with proper foreign keys
- Custom methods for calculations (e.g., `Product.calculateTsp()`)
- Validation and constraints

### Model Files
- `models/user.js` - User authentication & profile
- `models/product.js` - Product catalog
- `models/scan.js` - Barcode scan events
- `models/manual-entry.js` - Manual food entries
- `models/conversation.js` - AI conversation threads
- `models/message.js` - AI messages
- `models/index.js` - Database initialization & associations

---

## Environment Configuration

Required `.env` variables:
```
DB_HOST=localhost (or MySQL container name)
DB_PORT=3306
DB_NAME=sugarscan
DB_USER=sugarscan_user
DB_PASSWORD=sugarscan_password
NODE_ENV=development
```

---

## Data Integrity & Constraints

### Foreign Key Constraints
| Table | References | Behavior |
|-------|-----------|----------|
| scans.user_id | users.id | ON DELETE SET NULL |
| scans.product_id | products.id | ON DELETE SET NULL |
| manual_entries.user_id | users.id | ON DELETE CASCADE |
| manual_entries.product_id | products.id | ON DELETE SET NULL |
| ai_conversations.user_id | users.id | ON DELETE CASCADE |
| ai_messages.conversation_id | ai_conversations.id | ON DELETE CASCADE |

### Unique Constraints
- `users.email`
- `products.barcode`

---

## Implementation Status

✅ All 6 migrations created with proper schema
✅ All 6 Sequelize models implemented
✅ 50 Indian food products seeded
✅ Relationships and associations configured
✅ Indexes for optimal query performance
✅ Development database auto-sync enabled
✅ Seeds include accurate sugar content data
✅ Timezone configuration for India

---

## Next Steps

1. **Install dependencies**: `npm install`
2. **Configure `.env`** with database credentials
3. **Run migrations**: `npm run db:migrate`
4. **Seed database**: `npm run db:seed:all`
5. **Start server**: `npm run dev`
6. **Verify health**: `GET /api/health`

---

*Documentation created: 2026-06-14*
*Database schema version: 1.0*
