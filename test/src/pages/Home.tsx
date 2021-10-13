import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [geoLong, setGeoLong] = useState<number>();
  const [geoLat, setGeoLat] = useState<number>();
  function getGeoInfo(){
    navigator.geolocation.getCurrentPosition((position)=>{
      setGeoLong(position.coords.longitude)
      setGeoLat(position.coords.latitude)
    })
  }
  useEffect(()=>{
    getGeoInfo()
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {geoLat}
      </IonContent>
    </IonPage>
  );
};

export default Home;
