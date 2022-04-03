import { FC } from "react";
import { Box, Input, Label, Radio } from "theme-ui";
import useStore from "./store";

const Filters: FC = () => {
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: "superLight",
        borderRadius: 1,
        borderStyle: "solid",
        borderWidth: "1",
        borderColor: "light",
        display: ["block", "flex"],
        flexWrap: "wrap"
      }}
    >
      <Box
        sx={{
          pr: [0, 4],
          pb: [0, 0]
        }}
      >
        <Label>Etsi</Label>
        <Input
          name="name"
          type="text"
          placeholder="etsi tekstinpätkällä"
          value={filters.name}
          onChange={(e) => setFilter("name", e.target.value)}
        />
      </Box>
      <Box
        sx={{
          pr: [0, 4],
          pb: [3, 0]
        }}
      >
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
      </Box>
      <Box
        sx={{
          pr: [0, 4],
          pb: [3, 0]
        }}
      >
        <Label>Korosta</Label>
        <Label>
          <Radio
            name="highlight"
            checked={filters.highlight === "solidary"}
            onChange={(e) => {
              setFilter("highlight", "solidary");
            }}
          />{" "}
          solidaarisesti
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={filters.highlight === "alive"}
            onChange={(e) => {
              setFilter("highlight", "alive");
            }}
          />{" "}
          eläviä
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={filters.highlight === "inPower"}
            onChange={(e) => {
              setFilter("highlight", "inPower");
            }}
          />{" "}
          vallassa olevia
        </Label>
      </Box>
    </Box>
  );
};

export default Filters;
