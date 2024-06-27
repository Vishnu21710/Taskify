"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";
import { createAuditLog } from "@/lib/create-auditlog";
import { ACTIONS, ENTITY_TYPE } from "@prisma/client";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser()
  if (!userId || !orgId || !user) {
    return {
      error: "Unautorized",
    };
  }

  const settingUrl = absoluteUrl(`/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await db.orgsubs.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],

        mode: "subscription",
        billing_address_collection: "required",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items:[
          {
            price_data:{
              currency: "INR",
              product_data: {
                name: "Taskify Pro",
                description: "Unlimited Boards For Your Organization",
              },
              unit_amount: 15000,
              recurring:{
                interval: "month",

              }
            },
            quantity: 1
          }
        ],
        metadata:{
          orgId
        }
      })
      url = stripeSession.url || ""
    }
  } catch (error) {
    console.log(error, 'stripe error-----------------------');
    
    return {
      error: "Something went wrong"
    }
  }

  revalidatePath(`/organization/${orgId}`)
  return {data: url}
};


export const stripeRedirect = createSafeAction(StripeRedirect, handler);
