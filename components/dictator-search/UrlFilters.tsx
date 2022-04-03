import { navigate } from "gatsby";
import { useCallback } from "react";
import { FC } from "react";
import { Box, Input, Label, Radio } from "theme-ui";
import { Locale, url } from "../../services/url";
import { DictatorSearchParams } from "./DictatorSearch";

type Props = {
  params: DictatorSearchParams;
};

const Filters: FC<Props> = ({ params }) => {
  const setFilter = useCallback(
    (key, value) => {
      const newParams = {
        ...params,
        [key]: value,
      };

      console.log(newParams);

      navigate(
        url("dictators", process.env.NEXT_PUBLIC_LOCALE as Locale)(newParams)
      );
    },
    [params]
  );

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
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          pr: [0, 4],
          pb: [0, 0],
        }}
      >
        <Label>Etsi</Label>
        <Input
          name="name"
          type="text"
          placeholder="etsi tekstinpätkällä"
          value={params.name}
          onChange={(e) => setFilter("name", e.target.value)}
        />
      </Box>
      <Box
        sx={{
          pr: [0, 4],
          pb: [3, 0],
        }}
      >
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
      </Box>
      <Box
        sx={{
          pr: [0, 4],
          pb: [3, 0],
        }}
      >
        <Label>Korosta</Label>
        <Label>
          <Radio
            name="highlight"
            checked={params.highlight === "solidary"}
            onChange={(e) => {
              setFilter("highlight", "solidary");
            }}
          />{" "}
          solidaarisesti
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={params.highlight === "alive"}
            onChange={(e) => {
              setFilter("highlight", "alive");
            }}
          />{" "}
          eläviä
        </Label>
        <Label>
          <Radio
            name="highlight"
            checked={params.highlight === "inPower"}
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
