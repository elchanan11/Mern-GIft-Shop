import "./newProduct.css";
import Navbar from "../../components/Navbar";
import {useEffect, useState} from "react";
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {addProducts} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {categoryData} from "../../dummyData";

export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat,setCat] = useState([])
    const [catToDisplay,setCatToDisplay] = useState([])
  const [finalCats,setFinalCats] = useState([])
  const [isPicPriceTitleNotAdd,setIsPicPriceTitleNotAdd] = useState(false)
  const [isPhotoNotAdded,setIsPhotoNotAdded] = useState(false)
  const [isFetching,setIsFetching] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [catData,setCatData] = useState([])
  useEffect(()=>{
      setCatData(categoryData)
  },[])



  const handleChange = (e) => {
    setInputs(prev=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCat = async (e) => {
     // setCat(e.target.value.split(","))
    // setCatToDisplay(
    //     prev=>
    //         [ ...prev,catData.filter(item=>{
    //             return (
    //                 item.
    //             )
    //         }) ]
    // )
     const newCat = e.target.value
     await e.target.value !== "" &&
      setCat(
          prev=>
                    [ ...prev,newCat ]
      )

      await console.log(cat)

      e.target.value !== "" &&
            catData.splice(
                catData.findIndex((item)=>item.cat === e.target.value)
                ,1
            )

  }
  useEffect(()=>{
      console.log("cat")
      console.log(cat)
      setFinalCats(
          cat
      )
      // setCatToDisplay(
      //     prev=>
      //         [ ...prev,newCat ]
      // )
      console.log(finalCats)
  },[cat])

  const handleSubmitClick = (e) => {
      e.preventDefault()

      if (
          inputs.title === ""
          ||inputs.title === undefined
          || inputs.price === ""
          ||inputs.price === undefined
          || inputs.updatedPrice === ""
          ||inputs.updatedPrice === undefined
      ){
          setIsPicPriceTitleNotAdd(true)

      }else {
            setIsPicPriceTitleNotAdd(false)
            if (file === "" || file === null ){
            setIsPhotoNotAdded(true)
          }else {
                console.log(file)
                setIsPhotoNotAdded(false)
                const time = new Date().getTime()
                const fileName =  `images/${time}/${file.name}`

                // Firebase storage reference
                const storage = getStorage(app)
                const storageRef = ref(storage, fileName)

                const metadata = {
                    unlocked: "true",
                };

                setIsFetching(
                    true
                )
                const uploadTask = uploadBytesResumable(storageRef, file,metadata)

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed',
                    (snapshot) => {

                        console.log(isFetching)
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        setIsFetching(
                            false
                        )
                        console.log("error: "+error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            const product = {...inputs,img:downloadURL, category: cat}
                            addProducts(product,dispatch)
                            setIsFetching(
                                false
                            )
                            setCat([])
                            setInputs({})
                            setFile(null)
                            setCatData([])
                            navigate("/")
                                //window.location.reload()
                        });
                    }
                );
          }
      }
  }

  return (
      <>
        <Navbar>

        </Navbar>
        <div className="newProduct">
          <h1 className="addProductTitle" style={{fontSize:"50px"}}>מוצר חדש</h1>
          <form className="addProductForm">
            <div className="addProductItem"  >
              <label>תמונה</label>
              <input type="file" id="file" onChange={e=> setFile(e.target.files[0])} />
            </div>

            <div className="addProductItem">
              <label>כותרת מוצר: </label>
              <input name={"title"} style={{direction:"rtl"}} type="text" placeholder="Apple " onChange={handleChange}/>
            </div>

            <div className="addProductItem">
              <label>תיאור מוצר: </label>
              <input name={"desc"} style={{direction:"rtl"}} type="text" placeholder="Apple Airpods" onChange={handleChange}/>
            </div>

            <div className="addProductItem">
              <label>מחיר מוצר: </label>
              <input name={"price"} type="number" placeholder="93" onChange={handleChange}/>
            </div>

              <div className="addProductItem">
                  <label>מחיר מוצר לאחר מבצע: </label>
                  <input name={"updatedPrice"} type="number" placeholder="93" onChange={handleChange}/>
              </div>

            <div className="addProductItem">
                <select onChange={handleCat} >
                    <option value={""}>
                        בחר תת קטגוריה
                    </option>

                    {
                        catData.map(catItem=>(
                            <option value={catItem.cat}  key={catItem.id} >
                                {catItem.title}
                            </option>
                        ))
                    }

                </select>
                {
                    cat.map(catItem=>(
                        <label key={catItem}>{catItem}</label>
                    ))
                }
            </div>
            <br/>
            {
              isPicPriceTitleNotAdd &&
              <span style={{fontSize:"50px",fontWeight:"600",textAlign:"center"}}>
              ***כותרת ומחיר הן חובה על מנת ליצור מוצר חדש... אנא וודא שכל השדות קיימיים***
              </span>
            }
            {
                isPhotoNotAdded &&
                <span style={{fontSize:"50px",fontWeight:"600",textAlign:"center"}}>
              ***תמונה הינה חובה על מנת ליצור מוצר חדש... אנא וודא שכל השדות קיימיים***
              </span>
            }
            <br/>
            <br/>
            <button className="addProductButton" onClick={handleSubmitClick} disabled={isFetching}>{!isFetching ? "Create" : <CircularProgress />} </button>
          </form>

        </div>
          <div style={{marginTop:"180px",flexDirection:"column",height:"100%",bottom:0,display:"flex",direction:"rtl",fontSize:"50px"}}>
              <sp>
                  *יש למלא את כל השדות
              </sp>
              <sp>
                  *במידה ואין הנחה למוצר יש לשים את אותו מחיר עבור מחיר ומחיר מבצע
              </sp>
          </div>
      </>

  );
}
