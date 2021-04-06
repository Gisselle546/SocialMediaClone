import axios from 'axios';

async function imageUpload(image:any){
    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET!);
    data.append('cloud_name',process.env.REACT_APP_CLOUD_NAME!);

    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/gise/image/upload",
        data
    );

    return response.data.url;
}

export default imageUpload;