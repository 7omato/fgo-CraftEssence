// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.qty);
  return {
    rdNum: GetRandom(event.qty),
  }
}

function GetRandom(QTY) {
  var randoms = [];
  for (var i = 0; i < QTY; i++) {
    randoms[i] = GetRandomNum(594, 640);
  }
  return randoms;
}

function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}