export async function uploadService(formData){
    try {
        const response = await fetch("http://52.207.220.199:8080/api/s3/upload/image", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.result?.urlImg)
        return data.result?.urlImg || null;
    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}