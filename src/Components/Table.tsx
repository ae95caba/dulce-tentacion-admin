import { useEffect, useState } from "react";
import uniqid from "uniqid";
import AddProductForm from "./AddProductForm";

function Table() {
  const [virtualProductsArr, setVirtualProductsArr] = useState();
  const [dbProductsArr, setDbProductsArr] = useState();

  async function fetchProductsAndSetState() {
    const token = JSON.parse(localStorage.getItem("jwtToken")).token;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3000/products`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const products = await response.json();
      console.log(`the posts content is : ${products}`);
      setDbProductsArr(products);

      // Process the data or perform other operations
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (dbProductsArr) {
      setVirtualProductsArr(dbProductsArr);
      console.log(JSON.stringify(dbProductsArr));
    }
  }, [dbProductsArr]);

  useEffect(() => {
    fetchProductsAndSetState();
  }, []);

  const productKeys = ["name", "price", "imgUrl", "outOfStock", "flavours"];

  return (
    <>
      <h1>Productos</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {productKeys.map((key) => (
                <th key={`hcell-${key}`}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {virtualProductsArr?.map((virtualProduct, index) => (
              //return a row per product
              <TableRow
                key={`row-${virtualProduct._id}`}
                fetchProductsAndSetState={fetchProductsAndSetState}
                index={index}
                virtualProductsArr={virtualProductsArr}
                dbProductsArr={dbProductsArr}
                setVirtualProductsArr={setVirtualProductsArr}
                virtualProduct={virtualProduct}
                productKeys={productKeys}
              />
            ))}
          </tbody>
        </table>
      </div>
      <AddProductForm fetchProductsAndSetState={fetchProductsAndSetState} />
    </>
  );
}

export default Table;

function TableRow({
  virtualProduct,
  fetchProductsAndSetState,
  productKeys,
  index,
  virtualProductsArr,
  setVirtualProductsArr,
  dbProductsArr,
}) {
  const [enableEdit, setEnableEdit] = useState(false);
  return (
    <>
      <tr id={virtualProduct._id}>
        {productKeys.map((key) => (
          //return a cell per key
          <td key={`cell-${key}`} style={{ borderRadius: "0.5rem" }}>
            <input
              value={virtualProduct[key]}
              disabled={!enableEdit}
              type="text"
              onChange={(e) => {
                const newValue = e.target.value;
                const virtualProductsArrCopy = [
                  ...structuredClone(virtualProductsArr),
                ];
                virtualProductsArrCopy[index][key] = newValue;
                setVirtualProductsArr(virtualProductsArrCopy);
                console.log(`the new value is ${newValue}`);
              }}
            />
          </td>
        ))}
        {/* <td>
            <input
              type="submit"
              disabled={!enableEdit}
              value="delete"
              onClick={() => {
                const virtualProductsArrCopy = [
                  ...structuredClone(virtualProductsArr),
                ];
                virtualProductsArrCopy.splice(index, 1);
                console.log(virtualProductsArrCopy);
                setVirtualProductsArr(virtualProductsArrCopy);
              }}
            />
          </td> */}
        <td style={{ display: "flex" }}>
          <Buttons
            key={`buttons-${virtualProduct._id}`}
            enableEdit={enableEdit}
            fetchProductsAndSetState={fetchProductsAndSetState}
            setEnableEdit={setEnableEdit}
            setVirtualProductsArr={setVirtualProductsArr}
            dbProductsArr={dbProductsArr}
            virtualProductsArr={virtualProductsArr}
            index={index}
          />
        </td>
      </tr>
    </>
  );
}

function Buttons({
  enableEdit,
  fetchProductsAndSetState,
  setEnableEdit,
  setVirtualProductsArr,
  virtualProductsArr,
  dbProductsArr,
  index,
}) {
  async function deleteProductFromDb(product) {
    const token = JSON.parse(localStorage.getItem("jwtToken")).token;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
      },
    };

    try {
      const request = await fetch(
        `http://localhost:3000/products/${product._id}`,
        requestOptions
      );
      if (!request.ok) {
        alert("response not ok");
      } else {
        alert("response ok");

        fetchProductsAndSetState();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateProductInDbFromState(virtualProduct) {
    try {
      const token = JSON.parse(localStorage.getItem("jwtToken")).token;
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: virtualProduct.name,
          price: virtualProduct.price,
          imgUrl: virtualProduct.imgUrl,
          outOfStock: virtualProduct.outOfStock,
          flavours: virtualProduct.flavours,
        }), // Set the body content
      };
      const response = await fetch(
        `http://localhost:3000/products/${virtualProduct._id}`,
        fetchOptions
      );
      if (response.ok) {
        alert("post updated");
        console.log("post updated");
        fetchProductsAndSetState();
      } else {
        alert(`response not ok : ${response.statusTex}`);
        console.log("post not updated");
      }
    } catch (error) {
      alert("error");
      console.log(error.message);
    }
  }
  return (
    <>
      {enableEdit ? (
        <>
          <input
            type="submit"
            disabled={!enableEdit}
            value="delete"
            onClick={() => {
              deleteProductFromDb(virtualProductsArr[index]);
            }}
          />
          <input
            value="aceptar"
            type="submit"
            onClick={() => {
              //setDataFromDb([...structuredClone(content)]);
              //saveVirtualProductsToDb();
              updateProductInDbFromState(virtualProductsArr[index]);
              setEnableEdit(false);
            }}
          />
          <input
            value="cancelar"
            type="submit"
            onClick={() => {
              setEnableEdit(false);
              setVirtualProductsArr([...structuredClone(dbProductsArr)]);
            }}
          />
        </>
      ) : (
        <input
          value="edit"
          type="submit"
          className="edit"
          onClick={() => {
            console.log("edit button clicked");
            setEnableEdit(true);
          }}
        />
      )}
    </>
  );
}
