import { Button, Card, List, VStack, useColorModeValue, Text, useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { getReviews, createReview, deleteReview } from "services/reviews";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Review from "./Review";
import { CreateReview, Review as ReviewInt } from "interfaces/review";
import TextArea from "components/ui/TextArea";
import Rating from "components/ui/Rating";
import { authStore } from "store/authStore";
import { Meet } from "interfaces/meet";

interface ReviewsProps {
  meet: Meet;
}

const Reviews: FC<ReviewsProps> = ({ meet }) => {
  const { id } = useParams();
  const toast = useToast();
  const { isLoggedIn, profileId } = authStore();

  const [review, setReview] = useState<CreateReview>({
    meetId: id as string,
    rating: 0,
    review: "",
  });

  const { data: reviews, refetch } = useQuery(["reviews", id], () => getReviews(id as string));

  const { mutate: createReviewMutation, isLoading } = useMutation(createReview);
  const { mutate: deleteReviewMutation, isLoading: isDeleting } = useMutation(deleteReview);

  const handleCreateReview = () => {
    if (review.rating === 0 || review.review === "") {
      toast({
        title: "Empty fields",
        description: "Please fill all the fields",
        position: "top",
        isClosable: true,
        status: "warning",
      });
      return;
    }
    createReviewMutation(review, {
      onSuccess: () => {
        setReview({ meetId: id as string, rating: 0, review: "" });
        refetch();
        toast({
          title: "Review created",
          description: "Your review has been created successfully",
          position: "top",
          isClosable: true,
          status: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: error.message,
          description: "Could not create review. Please try later.",
          position: "top",
          isClosable: true,
          status: "error",
        });
      },
    });
  };

  const handleReviewDelete = (id: string) => {
    deleteReviewMutation(id, {
      onSuccess: () => {
        refetch();
        toast({
          title: "Review deleted",
          description: "Your review has been deleted successfully",
          position: "top",
          isClosable: true,
          status: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: error.message,
          description: "Could not delete review. Please try later.",
          position: "top",
          isClosable: true,
          status: "error",
        });
      },
    });
  };

  const handleRatingChange = (value: number) => {
    setReview({ ...review, rating: value });
  };

  const handleReviewChange = (e: any) => {
    const { value } = e.target;
    setReview({ ...review, review: value });
  };

  return (
    <Card alignSelf={"flex-start"} width={"100%"} bg={useColorModeValue("white", "gray.700")} p={3}>
      <List pr={2} maxH={"500px"} overflowX={"auto"} width={"100%"} spacing={3}>
        {reviews?.map((review: ReviewInt, index: number) => (
          <Review
            onDelete={handleReviewDelete}
            key={index}
            review={review}
            isDeleting={isDeleting}
          />
        ))}
      </List>
      {isLoggedIn && profileId != meet?.profile?.id && (
        <VStack alignItems={"flex-start"} width={"100%"}>
          <Text position={"relative"} top={4}>
            Rating
          </Text>
          <Rating edit={true} value={review.rating} onChange={handleRatingChange} />
          <TextArea
            onChange={handleReviewChange}
            placeholder="Tell us your opinion"
            label="Your review"
            value={review.review}
          ></TextArea>
          <Button
            isLoading={isLoading}
            onClick={handleCreateReview}
            bg={"primary.500"}
            color={"white"}
            _hover={{
              bg: "primary.600",
            }}
          >
            Create
          </Button>
        </VStack>
      )}
    </Card>
  );
};

export default Reviews;
