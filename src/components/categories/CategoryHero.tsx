interface CategoryHeroProps {
  category: {
    name: string;
    description: string;
    iconUrl: string;
  };
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="py-12 px-4 text-center" style={{backgroundColor: 'var(--primary-blue)', color: 'var(--soft-white)'}}>
      <div className="max-w-4xl mx-auto">
        <div className="text-6xl mb-4">{category.iconUrl}</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: 'var(--soft-white)'}}>{category.name}</h1>
        <p className="text-lg sm:text-xl" style={{color: 'var(--soft-white)'}}>{category.description}</p>
      </div>
    </section>
  );
}