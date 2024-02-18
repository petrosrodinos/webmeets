import { Avatar, HStack, ListItem, Text, VStack, Divider, Stack } from "@chakra-ui/react";
import Modal from "components/ui/Modal";
import Rating from "components/ui/Rating";
import { Review as ReviewInt } from "interfaces/review";
import { FC, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { authStore } from "store/authStore";

interface ReviewProps {
  review: ReviewInt;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const Review: FC<ReviewProps> = ({ review, isDeleting, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { userId } = authStore();

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    onDelete(review.id);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={toggleDeleteModal}
        title="Delete review"
        actionTitle="Delete"
        onAction={confirmDelete}
        closeTitle="Cancel"
        actionTitleLoading={isDeleting}
      >
        <Text fontWeight={"500"}>
          Are you sure you want to delete this review? This action cannot be undone.
        </Text>
      </Modal>
      <ListItem mb={5}>
        <VStack display={"flex"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <HStack width={"100%"}>
            <Avatar size="xs" name={review.user.firstname} src={review.user.avatar} />
            <HStack width={"100%"} justifyContent={"space-between"}>
              <Stack
                flexDirection={{ base: "row", md: "column" }}
                alignItems={"flex-start"}
                gap={-1}
              >
                <Text fontWeight={"500"}>
                  {review.user.firstname} {review.user.lastname}
                </Text>
                <Rating size={15} value={review.rating} />
              </Stack>
              <HStack fontSize={"sm"} position={"relative"} top="-3">
                <Text color={"gray.500"}>{review.createdAt}</Text>
                {userId == review.user.id && (
                  <FaRegTrashAlt
                    onClick={toggleDeleteModal}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                )}
              </HStack>
            </HStack>
          </HStack>
          <Text ml={8} color={"gray.500"} fontSize={"sm"} fontStyle={"italic"}>
            {review.review}
          </Text>
        </VStack>
        <Divider mt={3} />
      </ListItem>
    </>
  );
};

export default Review;
