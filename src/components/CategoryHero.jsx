const CategoryHero = ({ title, tagline }) => {
  return (
    <div className="xl:px-10 px-4 pt-10 pb-6 text-center xl:text-left">
      <p className="font-title text-white font-bold xl:text-5xl text-4xl">
        {title}
      </p>
      <p className="text-white/70 font-body mt-2 max-w-[420px] mx-auto xl:mx-0">
        {tagline}
      </p>
    </div>
  );
};

export default CategoryHero;
