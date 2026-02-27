import Layout from "@/components/layout/Layout";
import Paragraph from "@/components/Paragraph";
import SEO from "@/components/SEO";
import RequiresAuthentication from "@/components/layout/RequiresAuthentication";
import { useUserStore } from "@/services/state";
import { useEffect } from "react";
import { filter, indexBy, map, values } from "ramda";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";
import { sortBySortName } from "@/services/dictator";
import Spinner from "@/components/Spinner";
import ContentfulImage from "@/components/contentful/ContentfulImage";
import { GrDrag } from "react-icons/gr";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";
import { Dictator } from "@/types";
import { GetServerSideProps } from "next";
import { RankingItem } from "@/services/state";
import { gql } from "graphql-request";
import { graphQLClient } from "@/services/graphql";

type Props = {
  dictators: Dictator[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
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

const Handle = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { ...rest } = props;
  return <div className="flex items-center bg-very-light p-2" {...rest}></div>;
};

type DictatorImageProps = { dictator: Dictator };

const DictatorImage = ({ dictator }: DictatorImageProps) => {
  return (
    <ContentfulImage
      data={dictator.primaryImage}
      config={{ width: 30, aspectRatio: 0.75, fit: "fill", focus: "face" }}
      className="self-center border border-light rounded mx-1"
      alt={dictator.name}
    />
  );
};

const reorder = (
  list: RankingItem[],
  startIndex: number,
  endIndex: number
): RankingItem[] => {
  const result: RankingItem[] = Array.from(list);
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
              <div className="mx-2">
                <section className="mb-4">
                  <SectionHeading>Hei, {user.email}!</SectionHeading>

                  <Paragraph>
                    Listaa riittävästi tuntemasi diktaattorit ja raahaile heidät
                    tuhmuusjärjestykseen: tuhmin ylimmäs, kiltein alimmas.
                  </Paragraph>

                  <Paragraph>
                    Kaikista tehdyistä listoista lasketaan ensin keskiarvo jota
                    maustetaan Puhemiehen erityisillä superehdoilla koskien
                    ehdokkaiden vaalikelpoisuutta. Sitten politbyroo tarkistaa
                    Puhemiehen johtamassa täysistunnossa tuloksen, ja Venezuelan
                    lahjoittamilla äänestyskoneilla mankeloidaan massiivisesta
                    tietomäärästä kerran viikossa lopullinen vertailuluku joka
                    määrittelee diktaattorien sijoituksen pörssissä.
                  </Paragraph>

                  <Paragraph>
                    Vaalit ovat avoimet ja rehelliset. Sinulla on käytössäsi{" "}
                    <strong>{user.data.numberOfVotes}</strong>{" "}
                    {user.data.numberOfVotes === 1 ? "ääni" : "ääntä"} per
                    sijoitus.
                  </Paragraph>

                  <Paragraph>
                    <strong>OBS!</strong> Jos olet menettänyt oman pörssisi, se
                    johtuu siitä että vanhassa D-pörssissä on ollut bugi jonka
                    ansiosta en ole saanut yhdisteltyä vanhoja tietojasi tänne
                    koneellisesti. Pörssisi on kyllä tallessa,
                    <a href="mailto:puhemies@diktaattoriporssi.com">
                      laita minulle sähköpostia
                    </a>{" "}
                    niin palautan sen "käsin" näkyviin!
                  </Paragraph>

                  <Paragraph>
                    <button
                      disabled={!isDirty}
                      onClick={saveRanking}
                      className="bg-primary text-white rounded px-4 py-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSaving && <Spinner />}
                      Tallenna lista
                    </button>
                  </Paragraph>
                </section>
              </div>

              <div
                className="mx-2 block sm:grid sm:gap-8"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <div>
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
                                  <div
                                    className="flex w-full my-1 rounded border border-light items-stretch"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <Handle {...provided.dragHandleProps}>
                                      <GrDrag />
                                    </Handle>

                                    <DictatorImage dictator={d} />

                                    <div className="py-2 flex items-center">
                                      <div className="mr-1">
                                        <strong>{i + 1}.</strong>
                                      </div>
                                      <div>{d.name}</div>
                                    </div>

                                    <div
                                      className="p-2 flex items-center justify-end"
                                      style={{ flexGrow: 100 }}
                                    >
                                      <button
                                        className="bg-primary text-white rounded px-4 py-2 cursor-pointer"
                                        onClick={() => unlistDictator(r.id)}
                                      >
                                        Poista
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

                <div>
                  <SubHeading>Listaamattomat</SubHeading>

                  {map((d) => {
                    return (
                      <div
                        className="flex w-full my-1 rounded border border-light items-stretch"
                        key={d.sys.id}
                      >
                        <DictatorImage dictator={d} />
                        <div className="flex items-center p-2">
                          <div>{d.name}</div>
                        </div>
                        <div
                          className="p-2 flex items-center justify-end"
                          style={{ flexGrow: 100 }}
                        >
                          <button
                            className="bg-primary text-white rounded px-4 py-2 cursor-pointer"
                            onClick={() => listDictator(d.sys.id)}
                          >
                            Listaa
                          </button>
                        </div>
                      </div>
                    );
                  }, unlisted)}
                </div>
              </div>
            </>
          )}
        </>
      </RequiresAuthentication>
    </Layout>
  );
};

export default OwnRankingPage;
