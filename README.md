# Kehra Pagar

https://ivarneio.github.io/kehrapagar/

Uus koduleht asendab WordPressi lehe kehrapagar.ee. See fail on kokkulepe, mitte kood. Siia kirjutame, mis on otsustatud. Muudatus käib siin, enne kui midagi ehitatakse.

Testversioon on see repo. Lõplik leht ja tellimused elavad Zone'i serveris. GitHubi külastaja ei loe.

Lehe vaade on üleval link. Kui see annab tühja lehe, on Pages veel kinni: Settings, Pages, allikas main ja juurkaust.

## Mis on otsustatud

- WordPressi ei kasutata. Leht on kerge ja kiire, telefonile esimene, eesti keel on põhikeel.
- Eesmärgid: tooted, sotsiaalmeedia kampaaniad, kringlitellimused.
- Tellimus on ainult kohapealne järeletulemine ja kohapealne maksmine. Ettemaksu ei ole.
- Lehel on suur nupp «Helista ja telli». Telefonis avab see kõne.
- Tellimine on avamisel kinnine plokk. Toote «Telli» täidab nime ette. Korv hoiab mitu rida (toode, kaal, kogus) ainult selle külastuse ajal. Kaal on 0,5 / 1,0 / 1,5 / 2,0 kg.
- Tellimus salvestub Zone'i. Igast tellimusest läheb e-kiri pagarikotta.
- Pagaril on lihtne telefonivaade. Sinna saab kirja panna ka telefonitellimuse, et kõik tellimused oleks ühes kohas. Pagarivaade on eesti keeles.
- Igal kampaanial on lühike link. `?keel=ru` või `?keel=en` avab sama lehe teises keeles.
- Muudatused on tagasikeeratavad. Eelmise versiooni failid jäävad alles.
- Ivar ei kirjuta koodi. Muudatus käib lihtsa juhisega.
- Pildid ja tekstid on Google'is. Reliisi osa on sealne makro või skript. Külastaja Google'it ei loe.
- Testleht töötab isiklikul Google'i kontol. Pildid ja tabel lähevad sinna. Toodangu konto on hilisem tõste.
- ZoneCloud ei ole andmehoidla. Sealt ei ole reliisi ajal ligipääsu.
- Foto ja tekst seotakse failinimega. Tunnus on püsiv, nimi ja rea järjekord ei seo.
- Drive'is on kataloog `tooted`. Tootegrupid võivad olla selle all kataloogidena.
- Tootegrupid on Kringlid, Pagaritooted, Kondiitritooted, Tordid. Grupp on tabeli rida. Lisamine ja eemaldamine ei ole kood.
- Toote valik avab toote alla paneeli. Tutvustus on peidus. Pilt avaneb täisekraanil.
- Paneeli neli pisipilti on ühes reas, mitte üksteise all.
- Jalus on kogu aeg näha. Seal on firma kontaktandmed.
- Päis on nagu Helirännakul: üleval menüü ja sotsiaalmeedia.
- Avaleht on `pealeht/pealeht.jpg`. Kui faili ei ole, on tavaline avaleht. Cron kopeerib.
- Uuenduse teeb Zone'i cron, mitte leht. Skripte on mitu. Aadressid on seadetes.
- Uudiskiri: soovija kirjutab e-posti, nimekiri on Zone'is, inimene koostab kirja ja saadab välja. Saatmine jääb Zone'i piiride sisse.
- Eemaldamine on kirja lõpu link. Skript kustutab selle aadressi võtme järgi.
- Kõike ei kuhjata ühte indexisse. Külastaja leht on üks. Tellimus, uudis ja andmed on eraldi failid.
- Mallist võetakse olemasolev luu: päis, jalus, keel, pildi side, galerii. Lehte ennast ei kopeerita.
- Visuaal on kandiline, taust jahune valge. Avamine on nagu ballonsis. Sulgemine on pehmem.
- Firma sõrmejälg on genereeritud rõhtne ribamuster. Värvireeglid on allpool, jaotises Sõrmejälg.
- Backup on kohustuslik enne tõlget. Koopia läheb kausta `backup` ja püsib vähemalt 30 päeva. Tõlge käib käsitsi, mitte nupuga.

## Zone cron

