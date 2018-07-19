import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {MarketServiceImpl} from './market.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


describe('MarketServiceImpl', () => {
  let injector: TestBed;
  let service: MarketServiceImpl;
  let httpMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MarketServiceImpl]
    });
    injector = getTestBed();
    service = injector.get(MarketServiceImpl);
    httpMock = injector.get(HttpClient);
  });


  it('should contain stocks', inject([MarketServiceImpl],
    (service: MarketServiceImpl) => {
      expect(service.getStocks()).toBeDefined();
    }));

  it('TEST: Check that stocks array contains 4 stocks after initialization. Note: Since we use http client\n' +
    'to get stocks it takes some time to do it. So, do not forget to do the timeout. It is a little bit tricky\n' +
    'because we do not use Promise here but I believe you can make it.', function (done) {
    service.getAll().then(i => {
      expect(i.length).toEqual(4);
      done();
    });
  }, 5000);

  it('TEST: Check that stocks array contains BA stock after initialization.', function (done) {
    service.getAll().then(i => {
      expect(i.find(i => i.getSymbol() === 'BA')).toBeDefined();
      done();
    });
  }, 5000);
  it('TEST: Check that stocks array not contains GE stock after initialization.', function (done) {
    service.getAll().then(i => {
      expect(i.find(i => i.getSymbol() === 'GE')).toBeUndefined();
      done();
    });
  }, 5000);


});
