
import React, { useState } from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonModal,
    //   IonInput,
    IonItemDivider,
    IonInput,
    //   IonChange,
    InputChangeEventDetail
} from '@ionic/react';

interface Product {
    id: string;
    prodCode: string;
    prodName: string;
    prodManofacturer: string;
    prodModel: string;
    prodUnitPrice: number;
    prodStock: number;
}

interface ProductListProps {
    products: Product[];
    fetchAddProduct: (jsonData: Record<string, any>) => Promise<void>;
    fetchEditProduct: (jsonData: Record<string, any>, id: string) => Promise<void>;
    fetchDeleteProduct: (id: string) => Promise<void>;
}


const ProductList: React.FC<ProductListProps> = ({ products, fetchAddProduct, fetchEditProduct, fetchDeleteProduct }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Product>({
        id: '',
        prodCode: '',
        prodName: '',
        prodManofacturer: '',
        prodModel: '',
        prodUnitPrice: 0,
        prodStock: 0,
    });

    const handleAddClick = () => {
        setShowAddModal(true);
        setSelectedProduct(null);
        setFormData({
            id: '',
            prodCode: '',
            prodName: '',
            prodManofacturer: '',
            prodModel: '',
            prodUnitPrice: 0,
            prodStock: 0,
        });

    };

    const handleAddModalDismiss = () => {
        setShowAddModal(false);
    };

    const handleEditClick = (productId: any) => {
        const productToEdit = products.find(product => product.id === productId);
        if (productToEdit) {
            setSelectedProduct(productToEdit);
            setFormData(productToEdit);
            setShowAddModal(true);
        }
    };
    const handleDeleteClick = (productId: string) => {

        console.log(productId)
        fetchDeleteProduct(String(productId))
    };

    const handleFormChange = (
        event: CustomEvent<InputChangeEventDetail>,
        field: string
    ) => {
        const value = event.detail.value!;
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSaveClick = () => {
        if (selectedProduct) {
            const updatedProductData = { ...formData, id: selectedProduct.id };
            fetchEditProduct(updatedProductData, String(selectedProduct.id))
        } else {
            let newProductObject = formData
            console.log("newProduct", newProductObject)
            fetchAddProduct(newProductObject)
        }
        setShowAddModal(false);
    };
    return (
        <div>
            <h1>Lista de Productos</h1>

            {/* Botón para agregar un nuevo producto */}
            <IonButton expand="full" color="success" onClick={handleAddClick}>
                Agregar Producto
            </IonButton>

            {/* Lista de productos */}
            <IonList>
                {products.map((product, index) => (
                    <IonItem key={index}>
                        <IonLabel>
                            <h2>{product.prodName}</h2>
                            <p>Código: {product.prodCode}</p>
                            <p>Fabricante: {product.prodManofacturer}</p>
                            <p>Modelo: {product.prodModel}</p>
                            <p>Precio Unitario: {product.prodUnitPrice}</p>
                            <p>Stock: {product.prodStock}</p>
                        </IonLabel>
                        {/* Botones de Editar y Eliminar */}
                        <IonButton
                            expand="full"
                            color="primary"
                            onClick={() => handleEditClick(product.id)}
                        >
                            Editar
                        </IonButton>
                        <IonButton
                            expand="full"
                            color="danger"
                            onClick={() => handleDeleteClick(product.id)}
                        >
                            Eliminar
                        </IonButton>
                    </IonItem>
                ))}
            </IonList>

            {/* Modal para agregar/editar producto */}
            <IonModal isOpen={showAddModal} onDidDismiss={handleAddModalDismiss}>
                <h2>{selectedProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
                <IonItemDivider />

                <IonItem>
                    <IonLabel position="stacked">Código del Producto</IonLabel>
                    <IonInput
                        value={formData.prodCode}
                        onIonChange={(e) => handleFormChange(e, 'prodCode')}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Nombre del Producto</IonLabel>
                    <IonInput
                        value={formData.prodName}
                        onIonChange={(e) => handleFormChange(e, 'prodName')}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Fabricante</IonLabel>
                    <IonInput
                        value={formData.prodManofacturer}
                        onIonChange={(e) => handleFormChange(e, 'prodManofacturer')}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Modelo</IonLabel>
                    <IonInput
                        // type=""
                        value={formData.prodModel.toString()}
                        onIonChange={(e) => handleFormChange(e, 'prodModel')}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Precio Unitario</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.prodUnitPrice.toString()}
                        onIonChange={(e) => handleFormChange(e, 'prodUnitPrice')}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Stock</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.prodStock.toString()}
                        onIonChange={(e) => handleFormChange(e, 'prodStock')}
                    />
                </IonItem>

                <IonButton expand="full" color="primary" onClick={handleSaveClick}>
                    Guardar
                </IonButton>

                <IonButton expand="full" color="danger" onClick={handleAddModalDismiss}>
                    Cancelar
                </IonButton>
            </IonModal>
        </div>
    );
};

export default ProductList;
