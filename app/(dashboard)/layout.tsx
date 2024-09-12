import { cookies } from "next/headers";
import Sidebar from "../components/sidebar/Sidebar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

async function getMyUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const response = await fetch(`${process.env.API_URI}/api/users/mine`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const user = await response.json();

  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMyUser();
  return (
    <body
      className={`w-screen h-screen flex overflow-hidden ${montserrat.className}`}
    >
      <div className="max-w-[2200px] w-full mx-auto flex">
        <Sidebar user={user} />
        <main className="flex-1 bg-zinc-100 pl-[4rem] pr-4 pt-6 pb-4">
          {children}
        </main>
      </div>
    </body>
  );
}
