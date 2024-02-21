import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getReviews } from "services/reviews";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Reviews: FC = () => {
  const { id } = useParams();
  const { data } = useQuery(["reviews", id], () => getReviews(id as string));
  console.log(data);
  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Review</Th>
              <Th>Rating</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((review, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    {review.user.firstname} {review.user.lastname}
                  </Td>
                  <Td>{review.review}</Td>
                  <Td>{review.rating}</Td>
                  <Td>{review.createdAt}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reviews;
