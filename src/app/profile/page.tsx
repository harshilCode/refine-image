"use client"

import AuthGuard from "@/components/AuthGuard";

export default function Profile() {
 
  return (
    <AuthGuard>
      <div className="flex flex-col items-center p-4">
        Profile page
      </div>
    </AuthGuard>
  );
}
