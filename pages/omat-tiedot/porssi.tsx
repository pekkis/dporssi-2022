/** @jsxImportSource theme-ui */

import { Button } from "theme-ui";
import React from "react";
import Layout from "../../components/layout/Layout";
import { Box } from "theme-ui";
import SEO from "../../components/SEO";
import RequiresAuthentication from "../../components/layout/RequiresAuthentication";
import { useUserStore } from "../../services/state";
import { useEffect } from "react";
import { filter, indexBy, map, prop, values } from "ramda";
import { DragDropContext, Droppable, Draggable } from "@react-forked/dnd";
import { sortBySortName } from "../../services/dictator";
import shallow from "zustand/shallow";
import Spinner from "../../components/Spinner";
import ContentfulImage from "../../components/contentful/ContentfulImage";
import { GrDrag } from "react-icons/gr";
import SectionHeading from "../../components/SectionHeading";
import SubHeading from "../../components/SubHeading";
import { Dictator } from "../../types";
import { GetServerSideProps } from "next";
import { gql } from "graphql-request";
import { graphQLClient } from "../../services/graphql";
// import { GatsbyImage } from "gatsby-plugin-image";

type Props = {
  dictators: Dictator[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = gql`
    query OwnRankingPage($locale: String!) {
      dictatorCollection(locale: $locale) {
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

const Handle = (props) => {
  const { ...rest } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "veryLight",
        p: 2
      }}
      {...rest}
    ></Box>
  );
};

/*
    <img
      sx={{
        alignSelf: "center",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "light",
        borderRadius: 1,
        mx: 1
      }}
      src={dictator.primaryImage.fixed.src}
    />
*/

const DictatorImage = (props) => {
  const { dictator } = props;

  return (
    <ContentfulImage
      data={dictator.primaryImage}
      config={{ width: 30, aspectRatio: 0.75, fit: "fill", focus: "face" }}
      styles={{
        alignSelf: "center",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "light",
        borderRadius: 1,
        mx: 1
      }}
      alt={dictator.name}
    />
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const OwnRankingPage = (props) => {
  const { dictators } = props;

  const user = useUserStore((state) => state.user);

  const {
    ranking,
    setRanking,
    isDirty,
    saveRanking,
    isSaving,
    unlistDictator,
    listDictator
  } = useUserStore(
    (state) => ({
      ranking: state.ranking,
      setRanking: state.setRanking,
      isDirty: state.isDirty,
      isSaving: state.isSaving,
      saveRanking: state.saveRanking,
      unlistDictator: state.unlistDictator,
      listDictator: state.listDictator
    }),
    shallow
  );

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

  function onDragEnd(result) {
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

    // console.log(newRanking, "new ranking");

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
              <Box mx={2}>
                <Box mb={3} as="section">
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

              <Box
                mx={2}
                sx={{
                  display: ["block", "grid"],
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 4
                }}
              >
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
                                {(provided) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      width: "100%",
                                      my: 1,
                                      placeItems: "stretch",
                                      borderRadius: 1,
                                      borderStyle: "solid",
                                      borderWidth: "1px",
                                      borderColor: "light",
                                      alignContent: "stretch",
                                      alignItems: "stretch"
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <Handle {...provided.dragHandleProps}>
                                      <GrDrag />
                                    </Handle>

                                    <DictatorImage dictator={d} />

                                    <Box
                                      py={2}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center"
                                      }}
                                    >
                                      <Box mr={1}>
                                        <strong>{i + 1}.</strong>
                                      </Box>
                                      <Box>{d.name}</Box>
                                    </Box>

                                    <Box
                                      p={2}
                                      sx={{
                                        flexGrow: 100,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end"
                                      }}
                                    >
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
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          my: 1,
                          placeItems: "stretch",
                          borderRadius: 1,
                          borderStyle: "solid",
                          borderWidth: "1px",
                          borderColor: "light",
                          alignContent: "stretch",
                          alignItems: "stretch"
                        }}
                        key={d.sys.id}
                      >
                        <DictatorImage dictator={d} />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center"
                          }}
                          p={2}
                        >
                          <Box>{d.name}</Box>
                        </Box>
                        <Box
                          p={2}
                          sx={{
                            flexGrow: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end"
                          }}
                        >
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
