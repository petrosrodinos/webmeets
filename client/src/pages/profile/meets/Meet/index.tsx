import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getMeet } from "services/meets";
import Bookings from "./Bookings";
import Details from "./Details";
import Statistics from "./Statistics";
import Reviews from "./Reviews";
import Spinner from "components/ui/Spinner";
import Clients from "./Clients";
import { useParams } from "react-router-dom";
import { FC } from "react";

const ProfileMeet: FC = () => {
  const { id } = useParams();

  const { data: meet, isLoading } = useQuery(["meet", id], () => getMeet(id as string));
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList display="flex" flexDirection={{ base: "column", md: "row" }}>
          <Tab>Details</Tab>
          <Tab>Bookings</Tab>
          <Tab>Reviews</Tab>
          <Tab>Statistics</Tab>
          <Tab>Clients</Tab>
        </TabList>
        <Spinner mt={5} loading={isLoading} />

        {meet && (
          <TabPanels>
            <TabPanel>
              <Details meet={meet} />
            </TabPanel>
            <TabPanel>
              <Bookings />
            </TabPanel>

            <TabPanel>
              <Reviews />
            </TabPanel>

            <TabPanel>
              <Statistics />
            </TabPanel>

            <TabPanel>
              <Clients meet={meet} />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </>
  );
};

export default ProfileMeet;
