import Layout from "@/components/layout/Layout";
import { Box, Button } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "@/styles/pages/own-ranking.css";
import SEO from "@/components/SEO";
import RequiresAuthentication from "@/components/layout/RequiresAuthentication";
import { useUserStore } from "@/services/state";
import { useEffect, type HTMLAttributes } from "react";
import { filter, indexBy, map, values } from "ramda";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from "@hello-pangea/dnd";
import { sortBySortName } from "@/services/dictator";
import Spinner from "@/components/Spinner";
import ContentfulImage from "@/components/contentful/ContentfulImage";
import { GrDrag } from "react-icons/gr";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";
import { Dictator } from "@/types";
import { GetServerSideProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";
// import { GatsbyImage } from "gatsby-plugin-image";

type Props = {
  dictators: Dictator[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query = gql`
    query OwnRankingPage($locale: String!) {
      dictatorCollection(locale: $locale, limit: 200) {
        total
        items {
          sys {
            id
          }
          canonicalRanking
          slug
          name
          country {
            name
            slug
            continent {
              name
              slug
            }
          }
          sortName
          primaryImage {
            url
            width
            height
            title
            description
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query, {
    locale: "fi"
  });

  return {
    props: {
      dictators: res.dictatorCollection.items as Dictator[]
    }
  };
};

const Handle = (props: HTMLAttributes<HTMLDivElement>) => {
  return <Box className={styles.handle} {...props}></Box>;
};

const DictatorImage = ({ dictator }: { dictator: Dictator }) => {
  return (
    <ContentfulImage
      data={dictator.primaryImage}
      config={{ width: 30, aspectRatio: 0.75, fit: "fill", focus: "face" }}
      className={styles.portrait}
      alt={dictator.name}
    />
  );
};

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const OwnRankingPage = ({ dictators }: Props) => {
  const user = useUserStore((state) => state.user);

  const ranking = useUserStore((state) => state.ranking);

  const setRanking = useUserStore((state) => state.setRanking);

  const isDirty = useUserStore((state) => state.isDirty);

  const saveRanking = useUserStore((state) => state.saveRanking);
  const isSaving = useUserStore((state) => state.isSaving);

  const unlistDictator = useUserStore((state) => state.unlistDictator);

  const listDictator = useUserStore((state) => state.listDictator);

  useEffect(() => {
    if (!user.data?.ranking) {
      return;
    }

    setRanking(
      user.data?.ranking.map((rank) => {
        return {
          id: rank,
          text: rank
        };
      }),
      false
    );
  }, [user.data, setRanking]);

  const sortedDictators = indexBy((d: Dictator) => d.sys.id, dictators);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newRanking = reorder(
      ranking,
      result.source.index,
      result.destination.index
    );

    setRanking(newRanking, true);
  }

  const unlisted = filter(
    (d) => !ranking.find((r) => r.id === d.sys.id),
    sortBySortName(values(sortedDictators))
  );

  return (
    <Layout>
      <SEO title="Oma pörssi" />

      <RequiresAuthentication>
        <>
          {!user.data && <Spinner />}
          {user.data && (
            <>
              <Box className={sprinkles({ mx: 2 })}>
                <Box className={sprinkles({ mb: 3 })} as="section">
                  <SectionHeading>Hei, {user?.email}!</SectionHeading>

                  <p>
                    Listaa riittävästi tuntemasi diktaattorit ja raahaile heidät
                    tuhmuusjärjestykseen: tuhmin ylimmäs, kiltein alimmas.
                  </p>

                  <p>
                    Kaikista tehdyistä listoista lasketaan ensin keskiarvo jota
                    maustetaan Puhemiehen erityisillä superehdoilla koskien
                    ehdokkaiden vaalikelpoisuutta. Sitten politbyroo tarkistaa
                    Puhemiehen johtamassa täysistunnossa tuloksen, ja Venezuelan
                    lahjoittamilla äänestyskoneilla mankeloidaan massiivisesta
                    tietomäärästä kerran viikossa lopullinen vertailuluku joka
                    määrittelee diktaattorien sijoituksen pörssissä.
                  </p>

                  <p>
                    Vaalit ovat avoimet ja rehelliset. Sinulla on käytössäsi{" "}
                    <strong>{user.data.numberOfVotes}</strong>{" "}
                    {user.data.numberOfVotes === 1 ? "ääni" : "ääntä"} per
                    sijoitus.
                  </p>

                  <p>
                    <strong>OBS!</strong> Jos olet menettänyt oman pörssisi, se
                    johtuu siitä että vanhassa D-pörssissä on ollut bugi jonka
                    ansiosta en ole saanut yhdisteltyä vanhoja tietojasi tänne
                    koneellisesti. Pörssisi on kyllä tallessa,
                    <a href="mailto:puhemies@diktaattoriporssi.com">
                      laita minulle sähköpostia
                    </a>{" "}
                    niin palautan sen "käsin" näkyviin!
                  </p>

                  <p>
                    <Button disabled={!isDirty} onClick={saveRanking}>
                      {isSaving && <Spinner />}
                      Tallenna lista
                    </Button>
                  </p>
                </Box>
              </Box>

              <Box className={styles.lists}>
                <Box>
                  <SubHeading>Listatut</SubHeading>

                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {ranking.map((r, i) => {
                            const d = sortedDictators[r.id];

                            return (
                              <Draggable
                                key={r.id}
                                draggableId={r.id}
                                index={i}
                              >
                                {(draggable) => (
                                  <Box
                                    className={styles.row}
                                    ref={draggable.innerRef}
                                    {...draggable.draggableProps}
                                  >
                                    <Handle {...draggable.dragHandleProps}>
                                      <GrDrag />
                                    </Handle>

                                    <DictatorImage dictator={d} />

                                    <Box className={styles.rankedName}>
                                      <Box className={sprinkles({ mr: 1 })}>
                                        <strong>{i + 1}.</strong>
                                      </Box>
                                      <Box>{d.name}</Box>
                                    </Box>

                                    <Box className={styles.action}>
                                      <Button
                                        onClick={() => unlistDictator(r.id)}
                                      >
                                        Poista
                                      </Button>
                                    </Box>
                                  </Box>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Box>

                <Box>
                  <SubHeading>Listaamattomat</SubHeading>

                  {map((d) => {
                    return (
                      <Box className={styles.row} key={d.sys.id}>
                        <DictatorImage dictator={d} />
                        <Box className={styles.name}>
                          <Box>{d.name}</Box>
                        </Box>
                        <Box className={styles.action}>
                          <Button onClick={() => listDictator(d.sys.id)}>
                            Listaa
                          </Button>
                        </Box>
                      </Box>
                    );
                  }, unlisted)}
                </Box>
              </Box>
            </>
          )}
        </>
      </RequiresAuthentication>
    </Layout>
  );
};

export default OwnRankingPage;
