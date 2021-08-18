import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState('')
  const [languages,setLangages] = useState<string[]>([]);
  const [dateOfBirth,setDateOfBirth] = useState(new Date().toISOString());
  const [gender, setGender] = useState('')
  
  const [present,dismiss] = useIonToast()

  const registerClick = ()=>{
    present('halo',2000)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput onIonChange={event => setName(event.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect onIonChange={event => setCountry(event.detail.value)}>
            <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="Lao">Lao</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Languages can speak</IonLabel>
          <IonSelect multiple={true} onIonChange={e=>setLangages(e.detail.value)}>
            <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
            <IonSelectOption value="Lao">Lao</IonSelectOption>
            <IonSelectOption value="English">English</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date of birth</IonLabel>
          <IonDatetime onIonChange={e=>setDateOfBirth(e.detail.value!)} value={dateOfBirth}></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonRadioGroup onIonChange={e=>setGender(e.detail.value)}>
            <IonItem>
              <IonLabel><small>Male</small></IonLabel>
              <IonRadio value="Male"></IonRadio>
            </IonItem>
            <IonItem lines="none">
              <IonLabel><small>Female</small></IonLabel>
              <IonRadio value="Female"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonItem>
        <IonButton expand="block" onClick={registerClick} >Register</IonButton>
      </IonContent>

    </IonPage>
  );
};

export default Register;