Kinnitatud plaan. Leht ise ennast ei uuenda. Külastaja brauser ei kirjuta serverisse.

Zone'i cron käivitab skripti, ja neid võib olla mitu. Iga töö on oma rida.

- Pealehe pilt, umbes iga 15 minuti tagant.
- Tooted ja tekstid, korra päevas.
- Uudiskirja järjekord, oma reaga, kui see kord tuleb.

`seaded.json` hoiab pilvekaustade aadresse: tooted, pealeht, tekstid. Cron loeb seadeid ja kopeerib samade reeglite järgi.

Google'i ajastatud skript valmistab paketi: tõlgib eesti teksti ja paneb valmis tekstifaili ning piltide nimekirja. Zone'i cron võtab paketi ja kopeerib pildid ning tekstid serverisse. Külastaja loeb ainult Zone'i koopiat.

Lehe avamisel ei tõlgita ega loeta pilve. Kui päevane käik ebaõnnestub, jääb eilne leht püsti.

## Tellimus

Avamisel on tellimine kinnine plokk, sama kaaluga mis tootegrupp. Vajutus avab vormi. Vorm ei ole lehe avamisel lahti.

Iga tellitava toote juures on nupp «Telli». Vajutus avab vormi ja toote nimi on juba sees. Klient valib kaalu ja koguse ning lisab rea korvi. Fotod näitavad kaalude erinevust.

### Korv

Korv on ajutine ja elab ainult selle külastuse ajal. Lehe uuesti laadimine või sessiooni lõpp tühjendab korvi. Vormi sulgemine ei tühjenda. Kui avatakse muu menüü, vorm sulgub, aga andmed jäävad. Midagi serverisse ei lähe enne, kui tellimus saadetakse.

Üks rida on toode + kaal + kogus. Kõiki kolme saab korvis muuta. Rea saab ära võtta. Korv näitab juba tehtud valikuid.

Kringli kaal on fikseeritud valik, mitte vaba number: 0,5 / 1,0 / 1,5 / 2,0 kg.

«Tee» valikut ei ole. Fantaasia on nimekirjas nagu teised kringlid.

Kui valitud on Fantaasia, algab kaal 1,0 kg-st. 0,5 kg ei ole. Ilmub täidiste nimekiri: Kaneel, Moon, Martsipan, Rosin, Pähkel, Juust, Sink. Iga täidist saab valida 1× või 2×. 2× võtab kaks kohta. Kokku kuni neli kohta. Vähem võib, rohkem ei saa. Täidiste nimekiri tuleb tabelist.

Muul kringlil on kaal 0,5 / 1,0 / 1,5 / 2,0 kg. Täidiseid ei ole.

Eraldi ostukorvi vaadet ei ole. Korvi sisu kajastub vormi all: toode, kaal, kogus. Rea saab muuta või ära võtta. All on summa, mida klient maksab kättesaamisel.

Hind on tabelis, mitte koodis. Tellitavatel toodetel on oma tabel. Seal on kringli kilogrammi hind ja täidise lisahind. Kolmas pool muudab seda. Reliis kopeerib hinna Zone'i. Leht loeb Zone'i koopiat, mitte pilve. Vormis on iga kaalu juures hind. Kui hind puudub, näitab «hind kinnitatakse kontoris».

Päev, kellaaeg ja nimi jäävad. Märkeruut «Tahan uudiseid» jääb. «Helista ja telli» jääb vormi kõrvale.

Telefon ja e-post on kohustuslikud. Ilma nendeta tellimust ei saadeta.

Vormis on täpsustuse väli. Kui klient tahab midagi täpsustada, näiteks numbrikujuline kringel, kirjutab ta sinna. Kui väli on tühi, on tavaline tellimus. Kontori kirjas on nupp «Kinnita», mis saadab kliendile kinnituse. Kui täpsustus on täidetud, nuppu ei ole. Inimene peab ise vastama.

Iga tellimuskiri läheb ka BCC-aadressile. Aadress on seadetes. Kui klient ütleb, et kirja ei tulnud, saab kontor vaadata, kas BCC-s on.

