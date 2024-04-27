"use client";
import { useState, useEffect } from "react";

export function useProfile() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
      });
    });
  }, []);
  return { data };
}
