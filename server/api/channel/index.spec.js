'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var channelCtrlStub = {
  index: 'channelCtrl.index',
  show: 'channelCtrl.show',
  create: 'channelCtrl.create',
  update: 'channelCtrl.update',
  destroy: 'channelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var channelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './channel.controller': channelCtrlStub
});

describe('Channel API Router:', function() {

  it('should return an express router instance', function() {
    channelIndex.should.equal(routerStub);
  });

  describe('GET /api/channels', function() {

    it('should route to channel.controller.index', function() {
      routerStub.get
        .withArgs('/', 'channelCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/channels/:id', function() {

    it('should route to channel.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'channelCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/channels', function() {

    it('should route to channel.controller.create', function() {
      routerStub.post
        .withArgs('/', 'channelCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/channels/:id', function() {

    it('should route to channel.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'channelCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/channels/:id', function() {

    it('should route to channel.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'channelCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/channels/:id', function() {

    it('should route to channel.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'channelCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
