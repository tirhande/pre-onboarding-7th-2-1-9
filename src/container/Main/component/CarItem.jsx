import React from 'react';
import Image from 'next/legacy/image';
import NewTag from '../../../components/common/NewTag';
import { convertCurrency } from '../../../utils/convertCurrency';
import { getDateDiff } from '../../../utils/convertDate';
import { fuelType } from '../../../utils/FilterType';
import styled from 'styled-components';
// import { CarArticle, CarBGDiv, CarContentSpan, CarDescDiv, CarTitleSpan } from './styles';

const CarItem = ({ car }) => {
  const fuel = fuelType.find(({ value }) => value === car.attribute.fuelType)?.name;
  const currency_month = convertCurrency(car.amount);
  const diff_date = getDateDiff(car.createdAt);

  return (
    <CarArticle>
      <CarDescDiv>
        <CarTitleSpan>
          <p>{car.attribute.brand}</p>
          <p>{car.attribute.name}</p>
        </CarTitleSpan>
        <CarContentSpan>
          <p>
            {car.attribute.segment} / {fuel}
          </p>
          <p>{currency_month} 부터</p>
        </CarContentSpan>
      </CarDescDiv>
      <CarBGDiv>
        <div>
          <Image layout="fill" objectFit="contain" src={car.attribute.imageUrl} alt="car" />
        </div>
        {diff_date <= 1 && <NewTag />}
      </CarBGDiv>
    </CarArticle>
  );
};

const CarArticle = styled.article`
  display: flex;

  width: 100%;
  height: 120px;
  border-bottom: 1px solid #000;
`;
const CarDescDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 50%;
  padding: 24px 20px;
`;
const CarTitleSpan = styled.span`
  font-size: 14px;
  font-weight: 700;
`;
const CarContentSpan = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const CarBGDiv = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;

  background-color: #d9d9d9;
  background-clip: content-box;

  div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

export default CarItem;
