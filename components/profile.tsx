"use client";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { IconReload } from "@tabler/icons-react";

const formSchema = z.object({
  name: z.string().min(7, {
    message: "Profile name must be at least 7 characters.",
  }),
});

const Profile = ({
  user,
}: {
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}) => {
  const { toast } = useToast();
  const [profileImgUrl, setProfileImgUrl] = useState();
  const [uploadingImg, setUploadingImg] = useState<boolean>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name as string,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/api/sac-head/update", {
      name: values.name as string,
      email: user.email,
      image: profileImgUrl,
    });

    const response = res.data;
    console.log(response);

    toast({
      title: "Congratulations 🎉",
      description: "Your profile has been updated successfully.",
    });
  }

  return (
    <div className="max-w-screen-sm space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="font-semibold text-muted-foreground">Profile Picture</h1>
        <div className="flex items-center gap-8">
          <Avatar className="h-20 w-20 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">
            <AvatarImage src={profileImgUrl || (user.image as string)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <Label
              htmlFor="profilePicture"
              className={buttonVariants({ variant: "outline" })}
            >
              Change Picture
            </Label>
            <Input
              className={"hidden"}
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files?.length > 0) {
                  setUploadingImg(true);
                  const file = e.target.files[0] as File;

                  const form = new FormData();
                  form.append("file", file);

                  const res = await fetch("/api/cloudinary/image-upload", {
                    method: "POST",
                    body: form,
                  });

                  const data = await res.json();
                  if (data.message === "success") {
                    setProfileImgUrl(data.imgUrl);
                  } else {
                    throw new Error();
                  }
                  setUploadingImg(false);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-muted-foreground">
                    Profile Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="text-base placeholder:font-semibold placeholder:text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  htmlFor="email"
                  className="text-base font-semibold text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  className="text-base placeholder:text-black"
                  type="email"
                  id="email"
                  placeholder="Email"
                  disabled
                  value={user.email}
                />
              </div>
            </div>

            <Button
              disabled={uploadingImg}
              onClick={form.handleSubmit(onSubmit)}
            >
              {uploadingImg ? (
                <>
                  <IconReload className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
