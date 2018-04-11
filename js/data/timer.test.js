import {assert} from 'chai';
import {createTimer} from './timer';

describe(`Creating timer`, () => {

  it(`should return "Время вышло", if time is up`, () => {
    const negativeValueTime = -100;
    const zeroValueTime = 0;
    assert.equal(`Время вышло`, createTimer(zeroValueTime).tick());
    assert.equal(`Время вышло`, createTimer(negativeValueTime).tick());
  });

  it(`should return time reduced by one`, () => {
    const currentTime = 500;
    assert.equal(499, createTimer(currentTime).tick());
  });

});
