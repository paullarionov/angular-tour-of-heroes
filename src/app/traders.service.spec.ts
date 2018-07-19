import {getTestBed, inject, TestBed} from '@angular/core/testing';

import {TradersService} from './traders.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Trader} from './domain/Trader';

describe('TradersService', () => {
  let injector: TestBed;
  let service: TradersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TradersService]
    });
    injector = getTestBed();
    service = injector.get(TradersService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([], () => {
    expect(service).toBeTruthy();
  }));

  it('TEST: Check that mock traders created using toBeDefined method.', inject([], () => {
    expect(service.traders).toBeDefined();
  }));

  it('TEST: Check that we have created exactly 2 mock traders using toEqual method.', inject([], () => {
    expect(service.traders.length).toEqual(2);
  }));

  it('TEST: Check that 1st trader name is Oleg using toEqual method.', inject([], () => {
    expect(service.traders[0].getName()).toEqual('Oleg');
  }));

  it('TEST: Check that 2nd trader name is Anna using toEqual method.', inject([], () => {
    expect(service.traders[1].getName()).toEqual('Anna');
  }));

  it('TEST: Check add method.', inject([], () => {
    service.add(new Trader('Test'));
    expect(service.traders.length).toEqual(3);
  }));

  it('TEST: Check getTrader method it returns Promise instantly so just check the object and call done() right after the expectation.', function (done) {
    expect(service.getTrader('Oleg')).toBeDefined();
    done();
  }, 500);

  it('TEST: Check getTraders method it returns Promise instantly so just check the object and call done() right after the expectation.', function (done) {
    service.getTrader('Oleg').then(i => {
      expect(i.getName()).toEqual('Oleg');
      done();
    });
  }, 500);


});