Logi on tekstifail `andmed/tellimus.log`. Iga saatmiskatse lisab rea: aeg, kas õnnestus või viga, ja tellimuse sisu. Vead lähevad samasse faili. Fail ei ole veebist loetav. Pagarivaates saab seda vaadata.

Iga kuu esimesel kuupäeval arhiveeritakse logi. Vanale failile lisatakse kuu nimi, näiteks `tellimus-2026-10.log`. Loodakse uus tühi `tellimus.log`.

Kohe pärast saatmist läheb kliendi e-postile kiri: tellimus on edastatud ja ootab kinnitamist kontorist.

Hommikul läheb SMS: kringel ootab kokkulepitud kohas. See on meeldetuletus. Kas SMS läheb ainult kinnitatud tellimusele, mis kell, ja mis teenusega, ei ole veel lukus.

Täidiste nimekiri ei ole veel lukus.

## Lehe struktuur (mustand, ülevaatamiseks)

See ei ole veel lukus. Üks pikk vaade, mitte pood paljude alamlehtedega. Telefonis on kerimine selgem kui menüü. Kampaania link avab sama lehe ja kerib õigesse kohta.

Ülevalt alla:

1. Päis, nagu Helirännakul. Üleval menüü ja sotsiaalmeedia ikoonid. Menüü viib sama lehe plokkideni: tellimus, tooted, pood. Keel on siin.
2. Avalehe esimene vaade. Üks pilt, kui see on kaustas. Kui ei ole, on tavaline avaleht. Eraldi kampaaniariba ei ole.
3. Tellimus. Kinnine plokk. Vajutus avab vormi. Võib olla toodete all. Kringli «Telli» täidab vormi ette.
4. Tootegrupid. Suured kaardid, üks puudutus avab grupi.
5. Tooted. Pilt, nimi, lühike tekst, hind. Kringel on tellitav. Teised tooted on vaatamiseks ja poes ostmiseks.
6. Oma pood. Aadress, lahtiolek, kuidas järgi tulla. See ei ole e-pood.
7. Uudis. Üks väli: e-post. Inimene annab ise nõusoleku.
8. Jalus. Kogu aeg ekraani allservas. Firma kontaktandmed: nimi, aadress, telefon. Telefon avab kõne.

Pagarivaade on eraldi aadress, menüüs seda ei ole. Uudiskirja koostamine on samas suletud vaates, mitte avalikus menüüs. Keel vahetub samal lehel.

Grupid praegu: Kringlid, Pagaritooted, Kondiitritooted, Tordid. Pood on oma plokk, mitte tootegrupp.

Grupp on tabeli rida, mitte koodis kinni. Uus rida lisab grupi. Rea kustutamine või mitteaktiivseks märkimine võtab grupi lehelt. Tordid on praegu sees. Kui neid tulevikus ei ole, kaob kaart reliisiga. Koodi selleks ei muudeta. Leht näitab niipalju gruppe, kui tabelis aktiivseid on.

Sotsiaalmeedia lingid tulevad seadetest, nagu Helirännakul. Neid ei tõlgita.

### Avaleht

Tavakasutaja paneb Drive'i kataloogi `pealeht` ühe faili: `pealeht.jpg`. Kui fail on olemas, on see avalehe esimene vaade. Kui kaust on tühi, on tavaline avaleht. Uus pilt pannakse sama nimega vana peale. Kustutamine võtab kampaania maha.

Tekst võib olla juba pildi peal. Eraldi lauset ei ole vaja. `pealeht.txt` on lubatud hiljem, aga ei ole kohustus.

Zone'i cron vaatab kausta umbes iga 15 minuti tagant ja kopeerib faili lehe kausta. Külastaja loeb ainult seda koopiat. Kui Google on maas, jääb viimane pilt ette. Puuduv fail ei ole viga ega peata midagi.

### Uudiskiri

Kinnitatud. Lihtne ja teostatav Zone'i piiride sees.

Külastaja kirjutab e-posti ja kinnitab, et tahab kirja. Sama saab teha kringlitellimuse juures: märkeruut «Tahan uudiseid» ja e-posti väli. Nimekiri salvestub Zone'i, mitte Google'isse. Ilma nõusolekuta aadressi nimekirja ei lisata. Sama aadress teist korda sisse ei lähe.

