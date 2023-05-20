import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id, name },
    method
  } = req;

  switch (method) {
    case "POST":
      if (!req.body) {
        return res.status(500).json({
          errore: "fatale"
        });
      }

      const body = req.body;

      const params = {
        secret: process.env.CAPTCHA_ADMIN_SECRET as string,
        response: body.token
      };

      /*
      const formData = new FormData();
      formData.append("secret", process.env.CAPTCHA_ADMIN_SECRET as string);
      formData.append("response", body.token);
      */
      const ret = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          }
        }
      );

      return res.status(200).json(ret.data);

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
