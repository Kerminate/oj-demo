const User = require('../model/user')
const Solution = require('../model/solution')

// 查询用户具体信息
const getUserInfo = async (ctx) => {
  let uid = ctx.query.uid
  const info = await User
    .find({ uid })
    .exec()

  const solved = await Solution
    .find({ uid, judge: 3 })
    .distinct('pid')
    .exec()

  const unsolved = await Solution
    .find({ uid, judge: {$ne: 3} })
    .distinct('pid')
    .exec()

  ctx.status = 200
  ctx.body = {
    info,
    solved,
    unsolved
  }
}
