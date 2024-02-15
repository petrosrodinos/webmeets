import { FC } from "react";
import { getBookings } from "services/booking";
import { useQuery } from "react-query";
import { authStore } from "store/authStore";
import { Booking } from "interfaces/booking";
import ProfileCalendar from "./Calendar";
import ProfileList from "./List";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";

const ProfileBookings: FC = () => {
  const { profileId } = authStore();

  const { data: bookings, refetch } = useQuery("profile-bookings", () =>
    getBookings({ profileId })
  );

  return (
    <Tabs width="100%">
      <TabList>
        <Tab>Calendar</Tab>
        <Tab>List</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="primary.500" borderRadius="1px" />
      <TabPanels>
        <TabPanel width="100%">
          <ProfileCalendar refetch={refetch} bookings={bookings as Booking[]} />
        </TabPanel>
        <TabPanel>
          <ProfileList refetch={refetch} bookings={bookings as Booking[]} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileBookings;
