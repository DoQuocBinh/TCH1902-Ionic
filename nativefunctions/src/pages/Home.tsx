import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ReactAudioPlayer from 'react-audio-player';

const Home: React.FC = () => {
  var musicPlayer: ReactAudioPlayer | null
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Native functions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonButton onClick={() => musicPlayer?.audioEl.current?.play()}>Play</IonButton>
          <IonButton onClick={() => musicPlayer?.audioEl.current?.pause()}>Pause</IonButton>
          <ReactAudioPlayer
            ref={(element) => { musicPlayer = element; }}
            src="./assets/music.mp3"
          // controls
          />
        </IonItem>
        <IonItem>
          <IonButton onClick={()=>navigator.vibrate(2000)}>Vibrate</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
