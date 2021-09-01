import { IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonPicker } from '@ionic/react';
import { useEffect, useState } from 'react';

import { getAllCustomers } from '../databaseHandler'
import { Customer } from '../models';

const Home: React.FC = () => {
  const [present] = useIonPicker();
  const [value, setValue] = useState('');

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
        <IonButton
          expand="block"
          onClick={() =>
            present({
              buttons: [
                {
                  text: 'Confirm',
                  handler: (selected) => {
                    setValue(selected.animal.value)
                  },
                },
                {
                  text: 'Cancel',
                  handler: () => {
                    //alert('You cancelled!')
                  },
                }
              ],
              columns: [
                {
                  name: 'animal',
                  options: [
                    { text: 'Dog', value: 'dog' },
                    { text: 'Cat', value: 'cat' },
                    { text: 'Bird', value: 'bird' },
                  ],
                },
              ],
            })
          }
        >
          Show Picker
        </IonButton>
            {value}
      </IonContent>
    </IonPage>
  );
};

export default Home;
