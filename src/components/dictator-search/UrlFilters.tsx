import { navigate } from "@/services/backwards-compatibility";
import { useCallback } from "react";
import { FC } from "react";
import { Locale, url } from "@/services/url";
import { DictatorSearchParams } from "./DictatorSearch";
import { useRouter } from "next/router";

type Props = {
  params: DictatorSearchParams;
};

const Filters: FC<Props> = ({ params }) => {
  const router = useRouter();

  const setFilter = useCallback(
    (
      key: keyof DictatorSearchParams,
      value: DictatorSearchParams[keyof DictatorSearchParams]
    ) => {
      const newParams = {
        ...params,
        [key]: value
      };

      router.push(
        url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)(newParams)
      );
    },
    [params, router]
  );

  return (
    <div className="p-4 bg-super-light rounded border border-light block sm:flex flex-wrap">
      <div className="pr-0 sm:pr-8 pb-0">
        <label className="block font-bold mb-1">Etsi</label>
        <input
          className="border border-muted rounded p-2 mb-2"
          name="name"
          type="text"
          placeholder="etsi tekstinpätkällä"
          value={params.name}
          onChange={(e) => setFilter("name", e.target.value)}
        />
      </div>
      <div className="pr-0 sm:pr-8 pb-4 sm:pb-0">
        <label className="block font-bold mb-1">Järjestä</label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="sortBy"
            checked={params.sortBy === "name"}
            onChange={() => {
              setFilter("sortBy", "name");
            }}
          />{" "}
          aakkosjärjestykseen
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="sortBy"
            checked={params.sortBy === "reignDuration"}
            onChange={() => {
              setFilter("sortBy", "reignDuration");
            }}
          />{" "}
          valtakauden pituuden mukaan
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="sortBy"
            checked={params.sortBy === "age"}
            onChange={() => {
              setFilter("sortBy", "age");
            }}
          />{" "}
          iän mukaan
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="sortBy"
            checked={params.sortBy === "ranking"}
            onChange={() => {
              setFilter("sortBy", "ranking");
            }}
          />{" "}
          rankingin mukaan
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="sortBy"
            checked={params.sortBy === "listedAt"}
            onChange={() => {
              setFilter("sortBy", "listedAt");
            }}
          />{" "}
          listautumispäivän mukaan
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="sortBy"
            checked={params.sortBy === "updatedAt"}
            onChange={() => {
              setFilter("sortBy", "updatedAt");
            }}
          />{" "}
          ison päivityksen mukaan
        </label>
      </div>
      <div className="pr-0 sm:pr-8 pb-4 sm:pb-0">
        <label className="block font-bold mb-1">Korosta</label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="highlight"
            checked={params.highlight === "solidary"}
            onChange={(e) => {
              setFilter("highlight", "solidary");
            }}
          />{" "}
          solidaarisesti
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="highlight"
            checked={params.highlight === "alive"}
            onChange={(e) => {
              setFilter("highlight", "alive");
            }}
          />{" "}
          eläviä
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="highlight"
            checked={params.highlight === "inPower"}
            onChange={(e) => {
              setFilter("highlight", "inPower");
            }}
          />{" "}
          vallassa olevia
        </label>
      </div>
    </div>
  );
};

export default Filters;
