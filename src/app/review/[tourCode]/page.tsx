"use client";

import React from "react";
import { useParams } from "next/navigation";
import ReviewExperience from "@/components/review/ReviewExperience";

export default function TourReviewPage() {
  const params = useParams();
  const tourCode = (params?.tourCode as string) || "";
  return <ReviewExperience initialTourCode={tourCode} />;
}
