import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import Products from '../../components/Products/Products'
export const Product: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButton slot='start'>
                <IonMenuButton/>
            </IonButton>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <Products></Products>
      </IonContent>
    </IonPage>
  )
}

export default Product
