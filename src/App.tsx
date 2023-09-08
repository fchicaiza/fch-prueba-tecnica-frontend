import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, IonTitle, IonToggle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { cart } from 'ionicons/icons'
import Product from './pages/ProductPage/Product';
import Home from './pages/HomePage/Home';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        {/* Add Menu */}
        <IonMenu contentId="productManage">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Gestión de Productos</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent >
            <IonMenuToggle>
              <IonItem routerLink='/manage-product' routerDirection='none' lines='none'>
                <IonIcon color='medium' slot='start' icon={cart} />
                <IonLabel>Gestión de productos</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>
        {/* Add Menu */}
        <IonSplitPane contentId="productManage">
          <IonRouterOutlet id="productManage">
            <Route path="/manage-product" component={Product} exact />
            <Route path="/home" component={Home} exact />
            <Redirect to="home" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
