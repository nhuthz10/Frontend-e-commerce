
import mailchimp from "@/config/mailchimp";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

const hashMD5 = (str) => {
  const hashStr = CryptoJS.MD5(str).toString();
  return hashStr;
};

//add new email or update existed email
export async function POST(req) {
  try {
    const { email } = await req.json();

    const emailMd5 = hashMD5(email);
    const response = await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      emailMd5,
      {
        email_address: email,
        status: "subscribed",
        status_if_new: "subscribed",
      }
    );

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
//get all email pagination
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const offset = parseInt(url.searchParams.get("offset")) || 0;
    const count = parseInt(url.searchParams.get("count")) || 10;

    const response = await mailchimp.lists.getListMembersInfo(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        count: count,
        offset: offset,
        status: "subscribed",
      }
    );
    // console.log(response)

    return new NextResponse(JSON.stringify(response), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      headers: {
        "Content-type": "application/json",
      },
      status: 400,
    });
  }
}
//unsubscribe email
export async function PUT(req) {
  try {
    const { email } = await req.json();

    const response = await mailchimp.lists.setListMember(
      email.list_id,
      email.id,
      {
        status: "unsubscribed",
      }
    );

    // console.log(response);

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

// export async function POST(req: NextRequest) {
//   const { email } = await req.json();
//   if (!email) {
//     return new NextResponse(JSON.stringify("error"), {
//       headers: {
//         "Content-type": "application/json",
//       },
//       status: 400,
//     });
//   }

//   const MailchimpKey = process.env.MAILCHIMP_API_KEY;
//   const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
//   const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

//   const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;
//   var received;
//   try {
//     const response = await fetch(customUrl, {
//       method: "POST",
//       headers: {
//         "Authorization": `apikey ${MailchimpKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email_address: email,
//         status: "subscribed",
//       }),
//     });
//     received = await response.json();
//   } catch (error) {
//     console.log(error)
//   }

//   return new NextResponse(JSON.stringify(received), {
//     headers: {
//       "Content-type": "application/json",
//     },
//     status: 200,
//   });
// }
