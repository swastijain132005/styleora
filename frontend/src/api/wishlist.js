import axiosClient from "../../config/axios";

export const addwishlist=async(productId)=>{
    return await axiosClient.post("/api/wishlist",{productId});
};

export const removewishlist=async(productId)=>{
    return await axiosClient.delete(`/api/wishlist/${productId}`);
};

export const getWishlist=async()=>{

    return axiosClient.get("/api/wishlist");

}

export const checkWishlist=async(productId)=>{
    return await axiosClient.get(`/api/wishlist/check/${productId}`);
};
