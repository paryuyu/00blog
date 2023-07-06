//디비 연결 설정

import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  //이미 연결되어있다면 콘솔찍고 리턴
  if (isConnected) {
    console.log("MongoDB is already connected..!")
    return;
  }

  try {
    //useNewUrlParser와 useUnifiedTopology 옵션은 Mongoose의 최신 구문 및 연결 방식을 사용하도록 설정합니다.
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "00blog",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB Connected..!')
    
  } catch (error) {
    console.log(error)
  }



}