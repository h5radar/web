export interface RadarUser {
  id: number;
  sub: string;
  username: string;
  licenseDtoList: string[]; // TODO заменить на реальный тип
  practiceDtoList: string[]; // TODO заменить на реальный тип
  technologyDtoList: string[]; // TODO заменить на реальный тип
  productDtoList: string[]; // TODO заменить на реальный тип
}
