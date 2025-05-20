# Aplicație Notițe, Munteanu Cristina-Ioana, 1133
Link:
## Prezentare video proiect: https://youtu.be/iywF8nAr1YY
## Publicare proiect: proiect-cloud-computing-rlrm.vercel.app

# Introducere
Această aplicație web permite utilizatorilor să gestioneze eficient notițele personale printr-o interfață intuitivă și modernă. Utilizatorii pot crea, edita și șterge notițe direct din interfață, iar pentru a îmbunătăți experiența de utilizare, aplicația folosește capabilitățile platformei OpenAI pentru a genera titluri sugestive automat, în funcție de conținutul introdus.
Funcționalitatea de generare a titlurilor este implementată printr-un apel API către modelul gpt-3.5-turbo oferit de OpenAI, care analizează conținutul textului introdus de utilizator și returnează un titlu relevant, coerent și concis.
Pentru persistența datelor, aplicația utilizează o bază de date MongoDB Atlas, o soluție cloud scalabilă și securizată, care permite stocarea și gestionarea în timp real a notițelor. Acest lucru asigură că datele utilizatorului sunt păstrate chiar și după reîncărcarea aplicației sau accesarea acesteia de pe alte dispozitive.
Aplicația este construită folosind Next.js, un framework modern bazat pe React, care permite atât randare statică, cât și dinamică pe server. Interfața este complet responsivă, fiind optimizată atât pentru desktop, cât și pentru dispozitive mobile. Utilizatorii beneficiază de o experiență fluidă, cu feedback vizual în timp real pentru acțiuni precum generarea titlului, salvarea sau ștergerea notițelor.
Pentru o implementare modernă și scalabilă, aplicația este găzduită pe platforma Vercel, care oferă suport nativ pentru Next.js, deploy automat din GitHub și performanță ridicată prin edge functions. Această arhitectură permite un ciclu de dezvoltare rapid, cu minimă configurație și o disponibilitate ridicată a aplicației.

# Descriere problemă
În utilizarea zilnică a aplicațiilor de tip notepad sau organizator personal, utilizatorii au tendința de a scrie rapid idei, sarcini sau gânduri fără a acorda atenție titlului. Lipsa unui titlu semnificativ poate părea inițial un detaliu minor, dar devine o problemă serioasă pe termen lung – mai ales când volumul notițelor crește. Fără titluri relevante, organizarea devine anevoioasă, iar regăsirea ulterioară a informației necesită mai mult timp și efort din partea utilizatorului.
Aplicația propusă adresează direct această problemă prin integrarea unui sistem inteligent de generare automată a titlurilor, folosind tehnologia OpenAI. Practic, în momentul în care un utilizator introduce conținutul unei notițe, sistemul poate analiza contextul și poate sugera un titlu concis și reprezentativ, fără a necesita efort suplimentar din partea utilizatorului.

# Descriere API
Aplicația expune un API REST cu următoarele endpoint-uri principale:
- **POST /api/generate-title – primește conținutul unei notițe și returnează un titlu generat automat folosind OpenAI.
- **GET /api/get-notes – returnează toate notițele salvate în baza de date.
- **POST /api/save-note – salvează o notiță nouă cu titlu și conținut.
- **PUT /api/edit-note – modifică o notiță existentă după ID, actualizând titlul și conținutul.
- **DELETE /api/delete-note – șterge o notiță după ID.

# Flux de date
-**Exemple request / response
## Generate Title
Request:
POST /api/generate-title
{
  "content": "Aceasta este o notiță despre cloud computing și beneficiile sale."
}
Response:
{
  "title": "Beneficiile Cloud Computing"
}
## Save Note
Request:
POST /api/save-note
{
  "title": "Beneficiile Cloud Computing",
  "content": "Aceasta este o notiță despre cloud computing și beneficiile sale."
}
Response:
{
  "message": "Notița a fost salvată cu succes."
}
## Metode HTTP utilizate
- **POST pentru crearea și generarea titlurilor notițelor.
- **GET pentru preluarea listelor de notițe.
- **PUT pentru modificarea notițelor existente.
- **DELETE pentru ștergerea notițelor.

## Autentificare și autorizare
Am ales să nu implementez un mecanism de autentificare și autorizare deoarece aplicatia este destinată uzului personal.
## Capturi ecran aplicație
![Interfata](.\capturi_aplicatie\1.png)
![Lista notite](.\capturi_aplicatie\1.png)
![Editare](.\capturi_aplicatie\1.png)
![BD](.\capturi_aplicatie\1.png)
 
## Referințe
- Next.js Documentation
- MongoDB Atlas
- OpenAI API Documentation
- Tailwind CSS

## Tehnologii folosite
- **Next.js**: Framework React pentru dezvoltare web rapidă și performantă.
- **MongoDB Atlas**: Baza de date NoSQL gestionată în cloud pentru stocarea notițelor.
- **OpenAI**: API pentru generarea automată a titlurilor folosind modelul GPT-3.5-turbo.
- **Tailwind CSS**: Bibliotecă CSS pentru stilizare modernă și responsive.
- **Vercel**: Platformă de hosting și deploy pentru aplicații Next.js.
- **GitHub**: Controlul versiunilor și managementul codului sursă.

## Instalare și rulare locală
1. Clonează repository-ul:
   ```bash
   git clone https://github.com/MunteanuIoana20/ProiectCloudComputing.git
   cd ProiectCloudComputing
2. Instalează dependențele:
    ```bash
    npm install
3. Creează un fișier .env.local în rădăcina proiectului și adaugă variabilele de mediu:
    ```ini
    MONGODB_URI=mongodb+srv://cristinaioana16012001:CloudComputing@notesdb.bkozdv0.mongodb.net/notesdb?retryWrites=true&w=majority&appName=notesdb
    OPENAI_API_KEY=your_openai_api_key
4. Rulează aplicația:
    ```bash
    npm run dev
5. Deschide http://localhost:3001 în browser.