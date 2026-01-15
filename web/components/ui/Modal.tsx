"use client";

import { ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg";