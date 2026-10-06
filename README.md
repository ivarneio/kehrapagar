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
- Pildid ja tekstid on Google'is. Reliisi osa on sealne makro või skript. Külastaja Google'it ei loe.
- ZoneCloud ei ole andmehoidla. Sealt ei ole reliisi ajal ligipääsu.
- Foto ja tekst seotakse failinimega. Tunnus on püsiv, nimi ja rea järjekord ei seo.

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

## Google ja tõlkesünk

Töökoht on Google, mitte ZoneCloud ega GitHub. Kolmas pool muudab tabelit ja pildikausta. ZoneCloud jäi kõrvale, sest sealt ei ole reliisi ajal ligipääsu.

- Üks rida on üks toode või üks tekst.
- Eesti veerud on ainsad, mida kolmas pool täidab.
- Vene ja inglise veerud täidab makro. Käsitsi neid ei parandata. Parandus käib eesti tekstist.
- Samast reast tuleb, kas toode on aktiivne, mitu päeva on säilivus, ja muu tooteinfo. Mitteaktiivset toodet leht ei näita.
- Pilt on Google'i kaustas. Makro on reliisi osa: tõlgib muutunud read ja paneb tekstid ning pildid väljundiks.
- Leht ei lae pilti otse Google'ist. Külastaja loeb Zone'i koopiat.
- Sünk käib reliisi ajal, mitte lehe avamisel ega iga salvestusega.
- Sünk võrdleb eesti teksti eelmise korraga. Muutunud rida tõlgitakse uuesti. Muutumata rida jääb puutumata.
- Kui Google on maas, jääb pood lahti, sest leht loeb juba kopeeritud faile.
- Tellimused Google'isse ei lähe.
- Toidunime või allergeeni reale saab märkida «ära tõlgi üle», kuni keegi on tõlke üle vaadanud.

Makro elab Google'i kontos. Siit vestlusest seda ei käivitata. Skripti saab kirjutada ja sinna kleepida, nagu Helirännaku vormi skript.

Tõlkesünk on eraldi reliisi ülesanne. Seda ei ehitata esimese lehefailiga koos.

## Foto ja tekst

Side on failinimi. See on lihtne ja ei sõltu tõlkest.

- Igal tootel on tabelis püsiv tunnus, näiteks `kaneel`. Seda ei tõlgita.
- Pildifail kannab sama tunnust: `kaneel.jpg`. Veerg `pilt` ütleb selle failinime.
- Makro otsib kaustast sama nime ja kopeerib pildi koos selle rea tekstiga.
- Mitu pilti: `kaneel-1.jpg`, `kaneel-2.jpg`. Veergu kirjutatakse need komaga. Esimene on see, mis grupi avanedes välja rullub.
- Grupi kaart on sama loogika: tunnus `kypsised`, fail `kypsised.jpg`.
- Kui faili ei ole, tuleb märkus, nagu kirjaveast. Reliis ei jää tegemata. Toode läheb välja ilma pildita, kuni fail tuleb.

Nime ega rea järjekorraga pilti ei seota. Nimi muutub, ja rida nihkub, kui keegi vahele lisab.

## Reliis ja kirjavead

Kirjavead tuleb raporteerida. Raport on märkus, mitte tõke.

Kui kirjaviga on parandatud, ei ole see veateade ega põhjus, et reliis ei õnnestunud. Reliis läheb läbi. Parandatud vead on eraldi nimekiri.

## Mis on veel lahti

- Kas üks pikk vaade jääb. Mustand on üleval, kinnitust veel ei ole.
- Kas tootegrupi avanemine jääb nii, nagu mustandis. Kinnitust veel ei ole.
- Tootegruppide nimed.
- Kuhu makro väljundi paneb: GitHubi testversiooni, Zone'i kausta, või mõlemasse.
- Kes vene ja inglise toiduteksti enne avaldamist üle vaatab.
- Tootenimekiri, suurused, järeletulemise ajad, tellimuse e-posti aadress.
- Mis muud tooteväljad peale aktiivsuse ja säilivuspäevade reas on.

## Tööviis

Kontseptsioon enne koodi. Koodi ei kirjutata, enne kui see samm on siin kirjas ja kinnitatud. Väikesed sammud.
