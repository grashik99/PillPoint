import { Link } from "react-router";

const CategorryCardCard = ({ cate, count }) => {
  return (
    <Link
      to={`/categoryMedicine/${cate.categoryName}`}
      className="card bg-base-100 image-full shadow-sm group overflow-hidden"
    >
      <figure className="overflow-hidden">
        <img
          src={cate.categoryImageUrl}
          alt={cate.categoryName}
          className="transform transition-transform duration-500 group-hover:scale-110"
        />
      </figure>
      <div className="card-body bg-black/40 transition-colors duration-300 group-hover:bg-black/0">
        <h2 className="card-title transition-colors duration-300 group-hover:text-yellow-300">
          {cate.categoryName}
        </h2>
        <p className="text-sm font-extralight">
          Quality medicines and health essentials you can trust — safe, effective, and caring solutions for your everyday wellness needs.
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary shadow">{count}</button>
        </div>
      </div>
    </Link>
  );
};

export default CategorryCardCard;
