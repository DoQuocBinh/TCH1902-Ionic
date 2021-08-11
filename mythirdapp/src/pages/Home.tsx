import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [name,setName]= useState('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState<[]>()
  const [showToast,setShowToast] = useState(false)
  const [dob, setDob]= useState(new Date().toISOString())
  
  function clickHandler(){
    setShowToast(true);
    setTimeout(()=>{
      setShowToast(false);
    },2000)
  }
  function formatDate(isoString:string){
    return new Date(isoString).toLocaleDateString("vi-VN");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Register Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput value={name} onIonChange={(event)=>setName(event.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect value={country} onIonChange={(event)=>setCountry(event.detail.value)}>
            <IonSelectOption value="vn">VietNam</IonSelectOption>
            <IonSelectOption value="indo">Indonesia</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Languages you can speak</IonLabel>
          <IonSelect multiple={true} value={languages} onIonChange={(event)=>setLanguages(event.detail.value)}>
            <IonSelectOption value="en">English</IonSelectOption>
            <IonSelectOption value="spanish">Spanish</IonSelectOption>
            <IonSelectOption value="chinese">Chinese</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date of birth</IonLabel>
          <IonDatetime value={dob} onIonChange={event=>setDob(event.detail.value!)}></IonDatetime>
        </IonItem>
        <IonButton expand="block" onClick={clickHandler}>Ok</IonButton>
        <IonToast message={"Hello " 
                  + name + " " 
                  + country + " "
                + languages + " "
                + formatDate(dob)} isOpen={showToast} position="middle"></IonToast>
        
        {languages &&
          languages.map((item,i) => <IonItem color="success"><IonLabel>{i + "."+ item}</IonLabel></IonItem>)
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
