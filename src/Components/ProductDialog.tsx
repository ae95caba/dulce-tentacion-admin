import React, { useRef, useContext, useState } from "react";
import TableContext from "../Contexts/ProductsContext";
import tryToModifyDbWithAuth from "../functions/tryToModifyDbWithAuth";
export function ProductDialog({ product }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const { get_AndDo_, setDbProductsArr } = useContext(TableContext);

  const [showDeleConfirmation, setShowDeleteConfirmation] = useState(false);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formElements = formRef.current.elements;

    const body = {
      name: formElements.name.value,
      flavours: formElements.flavours.value
        ? formElements.flavours.value
        : undefined,
      description: formElements.description.value
        ? formElements.description.value
        : undefined,
      price: formElements.price.value,
      imgUrl: formElements.imgUrl.value,
      outOfStock: formElements.outOfStock.checked,
    };

    const settings = {
      route: "products",

      method: product ? "PUT" : "POST",
      callback: () => {
        closeDialog();

        get_AndDo_("products", (response) => {
          setDbProductsArr(response.data);
        });
        e.target.reset();
      },
      body: JSON.stringify(body),
    };

    if (product) {
      settings.id = product._id;
    }

    tryToModifyDbWithAuth(settings);
  }

  function deleteProduct() {
    const settings = {
      route: "products",
      id: `${product._id}`,
      method: "DELETE",

      callback: () => {
        closeDialog();
        get_AndDo_("products", (response) => {
          setDbProductsArr(response.data);
        });
      },
    };

    tryToModifyDbWithAuth(settings);
  }

  return (
    <>
      <button onClick={openDialog}>{product ? "Editar" : "Agregar"}</button>

      <dialog className="crud" ref={dialogRef}>
        {showDeleConfirmation && (
          <div className="delete-comfirmation">
            <h2>Estas seguro?</h2>
            <div className="buttons-container">
              <button onClick={deleteProduct}>Aceptar</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                cancelar
              </button>
            </div>
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              name="name"
              defaultValue={product?.name}
              placeholder="name"
              required
            />
          </label>
          <label>
            Descripcion
            <input
              name="description"
              defaultValue={product?.description}
              placeholder="description"
            />
          </label>
          <label>
            Precio
            <input
              defaultValue={product?.price}
              name="price"
              type="number"
              placeholder="price"
              required
            />
          </label>
          <label>
            Sabores
            <input
              defaultValue={product?.flavours}
              type="number"
              name="flavours"
              placeholder="flavours"
            />
          </label>
          <label>
            url de la imagen
            <input
              defaultValue={product?.imgUrl}
              name="imgUrl"
              placeholder="imgUrl"
              required
            />
          </label>
          <label className="outOfStock">
            No hay stock ?
            <input
              type="checkbox"
              defaultChecked={product?.outOfStock}
              name="outOfStock"
            />
          </label>
          <div className="buttons-container">
            {product && (
              <button
                type="button"
                className="delete"
                onClick={() => {
                  setShowDeleteConfirmation(true);
                }}
              >
                borrar
              </button>
            )}
            <button type="submit">Aceptar</button>

            <button type="button" onClick={closeDialog}>
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