Igal aadressil on oma juhuslik võti. Iga saadetud kirja all on väikeses kirjas «Eemalda mind uudiskirjagrupist». Link on võti, mitte paljas e-post, näiteks `kehrapagar.ee/uudis/eemalda?voti=...`. Vajutus avab lehe, skript leiab võtme järgi rea ja kustutab selle. Leht ütleb, et aadress on nimekirjast maas. Keegi teine ei saa aadressi ära arvata ja maha võtta.

Pagarivaates on nimekiri näha, kui on vaja keegi käsitsi maha võtta. Tavaline tee on link kirja lõpus. Seda teeb skript, mitte inimene faili kallal.

Koostamine on üks vaade: pealkiri, tekst, nupp «Saada». Enne saatmist näeb, mitmele inimesele kiri läheb. Saatja ei kirjuta koodi.

Saatmine käib Zone'i postist, aeglaselt, ja jääb piiride sisse. Üks kiri iga 5 sekundi tagant. Tavalisel postkastil kuni 2000 adressaati 24 tunni jooksul. Ühes kirjas tohib olla kuni 400 adressaati, seega saadetakse ükshaaval. Kui nimekiri on sellest suurem, jääb ülejäänu järjekorda ja läheb järgmisel ööpäeval. Saatja näeb, mis on läinud ja mis ootab. Reklaamkiri ilma nõusolekuta on Zone'i mõttes rämpspost ja on keelatud.

### Tootegrupi avanemine (mustand)

Tootegrupp on suletuna üks kaart. Puudutus ei vaheta lehte. Valitud kaart tõuseb üles, nagu `ivarneio/balloons`, ja avanedes lükkab teised alla. Sealt tulevad toodete pildid ükshaaval, mitte kõik korraga. Silm jõuab järge pidada. Iga pilt on valik, mitte galerii: nimi ja hind tulevad pildiga kaasa, et aju hakkaks kohe otsustama.

Avamine on ballonsi liikumine, umbes 0,4 sekundit. Sulgemine ei ole sama hüpe. Kaart langeb oma kohale ja teised tulevad tagasi, ilma et rida kokku hüppaks. Nii on aru saada, mis milleks avanes.

Kui telefon küsib vähem liikumist, on efekt väljas. Piltide rida ei peida tellimust ega poodi. Korraga on lahti üks grupp. Teise avamine sulgeb eelmise.

### Toote paneel (mustand)

Toote puudutus ei ava uut lehte. Selle toote alla tuleb paneel. Teised tooted lükkuvad alla. Näha on, kust paneel tuli.

Paneelis on kuni neli pisipilti ühes reas, mitte üksteise all. Vertikaalne rida lükkaks järgmised tooted liiga kaugele. Kui pilte on vähem, näidatakse neid, mis on. Tühi koht ei jää ootama. Kitsal ekraanil jääb rida rõhtsalt, pildid lähevad väiksemaks. Kahte ritta ei lähe.

Tutvustus on peidus. Paneelis on viide «Lähemalt». See avab teksti piltide all. Kes ei taha lugeda, ei näe seda. Inimene teab niigi, millega tegu.

Pisipildile vajutus avab selle pildi täisekraanil. See on eraldi samm, mitte pisipiltide suund. Sulgemine on sama pildi vajutus või Esc. Telefonis piisab vajutusest.

Paneel käib sama liikumisega mis grupp. Teise toote valik sulgeb eelmise paneeli. Korraga on lahti üks paneel. Grupi avanemine ja toote paneel on kaks sammu. Esmalt rulluvad grupi pildid. Siis ühe toote all avaneb kuni neli pisipilti reas. Tekst on kolmas samm, ja ainult viitel.

Jalus jääb paneeli ja täisekraani pildi ajal nähtavale. Kontakt ei kao kerides. Päis jääb samuti nähtavale.

## Keel ja tekst

Eesti on ainus keel, mida inimene muudab. Vene ja inglise tulevad sellest.

Muster on sama mis Helirännakul (ivarneio/helivann):

- `seaded.json` — telefon, aadress, lahtiolek, kuhu tellimuskiri läheb, sotsiaalmeedia, pilvekaustade aadressid. Neid ei tõlgita.
- `tekstid.json` — nupud, vormi sildid, menüü. Võti on sama igas keeles: `et`, `ru`, `en`.
- `sisu.json` — tooted, kampaania, kringli suurused.

