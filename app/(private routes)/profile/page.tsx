import type { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import ProfileClient from "./Profile.client";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and manage your NoteHub profile",
  openGraph: {
    title: "Profile | NoteHub",
    description: "View and manage your NoteHub profile",
    url: "https://notehub.example.com/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    return <p>Unable to load profile</p>;
  }

  return <ProfileClient user={user} />;
}