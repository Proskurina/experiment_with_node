

describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });
});

describe('when searching for a user', function() {

  beforeEach(module('GitUserSearch'));

  var ctrl;
  var fakeSearch;

  beforeEach(function(){
    fakeSearch = jasmine.createSpyObj('fakeSearch', ['query']);

    module({
      Search: fakeSearch,
    });

  });

  beforeEach(function(){
    fakeSearch.query.and.returnValue({then: function(callback){callback({data: {items: items}})}})
    // fakeSearch.query.and.returnValue($q.when({data {items: items}}))
  });

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));


  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "https://github.com/tansaku"
    },
    {
      "login": "stephenlloyd",
      "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
      "html_url": "https://github.com/stephenlloyd"
    }
  ];

  it('displays search results', function() {
    ctrl.searchTerm = 'hello';
    ctrl.doSearch();
    expect(ctrl.searchResult.items).toEqual(items);
  });
});
