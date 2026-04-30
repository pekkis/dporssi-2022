import { useCallback } from "react";
import { FC } from "react";
import { Input, Label, Radio } from "@/components/styled/form";
import { Locale, url } from "@/services/url";
import { DictatorSearchParams } from "./DictatorSearch";
import { useRouter } from "next/router";
import {
  filterColumn,
  filterColumnTight,
  filtersBox
} from "./Filters.css";

type Props = {
  params: DictatorSearchParams;
};

const Filters: FC<Props> = ({ params }) => {
  const router = useRouter();

  const setFilter = useCallback(
    (key, value) => {
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
    <div className={filtersBox}>
      <div className={filterColumnTight}>
        <Label>Etsi</Label>
        <Input
          name="name"
          type="text"
          placeholder="etsi tekstinpätkällä"
          value={params.name}
          onChange={(e) => setFilter("name", e.target.value)}
        />
      </div>
      <div className={filterColumn}>
        <Label>Järjestä</Label>

        <Label>
          <Radio
            name="sortBy"
            checked={params.sortBy === "name"}
            onChange={() => {
              setFilter("sortBy", "name");
            }}
          />{" "}
          aakkosjärjestykseen
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={params.sortBy === "reignDuration"}
            onChange={() => {
              setFilter("sortBy", "reignDuration");
            }}
          />{" "}
          valtakauden pituuden mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={params.sortBy === "age"}
            onChange={() => {
              setFilter("sortBy", "age");
            }}
          />{" "}
          iän mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={params.sortBy === "ranking"}
            onChange={() => {
              setFilter("sortBy", "ranking");
            }}
          />{" "}
          rankingin mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={params.sortBy === "listedAt"}
            onChange={() => {
              setFilter("sortBy", "listedAt");
            }}
          />{" "}
          listautumispäivän mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={params.sortBy === "updatedAt"}
            onChange={() => {
              setFilter("sortBy", "updatedAt");
            }}
          />{" "}
          ison päivityksen mukaan
        </Label>
      </div>
      <div className={filterColumn}>
        <Label>Korosta</Label>
        <Label>
          <Radio
            name="highlight"
            checked={params.highlight === "solidary"}
            onChange={() => {
              setFilter("highlight", "solidary");
            }}
          />{" "}
          solidaarisesti
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={params.highlight === "alive"}
            onChange={() => {
              setFilter("highlight", "alive");
            }}
          />{" "}
          eläviä
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={params.highlight === "inPower"}
            onChange={() => {
              setFilter("highlight", "inPower");
            }}
          />{" "}
          vallassa olevia
        </Label>
      </div>
    </div>
  );
};

export default Filters;
