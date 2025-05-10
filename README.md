# 📱 Open USSD Sénégal

Une base de données simple et ouverte des **codes USSD et numéros courts utilisés au Sénégal** pour les services Mobile Money (Orange Money, Free Money, Wave, etc.).

## ✅ Objectif

Créer une ressource communautaire pour référencer tous les codes USSD utiles pour :

- Recharger son téléphone
- Transférer de l'argent
- Vérifier son solde
- Accéder aux services Mobile Money

## 📂 Structure des données

Les données sont stockées dans un fichier CSV :
[`data/ussd_codes_senegal.csv`](data/ussd_codes_senegal.csv)

### 🧩 Colonnes

- `Opérateur` : Nom de l'opérateur (Orange, Free, Wave…)
- `Pays` : Toujours "Sénégal" (pour cette version)
- `Service` : Type de service (Solde, Transfert, Retrait…)
- `Code USSD` : Le code à composer
- `Syntaxe` : Exemple d'utilisation ou format attendu
- `Description` : Ce que fait le code
- `Statut` : `Actif`, `Obsolète`, `À confirmer`
- `Dernière mise à jour` : Date du dernier test

---

## ✍️ Contribuer

Tu peux aider en :

- Corrigeant ou mettant à jour un code
- Ajoutant un nouveau code USSD
- Signalant des erreurs

### 🔄 Comment contribuer

1. Fork ce dépôt
2. Édite le fichier [`ussd_codes_senegal.csv`](data/ussd_codes_senegal.csv)
3. Fait une pull request avec un **titre clair**
4. Si possible, ajoute une source ou une preuve (screenshot ou opérateur)
5. Lis les consignes complètes ici 👉 [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## 📖 Licence

MIT – Ce projet est **libre et réutilisable**.

---

## 💬 Contact

Tu peux proposer des idées ou poser des questions via les [Issues GitHub](https://github.com/alphajoop/open-ussd-sn/issues).

---

## **Made in Sénégal 🇸🇳**
