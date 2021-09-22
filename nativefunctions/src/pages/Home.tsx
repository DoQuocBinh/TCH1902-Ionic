import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { getAllPets, insertPet } from '../databaseHandler';
import {Camera,CameraResultType,CameraSource} from '@capacitor/camera'


interface Pet {
  id?: string,
  description?: string,
  dataBlob: Blob
}

const Home: React.FC = () => {
  var musicPlayer: ReactAudioPlayer | null
  var inputRef = useRef<HTMLInputElement>(null)
  const [pictureURL, setPictureURL] = useState<string>('/assets/pictureHolder.jpg')
  const [picDescription, setPicDescription] = useState<string>('')
  const [myPets, setMyPets] = useState<Pet[]>([]);

  
  
  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 40,
    });
    setPictureURL(cameraPhoto.webPath!)
  }

  async function fetchData() {
    const pets = await getAllPets();
    setMyPets(pets);
  }


  useEffect(() => {
    fetchData()
  })

  const handleSelectPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      //alert('you selected: '+ event.target.files[0].name)
      const url = URL.createObjectURL(event.target.files[0]);
      setPictureURL(url);
      console.log(url)
    }
  }
  async function savePicture() {
    //download the picture from an URL and store it in a variable: fetch
    const response = await fetch(pictureURL);
    const blob = await response.blob();
    const pet = { description: picDescription, dataBlob: blob }
    await insertPet(pet)
    alert('inserted data')
  }
  //We haven't used anything related to the Camera yet
  //Example of pictureURL: blob:http://localhost:8100/ce675f70-51ec-404e-aa3a-6f638e51cd9b
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
          <IonButton onClick={() => navigator.vibrate(2000)}>Vibrate</IonButton>
        </IonItem>
        <IonItem>
          <input hidden ref={inputRef} type="file" accept="image/*" onChange={handleSelectPicture}></input>
          <img src={pictureURL} onClick={() => inputRef.current?.click()} width="120" height="100" />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked" color="warning">Picture description</IonLabel>
          <IonInput onIonChange={e => setPicDescription(e.detail.value!)} ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={takePicture}>Take picture from Camera</IonButton>
          <IonButton onClick={savePicture}>Upload picture</IonButton>
        </IonItem>
        {myPets &&
          <IonList>
            {myPets.map((c) =>
              <IonItem key={c.id}>
                <IonThumbnail slot="end">
                  <IonImg src={URL.createObjectURL(c.dataBlob)}></IonImg>
                </IonThumbnail>
                <IonLabel>
                  <h3>{c.description}</h3>
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
