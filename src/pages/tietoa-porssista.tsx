/** @jsxImportSource theme-ui */

import { Box } from "theme-ui";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";
import BlockQuote from "@/components/BlockQuote";
import Paragraph from "@/components/Paragraph";
import InternalLink from "@/components/InternalLink";
import SalivationClock from "@/components/SalivationClock";
import Image from "next/image";

import dporssi1999 from "@/data/diktaattoriporssi-1999.png";
import dporssiLED from "@/data/diktaattoriporssi-led.png";
import dporssiAntiSocial from "@/data/diktaattoriporssi-antisocial.png";
import dporssiSalivation from "@/data/diktaattoriporssi-salivaatio.png";
import ContentBox from "@/components/layout/ContentBox";

const StorySection = (props) => {
  const { children, image } = props;

  return (
    <Box
      sx={{
        my: 3,
        display: ["block", "flex"],
        width: "100%",
        alignItems: "stretch"
      }}
    >
      <Box
        sx={{
          width: ["100%", "50%"],
          flexGrow: 2,
          order: 2,
          ml: [0, 4],
          mb: [4, 0]
        }}
      >
        <Image
          src={image.image.src}
          alt={image.alt}
          width={image.image.width}
          height={image.image.height}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          order: 1
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="Tietoa Diktaattoripörssistä" />

      <ContentBox>
        <Box as="header" mb={3}>
          <SectionHeading>Tietoa Diktaattoripörssistä</SectionHeading>

          <Paragraph>
            Olen ylläpitänyt Diktaattoripörssiä jo yli kaksikymmentä vuotta,
            käytännössä koko sen ajan kun olen tehnyt webbiä ensin koulussa ja
            myöhemmin työkseni. Joskus ylläpitoni on ahkeraa, toisinaan vähemmän
            ahkeraa. Diktaattoripörssillä on joka tapauksessa paljon tunnearvoa,
            ja se on ollut minulle oppimisen kannalta tärkeä. Harrasteprojektit
            ovat koodarille hyvä henkireikä, koska niissä ei ole kaupallisia tai
            muitakaan paineita.
          </Paragraph>
        </Box>

        <StorySection
          image={{
            image: dporssi1999,
            alt: "Diktaattoripörssi vuonna 1999"
          }}
        >
          <SubHeading>Diktaattoripörssi syntyy</SubHeading>

          <Paragraph>
            Keksin Diktaattoripörssin sattumalta, jonain pimeänä myöhäissyksyn
            tai alkutalven iltana 1999. Webbisivukurssin opettaja oli antanut
            meille tehtäväksi rakentaa jouluun mennessä arvosteltavat
            kotskasivut. Surffasin netissä, pohdiskellen sivuille sisältöä.
            Jostain syystä, en muista alkuunkaan miksi, hain ja tallentelin
            levylle diktaattorien propagandajulisteita.
          </Paragraph>

          <Paragraph>
            Historia on aina kiinnostanut minua. Jos en olisi ollut laiska
            lukiossa ja / tai lukiessani pääsykokeisiin, minusta olisi
            varmaankin tullut historianopettaja. Kerätessäni
            propagandakuvapankkia ryhdyin pohdiskelemaan diktaattorien
            konkreettista pahuusjärjestystä. Muistan, kuinka sana
            <strong>Diktaattoripörssi</strong> ykskaks vain pulpahti päähäni.
            Sellainen minun oli kotisivuille saatava!
          </Paragraph>

          <Paragraph>
            Olen ensimmäisenä valmis myöntämään, että minulla on visuaalisesti
            huono maku. Vuodet ovat onneksi koulineet sitä, koska viime
            vuosituhannen lähestyessä loppuaan minulla oli visuaalisesti{" "}
            <em>todella</em> huono maku. Haluan uskoa, että tavoittelin
            MHM-pelini henkeä (se oli susiruma), mutten ole siitä varma. Joka
            tapauksessa ensimmäinen Diktaattoripörssi, joulun 1999 kotisivulle
            integroitu, oli rujo.
          </Paragraph>

          <Paragraph>
            Seuraavien vuosien aikana Diktaattoripörssi kehittyi hitaasti mutta
            varmasti taitojeni mukana. Siitä tuli ajan mittaan vähemmän ruma ja
            tietomääräkin kasvoi. Sivu oli kiva opiskelun kannalta, koska sitä
            pystyi hyödyntämään monilla kursseilla. Kirjoitin diktaattorien
            tekstejä kursseilla jotka liittyivät hyper- tai muuhun
            asiankuuluvaan mediaan. Pidin toimintaani hyväksyttävänä, jopa{" "}
            <em>kunniallisena</em>. Vähänpä tiesin, mitä oli tuloillaan!
          </Paragraph>
        </StorySection>

        <StorySection
          image={{
            image: dporssiLED,
            alt: "Diktaattoripörssi vuosina 2002-2006"
          }}
        >
          <SubHeading>Itsenäistyminen</SubHeading>

          <Paragraph>
            Jossain vaiheessa olin kirjoittanut kaikki tekstit uudestaan parikin
            kertaa. Webbisivukurssin lopputyö tuli sopivaan aikaan: kotisivujen
            viehätys oli karissut, ja Diktaattoripörssin oli aika itsenäistyä.
            Se sai ihan oman saitin ja uuden hienon ulkoasun joka ei ollut itse
            tekemäkseni susiruma!
          </Paragraph>

          <Paragraph>
            Hieman myöhemmin ohjelmoin Diktaattoripörssin käyttämään Accessia,
            lasten ensimmäistä tietokantaa, taustajärjestelmänä. Päivän kysymys
            ja muut dynaamiset kikkareet näkivät päivänvalon.
          </Paragraph>

          <Paragraph>
            Kohta Diktaattoripörssi olikin jo ohjelmoitu täsmälleen
            samanlaiseksi mutta uudella ohjelmointikielellä, PHP:llä, ja käytti
            tietovarastonaan vähemmän lapsellista tietokantaa, MySQL:ää. Silloin
            oli loppuvuosi 2001, luulen.
          </Paragraph>

          <Paragraph>
            Työharjoittelussani tutustuin paikallisen toimijan
            julkaisujärjestelmään, ohjelmistoon jolla loppukäyttäjien oli
            tarkoitus ylläpitää verkkosivujaan. En pitänyt siitä mitä näin,
            joten päätin siltä istumalta tehdä lopputyönäni en ainoastaan
            paremman vaan <em>maailman parhaan</em> julkaisujärjestelmän.
          </Paragraph>

          <Paragraph>
            Sillä vaatimattomalla kokemuksella, mikä minulla valitsemistani
            teknologioista ja tekniikoista oli, tavoite kuulostaa hurjalta.
            Pieleenhän se meni, mutta se on kokonaan eri tarina.
            Diktaattoripörssi oli joka tapauksessa mahtavan{" "}
            <strong>Entity Engine</strong>- järjestelmän, ei pelkästään
            julkaisujärjestelmän vaan kokonaisen sovelluskehyksen,
            pilottisovellus.
          </Paragraph>

          <SubHeading>
            Salvamiehen ja Turun ammattikorkeakoulun terrori-isku
            Diktaattoripörssiin
          </SubHeading>

          <Paragraph>
            Projekti eteni ripeässä myötätuulessa, ja sovellus oli pystyssä
            vuoden 2002 marraskuussa. Olin innoissani. Sitten, eräänä kauniina
            päivänä, Diktaattoripörssiin saapui vieras kaukaiselta Vuosaaren
            maalta. Se oli tuleva veriviholliseni, kirottu{" "}
            <strong>Salvamies</strong>! Hän{" "}
            <InternalLink to="/vieraskirja">
              kirjoitti vieraskirjaani
            </InternalLink>{" "}
            ikimuistoisen vuodatuksen.
          </Paragraph>

          <BlockQuote>
            On säälittävää että joku viitsii pitää tämmöisiä sivustoja yllä Mikä
            on vaikutin? Onko se poliittinen vai puhtaasti ideloginen. Ei kaikki
            ole mustaa tai valkoista ei ole absoluuttista pahaa eikä hyvää Kumma
            kyllä ei ole juttua Mannerheimista tai Lenin sedästä ovatko kyseiset
            liian läheisiä? Taidat olla jotenkin johdateltavissa oleva .
            Säälittävää...
          </BlockQuote>

          <Paragraph>
            Vastasin Salvamiehelle sarkastisesti, josta kimmastuneena miekkonen
            teki minusta valituksen Turun ammattikorkeakoululle. Koulu reagoi
            Salvamiehen valitukseen välittömästi, ja poisti asiaa sen enempää
            tutkimatta sekä Diktaattoripörssin että käyttöoikeuteni kaikkiin
            AMK:n tietojärjestelmiin. Lisäksi Turun ammattikorkeakoulun kätyrit
            estivät minua järjestelmällisesti esittämästä yleisölleni
            minkäänlaista vastinetta tai selitystä.
          </Paragraph>

          <Paragraph>
            En muista, että olisin koskaan ollut yhtä vihainen. Esitin
            kirjallisen vastalauseen, ja myöhemmin, kun minua virallisesti
            syytettiin tietoverkkojen käyttöehtojen rikkomisesta, osoitin
            väitteet nähdäkseni vastineessani valheiksi ja vaadin
            anteeksipyyntöä. Vastineeni hylkäsi sama mies joka oli minut
            mielivaltaisesti sensuroinut - kafkalaista hulluutta, jollaista voit
            odottaa vain Turun ammattikorkeakoululta.
          </Paragraph>

          <Paragraph>
            Edes valitus rehtoraatille ei kumonnut tuomiota. Eipä sen väliä,
            kyse oli periaatteesta, Diktaattoripörssi oli jo auennut toisaalla
            uudestaan parin päivän kuluttua siihen kohdistetusta hyökkäyksestä.
            Kahden vuosikymmenenkin jälkeen tuntuu yhä hullulta, etteivät Turun
            ammattikorkeakoulun pienet madot, eivät vaikka kaikki opettajani
            olivat puolellani, voineet myöntää tehneensä virhettä.
          </Paragraph>

          <Paragraph>
            Anteeksipyyntö on edelleen ainoa vaatimukseni. En suostu luennoimaan
            saati opettamaan tässä koulussa jonka nimeä en mainitse, en ennen
            kuin he lopulta tunnustavat vilppinsä ja nöyrtyvät pahoittelemaan.
          </Paragraph>

          <Box my={3}>
            <Paragraph>
              Salvamiehen ja Turun ammattikorkeakoulun hyökkäys osoitti, kuinka
              haavoittuva kyberhyökkäyksille Diktaattoripörssi on. Aina
              terrori-iskusta asti, jo <SalivationClock />, olen varautunut
              sotaan. Salvaliiton paluu on vain ajan kysymys. Diktaattoripörssin
              viholliset iskevät pienet, säälittävät tikarinsa
              Diktaattoripörssin selkään, mutta tällä kertaa olemme valmiina.
            </Paragraph>
          </Box>
        </StorySection>

        <StorySection
          image={{
            image: dporssiAntiSocial,
            alt: "Diktaattoripörssi vuosina 2008-2011"
          }}
        >
          <SubHeading>Pysähtyneisyyden aika</SubHeading>

          <Paragraph>
            Maailman paras julkaisujärjestelmä kuoli lopullisesti lokakuussa
            2004 kun hylkäsin haaveet yrittäjyydestä ja siirryin palkkalaiseksi.
            Samalla Diktaattoripörssi kuoli teknisesti - seuraavat vuodet
            ainoastaan lisäsin tai paransin sisältöä, ja sitäkin harvakseltaan.
          </Paragraph>

          <Paragraph>
            Veraskirjaan satoi asiantuntevia ehdotuksia listattavista
            diktaattoreista. Olin edennyt pisteeseen jossa uuden tyrankin
            lisääminen tarkoitti roppakaupalla tutkimustyötä, johon en ollut
            valmis sitoutumaan työpäivien päätteeksi.
          </Paragraph>

          <Paragraph>
            Surullisinta oli että vähä vähältä Diktaattoripörssi surkastui
            teknisenä työnäytteenä. Vuonna 2003 tai 2004 sitä esitellessäni
            sanottiin "ooh" tai "aah", vuonna 2008 sanottiin enää "jaaha".
          </Paragraph>

          <SubHeading>Antisosiaalinen vallankumous</SubHeading>

          <Paragraph>
            Uuden aallon "web 2.0"- palvelut, joissa käyttäjät tuottavat
            sisällön, olivat vuoden 2008 kuuminta paskaa. Niinpä valinta ei
            ollut vaikea: uudesta Diktaattoripörssistä oli tuleva
            antisosiaalinen yhteisö jonka tekemiseen käyttäjät osallistuisivat.
          </Paragraph>

          <Paragraph>
            Kuvittelin oppineeni pois suurista suunnitelmista. Oletin
            Diktaattoripörssin, pienellä kielellä kirjoitetun niche-saitin,
            olevan niin kiinnostava kokonaisuus että saisin ihmiset
            osallistumaan sisällön kirjoittamiseen. Kuvittelin myös, että
            jaksaisin kuratoida tuotettua sisältöä. Olin väärässä
          </Paragraph>

          <Paragraph>
            Muutama uskollinen (kiitos joka tapauksessa!) ei jaksanut ylläpitää
            innostustani. Käytännössä Diktaattoripörssi kuoli hetkeksi kun
            päätin keskittyä uuden pelin tekemiseen. Uuden pelin nuukahdettua
            keskityin enemmän muihin harrasteprojekteihin. Se on
            harrasteprojektien kääntöpuoli; mielenkiinto tulee, mielenkiinto
            menee.
          </Paragraph>
        </StorySection>

        <StorySection
          image={{
            image: dporssiSalivation,
            alt: "Diktaattoripörssi vuosina 2011-2020"
          }}
        >
          <SubHeading>Diktaattoripörssin salivaatio</SubHeading>

          <Paragraph>
            Vuoden 2011 alussa motivaationi Diktaattoripörssin suhteen heräsi
            taas. Päätin toteuttaa vanhaan perustuvan uuden Diktaattoripörssin.
            Karsin ominaisuudet minimiin saadakseni julkaisun tehtyä
            inhimillisessä ajassa.
          </Paragraph>

          <Paragraph>
            Uusi Diktaattoripörssi ilmestyi ajallaan, mutta sen jälkeen kaikki
            ei mennyt ihan putkeen. Ahdistuin ja masennuin kesällä 2011, ja sen
            jälkeen käytin energiani päästäkseni takaisin kiinni elämään.
            Kesällä 2012 perustimme hyvien ystävieni kanssa oman yrityksen, ja
            sen vetäminen oli kokonaisvaltaista hommaa. Kuten aina,
            Diktaattoripörssi oli kärsivä osapuoli.
          </Paragraph>

          <Paragraph>
            Kirjoitin näinä vuosina kaikkien diktaattorien tarinat uudelleen.
            Niistä oli vuosien mittaan päässyt muodostumaan Frankensteinin
            hirviöitä: sivun tyyli oli vuosien mittaan aikuistunut, mutta
            tekstit edustivat kirjavasti lähes kaikkia Diktaattoripörssin
            aikakausia. Yhtenäistin tyylin, tein lisätutkimustyötä ja laajensin
            kaikki jutut suunnilleen saman pituisiksi.
          </Paragraph>

          <Paragraph>
            Kesällä 2014 lähti liikkeelle kokonainen uudistusten purskahdus.
            Mallinsin diktaattorien taksonomian ja kirjoitin uusia artikkeleita
            monesta diktaattorista.
          </Paragraph>

          <SubHeading>Diktaattoripörssi 2020</SubHeading>

          <Paragraph>
            Ammatillisesti sain pohjakosketuksen jossain vuoden 2014 kesän
            tienoilla. Kaikki tuntui aika nähdyltä ja tylsältä, ja mietiskelin
            jotta lopettaisinko koodauksen kokonaan tai lähtisin kokopäiväisesti
            opetushommiin.
          </Paragraph>

          <Paragraph>
            Pelastuksekseni koitui JavaScript-renessanssi. Tutustuin{" "}
            <ExternalLink to="https://reactjs.org/">React</ExternalLink>
            -nimiseen kirjastoon, ja se tempaisi minut täysillä mukaansa. Löysin
            motivaationi uudelleen, ja koodauksen tiellä olen edelleen.
          </Paragraph>

          <Paragraph>
            Vuoden 2010 holleilla uusimani Diktaattoripörssi oli tehty vuoden
            2010 osaamisellani ja teknologioilla. Vuosien 2015 ja 2020 välillä
            aloitin uuden Diktaattoripörssin tekemisen ainakin 5 kertaa, mutten
            koskaan päässyt maaliin. Firma jatkoi kasvamistaan,
            ohjelmistokirjastot mätänivät alta, ja elämään ilmaantui muutakin
            kuin iltakoodausta.
          </Paragraph>

          <Paragraph>
            Juuri sopivasti karmaisevan vuoden 2020 alkuun suoritin ulostulon
            omasta yrityksestä. Aivokaistaa vapautui. Aloitin uuden hankkeen
            vuoden 2020 teknologioilla, ja asetin jälleen niin matalat
            tavoitteet että varmasti pääsisin maaliin inhimillisessä ajassa.
          </Paragraph>

          <Paragraph>
            2020-luvun Diktaattoripörssissä minua kiinnostaa ennen kaikkea
            journalistinen osuus. Olen pudonnut kelkasta, en koe enää olevani
            johtava tyrannologian maallikkoasiantuntija. Toisaalta Yleisradion{" "}
            <ExternalLink to="https://areena.yle.fi/audio/1-3948085">
              12 diktaattoria
            </ExternalLink>
            -podcast siteeraa Diktaattoripörssiä usein suoraan, mutta sitten
            taas{" "}
            <ExternalLink to="https://twitter.com/raimotyykiluoto">
              Tyykiluodolla
            </ExternalLink>{" "}
            on jo enemmän diktaattoreja ja hän kirjoitti niistä ihan OK
            kirjankin.
          </Paragraph>

          <Paragraph>
            On tullut aika tehdä Diktaattoripörssistä jälleen suuri. Haluaisin
            globaalin yleisön, mutten oikein tiedä onko se mahdoton urakka. Aika
            näyttää. Ainakin haluan näyttää Tyykiluodolle närhen pelivärmeet sen
            suhteen kuka on diktaattorologian ekspertti tässä maassa!
          </Paragraph>
        </StorySection>
      </ContentBox>
    </Layout>
  );
};

export default AboutPage;
