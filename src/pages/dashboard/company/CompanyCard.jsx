const CompanyCard = ({com}) => {
  return (
    <div className="card border shadow-sm hover:bg-pink-400 p-2">
      <figure className="relative">
        <img
          src={com.companyLogo}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{com.companyName}</h2>
      </div>
    </div>
  );
};
export default CompanyCard;
