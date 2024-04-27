"use client";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export function useAdminTabs() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  useEffect(() => {
    setLoadingInfo(true);
    fetch(`/api/profile`)
      .then((resp) => resp.json())
      .then((data) => {
        data && setIsAdmin(data.admin);
        setLoadingInfo(false);
      });
  }, []);
  return { loadingInfo, isAdmin };
}
