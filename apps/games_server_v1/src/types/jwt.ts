export type TJwtPayload = {
  sub: string;
  email: string;
}

export type TJwtPayloadForActivateAccount = {
  sub: string;
  verificationToken: string;
}