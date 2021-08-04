import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {play} from 'ionicons/icons'
import { useState } from 'react';
const Home: React.FC = () => {
  const [name,setName] =useState<string>("")
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel color="warning" slot="end">Hello ABC</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="ion-text-wrap" > Multi-line text that should wrap when it is too long
          to fit on one line in the item.</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel color="primary" position="stacked">Your name</IonLabel>
          <IonInput type="text" value={name} 
              onIonChange={event=>setName(event.detail.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonButton>
            <IonIcon slot="icon-only" icon={play}></IonIcon>
            Play
          </IonButton>
        </IonItem>
        You are {name}
      </IonContent>
    </IonPage>
  );
};

export default Home;
