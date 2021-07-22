import Lottie from 'react-lottie-player';

import animationData from 'assests/snapp_car.json';
import constants from 'utils/constants';
import { persianNumber } from 'utils/number';

import styles from './CarAnimation.module.css';

interface Props {
  isFetching: boolean;
  speed: number;
}

const CarAnimation = ({ isFetching, speed }: Props) => {
  return (
    <div className={styles.loading}>
      <span>{isFetching ? constants.waitToComplete : constants.weArrived}</span>
      <p>
        {isFetching && (
          <>
            <span className={styles.carSpeed}>{persianNumber(speed)}</span>
            <span>{constants.kmH}</span>
          </>
        )}
      </p>
      <Lottie
        animationData={animationData}
        className={styles.lottie}
        loop={true}
        play={true}
        speed={0.8 + speed / 25}
        style={{
          transform: `translate3d(${
            isFetching ? '10.2rem' : '31rem'
          }, 0px, 0px) scale(2)`,
        }}
      />
    </div>
  );
};

export default CarAnimation;
