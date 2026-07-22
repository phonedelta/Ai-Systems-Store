# AI Systems Store — Landing Page

Site vitrine React + Vite + Tailwind.

## Lancer en local

```bash
npm install
npm run dev
```

## Héberger gratuitement avec GitHub Pages (lien public)

### 1. Créer le dépôt
1. Allez sur https://github.com/new
2. Nom : `ai-systems-store-landing`
3. Public → **Create repository**

### 2. Envoyer le code
Dans un terminal, depuis ce dossier :

```bash
cd "c:\Users\Pc\Desktop\AI Systems"
git remote add origin https://github.com/VOTRE-USERNAME/ai-systems-store-landing.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE-USERNAME` par votre pseudo GitHub.

### 3. Activer Pages
1. Repo → **Settings** → **Pages**
2. **Source** : **GitHub Actions**
3. Onglet **Actions** → attendez que le workflow `Deploy to GitHub Pages` soit vert

### 4. Lien du site
`https://VOTRE-USERNAME.github.io/ai-systems-store-landing/`

---

Le workflow est déjà dans `.github/workflows/deploy.yml`.
Chaque `git push` sur `main` republie automatiquement le site.
