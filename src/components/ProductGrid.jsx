const ProductGrid = ({ title = "ALL PRODUCTS", products = [] }) => {
  return (
    <div className="xl:px-10 px-4 pt-5 pb-10">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-white font-title text-2xl">{title}</p>
        <div className="flex-1 h-[2px] bg-white/30" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((item, i) => (
          <div
            key={i}
            className={`relative bg-[#2b2b2b] rounded-xl flex items-center justify-center h-[150px] ${
              item.featured ? "border-2 border-blue-400" : ""
            }`}
          >
            <span className="absolute top-3 left-3 bg-[#E8A857] text-black text-sm font-semibold px-3 py-1 rounded-full">
              {item.price}$
            </span>
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
