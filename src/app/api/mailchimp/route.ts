import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const { email } = await req.json();
    if (!email) {
      return  new NextResponse(JSON.stringify("error"), {
        headers: {
          "Content-type": "application/json",
        },
        status: 400,
      });
    }
  
    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;
  
    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;
  
    const response = await fetch(customUrl, {
      method: "POST",
      headers: {
        "Authorization": `apikey ${MailchimpKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });
    const received = await response.json();
    console.log("result", received);

    return new NextResponse(JSON.stringify(received), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  }
