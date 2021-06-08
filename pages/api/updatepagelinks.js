import { jwtAuth, use } from "../../middleware/middleware";
import { getLinkData, updateLink } from "../../lib/dbfunc";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }
  try {
    // Run the middleware
    await use(req, res, jwtAuth);

    await updateLink(req.body);

    let updatedLinkData = await getLinkData();

    res.json({ success: true, updatedLinkData: updatedLinkData.linkData });
  } catch (error) {
    console.log(error.message);

    res.status(500).send(error.message);
  }
}

export default handler;
