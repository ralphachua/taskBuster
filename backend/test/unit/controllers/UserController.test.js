
require("sails-test-helper");

describe(TEST_NAME, function() {
  var user = null;

  before(function(done) {
    async.series([
      function (done) {
        factory.create("user", function(obj) {
          user = obj;
          done();
        });
      }
    ], function(err) {
      done();
    });
  });

  after(function (done) {
    User.destroy({ id: user.id}, function (err, result) {
      done();
    });
  });

  describe("POST /users", function() {

    it("should return 'Name required", function(done) {
      var requestData = _.clone(user);
      delete requestData.name;

      request.post("/users")
        .set("ACCEPT", "application/json")
        .send(requestData)
        .expect(400)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          expect(res.body).to.have.deep.property("status").to.be.equal("error");
          expect(res.body).to.have.deep.property("data").to.be.an("object");
          expect(res.body.data).to.have.deep.property("message").to.be.equal("Name required");
          done();
        });
    });

    it("should return 'Gender required", function(done) {
      var requestData = _.clone(user);
      delete requestData.gender;

      request.post("/users")
        .set("ACCEPT", "application/json")
        .send(requestData)
        .expect(400)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          expect(res.body).to.have.deep.property("status").to.be.equal("error");
          expect(res.body).to.have.deep.property("data").to.be.an("object");
          expect(res.body.data).to.have.deep.property("message").to.be.equal("Gender required");
          done();
        });
    });

    it("should return 'Social ID required", function(done) {
      var requestData = _.clone(user);
      delete requestData.socialId;

      request.post("/users")
        .set("ACCEPT", "application/json")
        .send(requestData)
        .expect(400)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          expect(res.body).to.have.deep.property("status").to.be.equal("error");
          expect(res.body).to.have.deep.property("data").to.be.an("object");
          expect(res.body.data).to.have.deep.property("message").to.be.equal("Social ID required");
          done();
        });
    });

    it("should be successful", function(done) {
      request.post("/users")
        .set("ACCEPT", "application/json")
        .send(user)
        .expect(200)
        .end(function(err, res) {
          expect(err).to.not.exist;
          expect(res.body).to.exist;
          expect(res.body).to.have.deep.property("status").to.be.equal("success");
          expect(res.body).to.have.deep.property("data").to.be.an("object");
          expect(res.body.data).to.have.deep.property("name").to.be.equal("AJ");
          expect(res.body.data).to.have.deep.property("gender").to.be.equal("female");
          expect(res.body.data).to.have.deep.property("socialId").to.be.equal("user111");
          expect(res.body.data).to.have.deep.property("avatarUrl").to.be.equal("/avatar/123");
          expect(res.body.data).to.have.deep.property("levelId").to.be.equal("abc123");
          expect(res.body.data).to.have.deep.property("activeBadge").to.be.equal("qwe098");
          expect(res.body.data).to.have.deep.property("badges").to.be.an("array");
          expect(_.first(res.body.data.badges)).to.be.equal("qwe098");
          expect(res.body.data).to.have.deep.property("totalPointsDone").to.be.equal(0);
          done();
        });
    });
  });  
});