import { Random, Console } from '@woowacourse/mission-utils';
import PromptMessage from '../views/PromptMessage.js';

class GameController {
  constructor() {
    this.rand = 0;
  }

  getRandomValue() {
    this.rand = Random.pickNumberInRange(0, 9);
    return this.rand;
  }

  getForwardCount(carModels, car) {
    const randomValue = this.getRandomValue();
    if (randomValue >= 4) {
      carModels[car].forwardCountArr.push('-');
    } else {
      carModels[car].forwardCountArr.push();
    }
    return carModels[car].forwardCountArr.join('');
  }

  printCarForward(carModels) {
    for (const car in carModels) {
      const forwardCount = this.getForwardCount(carModels, car);
      Console.print(`${car} : ${forwardCount}`);
    }
  }

  repeatRace(carModels, attempt) {
    Console.print(PromptMessage.PRINT_RACESTART);
    while (attempt > 0) {
      this.printCarForward(carModels);
      attempt -= 1;
      Console.print(' ');
    }
  }

  printWinner(carModels, carModelsArr) {
    const totalCountArr = []; // 모든 자동차들의 전진 횟수
    const maxCountIndexArr = []; // totalCountArr요소들 중 최댓값의 인덱스들

    for (const car in carModels) {
      const forwardCount = carModels[car].forwardCountArr;
      totalCountArr.push(forwardCount.length);
    }

    // 최댓값 들어있는 인덱스들의 값 반환
    let formIndex = totalCountArr.indexOf(Math.max(...totalCountArr));
    while (formIndex !== -1) {
      maxCountIndexArr.push(formIndex);
      formIndex = totalCountArr.indexOf(
        Math.max(...totalCountArr),
        formIndex + 1,
      );
    }

    const winner = maxCountIndexArr.map((idx) => carModelsArr[idx]);
    Console.print(`최종 우승자 : ${winner.join(', ')}`);
  }
}

export default GameController;
