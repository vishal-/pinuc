interface SubcategoryNavProps {
  subcategories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export default function SubcategoryNav({ subcategories }: SubcategoryNavProps) {
  return (
    <section className="py-6 px-4" style={{backgroundColor: 'var(--soft-white)'}}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              className="px-4 py-2 rounded-lg border hover:shadow-md transition-shadow"
              style={{
                backgroundColor: 'var(--warm-neutral)',
                borderColor: 'var(--medium-gray)',
                color: 'var(--dark-gray)'
              }}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}