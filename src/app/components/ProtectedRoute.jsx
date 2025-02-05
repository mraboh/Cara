// components/ProtectedRoute.js
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      router.push("/login");
    }
    setIsLoading(false);
  }, [user, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
}
