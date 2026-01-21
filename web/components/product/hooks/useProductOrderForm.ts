"use client";

import { useState, type FormEvent } from "react";

import type { Order } from "../../../@types/order";
import {
  validateProductOrder,
  type ProductOrderErrors,
  type ProductOrderValues,
} from "../utils/orderValidators";


