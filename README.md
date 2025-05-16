# Aplicație de Notițe cu Generare Automată a Titlurilor

## Introducere
Aceasta este o aplicație web de notițe creată cu Next.js, care permite utilizatorilor să scrie conținut și să genereze automat titluri sugestive pentru notițele lor folosind OpenAI. Notițele sunt salvate în MongoDB Atlas, oferind stocare sigură și accesibilă în cloud.

## Tehnologii folosite
- **Next.js**: Framework React pentru dezvoltare web rapidă și performantă.
- **MongoDB Atlas**: Baza de date NoSQL gestionată în cloud pentru stocarea notițelor.
- **OpenAI**: API pentru generarea automată a titlurilor folosind modelul GPT-3.5-turbo.
- **Tailwind CSS**: Bibliotecă CSS pentru stilizare modernă și responsive.
- **Vercel**: Platformă de hosting și deploy pentru aplicații Next.js.
- **GitHub**: Controlul versiunilor și managementul codului sursă.

## Funcționalități
- Creare notițe cu titlu generat automat.
- Salvarea notițelor în MongoDB Atlas.
- Listarea notițelor salvate cu opțiune de ștergere.
- Interfață modernă și responsivă.

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
    MONGODB_URI=your_mongodb_connection_string
    OPENAI_API_KEY=your_openai_api_key
4. Rulează aplicația:
    ```bash
    npm run dev
5. Deschide http://localhost:3001 în browser.