import { IonContent, IonHeader, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import { getAllCustomers } from '../databaseHandler'
import { Customer } from '../models';

const Home: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  async function fetchData() {
    const allCustomer = await getAllCustomers();
    setCustomers(allCustomer);
  }
  function doRefresh(event: any) {
    fetchData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 800);
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
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
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
