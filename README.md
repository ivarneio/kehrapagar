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
- Drive'is on kataloog `tooted`. Tootegrupid võivad olla selle all kataloogidena.
- Toote valik avab toote alla paneeli. Tutvustus on peidus. Pilt avaneb täisekraanil.
- Jalus on kogu aeg näha. Seal on firma kontaktandmed.
- Päis on nagu Helirännakul: üleval menüü ja sotsiaalmeedia.
- Avaleht on `pealeht/pealeht.jpg`. Kui faili ei ole, on tavaline avaleht. Cron kopeerib.
- Uudiskiri: soovija kirjutab e-posti, nimekiri on Zone'is, inimene koostab kirja ja saadab välja.

## Lehe struktuur (mustand, ülevaatamiseks)

See ei ole veel lukus. Üks pikk vaade, mitte pood paljude alamlehtedega. Telefonis on kerimine selgem kui menüü. Kampaania link avab sama lehe ja kerib õigesse kohta.

Ülevalt alla:

1. Päis, nagu Helirännakul. Üleval menüü ja sotsiaalmeedia ikoonid. Menüü viib sama lehe plokkideni: tellimus, tooted, pood. Keel on siin.
2. Avalehe esimene vaade. Üks pilt, kui see on kaustas. Kui ei ole, on tavaline avaleht. Eraldi kampaaniariba ei ole.
3. Tellimus. Vorm kohe: kringel, suurus, päev ja kellaaeg, nimi, telefon. Ettemaksu ega ostukorvi ei ole. Suur nupp «Helista ja telli» avab telefonis kõne.
4. Tootegrupid. Suured kaardid, üks puudutus avab grupi.
5. Tooted. Pilt, nimi, lühike tekst, hind. Kringel on tellitav. Teised tooted on vaatamiseks ja poes ostmiseks.
6. Oma pood. Aadress, lahtiolek, kuidas järgi tulla. See ei ole e-pood.
7. Uudis. Üks väli: e-post. Inimene annab ise nõusoleku.
8. Jalus. Kogu aeg ekraani allservas. Firma kontaktandmed: nimi, aadress, telefon. Telefon avab kõne.

Pagarivaade on eraldi aadress, menüüs seda ei ole. Uudiskirja koostamine on samas suletud vaates, mitte avalikus menüüs. Keel vahetub samal lehel.

Gruppide esimene mustand, ei ole lukus: Kringlid, Pirukad ja saiad, Tordid ja koogid, Küpsised. Pood on oma plokk, mitte tootegrupp.

Sotsiaalmeedia lingid tulevad seadetest, nagu Helirännakul. Neid ei tõlgita.

### Avaleht

Tavakasutaja paneb Drive'i kataloogi `pealeht` ühe faili: `pealeht.jpg`. Kui fail on olemas, on see avalehe esimene vaade. Kui kaust on tühi, on tavaline avaleht. Uus pilt pannakse sama nimega vana peale. Kustutamine võtab kampaania maha.

Tekst võib olla juba pildi peal. Eraldi lauset ei ole vaja. `pealeht.txt` on lubatud hiljem, aga ei ole kohustus.

Zone'i cron vaatab kausta umbes iga 15 minuti tagant ja kopeerib faili lehe kausta. Külastaja loeb ainult seda koopiat. Kui Google on maas, jääb viimane pilt ette. Puuduv fail ei ole viga ega peata midagi.

### Uudiskiri

Lihtne. Külastaja kirjutab e-posti ja kinnitab, et tahab kirja. Nimekiri salvestub Zone'i, mitte Google'isse. Igas kirjas on link «Ei soovi enam». Ilma nõusolekuta aadressi nimekirja ei lisata.

Koostamine on üks vaade: pealkiri, tekst, nupp «Saada». Enne saatmist näeb, mitmele inimesele kiri läheb. Saatja ei kirjuta koodi.

Saatmine käib Zone'i postist, aeglaselt. Zone lubab ühe kirja iga 5 sekundi tagant ja tavalisel postkastil kuni 2000 adressaati 24 tunni jooksul. Ühes kirjas tohib olla kuni 400 adressaati, seega saadetakse ükshaaval. Kui nimekiri on sellest suurem, jääb järg ööle. Reklaamkiri ilma nõusolekuta on Zone'i mõttes rämpspost ja on keelatud.

### Tootegrupi avanemine (mustand)

Tootegrupp on suletuna üks kaart. Puudutus ei vaheta lehte. Kaart avaneb samal kohal, ja sealt tulevad toodete pildid ükshaaval, mitte kõik korraga. Silm jõuab järge pidada. Iga pilt on valik, mitte galerii: nimi ja hind tulevad pildiga kaasa, et aju hakkaks kohe otsustama.

Avamine ja sulgemine on üks liikumine. Näha on, kust kaart tuli ja kuhu tooted lähevad. Sulgemisel rullub sama tee tagasi, mitte ei kao järsku. Nii on aru saada, mis milleks avanes.

