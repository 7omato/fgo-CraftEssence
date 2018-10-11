const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
var total
var ImgList_Version
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('fgo-data').count()
    total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('fgo-data').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get() 
    tasks.push(promise)
  }
 db.collection("fgo-img-version").where({
    fgo_img_version :"fgo_img_version"
 }).get().then(res => { ImgList_Version = res.data})
  console.log(ImgList_Version)
  // 等待所有//取出画师名列表
  var names = [];
  return (await Promise.all(tasks)).reduce((acc, cur) => { 
      for(var i=0;i<cur.data.length;i++)
      {
        if (names.indexOf(cur.data[i].Illustrator.trim())<0)
        { 
          names.push(cur.data[i].Illustrator.trim()); 
        }
      } 
    return { 
     // data: acc.data.concat(cur.data),
      data: names,
      errMsg: acc.errMsg,
      total: total,
      ImgList_Version: ImgList_Version[0].ver,
    }
  })
}