import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import { getAllCustomers } from '../databaseHandler'
import { Customer } from '../models';

const Home: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  async function fetchData() {
    const allCustomer = await getAllCustomers();
    setCustomers(allCustomer);
  }
  //run once evertime the page is rendered
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {customers &&
          <IonList>
            {
              customers.map((c,i) =>
                <IonItem routerLink={'details/'+c.id} button key={i}>{c.name}</IonItem>
              )
            }
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
