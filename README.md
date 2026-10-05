# Kehra Pagar

Uus koduleht asendab WordPressi lehe kehrapagar.ee. See fail on kokkulepe, mitte kood. Siia kirjutame, mis on otsustatud. Muudatus käib siin, enne kui midagi ehitatakse.

Testversioon on see repo. Lõplik leht ja tellimused elavad Zone'i serveris. GitHubi külastaja ei loe.

## Mis on otsustatud

- WordPressi ei kasutata. Leht on kerge ja kiire, telefonile esimene, eesti keel on põhikeel.
- Eesmärgid: tooted, sotsiaalmeedia kampaaniad, kringlitellimused.
- Tellimus on ainult kohapealne järeletulemine ja kohapealne maksmine. Ettemaksu ei ole.
- Lehel on suur nupp «Helista ja telli». Telefonis avab see kõne.
- Kõrval on lühike vorm: kringel, suurus, järeletulemise päev ja kellaaeg, nimi, telefon.
- Tellimus salvestub Zone'i. Igast tellimusest läheb e-kiri pagarikotta.
- Pagaril on lihtne telefonivaade. Sinna saab kirja panna ka telefonitellimuse, et kõik tellimused oleks ühes kohas. Pagarivaade on eesti keeles.
- Igal kampaanial on lühike link. `?keel=ru` või `?keel=en` avab sama lehe teises keeles.
- Muudatused on tagasikeeratavad. Eelmise versiooni failid jäävad alles.
- Ivar ei kirjuta koodi. Muudatus käib lihtsa juhisega.

## Keel ja tekst

Eesti on ainus keel, mida inimene muudab. Vene ja inglise tulevad sellest.

Muster on sama mis Helirännakul (ivarneio/helivann):

- `seaded.json` — telefon, aadress, lahtiolek, kuhu tellimuskiri läheb. Neid ei tõlgita.
- `tekstid.json` — nupud, vormi sildid, menüü. Võti on sama igas keeles: `et`, `ru`, `en`.
- `sisu.json` — tooted, kampaaniariba, kringli suurused.

Kui tõlget pole, näitab leht eesti teksti. Leht ei küsi tõlget iga külastuse ajal.

## Pilvefail ja tõlkesünk

Tekste on palju ja neid muudab kolmas pool, mitte arendaja. Töökoht on pilvefail, mitte GitHub.

- Üks rida on üks toode või üks tekst.
- Eesti veerud on ainsad, mida kolmas pool täidab.
- Vene ja inglise veerud täidab tõlkesünk. Käsitsi neid ei parandata. Parandus käib eesti tekstist.
- Sünk võrdleb eesti teksti eelmise korraga. Muutunud rida tõlgitakse uuesti. Muutumata rida jääb puutumata.
- Tulemus kirjutatakse tagasi samasse faili ja kopeeritakse lehe JSON-i, mida Zone serveerib.
- Külastaja loeb Zone'i koopiat. Kui pilvefail on maas, jääb pood lahti.
- Tellimused pilvefaili ei lähe.
- Toidunime või allergeeni reale saab märkida «ära tõlgi üle», kuni keegi on tõlke üle vaadanud.

Tõlkesünk on eraldi reliisi ülesanne. Seda ei ehitata esimese lehefailiga koos.

## Mis on veel lahti

- Pilvefaili täpne koht. Looduslik valik on Google'i tabel. Excel OneDrive'is või Dropboxis käib ka, aga sünk on kohmakam.
- Kas sünk käib käsul, iga salvestusega või kord päevas.
- Kes vene ja inglise toiduteksti enne avaldamist üle vaatab.
- Tootenimekiri, pildid, suurused, järeletulemise ajad, tellimuse e-posti aadress.

## Tööviis

Kontseptsioon enne koodi. Koodi ei kirjutata, enne kui see samm on siin kirjas ja kinnitatud. Väikesed sammud.
