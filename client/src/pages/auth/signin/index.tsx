import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { signInUser } from "services/auth";
import { authStore } from "store/authStore";
import { preferencesStore } from "store/preferencesStore";
import { SignInSchema } from "validation-schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/ui/Input";

export default function SignIn() {
  const navigate = useNavigate();
  const toast = useToast();
  const { logIn } = authStore((state) => state);
  const { setPreferences } = preferencesStore((state) => state);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const { mutate: signupMutation, isLoading } = useMutation((user: any) => {
    return signInUser(user);
  });

  function onSubmit(values: any) {
    signupMutation(values, {
      onSuccess: (data) => {
        logIn({
          ...data.user,
          token: data.token,
          exp: data.exp,
          userId: data.user._id,
          profileId: data.user?.profileId,
        });
        setPreferences({
          roleView: data.user.role,
        });
        navigate("/home");
      },
      onError: (error: any) => {
        if (error.statusCode == 403) {
          toast({
            title: error.message,
            description: "Please check your credentials",
            position: "top",
            isClosable: true,
            status: "error",
          });
        } else {
          toast({
            title: error.message,
            description: "Please try again later",
            position: "top",
            isClosable: true,
            status: "error",
          });
        }
      },
    });
  }
  return (
    <Flex width="100%">
      <Stack spacing={8} mx={"auto"} maxW={"xl"} px={6}>
        <Stack>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Input
                label="Email address"
                error={errors.email?.message}
                register={register("email")}
              />
              <Input
                error={errors.password?.message}
                label="Password"
                password
                register={register("password")}
              />

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "column" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  bg={"primary.500"}
                  color={"white"}
                  _hover={{
                    bg: "primary.600",
                  }}
                >
                  Sign in
                </Button>
                <Stack>
                  <Text align={"center"}>
                    Don't have an account?{" "}
                    <Link to="/auth/signup" color={"blue.400"}>
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
