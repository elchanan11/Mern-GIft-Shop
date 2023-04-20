import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteProducts, getProducts} from '../../redux/apiCalls'
import {useDispatch,useSelector} from "react-redux";
import { getStorage, ref, deleteObject } from "firebase/storage";
import app from "../../firebase";
import {CircularProgress} from "@mui/material";

export default function ProductList() {

  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products)
  const [isFetching,setIsFetching] = useState(false)

  useEffect(()=>{

    getProducts(dispatch)
  }, [])

  const handleDelete = (product) => {

    const storage = getStorage(app);

// Create a reference to the file to delete
    const desertRef = ref(storage, product.img);
    setIsFetching(true)
// Delete the file
    deleteObject(desertRef).then(() => {
      deleteProducts(product._id,dispatch)
      setIsFetching(false)
    }).catch((error) => {
      console.log(error)
      setIsFetching(false)
    });

    //
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 ,flex: 0.5},
    {
      field: "product",
      headerName: "Product",
      width: 200,
      flex: 2,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    // {
    //   field: "price",
    //   headerName: "Price",
    //   width: 160
    //   ,flex: 0.5,
    // },

    {
      field: "action",
      headerName: "Action",
      width: 150
      ,flex: 1,
      renderCell: (params) => {
        return (
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            {
              !isFetching ? <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row)}
                  style={{fontSize:"60px",justifyContent:"space-between"}}
              /> :
                  <CircularProgress />
            }

          </div>
        );
      },
    },
  ];

  return (
    <div className="productList" style={{height:"500px", width:"100%"}}>
      <DataGrid
        rowHeight={70}
        rows={products}
        getRowId={row=>row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        rowsPerPageOptions={[10,20,30]}
        sx={{

          fontSize:50,

        }}
      />
    </div>
  );
}
