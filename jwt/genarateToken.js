import jwt from "jsonwebtoken"


// const createTokenSaveCookie =( userId, res)=>{

//   const token = jwt.sign({userId},process.env.JWT_TOKEN,{
//     expiresIn :"5d"
//   });
//   res.cookie("jwt", token, {
//     httpOnly :true,
//     secure:true,
//     sameSite :"Strict"
//   })
// }

const createTokenSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure only in production
    sameSite: "Strict",
  });
};


export default createTokenSaveCookie