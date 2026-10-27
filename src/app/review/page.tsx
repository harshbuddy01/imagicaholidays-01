"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReviewExperience from "@/components/review/ReviewExperience";

function ReviewContent() {
  const searchParams = useSearchParams();
  const tourCode = searchParams.get("tour") || searchParams.get("code") || "";
  const paramRating = parseInt(searchParams.get("rating") || "0", 10);
  const paramStep = (searchParams.get("step") as any) || (paramRating >= 4 ? "google_prompt" : paramRating > 0 ? "private_feedback" : "rate");

  return (
    <ReviewExperience 
      initialTourCode={tourCode} 
      initialRating={paramRating}
      initialStep={paramStep}
    />
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">Loading review experience...</div>}>
      <ReviewContent />
    </Suspense>
  );
}
