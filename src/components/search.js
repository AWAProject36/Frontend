const searchRestaurant = async (id) => {
    const res = await fetch('http://localhost:5000/restaurants/${id}')
    const data = await res.json()

    return data
}

export default searchRestaurant