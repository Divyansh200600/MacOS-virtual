import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/desktop${window.location.search}`);
    }, 2000); // Simulate boot time
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-lg">Loading macOS...</h1>
    </div>
  );
}
