import React, { useState, useEffect } from 'react'

import { IonButton, IonInput, IonList, IonItem, IonLabel } from '@ionic/react';
import { appBackend, uriInformation } from '../../utils/app-backend';
import ProductList from './ProductList';

export const Products: React.FC = () => {
    // useState Section
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const [editProductId, setEditProductId] = useState(-1);
    const [editedProductName, setEditedProductName] = useState('')
    // useState Section

    // backend parameters
    const { uri: { url, port } } = uriInformation
    const { crud: { name, target } } = appBackend
    // backend parameters

    // UseEffect Section
    useEffect(() => {
        // GetAllProducts
        const fetchAllProducts = async () => {
            try {
                const requestParams = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };
                const response = await fetch(`${url}${port}${name}${target}`, requestParams);
                if (!response.ok) {
                    alert("Se ha producido un eror al realizar la petición")
                    throw new Error('La solicitud no fue exitosa');
                }
                const result = await response.json();
                console.log("RESPUETA", result)
                setProducts(result);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchAllProducts();
        // GetAllProducts
    }, []);
    // UseEffect Section


    const fetchAllProducts = async () => {
        try {
            const requestParams = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const response = await fetch(`${url}${port}${name}${target}`, requestParams);
            if (!response.ok) {
                alert("Se ha producido un eror al realizar la petición")
                throw new Error('La solicitud no fue exitosa');
            }
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const fetchAddProduct = async (jsonData: Record<string, any>) => {
        try {
            const response = await fetch(`${url}${port}${name}${target}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) {
                alert("Ha ocurrido un error al agregar el producto")
                throw new Error('La solicitud no fue exitosa');
            }

            const data = await response.json();
            fetchAllProducts()
            alert(" El producto fue agregado exitosamente")
            console.log(data); // La respuesta del servidor
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };



    const fetchEditProduct = async (jsonData: Record<string, any>, id: string) => {
        console.log(`${url}${port}${name}${target}${id}`)
        try {
            const response = await fetch(`${url}${port}${name}${target}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }

            const data = await response.json();
            fetchAllProducts()
            alert("El producto se ha editado exitosamente")
            console.log(data); // La respuesta del servidor
        } catch (error) {
            alert(`Error, en la solicitud de edicion ${error}`)
            console.error('Error en la solicitud:', error);
        }
    };


    const fetchGetProductById = async (id: string) => {
        try {
            const response = await fetch(`${url}${port}${name}${target}${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }

            const data = await response.json();
            console.log(data); // La respuesta del servidor

        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const fetchDeleteProduct = async (id: string) => {
        try {
            const response = await fetch(`${url}${port}${name}${target}${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("RETURN", response)
            // return

            if (!response.ok) {
                console.log("RESPONSE", response)
                throw new Error('La solicitud no fue exitosa');
            }

            if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                const data = await response.json();
                fetchAllProducts()
                alert('Producto eliminado exitosamente');
                console.log(data); // La respuesta del servidor
              } else {
                alert('Operación cancelada');
              }
     
        } catch (error) {
            alert(`Error, en la solicitud de eliminacion ${error}`)
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div>
            <ProductList
                products={products}
                fetchAddProduct={fetchAddProduct}
                fetchEditProduct={fetchEditProduct}
                fetchDeleteProduct={fetchDeleteProduct}
            />
        </div>
    )
}

export default Products
