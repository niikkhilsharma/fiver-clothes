import Profile from "@/components/profile";
import { auth } from "@/auth";
import Navbar from "@/components/navbar";

export default async function ProfilePage() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-screen-lg">
        <Profile
          user={{
            email: session?.user?.email || "",
            id: session?.user?.id || "",
            image: session?.user?.image || "",
            name: session?.user?.name || "",
          }}
        />
        ;
      </div>
    </div>
  );
}
