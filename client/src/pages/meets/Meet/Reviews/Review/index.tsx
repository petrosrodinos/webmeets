import { Avatar, HStack, ListItem, Text, VStack, Divider } from "@chakra-ui/react";
import Rating from "components/ui/Rating";
import { Review as ReviewInt } from "interfaces/review";
import { FC } from "react";

interface ReviewProps {
  review: ReviewInt;
}

const Review: FC<ReviewProps> = ({ review }) => {
  return (
    <ListItem mb={5}>
      <VStack display={"flex"} justifyContent={"flex-start"} alignItems={"flex-start"}>
        <HStack width={"100%"}>
          <Avatar size="xs" name={review.user.firstname} src={review.user.avatar} />
          <HStack width={"100%"} justifyContent={"space-between"}>
            <VStack alignItems={"flex-start"} gap={-1}>
              <Text fontWeight={"500"}>
                {review.user.firstname} {review.user.lastname}
              </Text>
              <Rating size={15} value={review.rating} />
            </VStack>
            <Text color={"gray.500"} fontSize={"sm"} fontStyle={"italic"}>
              {review.createdAt}
            </Text>
          </HStack>
        </HStack>
        <Text color={"gray.500"} fontSize={"sm"} fontStyle={"italic"}>
          {review.review}
        </Text>
      </VStack>
      <Divider mt={3} />
    </ListItem>
  );
};

export default Review;
