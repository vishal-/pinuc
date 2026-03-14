# Prisma 7.5 Configuration Guide

This document explains the Prisma 7.5 configuration setup for this project.

## What Changed in Prisma 7.x

Prisma 7 introduced breaking changes to how datasource URLs are configured:

### Before (Prisma 6.x)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ❌ No longer supported in v7
}
```

### After (Prisma 7.x)

Configuration is split between:

1. **`prisma/schema.prisma`** - Schema definition only
2. **`.prismarc.json`** - Connection configuration

## Configuration Files

### 1. prisma/schema.prisma

The schema file no longer includes the `url` property. Only the provider is specified:

```prisma
datasource db {
  provider = "postgresql"
}
```

### 2. .prismarc.json

New config file at the root of your project that defines datasources:

```json
{
  "generators": [
    {
      "name": "client",
      "provider": "prisma-client-js"
    }
  ],
  "datasources": {
    "db": {
      "provider": "postgresql",
      "url": "env(DATABASE_URL)"
    }
  }
}
```

### 3. .env.local (or .env)

Must include the database connection URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pinuc_dev?schema=public"
```

### 4. .npmrc (Optional Optimization)

Ensures proper npm module handling:

```
node-linker=node-modules
engine-strict=true
```

## Environment Setup

### For Development (Local PostgreSQL/Supabase)

1. **Get your database URL:**
   - Supabase: Settings > Database > Connection string
   - Local Postgres: `postgresql://user:password@localhost:5432/dbname`

2. **Add to `.env.local`:**

   ```env
   DATABASE_URL="postgresql://..."
   ```

3. **Validate schema:**

   ```bash
   npx prisma validate
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

### For Production (Vercel, Railway, Render, etc.)

1. Set `DATABASE_URL` environment variable in your platform's settings
2. Prisma will automatically read it from the environment
3. Migrations are applied during deployment:
   ```bash
   npx prisma migrate deploy
   ```

## Common Commands

```bash
# Validate schema syntax
npx prisma validate

# Generate/regenerate Prisma Client
npx prisma generate

# Push schema to database (dev only - auto-creates migrations)
npm run db:push

# View database in GUI
npm run db:studio

# Seed database with test data
npm run db:seed

# Create a migration (for production)
npm run migrate:dev --name "migration-name"

# Apply migrations (for production)
npx prisma migrate deploy
```

## Troubleshooting

### "Error: PrismaClientInitializationError"

**Cause:** Missing or invalid `DATABASE_URL` environment variable

**Solution:**

```bash
# Check if .env.local exists and has DATABASE_URL
cat .env.local

# Restart dev server after adding DATABASE_URL
npm run dev
```

### "Error: Prisma schema validation - (validate wasm)"

**Cause:** `.prismarc.json` is missing or malformed

**Solution:**
Ensure `.prismarc.json` exists at project root with proper JSON syntax:

```bash
npx prisma validate
```

### "Error: The datasource property `url` is no longer supported"

**Cause:** Trying to use Prisma 7 with old schema format

**Solution:**
Remove `url` from `prisma/schema.prisma` and add it to `.prismarc.json` instead.

### "Cannot find module '@prisma/client'"

**Cause:** Prisma Client not generated yet

**Solution:**

```bash
npx prisma generate
```

## Migration Path (Upgrading from Prisma 6 → 7)

If you have an existing Prisma 6 project:

1. **Update package.json:**

   ```bash
   npm install @prisma/client@latest prisma@latest
   ```

2. **Update schema:**
   Remove `url = env("DATABASE_URL")` from datasource

3. **Create `.prismarc.json`:**
   Copy from this guide

4. **Validate:**

   ```bash
   npx prisma validate
   ```

5. **Regenerate:**
   ```bash
   npx prisma generate
   ```

## File Checklist

Verify these files exist:

- ✅ `prisma/schema.prisma` - Schema without `url`
- ✅ `.prismarc.json` - Datasource configuration
- ✅ `.env.local` (or `.env`) - `DATABASE_URL` variable
- ✅ `.npmrc` - npm configuration (optional)
- ✅ `lib/prisma.ts` - Singleton Prisma Client
- ✅ `lib/db.ts` - Database helper functions
- ✅ `prisma/seed.ts` - Seed script (optional)

## Next Steps

1. ✅ Configure `.env.local` with your database URL
2. ✅ Run `npx prisma validate` to verify setup
3. ✅ Run `npx prisma generate` to create Prisma Client
4. ✅ Run `npm run db:push` to sync schema with database
5. ✅ Use helpers from `lib/db.ts` in your app

## References

- [Prisma 7 Migration Guide](https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
- [Prisma Datasource Configuration](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#config-datasource)
- [Environment Variables](https://www.prisma.io/docs/build/reference/environment-variables-reference)
