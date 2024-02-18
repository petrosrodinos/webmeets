import { FC, useState } from "react";
import { getBookings } from "services/booking";
import { useQuery } from "react-query";
import { authStore } from "store/authStore";
import { Booking } from "interfaces/booking";
import ProfileCalendar from "./Calendar";
import ProfileList from "./List";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Button } from "@chakra-ui/react";
import Modal from "components/ui/Modal";
import { IoBookOutline } from "react-icons/io5";
import CreateProfileBooking from "./CreateProfileBooking";

const ProfileBookings: FC = () => {
  const { profileId } = authStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();

  const { data: bookings, refetch } = useQuery("profile-bookings", () =>
    getBookings({ profileId })
  );

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Modal
        title="Create a booking"
        isOpen={isModalOpen}
        onClose={toggleModal}
        actionTitle="Create"
      >
        <CreateProfileBooking date={selectedDate} />
      </Modal>
      <Button
        onClick={toggleModal}
        mt={5}
        leftIcon={<IoBookOutline />}
        variant="outline"
        color="primary.500"
        borderColor={"primary.500"}
      >
        New Booking
      </Button>
      <Tabs width="100%">
        <TabList>
          <Tab>Calendar</Tab>
          <Tab>List</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="primary.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel width="100%">
            <ProfileCalendar
              onDateClick={handleDateClick}
              refetch={refetch}
              bookings={bookings as Booking[]}
            />
          </TabPanel>
          <TabPanel>
            <ProfileList refetch={refetch} bookings={bookings as Booking[]} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProfileBookings;
