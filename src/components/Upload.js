import FormData from 'form-data'
const axios = require('axios');

const upload = async (image) => {
    let data = new FormData();
    data.append('image', image[0]);
    try {
        const uploadResult = await axios.post('https://voltti-app.herokuapp.com/upload', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              }
        })
        return uploadResult.data.path;
    } catch (error) {
        console.error(error.message);
    }
}
export const uploadImage = upload;