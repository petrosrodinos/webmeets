import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Switch,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import FileUpload from "components/ui/FilePicker";
import { ProfileSchema } from "validation-schemas/profile";
import {
  createProfile as createUserProfile,
  editProfile as editUserProfile,
  getProfileById,
} from "services/profile";
import { useState, FC, useEffect } from "react";
import TextArea from "components/ui/TextArea";
import Modal from "components/ui/Modal";
import TagSelector from "components/ui/TagSelector";
import { SERVICE_CATEGORIES_ARRAY } from "constants/optionsData";
import Select from "components/ui/Select";
import { COUNTRIES } from "constants/optionsData";
import { CreateProfile, UpdateProfile } from "interfaces/profile";
import { MultiFilePickerItemData } from "interfaces/components";
import MultiFilePicker from "components/ui/MultiFilePicker";
import { Roles } from "enums/roles";
import { authStore } from "store/authStore";
import { useNavigate } from "react-router-dom";

const Profile: FC = () => {
  const { profileId, updateProfile } = authStore((state) => state);
  const toast = useToast();
  const [isPhysical, setisPhysical] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  });

  const { data: profileData } = useQuery(
    "profile",
    () => {
      return getProfileById(profileId);
    },
    { enabled: !!profileId }
  );

  const { mutate: createProfileMutation, isLoading } = useMutation((data: CreateProfile) => {
    return createUserProfile(data);
  });

  const { mutate: editProfileMutation, isLoading: isEditing } = useMutation(
    (data: UpdateProfile) => {
      return editUserProfile(data);
    }
  );

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    reset({
      country: profileData?.country,
      categories: profileData?.categories,
      bio: profileData?.bio,
      isOnline: profileData?.isOnline,
      avatar: profileData?.avatar,
      banner: profileData?.banner,
      certificates: profileData?.certificates,
      phone: profileData?.phone,
      email: profileData?.email,
      address: profileData?.address,
      city: profileData?.city,
      area: profileData?.area,
      postalCode: profileData?.postalCode,
    });
    console.log("profileData", profileData);
  }, [profileData]);

  const onSubmit: SubmitHandler<any> = (values: CreateProfile) => {
    console.log(values);
    if (!profileId) {
      createProfile(values);
    } else {
      editProfile(values);
    }
  };

  const createProfile = (values: any) => {
    // return;
    if (!isPhysical) {
      ["phone", "city", "area", "address", "postalCode"].forEach((name: string) => {
        delete values[name];
      });
    }
    createProfileMutation(values, {
      onSuccess: (data: any) => {
        updateProfile({
          token: data.token,
          role: Roles.ADMIN,
          profileId: data.profile._id,
        });
        setIsModalOpen(true);
      },
      onError: (error: any) => {
        if (error.statusCode == 409) {
          toast({
            title: error.message,
            description: "Email or phone number already exists",
            position: "top",
            isClosable: true,
            status: "error",
          });
        } else {
          toast({
            title: error.message,
            description: "Something went wrong",
            position: "top",
            isClosable: true,
            status: "error",
          });
        }
      },
    });
  };

  const editProfile = (values: any) => {
    // return;
    if (!isPhysical) {
      ["phone", "city", "area", "address", "postalCode"].forEach((name: string) => {
        delete values[name];
      });
    }
    editProfileMutation(values, {
      onSuccess: () => {
        toast({
          title: "Profile updated successfully",
          position: "top",
          isClosable: true,
          status: "success",
        });
      },
      onError: (error: any) => {
        if (error.statusCode == 409) {
          toast({
            title: error.message,
            description: "Email or phone number already exists",
            position: "top",
            isClosable: true,
            status: "error",
          });
        } else {
          toast({
            title: error.message,
            description: "Something went wrong",
            position: "top",
            isClosable: true,
            status: "error",
          });
        }
      },
    });
  };

  const handleImageChange = ({ file, name }: { file: File; name: any }) => {
    setValue(name, file);
  };

  const handleCheckBoxChange = (e: any) => {
    setisPhysical(e.target.checked);
  };

  const handleTagChange = (name: any, items: string[]) => {
    setValue(name, items);
  };

  const handleCertificatesSelect = (data: MultiFilePickerItemData[]) => {
    console.log(data);
    setValue("certificates", data);
  };

  const handleActionClick = () => {
    setIsModalOpen(false);
    navigate("/profile/meets");
  };

  return (
    <>
      <Modal
        title="Your business profile is finished!"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionTitle="Create"
        onAction={handleActionClick}
        closeTitle="Later"
      >
        <Text>Now you can create your Meets.</Text>
      </Modal>
      <Flex>
        <Stack mx={"auto"} width={"lg"}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              {profileId ? "Edit" : "Create"} Your Profile
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to be able to create Services and Meets ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Select
                  register={register("country")}
                  options={COUNTRIES}
                  label="Country"
                  placeholder="Select country"
                />

                <TagSelector
                  label="Select categories"
                  name="categories"
                  items={SERVICE_CATEGORIES_ARRAY}
                  onChange={handleTagChange}
                />

                <TextArea
                  error={errors.bio?.message}
                  label="Bio"
                  register={register("bio")}
                  placeholder="Add your business bio here"
                />
                <FileUpload
                  accept="image/*"
                  onChange={handleImageChange}
                  label="Avatar"
                  name="avatar"
                />

                <FileUpload
                  accept="image/*"
                  previewType="banner"
                  onChange={handleImageChange}
                  label="Banner"
                  name="banner"
                />

                <MultiFilePicker
                  itemName="Certificate"
                  inputLabel="Name"
                  label="Add your Certificates"
                  accept=".pdf"
                  previewType="pdf"
                  onChange={handleCertificatesSelect}
                />

                <FormLabel>I have a physical business</FormLabel>
                <Switch
                  {...register("isOnline")}
                  onChange={handleCheckBoxChange}
                  colorScheme="teal"
                  size="lg"
                  checked={true}
                />

                {isPhysical && (
                  <VStack>
                    <Input
                      label="Business Phone Number"
                      placeholder="Enter Phone"
                      type="tel"
                      error={errors.phone?.message}
                      register={register("phone")}
                    />
                    <Input
                      label="City"
                      placeholder="Enter City"
                      error={errors.city?.message}
                      register={register("city")}
                    />
                    <Input
                      label="Area"
                      placeholder="Enter Area"
                      error={errors.area?.message}
                      register={register("area")}
                    />

                    <Input
                      label="Business Address"
                      placeholder="Enter Address"
                      error={errors.address?.message}
                      register={register("address")}
                    />

                    <Input
                      label="Postal Code"
                      placeholder="Enter Postal Code"
                      error={errors.postalCode?.message}
                      register={register("postalCode")}
                    />
                  </VStack>
                )}

                <Button
                  isLoading={isLoading || isEditing}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"primary.500"}
                  color={"white"}
                  _hover={{
                    bg: "primary.600",
                  }}
                >
                  {profileId ? "Save" : "Create"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Profile;
