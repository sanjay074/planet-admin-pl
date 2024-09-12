
import axiosInstance from "../config/axiosInstance";

export const getAllProductApi = async () => {
  try {
    const response = await axiosInstance.get("/products/getAll");
    // console.log(result);
    return response;
  } catch (error) {
    console.log(`facing error at getAll data from product api`, error);
    throw error;
  }
};

// post product data from ui
export const PostProductData = async (data) => {
   try {
    const response = await axiosInstance.post("/products", data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
   } catch (error) {
    console.log("facing error for post product data from ui", error);
   }
  };

// get Singal Data from api
export const GetSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(
      `facing problem in getting data from product list api`,
      error
    );
  }
};
// DElete product details
export const DeleteProductDetails = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`facing problem in delete data `, error);
  }
};

// get product List

export const NewProductList = async () => {
  try {
    const responce = await axiosInstance.get("/order/getNewOrder");
    // console.log(`getting data from api >>`, responce);
    return responce;
  } catch (error) {
    console.log(`facing error in getallProductData`, error);
    throw Error;
  }
};
// get product History
export const ProductHistory = async () => {
  try {
    const responce = await axiosInstance.get("/order/getAllorder");
    return responce;
  } catch (error) {
    console.error(`facing problem in getting ProductHistory`, error);
  }
};

// get  RecentOrder
export const RecentOrdersDetails = async () => {
  try {
    const responce = await axiosInstance.get("/order/getRecentOrder");
    //  console.log(responce,"responce data from api");

    return responce;
  } catch (error) {
    console.error(`facing problem in getting RecentOrder`, error);
  }
};
// get all user list
export const GetAllUserList = async () => {
  try {
    const responce = await axiosInstance.get("/userDetails/alluserDetails");
    //    console.log(`facing problem in all user responce `,responce);

    return responce;
  } catch (error) {
    console.error("facing error in get all userlist ", error);
  }
};
//delete orderlist
export const DeleteOrderList = async (id) => {
  try {
    const responce = await axiosInstance.delete(
      `/order/deleteSingleItem/${id}`
    );
    console.log(responce, "responce data ");

    return responce;
  } catch (error) {
    console.error(
      "facing the problem in the getting data from deleteone",
      error
    );
  }
};
export const DeleteOrderHistory = async (id) => {
  try {
    const responce = await axiosInstance.delete(
      `/order/deleteSingleItem/${id}`
    );
    console.log(responce, "responce data ");

    return responce;
  } catch (error) {
    console.error(
      "facing the problem in the getting data from deleteone",
      error
    );
  }
};
//view orderlist

export const ViewOrderList = async (id) => {
  try {
    const responce = await axiosInstance.get(`/order/getSingleOrder/${id}`);
    return responce;
  } catch (error) {
    console.error(`facing problem in viewOrderList from api `, error);
  }
};  `[]`
export const ViewRecentOrderDetails = async (id) => {
  try {
    const responce = await axiosInstance.get(`/order/getSingleOrder/${id}`);
    return responce;
  } catch (error) {
    console.error(`facing problem in viewOrderList from api `, error);
  }
};
export const ViewOrderHistory = async (id) => {
  try {
    const responce = await axiosInstance.get(`/order/getSingleOrder/${id}`);
    return responce;
  } catch (error) {
    console.error(`facing problem in viewOrderList from api `, error);
  }
};
// post catagory

export const PostCategoryData = async (name) => {
  try {
    const responce = await axiosInstance.post("/categories",name);
    console.log(responce,"responce data from api  .>>>>>>.");
    
    return responce;
  } catch (error) {
    console.error(`facing problem in post catagory data `, error);
  }
};
export const  GetCategoryData=async()=>{
  try{
    const responce = await axiosInstance.get('/categories')
    return responce
  }catch(error){
    console.error(`facing problem in getCategory `,error)
  }
}

export const  DeleteCategory= async(id)=>{
  try{
    const responce=await axiosInstance.delete(`/categories/${id}`)
    return responce
  }catch(error)
  {
    console.error(`facing problem in delete catagory data`,error)
  }
}
export const UpdateCategory = async (id, updateData) => {
   try {
    const response = await axiosInstance.put(`/categories/${id}`, updateData);
    console.log("Data updated successfully:", response);
    return response.data; 
   } catch (error) {
    console.error("Error updating data:", error);
    throw error; 
   }
  };

