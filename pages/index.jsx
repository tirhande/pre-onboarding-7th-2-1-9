import { useEffect } from 'react';
import Layout from '../src/components/layout/Layout';
import MainContainer from '../src/container/Main/Main';
import { CarService } from '../src/api/request';
import { useCar, useCarChange } from '../src/stores/CarListProvider';
import { CarActionType } from '../src/stores/ActionTypes';
import { NextSeo } from 'next-seo';

const Main = ({ payload }) => {
  const dispatch = useCarChange();
  const { segment, fuelType } = useCar();
  useEffect(() => {
    if (!segment && !fuelType) {
      dispatch({ type: CarActionType.GET_CAR_LIST, carList: payload });
    }
  }, [payload, segment, fuelType, dispatch]);

  return (
    <>
      <NextSeo
        title="피플카!"
        description="짧은 여정부터 긴 여정까지 당신의 모든 여정, 피플카"
        canonical="https://www.peoplecar.co.kr"
        openGraph={{
          type: 'website',
          url: 'https://www.peoplecar.co.kr',
          title: '피플카!',
          description: '짧은 여정부터 긴 여정까지 당신의 모든 여정, 피플카',
          images: [{ url: 'https://peoplecar.co.kr/src/images/common/og.png' }],
          site_name: 'peoplecar',
        }}
      />
      <Layout content={<MainContainer />} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const {
      data: { payload },
    } = await CarService.getCarList();

    return {
      props: { payload },
      revalidate: 600,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Main;
