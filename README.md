# EPM John Wesley (Djagblé) — Site vitrine (Frontend)

Déclinaison du modèle pour l’**École Protestante Méthodiste John Wesley**, Djagblé,
préfecture du Zio (Région Maritime), sous la tutelle de l’EPMT — tél. / WhatsApp +228 90 07 71 89.

Vue 3 · Vite · TypeScript · vue-router. Site public (accueil, cycles, admissions, tarifs,
actualités, médias, préinscription, rendez-vous) et espace d'administration.

Ce projet **fonctionne seul** grâce à des données fictives (*fake data*), et se
**reconnecte au backend** (projet backend de l’établissement) en changeant une seule variable.

## Démarrage (présentation, sans backend)

```bash
npm install
npm run dev          # http://127.0.0.1:5173
```

- Site : http://127.0.0.1:5173
- Administration : http://127.0.0.1:5173/admin/connexion
  Compte de démonstration : `direction@epm-johnwesley-djagble.tg` / `WesleyDemo2026!`
  (un bouton de la page de connexion remplit les champs).

Tout fonctionne en démonstration : formulaires avec référence `PRE-…`, `VIS-…`, `MSG-…`,
gestion des actualités / événements / galerie (téléversement compris), statuts des
demandes, paramètres, utilisateurs. Les modifications sont gardées dans le navigateur
(localStorage) ; le bouton **« Réinitialiser les données »** de la page de connexion
restaure la démo d'origine.

Version compilée pour une présentation hors ligne ou un hébergement statique :

```bash
npm run build        # génère dist/
npm run preview      # http://127.0.0.1:4173
```

Pour un hébergeur statique (Netlify, Vercel, Nginx…), redirigez toutes les routes
inconnues vers `index.html` (application monopage).

## Les deux sources de données

| Variable | Valeur | Effet |
|---|---|---|
| `VITE_DATA_SOURCE` | `mock` (défaut) | fake data dans le navigateur, aucun serveur |
| | `api` | backend Node.js réel |
| `VITE_API_URL` | `/api` (défaut) | API sur le même domaine (proxy Vite en développement) |
| | `https://api.ecole.tg/api` | API sur un autre domaine |
| `VITE_MOCK_LATENCY` | `250` (défaut) | délai simulé des fake data, en ms |

Raccourcis : `npm run dev:api` et `npm run build:api` (fichier `.env.api`).
Voir [docs/CONNEXION-BACKEND.md](docs/CONNEXION-BACKEND.md) pour reconnecter le backend.

## Architecture

```
src/
├── config/
│   ├── app.ts          source de données, URL de l'API (variables VITE_*)
│   └── school.ts       PROFIL DE L'ÉTABLISSEMENT : identité, textes, cycles, FAQ…
├── models/index.ts     types des données = format JSON exact de l'API
├── services/
│   ├── contracts.ts    interfaces des services (une méthode = une route de l'API)
│   ├── index.ts        choisit l'implémentation : `services.content.list(...)` etc.
│   ├── api/            implémentation HTTP (backend réel, cookies + CSRF)
│   ├── mock/           implémentation fake data (mêmes règles que le backend)
│   └── errors.ts       ApiError commune aux deux implémentations
├── mocks/
│   ├── data.ts         FAKE DATA (actualités, événements, galerie, demandes, comptes)
│   ├── db.ts           stockage en mémoire + localStorage, réinitialisation
│   └── validation.ts   validation identique au backend (mêmes messages)
├── stores/             état partagé : administrateur connecté, paramètres de l'école
├── utils/format.ts     montants, dates, libellés de statut, URL des images
├── components/ layouts/ views/   interface (n'utilise QUE `services`)
└── router.ts
```

Règle d'or : **les vues n'appellent jamais `fetch` ni les fake data directement**, elles
passent par `services`. Les deux implémentations respectent les mêmes contrats et
renvoient les mêmes formes de données (`src/models`), avec les mêmes erreurs
(`ApiError` : `message` + `errors` par champ). Changer de source ne touche aucune vue.

## Décliner le site pour un autre établissement

1. Dupliquez ce dossier.
2. Modifiez **`src/config/school.ts`** : nom, slogan, coordonnées, tarifs, textes de
   l'accueil (héros, mot du fondateur, histoire, valeurs, FAQ), cycles et classes,
   documents d'admission. Changez aussi `id` (clé de stockage des fake data).
3. Remplacez les images de `public/` : `john-wesley-logo.png` (ou changez `logo`), `hero/`,
   `directeur-general.jpg`, `media/`.
4. Adaptez `index.html` (titre, description, `theme-color`) et, si besoin, les couleurs
   dans `src/styles.css` (variables `--blue`, `--green`, `--yellow`, `--red` en tête de fichier).
5. Si vous voulez d'autres fake data (actualités, événements…), modifiez `src/mocks/data.ts`.

Le backend accepte les cycles Maternelle / Primaire / Collège et leurs classes
(`backend/src/utils/schemas.js`). Si un établissement a d'autres cycles ou classes,
mettez les deux fichiers à jour ensemble.

## Tests

```bash
npx playwright install chromium   # une fois
PLAYWRIGHT_CHROMIUM=1 npm run test   # sur les fake data, sans backend
E2E_API=1 PLAYWRIGHT_CHROMIUM=1 npm run test   # avec le backend démarré sur le port 8080
```

Deux scénarios (deux navigateurs partageant les données, panne réseau) ne tournent
qu'avec le backend.

## Spécificités de ce site

- **Deux cycles** : Préscolaire / jardin d’enfants (valeur technique `Maternelle`, PS–GS) et
  Primaire (CP1–CM2, CEPE). Pas de collège.
- **Nom court dans la barre de navigation** (`shortName` : « EPM John Wesley ») ; le nom
  complet reste dans le pied de page.
- **Boutons flottants WhatsApp et Appeler** (en bas à gauche) et lien WhatsApp dans le pied de
  page : ils utilisent le téléphone principal des paramètres (`phone`).

## Contenu EPM John Wesley

Informations vérifiées (fournies) : nom, statut confessionnel protestant méthodiste (tutelle
EPMT, agrément de l’État), téléphone, localité de Djagblé (Zio), cycles et classes, CEPE.

**Données fictives à remplacer** dès que l'établissement les communique :

- Slogan (« Foi, discipline et excellence »), e-mail, horaires.
- Tous les tarifs (scolarité 60 000 F, cantine, badge, tenue, APE) — page Tarifs.
- Activités spirituelles (culte d’ouverture, partages bibliques, jeunesse chrétienne) :
  à confirmer avec l’école.
- Textes « Notre histoire » et « Mot du directeur » (nom du directeur non connu).
- Photo du directeur et logo (`public/john-wesley-logo.png`) : images provisoires.
- Photos `public/hero/` et `public/media/` : photos génériques du modèle (certaines montrent
  des élèves plus âgés que ceux d’une école primaire).
- Actualités, événements et demandes de démonstration (`src/mocks/data.ts`).
