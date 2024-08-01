import mailchimp from "@/config/mailchimp";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await mailchimp.lists.getListMembersInfo(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        status: "subscribed",
      }
    );
    console.log(response);
    const members = response.members;
    const csvRows = [
      ["Email Address"],
      ...members.map(member => [
        member.email_address
      ])
    ];

    const csvContent = csvRows.map(row => row.join(",")).join("\n");

    return new NextResponse(JSON.stringify(csvContent), {
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


