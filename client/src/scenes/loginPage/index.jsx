import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Forms";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          //onClick={() => navigate("/home")}
        >
          SocialBook
        </Typography>
      </Box>

      <Box
        
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        mx="auto" // Corrected for auto margin on the X-axis
        my="1rem" // Assuming you want a margin-top and margin-bottom of 1rem
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        
      >
        <Typography
          variant="h5"
          fontWeight="500"
          sx={{ marginBottom: "1.5rem" }}
        >
          WELCOME TO SOCIALBOOK
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
