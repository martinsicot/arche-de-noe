# L'Arche de Noé - Site Web

Site web officiel de la crèche associative inclusive L'Arche de Noé à Bayonne.

## 🎨 Fonctionnalités

- ✅ **Site single-page** moderne et responsive
- ✅ **3 thèmes de couleurs** sélectionnables (Arc-en-ciel, Nature, Douceur)
- ✅ **Bilingue** : Français / Euskara
- ✅ **Sections** : Accueil, Valeurs, Présentation, Pédagogie, Infos Pratiques, Galerie, Témoignages, FAQ, Contact
- ✅ **Formulaire de contact** via Netlify Forms
- ✅ **Galerie photos** avec filtres et lightbox
- ✅ **Accessibilité** WCAG AA
- ✅ **Performance** optimisée
- ✅ **SEO** optimisé pour Bayonne

## 🚀 Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Développement (watch mode)
npm run dev

# Build production
npm run build
```

## 🛠️ Technologies

- **HTML5** / **CSS3**
- **Tailwind CSS** pour le styling
- **JavaScript vanilla** pour les interactions
- **Lucide Icons** pour les icônes
- **Netlify** pour l'hébergement et les formulaires

## 📁 Structure du Projet

```
arche_de_noe/
├── public/
│   ├── index.html          # Page principale
│   ├── css/
│   │   └── output.css      # CSS compilé (généré)
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   └── images/             # Images du site
├── src/
│   ├── css/
│   │   └── input.css       # CSS source (Tailwind)
│   └── js/
│       └── translations.js # Traductions FR/EU
├── package.json
├── tailwind.config.js      # Configuration Tailwind
├── netlify.toml            # Configuration Netlify
├── TODO.md                 # Suivi des tâches
└── README.md
```

## 🌐 Déploiement sur Netlify

### Option 1 : Via GitHub

1. Pusher le code sur GitHub
2. Connecter le repository à Netlify
3. Netlify détectera automatiquement `netlify.toml`
4. Le site sera déployé automatiquement

### Option 2 : Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Déployer
netlify deploy --prod
```

### Configuration du domaine

Une fois déployé sur Netlify :
1. Aller dans **Settings** > **Domain management**
2. Ajouter votre domaine personnalisé
3. Configurer les DNS selon les instructions Netlify

## 🎨 Personnalisation des Thèmes

Les 3 thèmes sont définis dans `src/css/input.css` avec des CSS Custom Properties :

```css
[data-theme="rainbow"] { /* Arc-en-ciel */ }
[data-theme="nature"]  { /* Nature */ }
[data-theme="soft"]    { /* Douceur */ }
```

Pour ajouter un nouveau thème :
1. Ajouter les couleurs dans `src/css/input.css`
2. Ajouter le bouton dans `index.html` (navigation)
3. Rebuild le CSS : `npm run build`

## 🌍 Ajouter une Langue

Les traductions sont dans `src/js/translations.js`. Pour ajouter une langue :

1. Ajouter l'objet de traduction :
```javascript
const translations = {
  fr: { ... },
  eu: { ... },
  es: { ... } // Nouvelle langue
};
```

2. Ajouter le bouton dans la navigation

## 📝 Contenu à Compléter

### Urgent
- [ ] **Coordonnées** : Adresse, téléphone, email (dans `index.html`)
- [ ] **Logo** : Remplacer le texte par un vrai logo
- [ ] **Photos** : Remplacer les placeholders Unsplash par de vraies photos
- [ ] **Google Maps** : Intégrer la carte dans la section Contact

### Souhaitable
- [ ] Année de création de la crèche
- [ ] Photos et descriptions de l'équipe
- [ ] Dates de fermetures annuelles
- [ ] Documents nécessaires pour inscription

## 🔒 Pages Légales

À créer :
- Mentions légales
- Politique de confidentialité (RGPD)
- Politique cookies

## 📧 Configuration du Formulaire

Le formulaire utilise **Netlify Forms** (gratuit). Aucune configuration supplémentaire n'est nécessaire. Les soumissions apparaîtront dans le dashboard Netlify sous **Forms**.

Pour recevoir les emails :
1. Dans Netlify, aller dans **Forms** > **Notifications**
2. Ajouter une notification email

## 🎯 SEO

Le site est optimisé pour le référencement local Bayonne :
- Meta tags configurés
- Structure HTML sémantique
- Alt text sur les images
- Sitemap.xml (à générer si besoin)

## ♿ Accessibilité

Le site respecte les standards **WCAG 2.1 AA** :
- Contrastes de couleurs validés
- Navigation clavier complète
- Labels sur tous les formulaires
- ARIA attributes
- Focus visible

## 📱 Responsive

Le site est **mobile-first** et s'adapte à tous les écrans :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🐛 Debug

Pour activer le mode développement avec auto-reload :

```bash
npm run dev
```

Puis ouvrir `public/index.html` avec un serveur local (ex: Live Server dans VS Code).

## 📞 Support

Pour toute question, consulter le fichier `TODO.md` ou contacter le développeur.

---

**Version** : 1.0
**Dernière mise à jour** : Septembre 2025
**Développé avec** ❤️ pour L'Arche de Noé
