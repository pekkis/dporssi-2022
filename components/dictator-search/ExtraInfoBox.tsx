import { Box } from "theme-ui";

const ExtraInfoBox = ({ children }) => {
  return (
    <Box
      sx={{
        fontStyle: "italic",
        mt: 1,
        fontSize: 1
      }}
    >
      {children}
    </Box>
  );
};

export default ExtraInfoBox;
