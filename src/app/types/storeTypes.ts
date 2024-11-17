export interface storeType {
  name_ar: string;
  name_en: string;
  image: File[];
  featured: boolean;
  status: boolean;
  link_en: string;
  link_ar: string;
  description_ar: string;
  description_en: string;
  category_id: number;
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keyword_ar: string;
  meta_keyword_en: string;
  about_ar: string;
  about_en: string;
  discount_en: string;
  discount_ar: string;
  allstore: boolean;
  title_en: string;
  title_ar: string;

}
export interface Meta {
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keyword_ar: string;
  meta_keyword_en: string;
}
export interface ReceivedStoreType
  extends Omit<
    storeType,
    | "image"
    | "meta_title_ar"
    | "meta_title_en"
    | "meta_description_en"
    | "meta_description_ar"
    | "meta_keyword_ar"
    | "meta_keyword_en"
    | "featured"
    | "status"
    | "category_id"
    | "allstore"
  > {
  id: number;
  image: string;
  meta: Meta;
  featured: string;
  status: string;
  category_id: number[];
  allstore: string;
}
export interface couponStore
  extends Omit<storeType, "image" | "featured" | "status"> {
  id: number;
  image: string;
  featured: string;
  status: string;
}
