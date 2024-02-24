import ProfileList from "pages/profile/bookings/List";
import { FC } from "react";
import { useQuery } from "react-query";
import { getBookings } from "services/booking";
import { authStore } from "store/authStore";
import { Booking } from "interfaces/booking";
import { useParams } from "react-router-dom";

const Bookings: FC = () => {
  const { id } = useParams();
  const { profileId } = authStore();

  const { data, refetch } = useQuery("profile-bookings", () =>
    getBookings({ profileId, meetId: id as string })
  );

  return (
    <div>
      <ProfileList refetch={refetch} bookings={data as Booking[]} />
    </div>
  );
};

export default Bookings;
