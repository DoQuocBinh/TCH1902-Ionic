import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { getAllPerson, insertPerson } from '../databaseHandler';
import './Home.css';

interface Person{
  id? : number,
  name:string,
  job:string
}

const Home: React.FC = () => {
  const [name,setName] = useState('')
  const [job,setJob] = useState('')
  const [persons, setPersons]= useState<Person[]>([])
  const [refresh,setRefresh] = useState(false)
  const [checkValid,setCheckValid] = useState(false)
  

  async function fetchData(){
    const result = await getAllPerson()
    setPersons(result)

    //Example for search
    // const result = await getAllPerson() as Person[]
    // const nameToFind = "Cuong"
    // const result2 = result.filter(p=>p.name==nameToFind)
    // setPersons(result2)
  }

  //fetchData will run when page is rendered or everytime the variable refresh changes
  useEffect(()=>{
    fetchData()
  },[refresh])

  function checkName(){
    if (name.length==0 && checkValid) {
      return false
    }else
      return true;
  }

  async function handleSave(){
    setCheckValid(true)
    const person = {name:name, job:job}
    if(name.trim().length==0){
      alert("Name is required!")
    }else{
       await insertPerson(person)
       //false->true->false->true
       setRefresh(!refresh)
      
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quick Review Ionic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ionic-padding">
       <IonList>
         <IonItem>
           <IonLabel position="floating">Name</IonLabel>
           <IonInput onIonChange={e=>setName(e.detail.value!)}></IonInput>
           {!checkName() && <p className="my-label">Name is required</p>}
         </IonItem>
         <IonItem>
           <IonLabel position="floating">Job</IonLabel>
           <IonSelect onIonChange={(e)=>setJob(e.detail.value)}>
             <IonSelectOption value="Teacher">Teacher</IonSelectOption>
             <IonSelectOption value="Student">Student</IonSelectOption>
           </IonSelect>
         </IonItem>
           <IonButton onClick={handleSave} expand="full" color="secondary" >Save</IonButton>
       </IonList>
       {persons &&
          <IonList>
            {persons.map(p=>
              <IonItem button key={p.id}>{p.name}</IonItem>
              )}
          </IonList>
       }
      </IonContent>
    </IonPage>
  );
};
//npm i idb
export default Home;
