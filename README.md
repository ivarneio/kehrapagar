# Kehra Pagar

Uus koduleht asendab WordPressi lehe kehrapagar.ee. See fail on kokkulepe, mitte kood. Siia kirjutame, mis on otsustatud. Muudatus käib siin, enne kui midagi ehitatakse.

Testversioon on see repo. Lõplik leht ja tellimused elavad Zone'i serveris. GitHubi külastaja ei loe.

## Mis on otsustatud

- WordPressi ei kasutata. Leht on kerge ja kiire, telefonile esimene, eesti keel on põhikeel.
- Eesmärgid: tooted, sotsiaalmeedia kampaaniad, kringlitellimused.
- Tellimus on ainult kohapealne järeletulemine ja kohapealne maksmine. Ettemaksu ei ole.
- Lehel on suur nupp «Helista ja telli». Telefonis avab see kõne.
- Kõrval on lühike vorm: kringel, suurus, järeletulemise päev ja kellaaeg, nimi, telefon. Märkeruut «Tahan uudiseid» ja e-post, kui see on märgitud.
- Tellimus salvestub Zone'i. Igast tellimusest läheb e-kiri pagarikotta.
- Pagaril on lihtne telefonivaade. Sinna saab kirja panna ka telefonitellimuse, et kõik tellimused oleks ühes kohas. Pagarivaade on eesti keeles.
- Igal kampaanial on lühike link. `?keel=ru` või `?keel=en` avab sama lehe teises keeles.
- Muudatused on tagasikeeratavad. Eelmise versiooni failid jäävad alles.
- Ivar ei kirjuta koodi. Muudatus käib lihtsa juhisega.
- Pildid ja tekstid on Google'is. Reliisi osa on sealne makro või skript. Külastaja Google'it ei loe.
- Google on praegu isiklikul kontol. See on proovikoht. Toodangus on teine koht.
- ZoneCloud ei ole andmehoidla. Sealt ei ole reliisi ajal ligipääsu.
- Foto ja tekst seotakse failinimega. Tunnus on püsiv, nimi ja rea järjekord ei seo.
- Drive'is on kataloog `tooted`. Tootegrupid võivad olla selle all kataloogidena.
- Tootegrupid on Kringlid, Pagaritooted, Kondiitritooted, Tordid. Grupp on tabeli rida. Lisamine ja eemaldamine ei ole kood.
- Toote valik avab toote alla paneeli. Tutvustus on peidus. Pilt avaneb täisekraanil.
- Paneeli neli pisipilti on ühes reas, mitte üksteise all.
- Jalus on kogu aeg näha. Seal on firma kontaktandmed.
- Päis on nagu Helirännakul: üleval menüü ja sotsiaalmeedia.
- Avaleht on `pealeht/pealeht.jpg`. Kui faili ei ole, on tavaline avaleht. Cron kopeerib.
- Uudiskiri: soovija kirjutab e-posti, nimekiri on Zone'is, inimene koostab kirja ja saadab välja. Saatmine jääb Zone'i piiride sisse.
- Eemaldamine on kirja lõpu link. Skript kustutab selle aadressi võtme järgi.
- Kõike ei kuhjata ühte indexisse. Külastaja leht on üks. Tellimus, uudis ja andmed on eraldi failid.
- Mallist võetakse olemasolev luu: päis, jalus, keel, pildi side, galerii. Lehte ennast ei kopeerita.
- Visuaal on kandiline, taust jahune valge. Avamine on nagu ballonsis. Sulgemine on pehmem.

## Google'i koht

Praegu on ühendus isiklikul kontol. See sobib proovimiseks. Toodangus ei jää. Tabel, pildikaust ja makro lähevad teise kohta, mis on pagarikoja oma. Isiklik konto ei jää reliisi külge.

Kuni see koht ei ole olemas, ei ehitata tõlkesünki valmis. Lehe esimene tükk ei vaja Google'it. Külastaja loeb Zone'i koopiat ka siis, kui konto vahetub.

Lahti on, mis konto see on ja kes sinna ligi pääseb.

## Mis on veel lahti

- Mis Google'i konto on toodangus, ja kes seda hoiab.
- Kas üks pikk vaade jääb. Mustand on üleval, kinnitust veel ei ole.
- Kas toote paneel jääb nii, nagu mustandis. Pisipildid on reas. Kinnitust veel ei ole.
- Kuhu makro väljundi paneb: GitHubi testversiooni, Zone'i kausta, või mõlemasse.
- Kes vene ja inglise toiduteksti enne avaldamist üle vaatab.
- Tootenimekiri, suurused, järeletulemise ajad, tellimuse e-posti aadress.
- Mis muud tooteväljad peale aktiivsuse ja säilivuspäevade reas on.
- Mis kontaktid jaluses täpselt on: telefon, aadress, e-post, lahtiolek.
- Mis sotsiaalmeedia ikoonid päises on.
- Kas croni samm on 15 minutit või tund.
- Mis aadressilt uudiskiri välja läheb.
- Põhimenüü mustand: Telli, Tooted, Firmast, Kauplus, Kontakt. Kinnitust veel ei ole.
- Kas failijaotus jääb nii. Esimene hoog on üleval.
- Kirja värv. Taust on jahune valge.

## Tööviis

Kontseptsioon enne koodi. Koodi ei kirjutata, enne kui see samm on siin kirjas ja kinnitatud. Väikesed sammud.

Ülejäänud kokkulepe on eelmises commit'is. See commit lisas Google'i koha. Täisfail taastatakse kohe, kui see jäi pooleli.
