import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { CarService } from '../../src/api/request';
import Layout from '../../src/components/layout/Layout';
import DetailContainer from '../../src/container/Detail/Detail';
import { CarActionType } from '../../src/stores/ActionTypes';
import { useCarDetailChange } from '../../src/stores/CarDetailProvider';
import { convertCurrency } from '../../src/utils/convertCurrency';

const CarDetail = ({ data }) => {
  const dispatch = useCarDetailChange();
  useEffect(() => {
    if (data.length) {
      dispatch({ type: CarActionType.GET_CAR_DETAIL, detail: data[0] });
    }
  }, [data, dispatch]);
  return (
    <>
      <NextSeo
        title="peoplecar"
        description="B2C 차량대여 서비스"
        canonical="https://www.peoplecar.co.kr"
        openGraph={{
          type: 'website',
          url: 'https://www.peoplecar.co.kr',
          title: `${data[0].brand} ${data[0].name}`,
          description: convertCurrency(data[0].amount),
          images: [{ url: data[0].attribute.imageUrl }],
          site_name: 'peoplecar',
        }}
      />
      <Layout content={<DetailContainer />} isDetail />
    </>
  );
};

export const getStaticPaths = async () => {
  const {
    data: { payload },
  } = await CarService.getCarList();
  const paths = payload.map(({ id }) => ({ params: { id: String(id) } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async context => {
  try {
    const { id } = context.params;
    const {
      data: { payload },
    } = await CarService.getCarList();
    const data = payload.filter(car => car.id === Number(id));

    return {
      props: { data },
      revalidate: 5,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default CarDetail;
