"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinClubPage() {
  const [clubId, setClubId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJoin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/club/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clubId }),
    });
    setLoading(false);
    if (res.ok) {
      alert("Joined club successfully");
      router.push("/dashboard");
    } else {
      setError("Failed to join club");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">Join a Club</h2>
        <form onSubmit={handleJoin} className="space-y-4">
          <input
            name="clubId"
            placeholder="Enter Club Number"
            value={clubId}
            onChange={(e) => setClubId(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Club"}
          </button>
        </form>
      </div>
    </div>
  );
}
