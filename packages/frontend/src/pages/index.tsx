import LoginForm from "components/auth/login/LoginForm";
import Page from "components/common/Page";
import HomeLayout from "layouts/HomeLayout";

import { Container, Grid, Text } from "@chakra-ui/react";
import useProfileQuery from "hooks/queries/useProfileQuery";

const Home = () => {
  const { isSuccess } = useProfileQuery();
  return (
    <Page>
      <Container maxW="80%">
        <Grid
          minH={"80vh"}
          alignItems="center"
          gap={5}
          gridTemplateColumns={["1fr", "3fr 2fr"]}
        >
          <Text fontSize="lg">
            Дорогой посетитель, пациент, интересующийся или коллега! Рады
            приветствовать Вас на стартовой странице сайта неформального
            объединения хирургов «Океан Хирургия». Здесь Вы можете найти
            информацию о классических и авангардных разделах хирургии, обсудить
            с коллегами актуальные вопросы хирургии и других областей медицины,
            обменяться опытом, получить консультацию, задать вопросы и получить
            на них ответы. Пусть Океан Хирургия станет для каждого из вас
            естественной средой обитания!
          </Text>
          {!isSuccess && <LoginForm />}
        </Grid>
      </Container>
    </Page>
  );
};

Home.getLayout = HomeLayout;

export default Home;
