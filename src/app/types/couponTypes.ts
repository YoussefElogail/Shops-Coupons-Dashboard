export interface couponType {
  title_ar: string;
  title_en: string;
  code: string;
  status: boolean;
  featured: boolean;
  start_date: Date;
  end_date: Date;
  store_id: number;
  store_name_en: string;
  flag_code: string[];
}
export interface ReceivedCouponType extends couponType {
  id: number;
}
