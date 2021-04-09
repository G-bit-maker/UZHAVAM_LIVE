import axios from "./api"
import qs from "qs";
import urls from "./urls"

class ProfileApi{
    static getCategoryApi(data){
        return axios.get(urls.getCategory)
    }
    static getUserDetailsApi(id){
        return axios.get(urls.getUserDetails,{params:{userId:id}})
    }
    static userRemoveApi(id){
        return axios.delete(urls.userRemove,{params:{userId:id}})
    }
    static addUserApi(data){
        return axios.put(urls.addEditUser,qs.stringify(data))
    }
    static SaveCategoryApi(data,flag,id){
        console.log(data,flag,id)
        return axios.post("/admin/createCategory",qs.stringify({category:data,status:flag,category_id:id}))
    }
    static productRemoveApi(id){
        return axios.post(urls.addProductList,qs.stringify({
            addStatus:"Remove",
            product_id:id
        }))
    }
    static addProductApi(data){
        let data2 ={
            brand:data.brand,
            category:data.productCategory,
            SKU:data.sku,
            productName:data.productName,
            shortdescription:data.shortDec,
            description:data.description,
            features:data.productFeatures,
            specs:data.ProductSpec,
            unit_for_weight:data.unitWeight,
            weight:data.weight,
            avail_quantity:data.availableSaleQty,
            min_sale_quantity:data.minSaleQty,
            max_sale_quantity:data.maxSaleQty,
            stock:data.IsStock,
            mrp:data.mrp,
            selling_price:data.sellingPrice,
            special_price:data.specialPrice,
            discount:data.discount,
            discount_amount:data.discountAmt,
            status:data.status,
            main_img:data.mainImg,
            img1:data.img5,
            img2:data.img2,
            img3:data.img3,
            img4:data.img4,
            small_img:data.smallimg,
            thumbnail_image:data.thumimg,
            tax_class_id:data.taxClassId,
            cgst:data.cgstp,
            igst:data.igstp,
            sgst:data.sgstp,
            cgst_amount:data.cgstamt,
            igst_amount:data.igstamt,
            sgst_amount:data.sgstamt,
            group_id:data.groupid,
            meta_keyword:data.metakey,
            url_path:"",
            product_visible:data.proVisible,
            country_of_manufacture:data.country,
            ean:data.ean,
            retail_quantity:data.retailQtyAllowed,
            wholesale_quantity:data.wholsaleQtyAllowed,
            addStatus:data.pageType,
            product_id:data.product_id
        }
        return axios.post(urls.addProductList,qs.stringify(data2))
    }
    static getProductDetailsApi(id){
        return axios.get(urls.getProductDetails,{params:{productId:id}})
    }
    static getProductlistApi(){
        return axios.get(urls.getProductList)
    }
    static getUserListApi(){
        return axios.get(urls.getUserList)
    }
}

export default ProfileApi;