Kui tõlget pole, näitab leht eesti teksti.

Tõlge toimub ainult reliisi ajal. Muud tekstid kohendatakse samuti reliisiga. Kliendi lehe avamisel ei toimu mingit tõlkimist ega teksti kohendamist. Leht loeb valmis faili.

## Google ja tõlkesünk

Töökoht on Google, mitte ZoneCloud ega GitHub. Kolmas pool muudab tabelit ja pildikausta. ZoneCloud jäi kõrvale, sest sealt ei ole reliisi ajal ligipääsu.

Testleht töötab isiklikul kontol. Pildid ja tabel lähevad sinna, samasse jaotusse: `pealeht` ja `tooted`. Peaasi, et töötab. Toodangu konto on hilisem tõste, mitte testlehe takistus. Kui konto vahetub, tõstetakse kaustad ja makro. Külastaja loeb Zone'i koopiat ka siis.

- Üks rida on üks toode või üks tekst.
- Eesti veerud on ainsad, mida kolmas pool täidab.
- Vene ja inglise veerud täidab makro. Käsitsi neid ei parandata. Parandus käib eesti tekstist.
- Samast reast tuleb, kas toode on aktiivne, mitu päeva on säilivus, ja muu tooteinfo. Mitteaktiivset toodet leht ei näita.
- Pilt on Google'i kaustas. Makro on reliisi osa: tõlgib muutunud read ja paneb tekstid ning pildid väljundiks.
- Leht ei lae pilti otse Google'ist. Külastaja loeb Zone'i koopiat.
- Sünk käib reliisi ajal, mitte lehe avamisel ega iga salvestusega. Zone'i cron käivitab selle korra päevas.
- Sünk võrdleb eesti teksti eelmise korraga. Muutunud rida tõlgitakse uuesti. Muutumata rida jääb puutumata.
- Kui Google on maas, jääb pood lahti, sest leht loeb juba kopeeritud faile.
- Tellimused Google'isse ei lähe.
- Toidunime või allergeeni reale saab märkida «ära tõlgi üle», kuni keegi on tõlke üle vaadanud.

Makro elab Google'i kontos. Siit vestlusest seda ei käivitata. Skripti saab kirjutada ja sinna kleepida, nagu Helirännaku vormi skript.

Tõlkesünk on eraldi reliisi ülesanne. Seda ei ehitata esimese lehefailiga koos.

### Backup ja logi

Iga nupuvajutus teeb enne tööd tabelist koopia. Koopia läheb Drive'i kausta `backup`. Faili nimi on kuupäev ja kellaaeg. Skript kustutab koopiad, mis on vanemad kui 30 päeva. Kui midagi läheb valesti, on eelmine tabel alles ja selle saab tagasi panna.

Logi on eraldi leht samas tabelis. Iga nupuvajutus lisab rea: kuupäev, kellaaeg, kes nuppu vajutas, ja lühike kokkuvõte mis muutus. Näiteks «3 rida tõlgitud, 1 uus toode». Kes lahtrit muutis, seda näitab Google'i enda versiooniajalugu. Skript näeb kindlalt seda, kes nuppu vajutas ja mis ridu sel korral töödeldi.

Kolmas pool logi ei täida. Backup ja logi tekivad ise. Need jäävad firma Drive'i, mitte Zone'i.

## Protsessi reeglid

Need on kohustuslikud. Kui siit vaatad, on backup enne tõlget reegel, mitte soovitus.

- Tõlge ei käi automaatselt ega nupuga. Kui tabelis on uus või muutunud eesti tekst, ütleb tellija ja tõlge tehakse siin vestluses. Muudatusi ei ole tihti.
- Nimi ei tõlgita. Tõlgitakse alaliik ja tekst: `alaliik_et` → `alaliik_ru` / `alaliik_en`, `tekst_et` → `tekst_ru` / `tekst_en`.
- Backup on kohustuslik enne tõlget. Enne kui tõlke veergu kirjutatakse, tehakse tabelist koopia kausta `backup`. Ilma backupita tõlget ei kirjutata.
- Kolmas pool täidab ainult eesti veerud. Tõlke veerge ta ei puutu. Parandus käib alati eesti tekstist.
- Automaatikat (ajakava, webhook) ei ole. Protsess on käsitsi, sest tekste ei muudeta iga päev.

