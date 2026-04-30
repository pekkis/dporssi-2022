import { FC } from "react";
import { Input, Label, Radio } from "@/components/styled/form";
import useStore from "./store";
import {
  filterColumn,
  filterColumnTight,
  filtersBox
} from "./Filters.css";

const Filters: FC = () => {
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);

  return (
    <div className={filtersBox}>
      <div className={filterColumnTight}>
        <Label>Etsi</Label>
        <Input
          name="name"
          type="text"
          placeholder="etsi tekstinpätkällä"
          value={filters.name}
          onChange={(e) => setFilter("name", e.target.value)}
        />
      </div>
      <div className={filterColumn}>
        <Label>Järjestä</Label>

        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "name"}
            onChange={() => {
              setFilter("sortBy", "name");
            }}
          />{" "}
          aakkosjärjestykseen
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "reignDuration"}
            onChange={() => {
              setFilter("sortBy", "reignDuration");
            }}
          />{" "}
          valtakauden pituuden mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "age"}
            onChange={() => {
              setFilter("sortBy", "age");
            }}
          />{" "}
          iän mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "ageInPower"}
            onChange={() => {
              setFilter("sortBy", "ageInPower");
            }}
          />{" "}
          valtaannousuiän mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "ranking"}
            onChange={() => {
              setFilter("sortBy", "ranking");
            }}
          />{" "}
          rankingin mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "listedAt"}
            onChange={() => {
              setFilter("sortBy", "listedAt");
            }}
          />{" "}
          listautumispäivän mukaan
        </Label>
        <Label>
          <Radio
            name="sortBy"
            checked={filters.sortBy === "updatedAt"}
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
            checked={filters.highlight === "solidary"}
            onChange={() => {
              setFilter("highlight", "solidary");
            }}
          />{" "}
          solidaarisesti
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={filters.highlight === "alive"}
            onChange={() => {
              setFilter("highlight", "alive");
            }}
          />{" "}
          eläviä
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={filters.highlight === "inPower"}
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
