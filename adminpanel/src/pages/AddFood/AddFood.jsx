import React from 'react'
import { assets } from '../../assets/assets'
import { addFood } from '../../services/foodService'
import { toast } from "react-toastify"


const AddFood = () => {

  const [image, setImage] = React.useState(null)

  const [data, setData] = React.useState({
    name: '',
    description: '',
    category: 'Biryani',
    price: ''
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!image) {
      toast.error("Image is required")
      return
    }

    try {
      await addFood(data, image)
      toast.success("Food added successfully")

      setData({
        name: '',
        description: '',
        category: 'Biryani',
        price: ''
      })
      setImage(null)

    } catch (error) {
      console.error(error)
      toast.error("Error while adding food")
    }
  }

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt=""
                    width={200}
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder='Chicken Biryani'
                  className="form-control"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder='Write Content here....'
                  rows="5"
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                >
                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Ice cream">Ice cream</option>
                  <option value="Salad">Salad</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="&#8377;200"
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood
