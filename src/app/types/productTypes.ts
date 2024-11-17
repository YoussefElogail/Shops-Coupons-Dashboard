export interface productType {
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  link_en: string;
  link_ar: string;
  image: File[];
  store_id: number;
}
export interface ReceivedProductType extends Omit<productType, "image"> {
  id: number;
  store_name_en: string;
  image:string
}