## Foto ja tekst

Side on failinimi. Kaust on inimese jaoks, et oleks lihtsam orienteeruda.

Drive'is on üks kataloog `tooted`. Selle all võivad olla tootegrupid kataloogidena, näiteks `tooted/kringlid/kaneel.jpg` ja `tooted/kypsised/jussike.jpg`. Grupi oma kaart on samas kataloogis: `tooted/kypsised/kypsised.jpg`.

- Igal tootel on tabelis püsiv tunnus, näiteks `kaneel`. Seda ei tõlgita.
- Pildifail kannab sama tunnust: `kaneel.jpg`. Veerg `pilt` ütleb selle failinime.
- Makro otsib `tooted` alt, ka alamkataloogidest, sama nime ja kopeerib pildi koos selle rea tekstiga.
- Uus fail uue nimega ja sama tunnusega rida on tavaline reliis. Koodi selleks ei muudeta.
- Mitu pilti: sama toote fotod, järjekord failinime lõpus. Vana „kuni neli“ ei kehti. Kehtiv reegel on jaotises Tooted ja pildid.
- Kui faili ei ole, tuleb märkus, nagu kirjaveast. Reliis ei jää tegemata. Toode läheb välja ilma pildita, kuni fail tuleb.

Kausta koht ei seo pilti tekstiga. Kui `kaneel.jpg` liigub ühest grupikataloogist teise, jääb side alles. Grupi otsustab tabeli veerg, mitte see, mis kaustas fail parasjagu on.

Nime ega rea järjekorraga pilti ei seota. Nimi muutub, ja rida nihkub, kui keegi vahele lisab.

Vana tunnus `kaneel` on asendatud koodiga. Kehtiv reegel on allpool, jaotises Tooted ja pildid.

## Tooted ja pildid

Kinnitatud 2026-10-21. Leht hakkab lugema paketti, mitte Drive'i.

### Kood

Pildi ID on kuus numbrit: grupp (1) + toode (4) + pildi järjekord (1). Näide `100021`. Toote kood Excelis on viis numbrit, näide `10002`. Inimese failinimi jääb koodi järele: `100021_juustukringel1.jpg`.

Sama toode on sama põhjanimi. Faili lõpu number on järjekord: `juustukringel1.jpg`, `juustukringel2.jpg`, `juustukringel3.jpg`. Üle 9 foto ühe toote kohta ei lähe. Kui lõpus numbrit ei ole, paneb süsteem järjekorra ise alates 1-st. Siis ei ole kindel, milline foto on esimene.

Üks toode on Excelis üks rida. Pildid on seal koos, komaga.

### Aktiveerimine

Uus rida on vaikimisi `ei`. Ainult inimene aktiveerib. Süsteem kirjutab koodi, grupi ja pildid. Nime ja kirjelduse kirjutab inimene.

Ilma nime ja kirjelduseta ei saa aktiveerida. Lahter jääb `ei` ja tuleb teade: «Enne aktiveerimist täida nimi ja kirjeldus.» Koduleht veateadet ei anna. Ta näitab seda, mis on olemas.

### Kaks kausta

`webipildid` on töötluse arhiiv. Sealt ei kustutata, kui toode ei ole enam aktiivne. Algseid fotosid grupikaustades ei kustutata.

`pakett` tehakse iga kord uuesti. Sinna lähevad ainult aktiivsed tooted, millel on nimi ja kirjeldus. Eelmine aktiivne, mis enam ei ole, kaob paketist. Uus aktiivne lisandub. Kõik selle toote fotod lähevad kaasa. Fotode arvul ei ole limiiti peale koodi: järjekord on 1–9.

### Leht

Leht ei loe Drive'i. Ta loeb lehe kaustas olevat paketti: nimi, kirjeldus ja kõik fotod.

Grupp näitab ainult neid tooteid, mis paketis on. Kui grupil paketti ei ole, jääb vana näidis alles. Kringlid loeb paketti.

