import axios from "axios";
import Swal from "sweetalert2";
import useAuthInfo from "../../../hooks/useAuthInfo";

const CategoriesCard = ({ category }) => {
  const { setRefrash, refrash } = useAuthInfo();
  // console.log(category)
  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("https://pill-point-server-one.vercel.app/categories", {
              params: {
                id: category._id,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                setRefrash(refrash + 1);
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const handleUpdate = () => {
    // console.log("handleUpdate");
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={category?.categoryImageUrl}
                  alt={category?.categoryName}
                />
              </div>
            </div>
            {/* <div>
              <div className="font-bold">{category?.categoryName}</div>
              <div className="text-sm opacity-50">United States</div>
            </div> */}
          </div>
        </td>
        <td>
          <div className="font-bold">{category?.categoryName}</div>
        </td>
        <td>
          <button
            onClick={handleUpdate}
            className="btn btn-sm shadow btn-outline"
          >
            Update
          </button>
        </td>
        <th>
          <button
            onClick={handleDelete}
            className="btn btn-sm shadow btn-outline btn-error"
          >
            Delete
          </button>
        </th>
      </tr>
    </>
  );
};
export default CategoriesCard;
