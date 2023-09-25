// stripeCheckout.route.ts

import { Router } from "express";
import {
  createBillingPortalSession,
  initiateCheckout,
} from "./stripeCheckout.controller";

const router = Router();

router.post("/initiate-checkout", initiateCheckout);
router.post("/create-portal-session", createBillingPortalSession);

export default router;