Efekt on lühike, umbes poole sekundi sees. Kui telefon küsib vähem liikumist, on efekt väljas. Piltide rida ei peida tellimust ega poodi. Korraga on lahti üks grupp. Teise avamine sulgeb eelmise sama liikumisega.

### Toote paneel (mustand)

Toote puudutus ei ava uut lehte. Selle toote alla tuleb paneel. Paneelis on kuni neli pisipilti. Kui pilte on vähem, näidatakse neid, mis on. Tühi koht ei jää ootama.

Tutvustus on peidus. Paneelis on viide «Lähemalt». See avab teksti piltide all. Kes ei taha lugeda, ei näe seda. Inimene teab niigi, millega tegu.

Pisipildile vajutus avab selle pildi täisekraanil. Sulgemine on sama pildi vajutus või Esc. Telefonis piisab vajutusest.

Paneel käib sama liikumisega mis grupp. Näha on, kust see tuli. Teise toote valik sulgeb eelmise paneeli. Grupi avanemine ja toote paneel on kaks sammu. Esmalt rulluvad grupi pildid. Siis ühe toote all avaneb kuni neli pisipilti. Tekst on kolmas samm, ja ainult viitel.

Jalus jääb paneeli ja täisekraani pildi ajal nähtavale. Kontakt ei kao kerides. Päis jääb samuti nähtavale.

## Keel ja tekst

Eesti on ainus keel, mida inimene muudab. Vene ja inglise tulevad sellest.

Muster on sama mis Helirännakul (ivarneio/helivann):

- `seaded.json` — telefon, aadress, lahtiolek, kuhu tellimuskiri läheb, sotsiaalmeedia. Neid ei tõlgita.
- `tekstid.json` — nupud, vormi sildid, menüü. Võti on sama igas keeles: `et`, `ru`, `en`.
- `sisu.json` — tooted, kampaania, kringli suurused.

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

Side on failinimi. Kaust on inimese jaoks, et oleks lihtsam orienteeruda.

Drive'is on üks kataloog `tooted`. Selle all võivad olla tootegrupid kataloogidena, näiteks `tooted/kringlid/kaneel.jpg` ja `tooted/kypsised/jussike.jpg`. Grupi oma kaart on samas kataloogis: `tooted/kypsised/kypsised.jpg`.

- Igal tootel on tabelis püsiv tunnus, näiteks `kaneel`. Seda ei tõlgita.
- Pildifail kannab sama tunnust: `kaneel.jpg`. Veerg `pilt` ütleb selle failinime.
- Makro otsib `tooted` alt, ka alamkataloogidest, sama nime ja kopeerib pildi koos selle rea tekstiga.
- Uus fail uue nimega ja sama tunnusega rida on tavaline reliis. Koodi selleks ei muudeta.
- Mitu pilti: `kaneel-1.jpg`, `kaneel-2.jpg`, kuni neli. Veergu kirjutatakse need komaga. Esimene on see, mis grupi avanedes välja rullub. Ülejäänud on paneeli pisipildid.
- Kui faili ei ole, tuleb märkus, nagu kirjaveast. Reliis ei jää tegemata. Toode läheb välja ilma pildita, kuni fail tuleb.

Kausta koht ei seo pilti tekstiga. Kui `kaneel.jpg` liigub ühest grupikataloogist teise, jääb side alles. Grupi otsustab tabeli veerg, mitte see, mis kaustas fail parasjagu on.

Nime ega rea järjekorraga pilti ei seota. Nimi muutub, ja rida nihkub, kui keegi vahele lisab.

## Reliis ja kirjavead

Kirjavead tuleb raporteerida. Raport on märkus, mitte tõke.

Kui kirjaviga on parandatud, ei ole see veateade ega põhjus, et reliis ei õnnestunud. Reliis läheb läbi. Parandatud vead on eraldi nimekiri.

## Mis on veel lahti

- Kas üks pikk vaade jääb. Mustand on üleval, kinnitust veel ei ole.
- Kas tootegrupi avanemine ja toote paneel jäävad nii, nagu mustandis. Kinnitust veel ei ole.
- Tootegruppide nimed.
- Kuhu makro väljundi paneb: GitHubi testversiooni, Zone'i kausta, või mõlemasse.
- Kes vene ja inglise toiduteksti enne avaldamist üle vaatab.
- Tootenimekiri, suurused, järeletulemise ajad, tellimuse e-posti aadress.
- Mis muud tooteväljad peale aktiivsuse ja säilivuspäevade reas on.
- Mis kontaktid jaluses täpselt on: telefon, aadress, e-post, lahtiolek.
- Mis sotsiaalmeedia ikoonid päises on.
- Kas croni samm on 15 minutit või tund.
- Mis aadressilt uudiskiri välja läheb.

## Tööviis

Kontseptsioon enne koodi. Koodi ei kirjutata, enne kui see samm on siin kirjas ja kinnitatud. Väikesed sammud.
