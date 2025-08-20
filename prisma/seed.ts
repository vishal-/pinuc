import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Home Services & Improvement category
  const homeCategory = await prisma.category.upsert({
    where: { slug: 'home-services-improvement' },
    update: {},
    create: {
      name: 'Home Services & Improvement',
      slug: 'home-services-improvement',
      description: 'Find trusted professionals for plumbing, electrical, repairs, and home improvement services.',
      iconUrl: '🏠',
      displayOrder: 1,
      isActive: true,
    },
  });

  const homeSubcategories = [
    { name: 'Plumbing', slug: 'plumbing' },
    { name: 'Electrical repairs', slug: 'electrical-repairs' },
    { name: 'Appliance repair', slug: 'appliance-repair' },
    { name: 'Handyman services', slug: 'handyman-services' },
    { name: 'Furniture assembly', slug: 'furniture-assembly' },
  ];

  for (const [index, subcategory] of homeSubcategories.entries()) {
    await prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: homeCategory.id, slug: subcategory.slug } },
      update: {},
      create: {
        categoryId: homeCategory.id,
        name: subcategory.name,
        slug: subcategory.slug,
        displayOrder: index + 1,
        isActive: true,
      },
    });
  }

  // Create Beauty & Personal Care category
  const beautyCategory = await prisma.category.upsert({
    where: { slug: 'beauty-personal-care' },
    update: {},
    create: {
      name: 'Beauty & Personal Care',
      slug: 'beauty-personal-care',
      description: 'Professional beauty and personal care services at your convenience.',
      iconUrl: '💄',
      displayOrder: 2,
      isActive: true,
    },
  });

  const beautySubcategories = [
    { name: 'At-home haircuts', slug: 'at-home-haircuts' },
    { name: 'Salon services (manicure, pedicure, facial)', slug: 'salon-services' },
    { name: 'Spa/massage therapy', slug: 'spa-massage-therapy' },
    { name: 'Makeup & bridal services', slug: 'makeup-bridal-services' },
    { name: 'Personal grooming (waxing, threading, etc.)', slug: 'personal-grooming' },
  ];

  for (const [index, subcategory] of beautySubcategories.entries()) {
    await prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: beautyCategory.id, slug: subcategory.slug } },
      update: {},
      create: {
        categoryId: beautyCategory.id,
        name: subcategory.name,
        slug: subcategory.slug,
        displayOrder: index + 1,
        isActive: true,
      },
    });
  }

  // Create Cleaning Services category
  const cleaningCategory = await prisma.category.upsert({
    where: { slug: 'cleaning-services' },
    update: {},
    create: {
      name: 'Cleaning Services',
      slug: 'cleaning-services',
      description: 'Professional cleaning services for homes, offices, and specialized cleaning needs.',
      iconUrl: '🧽',
      displayOrder: 3,
      isActive: true,
    },
  });

  // Create cleaning subcategories
  const cleaningSubcategories = [
    { name: 'Home deep cleaning', slug: 'home-deep-cleaning' },
    { name: 'Move-in/move-out cleaning', slug: 'move-in-move-out-cleaning' },
    { name: 'Office cleaning', slug: 'office-cleaning' },
    { name: 'Carpet and upholstery cleaning', slug: 'carpet-upholstery-cleaning' },
    { name: 'Window washing', slug: 'window-washing' },
    { name: 'Pest control', slug: 'pest-control' },
  ];

  for (const [index, subcategory] of cleaningSubcategories.entries()) {
    await prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: cleaningCategory.id, slug: subcategory.slug } },
      update: {},
      create: {
        categoryId: cleaningCategory.id,
        name: subcategory.name,
        slug: subcategory.slug,
        displayOrder: index + 1,
        isActive: true,
      },
    });
  }

  console.log('Seeded all categories successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });