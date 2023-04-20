import {Link, useLocation, useNavigate} from "react-router-dom";
import "./product.css";
import {categoryData, productData} from "../../dummyData"
import { Publish } from "@mui/icons-material";
import Navbar from "../../components/Navbar";

import {mobile} from "../../responsive";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";
import {addProducts, deleteProducts, updateProducts} from "../../redux/apiCalls";
import {CircularProgress} from "@mui/material";

export default function Product() {
    const location = useLocation()
    const navigate = useNavigate()
    const productId  = location.pathname.split("/")[2]
    const product= useSelector(state=> state.product.products.find((product)=> product._id === productId))

    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [cat,setCat] = useState([])
    const [inStock,setInStock] = useState(product?.inStock)
    const [isPicPriceTitleNotAdd,setIsPicPriceTitleNotAdd] = useState(false)
    const [isPhotoNotAdded,setIsPhotoNotAdded] = useState(false)
    const [isFetching,setIsFetching] = useState(false)
    const dispatch = useDispatch()


    const handleChange = (e) => {
        console.log(e.target.value)
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleInStockChange = (e) => {
        console.log(product.inStock)
        setInStock(e.target.value === "yes")
        console.log(inStock)
    }

    const handleDelete = () => {

        const storage = getStorage(app);

// Create a reference to the file to delete
        const desertRef = ref(storage, product.img);
        setIsFetching(true)
// Delete the file
        deleteObject(desertRef).then(() => {
            deleteProducts(product._id,dispatch)
            setIsFetching(false)
            navigate('/')
        }).catch((error) => {
            console.log(error)
            setIsFetching(false)
            navigate('/')
        });

        //
    };

    // const handleCat = (e) => {
    //     // setCat(e.target.value.split(","))
    //     setCat(
    //         prev=> {
    //             return[ ...prev,e.target.value ]
    //         }
    //     )
    //     categoryData.splice(
    //         categoryData.findIndex((item)=>item.cat === e.target.value)
    //         ,1
    //     )
    // }

    const handleSubmitClick = (e) => {
        e.preventDefault()
        console.log(inStock)
        const updatedProduct = {
            ...product, ...inputs, inStock : inStock
        }
        setIsFetching(true)
        updateProducts(productId,updatedProduct,dispatch)
        setIsFetching(false)
        navigate('/')
    }

    useEffect(()=>{
       console.log(product)
    },[])





  return (
      <>
        <Navbar />
          <div className="product">
              <div className="productTitleContainer">
                  <h1 className="productTitle" >Product</h1>
              </div>
              <div className="productTop">

                  <div className="productTopRight">
                      <div className="productInfoTop">
                          <img
                              src= {product.img}
                              alt="" className="productInfoImg"/>
                          <span className="productName">{product.title}</span>
                      </div>
                      <div className="productInfoBottom">
                          <div className="productInfoItem">
                              <span className="productInfoKey">id:</span>
                              <span className="productInfoValue">{product._id}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">כותרת:</span>
                              <span className="productInfoValue">{product?.title}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">תיאור: </span>
                              <span className="productInfoValue">{product?.desc}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">מחיר רגיל:</span>
                              <span className="productInfoValue">{product?.price}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">מחיר לאחר מבצע:</span>
                              <span className="productInfoValue">{product?.updatedPrice}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">המוצר במלאי ?</span>
                              <span className="productInfoValue">{product?.inStock ? "Yes" : "No"}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">קטגוריות המוצר:</span>
                              <ul>
                                  {
                                      product?.category.map((category)=> {
                                          return(
                                              category !== "" &&
                                              <li className="productInfoValue" key={category}>{category}</li>
                                          )
                                      })
                                  }
                              </ul>
                          </div>

                      </div>
                  </div>
              </div>


              <div className="productBottom">
                  עדכון במוצר:
                  <form className="productForm">
                      <div className="productFormLeft" style={{direction:"rtl"}}>
                          <label>כותרת:</label>
                          <input name={"title"} type="text" style={{direction:"rtl"}} placeholder={product?.title} onChange={handleChange}/>

                          <label style={{marginBottom:"25px"}}>תיאור:</label>
                          <input style={{direction:"rtl"}} dir="auto" name={"desc"} type="text"  placeholder={product?.desc} onChange={handleChange}/>

                          <label style={{marginBottom:"25px"}}>המוצר במלאי ? (yes/no)</label>
                          <input name={"inStock"} type="text" placeholder={"yes/no"} onChange={handleInStockChange}/>

                          {/*<select onChange={handleInStockChange} >*/}
                          {/*    <option value={"yes"}>*/}
                          {/*        Yes*/}
                          {/*    </option>*/}
                          {/*    <option value={"no"}>*/}
                          {/*        No*/}
                          {/*    </option>*/}
                          {/*</select>*/}

                          <label>מחיר רגיל:</label>
                          <input name={"price"} type="text" placeholder={product?.price} onChange={handleChange}/>

                          <label>מחיר לאחר מבצע</label>
                          <input name={"updatedPrice"} type="text" placeholder={product?.updatedPrice} onChange={handleChange}/>


                          <button className="productButton" onClick={handleSubmitClick}>{!isFetching? "Update" : <CircularProgress />}</button>
                      </div>
                      {/*<div className="productFormRight">*/}
                      {/*    <div className="productUpload">*/}
                      {/*        <img*/}
                      {/*            src={product?.img}*/}
                      {/*            alt="" className="productUploadImg"/>*/}
                      {/*        <label htmlFor="file" >*/}
                      {/*            <Publish style={{height:"50px",width:"50px"}}/>*/}
                      {/*        </label>*/}
                      {/*        <input type="file" id="file" style={{display: "none"}}/>*/}
                      {/*    </div>*/}

                      {/*</div>*/}
                  </form>
              </div>
              <div className="productBottom" style={{display:"flex",flexDirection:"column"}}>
                  מחיקת מוצר
                  <button style={{backgroundColor:"red"}} className="productButton" onClick={handleDelete}>{!isFetching? "Delete" : <CircularProgress />}</button>
              </div>
          </div>
      </>

  );
}
