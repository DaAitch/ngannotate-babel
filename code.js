run((headerService, requestService) => {
  'ngInject';

  return headerService.setRequestService(requestService);
});

const fn = headerService => {
  'ngInject';

  return headerService.reset();
};

function fn2(headerService) {
  'ngInject';

  return headerService.notify();
}

module.exports = {
  inject1: function (headerService) {
    'ngInject';

    return headerService.getRequestService();
  },
  inject2: fn,
  inject3: fn2
}