export const PostSubCatagory=async(subcategoryname,categoryId)=>{
  try{
    const response = await axiosInstance.post('/subCategories', {
      name: subcategoryname,
      category: categoryId
    });
    return response
  }catch(error){
  console.error(`facing error in to post subcatagory data `,error)
  }
}

export const GetSubCategory= async()=>{
  try{
  const responce= await axiosInstance.get('/subCategories')
  return responce
  }catch(error){
    console.error(`facing problem in geting subCategory`,error)
  }
}

export const DeleteSubCategory = async(id) =>{
   try {
    const response = await axiosInstance.delete(`/subCategories/${id}`)
    console.log(response,"Data deleted successfully")
    return response;
   } catch (error) {
    console.log(error,"Error in data deleted")
   }
  }
  export const UpdateSubCategory = async (id, updateData) => {
    console.log("API Call: Updating Subcategory", id, updateData);
    try {
      const response = await axiosInstance.put(`/subCategories/${id}`, updateData);
      console.log("Data updated successfully:", response);
      return response.data; 
    } catch (error) {
      console.error("Error updating data:", error);
      throw error; 
    }
  };


export const GetBrand=async()=>{
      try{
 const responce=await axiosInstance.get('/brands')
 return responce
      }catch(error){
        console.error(`facing problem in getting data from api `,error)
      }
}
export const OfferPost = async (formData) => {
   try {
    const response = await axiosInstance.post('/offer/createOffer', formData, {
      
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      
    });
    return response.data;
   } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
   }
  };
  export const OfferUpdate = async (id, updatedData) => {
     try {
    
      const config = {
       headers: {
        'Content-Type': updatedData instanceof FormData ? 'multipart/form-data' : 'application/json'
       }
      };
      const response = await axiosInstance.put(`/offer/updateoffer/${id}`, updatedData, config);
      console.log("Data updated successfully", response);
      return response;
     } catch (error) {
      console.error("Error occurred in updating offer", error);
     }
    };

    export const OfferDelete = async(id)=>{
       try {
        const response = await axiosInstance.delete(`/offer/deleteoffer/${id}`)
        console.log(response,"Data deleted successfully")
        return response;
       } catch (error) {
        console.error("Error occur data deleted",error)
       }
      }

      export const OfferGet = async()=>{
         try {
          const responce= await axiosInstance.get(`/offer/getalloffer`)
          return responce
         } catch (error) {
          console.error(`facing problem in OfferGet from api `,error)
         }
        }
        export const BrandPost = async (formData) => {
          try {
           const response = await axiosInstance.post('/brands', formData, {
            headers: {
             'Content-Type': 'multipart/form-data',
            },
           });
           return response.data;
          } catch (error) {
           throw new Error(error.response ? error.response.data.message : error.message);
          }
         };
          
          export const updateProductDetail = async(id, orderStatus)=>{
             try{
              const response = await axiosInstance.put(`/order/updateOrder/${id}`, orderStatus)
              return response
             }catch(error){
              console.log("Error in geting OrderStatus")
             }
            }
            export const getSubCategoryById = async(id)=>{
               try{
                const response = await axiosInstance.get(`/subCategories/getSubCatbyCat/${id}`)
                return response
               }catch{
                console.log("Error in getting getSubCategoryById")
               }
              }
             export const getAllEmail= async()=>{
              try{
                const responce= await axiosInstance('/contact')
              
                return responce
              }catch(error){
                console.error(`facing problem in getting data from all email`)
              }
              
             }
             export const BrandGet = async ()=>{
              try {
                const response = await axiosInstance.get('/brands')
                return response
              } catch (error) {
                console.log("Error in getting get data", error)
              }
            }
            export const Branddelete = async(id)=>{
              try {
                const response = await axiosInstance.delete(`/brands/${id}`)
                return response;
              } catch (error) {
                console.log('Error in data deletion' ,error)
              }
            }
            export const Brandupdate = async(id, updatedData) =>{
             try {
              const config = {
                headers: {
                 'Content-Type': updatedData instanceof FormData ? 'multipart/form-data' : 'application/json'
                }
               };
              const response = await axiosInstance.put(`/brands/${id}`, updatedData,config)
              return response
             } catch (error) {
              console.log('Error in data updation', error)
             }
            }