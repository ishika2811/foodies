import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchFoods, deleteFood } from "../../services/foodService";

const ListFood = () => {
  const [list, setList] = useState([]);

  // ✅ FETCH FOOD LIST
  const fetchList = async () => {
    try {
      const data = await fetchFoods(); // get data from service
      setList(data);                   // update state
    } catch (error) {
      console.error(error);
      toast.error("Error while reading food list");
    }
  };

  // ✅ DELETE FOOD
  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food item removed successfully");
        fetchList(); // refresh list
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11-card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width="48"
                    height="48"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>&#8377;{item.price}</td>
                <td
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFood(item.id)}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ListFood;
