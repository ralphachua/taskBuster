
module.exports = function(factory) {
  factory.define("user")
    .attr("name","AJ")
    .attr("gender","female")
    .attr("socialId","user111")
    .attr("avatarUrl","/avatar/123")
    .attr("levelId","abc123")
    .attr("activeBadge","qwe098")
    .attr("badges",["qwe098"])
    .attr("totalPointsDone",0);
}