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

## Lehe struktuur (mustand, ülevaatamiseks)

See ei ole veel lukus. Üks pikk vaade, mitte pood paljude alamlehtedega. Telefonis on kerimine selgem kui menüü. Kampaania link avab sama lehe ja kerib õigesse kohta.

Ülevalt alla:

1. Kampaaniariba. Nähtav ainult siis, kui kampaania on sees. Tavaline aadress näitab jooksvat kampaaniat või on tühi. Sotsiaalmeedia link on sama leht, riba ja seotud toode ees.
2. Päis. Nimi, keel, suur nupp «Helista ja telli».
3. Tellimus. Vorm kohe: kringel, suurus, päev ja kellaaeg, nimi, telefon. Ettemaksu ega ostukorvi ei ole.
4. Tootegrupid. Suured kaardid, üks puudutus avab grupi.
5. Tooted. Pilt, nimi, lühike tekst, hind. Kringel on tellitav. Teised tooted on vaatamiseks ja poes ostmiseks.
6. Oma pood. Aadress, lahtiolek, kuidas järgi tulla. See ei ole e-pood.
7. Jalus. Telefon ja aadress.

Pagarivaade on eraldi aadress, menüüs seda ei ole. Keel vahetub samal lehel.

Gruppide esimene mustand, ei ole lukus: Kringlid, Pirukad ja saiad, Tordid ja koogid, Küpsised. Pood on oma plokk, mitte tootegrupp.

### Tootegrupi avanemine (mustand)

Tootegrupp on suletuna üks kaart. Puudutus ei vaheta lehte. Kaart avaneb samal kohal, ja sealt tulevad toodete pildid ükshaaval, mitte kõik korraga. Silm jõuab järge pidada. Iga pilt on valik, mitte galerii: nimi ja hind tulevad pildiga kaasa, et aju hakkaks kohe otsustama.

Avamine ja sulgemine on üks liikumine. Näha on, kust kaart tuli ja kuhu tooted lähevad. Sulgemisel rullub sama tee tagasi, mitte ei kao järsku. Nii on aru saada, mis milleks avanes.

Efekt on lühike, umbes poole sekundi sees. Kui telefon küsib vähem liikumist, on efekt väljas. Piltide rida ei peida tellimust ega poodi. Korraga on lahti üks grupp. Teise avamine sulgeb eelmise sama liikumisega.

## Keel ja tekst

Eesti on ainus keel, mida inimene muudab. Vene ja inglise tulevad sellest.

Muster on sama mis Helirännakul (ivarneio/helivann):

- `seaded.json` — telefon, aadress, lahtiolek, kuhu tellimuskiri läheb. Neid ei tõlgita.
- `tekstid.json` — nupud, vormi sildid, menüü. Võti on sama igas keeles: `et`, `ru`, `en`.
- `sisu.json` — tooted, kampaaniariba, kringli suurused.

Kui tõlget pole, näitab leht eesti teksti.

Tõlge toimub ainult reliisi ajal. Muud tekstid kohendatakse samuti reliisiga. Kliendi lehe avamisel ei toimu mingit tõlkimist ega teksti kohendamist. Leht loeb valmis faili.

## Pilvefail ja tõlkesünk

Tekste on palju ja neid muudab kolmas pool, mitte arendaja. Töökoht on pilvefail, mitte GitHub.

- Üks rida on üks toode või üks tekst.
- Eesti veerud on ainsad, mida kolmas pool täidab.
- Vene ja inglise veerud täidab tõlkesünk. Käsitsi neid ei parandata. Parandus käib eesti tekstist.
- Sünk käib reliisi ajal, mitte lehe avamisel ega iga salvestusega.
- Sünk võrdleb eesti teksti eelmise korraga. Muutunud rida tõlgitakse uuesti. Muutumata rida jääb puutumata.
- Tulemus kirjutatakse tagasi samasse faili ja kopeeritakse lehe JSON-i, mida Zone serveerib.
- Külastaja loeb Zone'i koopiat. Kui pilvefail on maas, jääb pood lahti.
- Tellimused pilvefaili ei lähe.
- Toidunime või allergeeni reale saab märkida «ära tõlgi üle», kuni keegi on tõlke üle vaadanud.

Tõlkesünk on eraldi reliisi ülesanne. Seda ei ehitata esimese lehefailiga koos.

## Reliis ja kirjavead

Kirjavead tuleb raporteerida. Raport on märkus, mitte tõke.

Kui kirjaviga on parandatud, ei ole see veateade ega põhjus, et reliis ei õnnestunud. Reliis läheb läbi. Parandatud vead on eraldi nimekiri.

## Mis on veel lahti

- Kas üks pikk vaade jääb. Mustand on üleval, kinnitust veel ei ole.
- Kas tootegrupi avanemine jääb nii, nagu mustandis. Kinnitust veel ei ole.
- Tootegruppide nimed.
- Pilvefaili täpne koht. Looduslik valik on Google'i tabel. Excel OneDrive'is või Dropboxis käib ka, aga sünk on kohmakam.
- Kes vene ja inglise toiduteksti enne avaldamist üle vaatab.
- Tootenimekiri, pildid, suurused, järeletulemise ajad, tellimuse e-posti aadress.

## Tööviis

Kontseptsioon enne koodi. Koodi ei kirjutata, enne kui see samm on siin kirjas ja kinnitatud. Väikesed sammud.
