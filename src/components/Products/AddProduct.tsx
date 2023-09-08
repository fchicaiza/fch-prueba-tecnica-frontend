import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonAlert,
} from '@ionic/react';

// Define el tipo de la función onAddProduct
type OnAddProduct = (newProduct: Product) => void;

interface Product {
  prodCode: string;
  prodName: string;
  prodManofacturer: string;
  prodModel: string; // Cambiado a string para coincidir con el tipo del estado local
  prodUnitPrice: string; // Cambiado a string para coincidir con el tipo del estado local
  prodStock: string; // Cambiado a string para coincidir con el tipo del estado local
}

export const AddProduct: React.FC<{ onAddProduct: OnAddProduct }> = ({ onAddProduct }) => {
  const [product, setProduct] = useState<Product>({
    prodCode: '',
    prodName: '',
    prodManofacturer: '',
    prodModel: '',
    prodUnitPrice: '',
    prodStock: '',
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    // Validar campos
    if (
      !product.prodCode ||
      !product.prodName ||
      !product.prodManofacturer ||
      !product.prodModel ||
      !product.prodUnitPrice ||
      !product.prodStock
    ) {
      setShowAlert(true);
      return;
    }

    // Convertir valores a números (asegurarse de que sean números válidos)
    const unitPrice = parseFloat(product.prodUnitPrice);
    const stock = parseInt(product.prodStock);

    if (isNaN(unitPrice) || isNaN(stock)) {
      setShowAlert(true);
      return;
    }

    // Llamar a la función de agregar producto y pasar el objeto product
    onAddProduct(product);

    // Limpiar los campos después de agregar el producto
    setProduct({
      prodCode: '',
      prodName: '',
      prodManofacturer: '',
      prodModel: '',
      prodUnitPrice: '',
      prodStock: '',
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/product-list" />
          </IonButtons>
          <IonTitle>Agregar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Código del Producto</IonLabel>
          <IonInput
            name="prodCode"
            value={product.prodCode}
            onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Nombre del Producto</IonLabel>
          <IonInput
            name="prodName"
            value={product.prodName}
            onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Fabricante</IonLabel>
          <IonInput
            name="prodManofacturer"
            value={product.prodManofacturer}
            onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Modelo</IonLabel>
          <IonInput
            name="prodModel"
            value={product.prodModel}
            onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Precio Unitario</IonLabel>
          <IonInput
            name="prodUnitPrice"
            value={product.prodUnitPrice}
            type="number"
            onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Stock</IonLabel>
          <IonInput
            name="prodStock"
            value={product.prodStock}
            type="number"
            onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>

        <IonButton expand="full" onClick={handleAddProduct}>
          Agregar Producto
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error de Validación"
          message="Asegúrate de que todos los campos estén llenos y que los campos numéricos sean números válidos."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddProduct;
