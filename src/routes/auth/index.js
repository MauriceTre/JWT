const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const AuthRouter = Router();

// POST REQUESTS

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // TODO: Login basierend auf email/password
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const user = await UserModel.findOne({ where: { email } });
  // Token soll erstellt werden und zurückgegeben werden
  if (user.password !== password) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  const myToken = AccessTokens.createAccessToken(user.id);

  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, name, profileImgUrl } = req.body;
  if (!email || !password || !name || !profileImgUrl) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  // TODO: Signup basierend auf email, password, name, profileImgUrl
  // Token soll erstellt werden und zurückgegeben werden
  const user = await UserModel.create({ email, password, name });
  const myToken = AccessTokens.createAccessToken(user.id);
  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

module.exports = { AuthRouter };
