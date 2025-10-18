
import useAuthInfo from "../../../hooks/useAuthInfo";
import CategoriesCard from "./CategoriesCard";

const Categories = () => {
  const { categories } = useAuthInfo();



  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              Picture
            </th>
            <th>Name</th>
            <th>Edit Info</th>
            <th>Delete</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <CategoriesCard
              key={category._id}
              category={category}
            ></CategoriesCard>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Categories;