Galerii näitab ühe toote kõiki fotosid. Limiiti ei ole. Kui fotosid on mitu, jookseb galerii need täiskaadris läbi, igal üks 0,9 sekundit, üleminek on fade. Siis jääb pidama kollaazil. Kollaaz tekib lehel avamise hetkel, mitte tabelis. Ühe foto puhul kollaazi ei ole.

Toote tekst ei ole lehel kogu aeg näha. Desktopis tuleb vana paber ette, kui hiir on kollaazil, ja kaob, kui hiir läheb ära. Telefonis vajutus kollaazile toob paberi ette, teine vajutus võtab ära. Tekst on valitud keeles. Kui tõlget ei ole, jääb eesti.

Kolmas osapool käivitab impordi menüüst Kehra Pagar, siis Töötle fotod. Paketi teeb samast menüüst Tee pakett. Veeb ei uuene ise. Pakett tuleb lehe kausta tõsta.

### Tõlge

Tõlge on oma tegevus, mitte paketi osa. Pakett võtab selle, mis tabelis juba on.

Menüü Kehra Pagar, Tõlgi puuduvad. Täidab ainult tühjad vene ja inglise lahtrid eesti teksti pealt. Täidetud lahtrit ei puutu. Nime ei tõlgi. Enne teeb backupi.

Igal real on veerg `tõlgi`. Valik `jah` sunnib selle rea tõlked üle kirjutama, ka kui need on olemas. Siis lahter tühjeneb. See on peenhäälestus, kui eesti teksti muudeti.

Tõlgitakse alaliik ja kirjeldus. Toote nime ei tõlgita. Kui tõlge puudub, pakett läheb ikka. Leht näitab siis eesti teksti.

## Failid

Esimene hoog. Kõike ei panda ühte `index` faili, nagu Helirännakul. Seal oli üks vaade ja vorm läks Google'i skripti. Siin on leht, tellimus, pagarivaade ja uudiskiri. Tellimused ja nimekiri ei tohi avalikku lehte sattuda.

Raamistikku ei ole. Külastaja näeb ikka ühte lehte.

Avalik:

- `index.html` on leht: päis, avaleht, tellimisvorm, tooted, pood, uudise väli, jalus.
- `stiil.css` on välimus.
- `leht.js` on avamine, sulgemine, täisekraani pilt ja keel. Andmeid see ei hoia.
- `seaded.json`, `tekstid.json`, `sisu.json` on nagu Helirännakul. Reliis kirjutab need üle.
- `pildid/` on toodete ja avalehe koopiad.

Server, külastaja ei loe:

- `tellimus.php` võtab vormi vastu, salvestab Zone'i ja saadab e-kirja.
- `uudis.php` lisab aadressi ja eemaldab võtme järgi.
- `andmed/` on tellimused ja uudiskirja nimekiri. See kaust ei ole veebist loetav.
- `pagar.html` on suletud vaade: tellimused ja uudiskirja koostamine. Menüüs seda ei ole.

Cron on mitu väikest skripti, mitte üks plokk `index.html` sees. Üks kopeerib avalehe, üks tooted ja tekstid, üks saadab uudiskirja järjekorda.

Iga töö on oma fail, et eelmise versiooni saaks tagasi panna ilma teisi puutumata.

## Mall

Alus on `ivarneio/mall`, mitte uus leiutis. Kui käitumine on seal juba olemas, võetakse see sealt. Malli ennast ei kopeerita pagarileheks ja sinna ei kirjutata kliendi andmeid.

Võetakse:

- Kleepuv päis ja kleepuv jalus.
- Keel `et`, `ru`, `en`. Puuduv tõlge näitab eesti teksti.
- Tekst ja pildid on JSON-is, käitumine on lukus.
- Pilt on seotud failinimega ja kaustaga.
- Galerii avaneb suureks ja sulgub.
- Tühi väli ei ole viga.

Ei võeta:

- Kolme ust. Tootegruppe on rohkem ja grupp avaneb samal lehel.
- Pakette allkorrusena. Siin on tellimus, tooted, pood ja uudiskiri.
- Ühte `index.html` kõige jaoks. Tellimus ja nimekiri on eraldi failid.
- Mallis ei ole vormi, poodi ega sisselogimist. Neid sealt ei otsita.

