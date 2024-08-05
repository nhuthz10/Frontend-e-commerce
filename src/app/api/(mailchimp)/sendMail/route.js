import mailchimp from "@/config/mailchimp";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await mailchimp.campaigns.list();
    console.log(response);

    return new NextResponse(JSON.stringify(response), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {
      headers: {
        "Content-type": "application/json",
      },
      status: 400,
    });
  }
}

export async function POST(req) {
  try {
    const { id } = await req.json();
    const campaign = await mailchimp.campaigns.replicate(id);
    console.log(campaign);

    let response = await mailchimp.campaigns.send(campaign.id);
    response = { ...response, message: "Call api successfully" };
    return new NextResponse(JSON.stringify(response), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {
      headers: {
        "Content-type": "application/json",
      },
      status: 400,
    });
  }
}
