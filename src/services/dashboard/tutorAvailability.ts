"use client";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all availability for tutor
export async function getTutorAvailability(tutorId: string) {
  const res = await fetch(`${API_URL}/api/availability?tutorId=${tutorId}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch availability");
  return (await res.json()).data;
}

// Create availability slot
export async function createAvailability(tutorId: string, slot: any) {
  const res = await fetch(`${API_URL}/api/availability/${tutorId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(slot),
  });
  if (!res.ok) throw new Error("Failed to create availability");
  return (await res.json()).data;
}

export async function updateAvailability(
  slotId: string,
  slot: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }
) {
  const res = await fetch(`${API_URL}/api/availability/${slotId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update availability");
  }

  return data.data;
}

// Delete availability
export async function deleteAvailability(slotId: string) {
  const res = await fetch(`${API_URL}/api/availability/${slotId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete availability");
  return (await res.json()).data;
}