Avamise liikumine tuleb `ivarneio/balloons` seest, mitte mallist.

## Visuaal

Kinnitatud. Sai on ümar, kaart on kandiline. Helirännaku ümaraid nurki ei võeta.

Taust on jahune valge, mitte ekraani valge. Kergelt soe, nagu paber või jahu. Küpsetis paistab selle peal välja. Linane ja hallikas jäid kõrvale. Grupp ei ole eraldi teema, vaid viide samal taustal. Valik tõstab selle üles.

Avamine on nagu ballonsis. Valitud kaart tõuseb ja lükkab teised alla, umbes 0,4 sekundit. Sulgemine ei ole sama hüpe: kaart langeb oma kohale ja teised tulevad tagasi, ilma et rida kokku hüppaks.

## Sõrmejälg

Riba ei ole foto. See genereeritakse. Värv ja pikkus on koha omad, mitte grupi omad. Grupp võtab selle mustri, kuhu ta jõuab.

### Värvireeglid

- Neli värvi: oranž, valge, sinine, valge. Valge on päris valge, mitte läbipaistev vahe.
- Ribade vahel vahet ei ole. Muster täidab tootegrupi riba laiuse, et gruppide vahelt tausta ei paistaks.
- Valge riba on poole õhem kui oranž ja sinine.
- Värvid tulevad seadetest. Toone saab vahetada koodi muutmata.
- Päises triipe ei ole. Triibud on tootegrupi teksti taga.
- Grupi tekst on valge, bold, musta varjuga. Telli jääb mustaks ja boldiks.
- Ülemine koht, ülevalt alla: oranž, valge, sinine, valge.
- Kolmas koht on sild: oranž, valge, sinine, valge, oranž. Viimane oranž lahutab selle sinise alumise koha sinisest.
- Alumine koht on tagurpidi: valge, sinine, valge, oranž. Kõige alumine riba on oranž.
- Kui grupp liigub, võtab ta uue koha värvi. Üles minnes on ülemine riba alati oranž.
- Oma grupis on oranž pikim. Sinine on oma tulba oranžist lühem. Valge on oma grupi sinisest lühem. Sama pikkust ei ole.

### Pikkus

Servad on pikimad. Pikkus jookseb keskele kokku. Järgmise koha pikim riba on lühem kui eelmise lühim. Keskelt alla tendents pöördub. Alumine serv on ülemisest veidi lühem. Pikim jätab paremalt 25% vabaks. Aktiveerimisel punt pikeneb, ei liigu.

## Reliis ja kirjavead

Kirjavead tuleb raporteerida. Raport on märkus, mitte tõke.

Kui kirjaviga on parandatud, ei ole see veateade ega põhjus, et reliis ei õnnestunud. Reliis läheb läbi. Parandatud vead on eraldi nimekiri.

## Mis on veel lahti

- Mis Google'i konto on toodangus, ja kes seda hoiab. Test ei oota seda.
- Kas üks pikk vaade jääb. Mustand on üleval, kinnitust veel ei ole.
- Kas toote paneel jääb nii, nagu mustandis. Pisipildid on reas. Kinnitust veel ei ole.
- Kuhu makro väljundi paneb: GitHubi testversiooni, Zone'i kausta, või mõlemasse.
- Kes vene ja inglise toiduteksti enne avaldamist üle vaatab.
- Tootenimekiri, suurused, järeletulemise ajad, tellimuse e-posti aadress.
- Fantaasiakringli täidiste nimekiri.
- Mis muud tooteväljad peale aktiivsuse ja säilivuspäevade reas on.
- Mis kontaktid jaluses täpselt on: telefon, aadress, e-post, lahtiolek.
- Mis sotsiaalmeedia ikoonid päises on.
- Mis aadressilt uudiskiri välja läheb.
- Põhimenüü mustand: Telli, Tooted, Firmast, Kauplus, Kontakt. Kinnitust veel ei ole.
- Kas failijaotus jääb nii. Esimene hoog on üleval.
- Kirja värv. Taust on jahune valge.

## Tööviis

Kontseptsioon enne koodi. Koodi ei kirjutata, enne kui see samm on siin kirjas ja kinnitatud. Väikesed sammud.
