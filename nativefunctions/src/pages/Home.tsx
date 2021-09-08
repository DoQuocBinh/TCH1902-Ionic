import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const Home: React.FC = () => {
  var musicPlayer: ReactAudioPlayer | null
  const [pictureURL,setPictureURL] = useState<string>('')

  const handleSelectPicture = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.files && event.target.files.length > 0){
      //alert('you selected: '+ event.target.files[0].name)
      const url = URL.createObjectURL(event.target.files[0]);
      setPictureURL(url);
      console.log(url)
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Native functions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonButton onClick={() => musicPlayer?.audioEl.current?.play()}>Play music</IonButton>
          <IonButton onClick={() => musicPlayer?.audioEl.current?.pause()}>Pause music</IonButton>
          <ReactAudioPlayer
            ref={(element) => { musicPlayer = element; }}
            src="./assets/music.mp3"
          // controls
          />
        </IonItem>
        <IonItem>
          <IonButton onClick={()=>navigator.vibrate(2000)}>Vibrate</IonButton>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Picture name</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Select a picture</IonLabel>
          <input type="file" accept="image/*" onChange={handleSelectPicture}></input>
        </IonItem>
        <IonItem>
          <img src={pictureURL} width="120" height="100"/>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
