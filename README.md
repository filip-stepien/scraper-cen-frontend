# 🏷️ Scraper Cen Produktów - Frontend 🏷️

Repozytorium jest częścią aplikacji [scrapera cen produktów](https://github.com/filip-stepien/scraper-cen).

## 🚀 Technologie

-   **React** – interfejs użytkownika
-   **Komponenty Ant Design** – gotowe komponenty UI
-   **Tailwind CSS** – stylowanie interfejsu

## ⚙️ Instalacja i uruchomienie

### Lokalna instalacja i uruchomienie aplikacji

Zainstaluj zależności:

```bash
npm install
```

Uruchom aplikację:

```bash
npm start
```

Aplikacja domyślnie działa pod adresem `http://localhost:5173`.

Aby możliwe było logowanie, upewnij się, że uruchomiony jest backend z [głównego repozytorium](https://github.com/filip-stepien/scraper-cen).

> [!IMPORTANT]  
> Adres pod którym dostępny jest backend powinien być zgodny ze zmienną środowiskową `VITE_API_PROXY_URL` obecną w pliku `.env`. Domyślny adres backendu to `http://localhost:3000`.

### Domyślnie dane logowania do panelu

-   Hasło: `admin`

### Budowanie

> [!IMPORTANT]
> Przed uruchomieniem komendy budującej ustaw zmienną środowiskową `VITE_API_URL` obecną w pliku `.env` na właściwy adres backendu. Jeśli korzystasz z domyślnych ustawień backendu, ustaw ją na `http://localhost:3000`.

Zainstaluj zależności:

```bash
npm install
```

Zbuduj statyczne pliki:

```bash
npm run build
```

Gotowe pliki będą dostępne w katalogu `/dist`.

## 📄 Licencja

Projekt jest udostępniony w ramach licencji [MIT](https://pl.wikipedia.org/wiki/Licencja_MIT).
