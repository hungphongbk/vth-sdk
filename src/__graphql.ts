import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";

export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ConnectionCursor: any;
  DateTime: any;
  JSONObject: any;
}

export interface AddCommentsToShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface AddHighlightFeaturesToShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface AddImageListsToShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface AddImagesToImageListInput {
  id: Scalars["ID"];
  relationIds: Array<Scalars["ID"]>;
}

export enum AuthRoleType {
  Admin = "ADMIN",
  Investor = "INVESTOR",
  Superadmin = "SUPERADMIN",
  User = "USER",
}

export interface BooleanFieldComparison {
  is: Maybe<Scalars["Boolean"]>;
  isNot: Maybe<Scalars["Boolean"]>;
}

export interface CommentCreateDto {
  content: Scalars["String"];
  rate: Array<CommentRateEnum>;
}

export interface CommentDto {
  author: Maybe<User>;
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  rate: Array<CommentRateEnum>;
  updatedAt: Scalars["DateTime"];
}

export interface CommentDtoAggregateGroupBy {
  id: Maybe<Scalars["ID"]>;
}

export interface CommentDtoAvgAggregate {
  id: Maybe<Scalars["Float"]>;
}

export interface CommentDtoCountAggregate {
  id: Maybe<Scalars["Int"]>;
}

export interface CommentDtoEdge {
  cursor: Scalars["ConnectionCursor"];
  node: CommentDto;
}

export interface CommentDtoFilter {
  and: Maybe<Array<CommentDtoFilter>>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<CommentDtoFilter>>;
}

export interface CommentDtoMaxAggregate {
  id: Maybe<Scalars["ID"]>;
}

export interface CommentDtoMinAggregate {
  id: Maybe<Scalars["ID"]>;
}

export interface CommentDtoSort {
  direction: SortDirection;
  field: CommentDtoSortFields;
  nulls: Maybe<SortNulls>;
}

export enum CommentDtoSortFields {
  Id = "id",
}

export interface CommentDtoSumAggregate {
  id: Maybe<Scalars["Float"]>;
}

export enum CommentRateEnum {
  CoTiemNang = "CO_TIEM_NANG",
  CungDuoc = "CUNG_DUOC",
  DangTien = "DANG_TIEN",
  Hay = "HAY",
  SieuPham = "SIEU_PHAM",
  XamXi = "XAM_XI",
}

export interface CreateInvestmentPackageDto {
  benefitRate: Maybe<Scalars["Float"]>;
  count: Maybe<Scalars["Float"]>;
  displayName: Maybe<Scalars["String"]>;
  fundedRate: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface CreateManyInvestmentPackageDtosInput {
  investmentPackageDtos: Array<CreateInvestmentPackageDto>;
}

export interface CreateManyMediaDtosInput {
  mediaDtos: Array<MediaInput>;
}

export interface CreateOneImageListInput {
  imageList: ImageListCreateDto;
}

export interface CreateOneInvestmentPackageDtoInput {
  investmentPackageDto: CreateInvestmentPackageDto;
}

export interface CreateOneMediaDtoInput {
  mediaDto: MediaInput;
}

export interface CursorPaging {
  after: Maybe<Scalars["ConnectionCursor"]>;
  before: Maybe<Scalars["ConnectionCursor"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
}

export interface DateFieldComparison {
  between: Maybe<DateFieldComparisonBetween>;
  eq: Maybe<Scalars["DateTime"]>;
  gt: Maybe<Scalars["DateTime"]>;
  gte: Maybe<Scalars["DateTime"]>;
  in: Maybe<Array<Scalars["DateTime"]>>;
  is: Maybe<Scalars["Boolean"]>;
  isNot: Maybe<Scalars["Boolean"]>;
  lt: Maybe<Scalars["DateTime"]>;
  lte: Maybe<Scalars["DateTime"]>;
  neq: Maybe<Scalars["DateTime"]>;
  notBetween: Maybe<DateFieldComparisonBetween>;
  notIn: Maybe<Array<Scalars["DateTime"]>>;
}

export interface DateFieldComparisonBetween {
  lower: Scalars["DateTime"];
  upper: Scalars["DateTime"];
}

export interface DeleteManyInvestmentPackageDtosInput {
  filter: InvestmentPackageDtoDeleteFilter;
}

export interface DeleteManyMediaDtosInput {
  filter: MediaDtoDeleteFilter;
}

export interface DeleteManyResponse {
  deletedCount: Scalars["Int"];
}

export interface DeleteManyShowcasesInput {
  filter: ShowcaseDeleteFilter;
}

export interface DeleteOneImageListInput {
  id: Scalars["ID"];
}

export interface DeleteOneInvestmentPackageDtoInput {
  id: Scalars["ID"];
}

export interface DeleteOneMediaDtoInput {
  id: Scalars["ID"];
}

export interface DeleteOnePrjUpdateDtoInput {
  id: Scalars["ID"];
}

export interface DeleteOneShowcaseHighlightFeatureInput {
  id: Scalars["ID"];
}

export interface IdFilterComparison {
  eq: Maybe<Scalars["ID"]>;
  gt: Maybe<Scalars["ID"]>;
  gte: Maybe<Scalars["ID"]>;
  iLike: Maybe<Scalars["ID"]>;
  in: Maybe<Array<Scalars["ID"]>>;
  is: Maybe<Scalars["Boolean"]>;
  isNot: Maybe<Scalars["Boolean"]>;
  like: Maybe<Scalars["ID"]>;
  lt: Maybe<Scalars["ID"]>;
  lte: Maybe<Scalars["ID"]>;
  neq: Maybe<Scalars["ID"]>;
  notILike: Maybe<Scalars["ID"]>;
  notIn: Maybe<Array<Scalars["ID"]>>;
  notLike: Maybe<Scalars["ID"]>;
}

export interface IdInterface {
  id: Scalars["ID"];
}

export interface ImageList extends IdInterface {
  id: Scalars["ID"];
  images: Array<MediaDto>;
}

export interface ImageListImagesArgs {
  filter?: Maybe<MediaDtoFilter>;
  sorting?: Maybe<Array<MediaDtoSort>>;
}

export interface ImageListAggregateGroupBy {
  id: Maybe<Scalars["ID"]>;
}

export interface ImageListCountAggregate {
  id: Maybe<Scalars["Int"]>;
}

export interface ImageListCreateDto {
  images: Maybe<Array<MediaInput>>;
}

export interface ImageListDeleteResponse {
  id: Maybe<Scalars["ID"]>;
}

export interface ImageListEdge {
  cursor: Scalars["ConnectionCursor"];
  node: ImageList;
}

export interface ImageListFilter {
  and: Maybe<Array<ImageListFilter>>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<ImageListFilter>>;
}

export interface ImageListMaxAggregate {
  id: Maybe<Scalars["ID"]>;
}

export interface ImageListMinAggregate {
  id: Maybe<Scalars["ID"]>;
}

export interface ImageListSort {
  direction: SortDirection;
  field: ImageListSortFields;
  nulls: Maybe<SortNulls>;
}

export enum ImageListSortFields {
  Id = "id",
}

export interface InvestmentPackageDto {
  benefitRate: Scalars["Float"];
  count: Scalars["Float"];
  displayName: Scalars["String"];
  fundedRate: Scalars["Float"];
  id: Scalars["ID"];
}

export interface InvestmentPackageDtoAggregateGroupBy {
  displayName: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface InvestmentPackageDtoAvgAggregate {
  id: Maybe<Scalars["Float"]>;
}

export interface InvestmentPackageDtoConnection {
  edges: Array<InvestmentPackageDtoEdge>;
  pageInfo: PageInfo;
}

export interface InvestmentPackageDtoCountAggregate {
  displayName: Maybe<Scalars["Int"]>;
  id: Maybe<Scalars["Int"]>;
}

export interface InvestmentPackageDtoDeleteFilter {
  and: Maybe<Array<InvestmentPackageDtoDeleteFilter>>;
  displayName: Maybe<StringFieldComparison>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<InvestmentPackageDtoDeleteFilter>>;
}

export interface InvestmentPackageDtoDeleteResponse {
  benefitRate: Maybe<Scalars["Float"]>;
  count: Maybe<Scalars["Float"]>;
  displayName: Maybe<Scalars["String"]>;
  fundedRate: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface InvestmentPackageDtoEdge {
  cursor: Scalars["ConnectionCursor"];
  node: InvestmentPackageDto;
}

export interface InvestmentPackageDtoFilter {
  and: Maybe<Array<InvestmentPackageDtoFilter>>;
  displayName: Maybe<StringFieldComparison>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<InvestmentPackageDtoFilter>>;
}

export interface InvestmentPackageDtoMaxAggregate {
  displayName: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface InvestmentPackageDtoMinAggregate {
  displayName: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface InvestmentPackageDtoSort {
  direction: SortDirection;
  field: InvestmentPackageDtoSortFields;
  nulls: Maybe<SortNulls>;
}

export enum InvestmentPackageDtoSortFields {
  DisplayName = "displayName",
  Id = "id",
}

export interface InvestmentPackageDtoSumAggregate {
  id: Maybe<Scalars["Float"]>;
}

export interface InvestmentPackageDtoUpdateFilter {
  and: Maybe<Array<InvestmentPackageDtoUpdateFilter>>;
  displayName: Maybe<StringFieldComparison>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<InvestmentPackageDtoUpdateFilter>>;
}

export interface MediaDto extends IdInterface {
  filename: Scalars["String"];
  height: Scalars["Float"];
  id: Scalars["ID"];
  mimetype: Scalars["String"];
  path: Scalars["String"];
  preloadUrl: Scalars["String"];
  type: MediaType;
  width: Scalars["Float"];
}

export interface MediaDtoAggregateGroupBy {
  filename: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface MediaDtoConnection {
  edges: Array<MediaDtoEdge>;
  pageInfo: PageInfo;
}

export interface MediaDtoCountAggregate {
  filename: Maybe<Scalars["Int"]>;
  id: Maybe<Scalars["Int"]>;
}

export interface MediaDtoDeleteFilter {
  and: Maybe<Array<MediaDtoDeleteFilter>>;
  filename: Maybe<StringFieldComparison>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<MediaDtoDeleteFilter>>;
}

export interface MediaDtoDeleteResponse {
  filename: Maybe<Scalars["String"]>;
  height: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["ID"]>;
  mimetype: Maybe<Scalars["String"]>;
  path: Maybe<Scalars["String"]>;
  preloadUrl: Maybe<Scalars["String"]>;
  type: Maybe<MediaType>;
  width: Maybe<Scalars["Float"]>;
}

export interface MediaDtoEdge {
  cursor: Scalars["ConnectionCursor"];
  node: MediaDto;
}

export interface MediaDtoFilter {
  and: Maybe<Array<MediaDtoFilter>>;
  filename: Maybe<StringFieldComparison>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<MediaDtoFilter>>;
}

export interface MediaDtoMaxAggregate {
  filename: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface MediaDtoMinAggregate {
  filename: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface MediaDtoSort {
  direction: SortDirection;
  field: MediaDtoSortFields;
  nulls: Maybe<SortNulls>;
}

export enum MediaDtoSortFields {
  Filename = "filename",
  Id = "id",
}

export interface MediaDtoUpdateFilter {
  and: Maybe<Array<MediaDtoUpdateFilter>>;
  filename: Maybe<StringFieldComparison>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<MediaDtoUpdateFilter>>;
}

export interface MediaInput {
  filename: Scalars["String"];
  height: Maybe<Scalars["Float"]>;
  mimetype: Scalars["String"];
  path: Scalars["String"];
  preloadUrl: Maybe<Scalars["String"]>;
  type: Maybe<MediaType>;
  width: Maybe<Scalars["Float"]>;
}

export enum MediaType {
  Hf = "HF",
  Imglist = "IMGLIST",
  Showcase = "SHOWCASE",
}

export interface Mutation {
  addCommentsToShowcase: Showcase;
  addHighlightFeaturesToShowcase: Showcase;
  addImageListsToShowcase: Showcase;
  addImagesToImageList: ImageList;
  createManyInvestmentPackageDtos: Array<InvestmentPackageDto>;
  createManyMediaDtos: Array<MediaDto>;
  createOneImageList: ImageList;
  createOneInvestmentPackageDto: InvestmentPackageDto;
  createOneMediaDto: MediaDto;
  createOneSetting: Scalars["Boolean"];
  createOneShowcase: Showcase;
  createOneShowcaseHighlightFeature: ShowcaseHighlightFeature;
  deleteManyInvestmentPackageDtos: DeleteManyResponse;
  deleteManyMediaDtos: DeleteManyResponse;
  deleteManyShowcases: DeleteManyResponse;
  deleteOneImageList: ImageListDeleteResponse;
  deleteOneInvestmentPackageDto: InvestmentPackageDtoDeleteResponse;
  deleteOneMediaDto: MediaDtoDeleteResponse;
  deleteOnePrjUpdateDto: PrjUpdateDtoDeleteResponse;
  deleteOneShowcase: Scalars["Boolean"];
  deleteOneShowcaseHighlightFeature: ShowcaseHighlightFeatureDeleteResponse;
  postAnonymousComment: CommentDto;
  postAuthorizedComment: CommentDto;
  postProjectUpdate: PrjUpdateDto;
  removeAuthorFromCommentDto: CommentDto;
  removeAuthorFromShowcase: Showcase;
  removeCommentsFromShowcase: Showcase;
  removeHighlightFeaturesFromShowcase: Showcase;
  removeImageFromShowcase: Showcase;
  removeImageFromShowcaseHighlightFeature: ShowcaseHighlightFeature;
  removeImageListsFromShowcase: Showcase;
  removeImagesFromImageList: ImageList;
  setAuthorOnCommentDto: CommentDto;
  setAuthorOnShowcase: Showcase;
  setCommentsOnShowcase: Showcase;
  setHighlightFeaturesOnShowcase: Showcase;
  setImageListsOnShowcase: Showcase;
  setImageOnShowcase: Showcase;
  setImageOnShowcaseHighlightFeature: ShowcaseHighlightFeature;
  setImagesOnImageList: ImageList;
  submitInvestor: Scalars["Boolean"];
  updateManyInvestmentPackageDtos: UpdateManyResponse;
  updateManyMediaDtos: UpdateManyResponse;
  updateOneImageList: ImageList;
  updateOneInvestmentPackageDto: InvestmentPackageDto;
  updateOneMediaDto: MediaDto;
  updateOnePrjUpdateDto: PrjUpdateDto;
  updateOneSetting: Scalars["Boolean"];
  updateOneShowcase: Scalars["Boolean"];
  updateOneShowcaseHighlightFeature: ShowcaseHighlightFeature;
  updateOneUser: Scalars["Boolean"];
}

export interface MutationAddCommentsToShowcaseArgs {
  input: AddCommentsToShowcaseInput;
}

export interface MutationAddHighlightFeaturesToShowcaseArgs {
  input: AddHighlightFeaturesToShowcaseInput;
}

export interface MutationAddImageListsToShowcaseArgs {
  input: AddImageListsToShowcaseInput;
}

export interface MutationAddImagesToImageListArgs {
  input: AddImagesToImageListInput;
}

export interface MutationCreateManyInvestmentPackageDtosArgs {
  input: CreateManyInvestmentPackageDtosInput;
}

export interface MutationCreateManyMediaDtosArgs {
  input: CreateManyMediaDtosInput;
}

export interface MutationCreateOneImageListArgs {
  input: CreateOneImageListInput;
}

export interface MutationCreateOneInvestmentPackageDtoArgs {
  input: CreateOneInvestmentPackageDtoInput;
}

export interface MutationCreateOneMediaDtoArgs {
  input: CreateOneMediaDtoInput;
}

export interface MutationCreateOneSettingArgs {
  input: SettingCreateDto;
}

export interface MutationCreateOneShowcaseArgs {
  input: ShowcaseCreateInputDto;
}

export interface MutationCreateOneShowcaseHighlightFeatureArgs {
  input: ShowcaseHfCreateInputDto;
  slug: Scalars["String"];
}

export interface MutationDeleteManyInvestmentPackageDtosArgs {
  input: DeleteManyInvestmentPackageDtosInput;
}

export interface MutationDeleteManyMediaDtosArgs {
  input: DeleteManyMediaDtosInput;
}

export interface MutationDeleteManyShowcasesArgs {
  input: DeleteManyShowcasesInput;
}

export interface MutationDeleteOneImageListArgs {
  input: DeleteOneImageListInput;
}

export interface MutationDeleteOneInvestmentPackageDtoArgs {
  input: DeleteOneInvestmentPackageDtoInput;
}

export interface MutationDeleteOneMediaDtoArgs {
  input: DeleteOneMediaDtoInput;
}

export interface MutationDeleteOnePrjUpdateDtoArgs {
  input: DeleteOnePrjUpdateDtoInput;
}

export interface MutationDeleteOneShowcaseArgs {
  slug: Scalars["String"];
}

export interface MutationDeleteOneShowcaseHighlightFeatureArgs {
  input: DeleteOneShowcaseHighlightFeatureInput;
}

export interface MutationPostAnonymousCommentArgs {
  input: CommentCreateDto;
  slug: Scalars["String"];
}

export interface MutationPostAuthorizedCommentArgs {
  input: CommentCreateDto;
  slug: Scalars["String"];
}

export interface MutationPostProjectUpdateArgs {
  input: PrjUpdateCreateDto;
  slug: Scalars["String"];
}

export interface MutationRemoveAuthorFromCommentDtoArgs {
  input: RemoveAuthorFromCommentDtoInput;
}

export interface MutationRemoveAuthorFromShowcaseArgs {
  input: RemoveAuthorFromShowcaseInput;
}

export interface MutationRemoveCommentsFromShowcaseArgs {
  input: RemoveCommentsFromShowcaseInput;
}

export interface MutationRemoveHighlightFeaturesFromShowcaseArgs {
  input: RemoveHighlightFeaturesFromShowcaseInput;
}

export interface MutationRemoveImageFromShowcaseArgs {
  input: RemoveImageFromShowcaseInput;
}

export interface MutationRemoveImageFromShowcaseHighlightFeatureArgs {
  input: RemoveImageFromShowcaseHighlightFeatureInput;
}

export interface MutationRemoveImageListsFromShowcaseArgs {
  input: RemoveImageListsFromShowcaseInput;
}

export interface MutationRemoveImagesFromImageListArgs {
  input: RemoveImagesFromImageListInput;
}

export interface MutationSetAuthorOnCommentDtoArgs {
  input: SetAuthorOnCommentDtoInput;
}

export interface MutationSetAuthorOnShowcaseArgs {
  input: SetAuthorOnShowcaseInput;
}

export interface MutationSetCommentsOnShowcaseArgs {
  input: SetCommentsOnShowcaseInput;
}

export interface MutationSetHighlightFeaturesOnShowcaseArgs {
  input: SetHighlightFeaturesOnShowcaseInput;
}

export interface MutationSetImageListsOnShowcaseArgs {
  input: SetImageListsOnShowcaseInput;
}

export interface MutationSetImageOnShowcaseArgs {
  input: SetImageOnShowcaseInput;
}

export interface MutationSetImageOnShowcaseHighlightFeatureArgs {
  input: SetImageOnShowcaseHighlightFeatureInput;
}

export interface MutationSetImagesOnImageListArgs {
  input: SetImagesOnImageListInput;
}

export interface MutationSubmitInvestorArgs {
  form: SubmitInvestorInputDto;
}

export interface MutationUpdateManyInvestmentPackageDtosArgs {
  input: UpdateManyInvestmentPackageDtosInput;
}

export interface MutationUpdateManyMediaDtosArgs {
  input: UpdateManyMediaDtosInput;
}

export interface MutationUpdateOneImageListArgs {
  input: UpdateOneImageListInput;
}

export interface MutationUpdateOneInvestmentPackageDtoArgs {
  input: UpdateOneInvestmentPackageDtoInput;
}

export interface MutationUpdateOneMediaDtoArgs {
  input: UpdateOneMediaDtoInput;
}

export interface MutationUpdateOnePrjUpdateDtoArgs {
  input: UpdateOnePrjUpdateDtoInput;
}

export interface MutationUpdateOneSettingArgs {
  input: SettingCreateDto;
}

export interface MutationUpdateOneShowcaseArgs {
  input: ShowcaseUpdateInputDto;
  slug: Scalars["String"];
}

export interface MutationUpdateOneShowcaseHighlightFeatureArgs {
  id: Scalars["ID"];
  input: ShowcaseHfUpdateInputDto;
}

export interface MutationUpdateOneUserArgs {
  role: AuthRoleType;
  uid: Scalars["String"];
}

export interface OffsetPageInfo {
  hasNextPage: Maybe<Scalars["Boolean"]>;
  hasPreviousPage: Maybe<Scalars["Boolean"]>;
}

export interface OffsetPaging {
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
}

export interface PageInfo {
  endCursor: Maybe<Scalars["ConnectionCursor"]>;
  hasNextPage: Maybe<Scalars["Boolean"]>;
  hasPreviousPage: Maybe<Scalars["Boolean"]>;
  startCursor: Maybe<Scalars["ConnectionCursor"]>;
}

export interface PrjUpdateCreateDto {
  content: Scalars["String"];
}

export interface PrjUpdateDto {
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
}

export interface PrjUpdateDtoAggregateGroupBy {
  id: Maybe<Scalars["ID"]>;
}

export interface PrjUpdateDtoAvgAggregate {
  id: Maybe<Scalars["Float"]>;
}

export interface PrjUpdateDtoCountAggregate {
  id: Maybe<Scalars["Int"]>;
}

export interface PrjUpdateDtoDeleteResponse {
  content: Maybe<Scalars["String"]>;
  createdAt: Maybe<Scalars["DateTime"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface PrjUpdateDtoEdge {
  cursor: Scalars["ConnectionCursor"];
  node: PrjUpdateDto;
}

export interface PrjUpdateDtoFilter {
  and: Maybe<Array<PrjUpdateDtoFilter>>;
  id: Maybe<IdFilterComparison>;
  or: Maybe<Array<PrjUpdateDtoFilter>>;
}

export interface PrjUpdateDtoMaxAggregate {
  id: Maybe<Scalars["ID"]>;
}

export interface PrjUpdateDtoMinAggregate {
  id: Maybe<Scalars["ID"]>;
}

export interface PrjUpdateDtoSort {
  direction: SortDirection;
  field: PrjUpdateDtoSortFields;
  nulls: Maybe<SortNulls>;
}

export enum PrjUpdateDtoSortFields {
  Id = "id",
}

export interface PrjUpdateDtoSumAggregate {
  id: Maybe<Scalars["Float"]>;
}

export enum PublishStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

export interface PublishStatusFilterComparison {
  eq: Maybe<PublishStatus>;
  gt: Maybe<PublishStatus>;
  gte: Maybe<PublishStatus>;
  iLike: Maybe<PublishStatus>;
  in: Maybe<Array<PublishStatus>>;
  is: Maybe<Scalars["Boolean"]>;
  isNot: Maybe<Scalars["Boolean"]>;
  like: Maybe<PublishStatus>;
  lt: Maybe<PublishStatus>;
  lte: Maybe<PublishStatus>;
  neq: Maybe<PublishStatus>;
  notILike: Maybe<PublishStatus>;
  notIn: Maybe<Array<PublishStatus>>;
  notLike: Maybe<PublishStatus>;
}

export interface Query {
  currentUser: User;
  getAllUsers: Array<User>;
  getOneUser: User;
  imageList: Maybe<ImageList>;
  investmentPackageDto: Maybe<InvestmentPackageDto>;
  investmentPackageDtos: InvestmentPackageDtoConnection;
  mediaDto: Maybe<MediaDto>;
  mediaDtos: MediaDtoConnection;
  prjUpdateDto: Maybe<PrjUpdateDto>;
  setting: Maybe<SettingDto>;
  settings: Array<SettingDto>;
  showcase: Showcase;
  showcaseHighlightFeature: Maybe<ShowcaseHighlightFeature>;
  showcases: ShowcaseConnection;
  slugs: Array<Scalars["String"]>;
}

export interface QueryGetOneUserArgs {
  uid: Scalars["String"];
}

export interface QueryImageListArgs {
  id: Scalars["ID"];
}

export interface QueryInvestmentPackageDtoArgs {
  id: Scalars["ID"];
}

export interface QueryInvestmentPackageDtosArgs {
  filter?: Maybe<InvestmentPackageDtoFilter>;
  paging?: Maybe<CursorPaging>;
  sorting?: Maybe<Array<InvestmentPackageDtoSort>>;
}

export interface QueryMediaDtoArgs {
  id: Scalars["ID"];
}

export interface QueryMediaDtosArgs {
  filter?: Maybe<MediaDtoFilter>;
  paging?: Maybe<CursorPaging>;
  sorting?: Maybe<Array<MediaDtoSort>>;
}

export interface QueryPrjUpdateDtoArgs {
  id: Scalars["ID"];
}

export interface QuerySettingArgs {
  key: Scalars["String"];
}

export interface QuerySettingsArgs {
  keys: Array<Scalars["String"]>;
}

export interface QueryShowcaseArgs {
  slug: Scalars["String"];
}

export interface QueryShowcaseHighlightFeatureArgs {
  id: Scalars["ID"];
}

export interface QueryShowcasesArgs {
  filter?: Maybe<ShowcaseFilter>;
  paging?: Maybe<CursorPaging>;
  sorting?: Maybe<Array<ShowcaseSort>>;
}

export interface RemoveAuthorFromCommentDtoInput {
  id: Scalars["ID"];
  relationId: Scalars["ID"];
}

export interface RemoveAuthorFromShowcaseInput {
  id: Scalars["String"];
  relationId: Scalars["ID"];
}

export interface RemoveCommentsFromShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface RemoveHighlightFeaturesFromShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface RemoveImageFromShowcaseHighlightFeatureInput {
  id: Scalars["ID"];
  relationId: Scalars["ID"];
}

export interface RemoveImageFromShowcaseInput {
  id: Scalars["String"];
  relationId: Scalars["ID"];
}

export interface RemoveImageListsFromShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface RemoveImagesFromImageListInput {
  id: Scalars["ID"];
  relationIds: Array<Scalars["ID"]>;
}

export interface SetAuthorOnCommentDtoInput {
  id: Scalars["ID"];
  relationId: Scalars["ID"];
}

export interface SetAuthorOnShowcaseInput {
  id: Scalars["String"];
  relationId: Scalars["ID"];
}

export interface SetCommentsOnShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface SetHighlightFeaturesOnShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface SetImageListsOnShowcaseInput {
  id: Scalars["String"];
  relationIds: Array<Scalars["ID"]>;
}

export interface SetImageOnShowcaseHighlightFeatureInput {
  id: Scalars["ID"];
  relationId: Scalars["ID"];
}

export interface SetImageOnShowcaseInput {
  id: Scalars["String"];
  relationId: Scalars["ID"];
}

export interface SetImagesOnImageListInput {
  id: Scalars["ID"];
  relationIds: Array<Scalars["ID"]>;
}

export interface SettingCreateDto {
  key: Scalars["String"];
  value: Scalars["JSONObject"];
}

export interface SettingDto {
  id: Scalars["ID"];
  key: Scalars["String"];
  value: Scalars["JSONObject"];
}

export interface Showcase {
  author: User;
  brand: ShowcaseBrand;
  comments: ShowcaseCommentsConnection;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  expectedQuantity: Maybe<ShowcasePrice>;
  expectedSaleAt: Maybe<Scalars["DateTime"]>;
  expectedSaleEndAt: Maybe<Scalars["DateTime"]>;
  expectedSalePrice: Maybe<ShowcasePrice>;
  ga: Maybe<ShowcaseGaDto>;
  highlightFeatures: Array<ShowcaseHighlightFeature>;
  id: Scalars["ID"];
  image: MediaDto;
  imageLists: Array<ImageList>;
  inventory: Maybe<ShowcaseInventoryDto>;
  investorStat: Maybe<ShowcaseInvestorStatDto>;
  isFeatured: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  publishStatus: PublishStatus;
  slug: Scalars["String"];
  status: ShowcaseStatus;
  updatedAt: Scalars["DateTime"];
  updates: Array<PrjUpdateDto>;
}

export interface ShowcaseCommentsArgs {
  filter?: Maybe<CommentDtoFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<CommentDtoSort>>;
}

export interface ShowcaseHighlightFeaturesArgs {
  filter?: Maybe<ShowcaseHighlightFeatureFilter>;
  sorting?: Maybe<Array<ShowcaseHighlightFeatureSort>>;
}

export interface ShowcaseImageListsArgs {
  filter?: Maybe<ImageListFilter>;
  sorting?: Maybe<Array<ImageListSort>>;
}

export interface ShowcaseUpdatesArgs {
  filter?: Maybe<PrjUpdateDtoFilter>;
  sorting?: Maybe<Array<PrjUpdateDtoSort>>;
}

export interface ShowcaseAggregateGroupBy {
  expectedSaleAt: Maybe<Scalars["DateTime"]>;
  expectedSaleEndAt: Maybe<Scalars["DateTime"]>;
  isFeatured: Maybe<Scalars["Boolean"]>;
  name: Maybe<Scalars["String"]>;
  publishStatus: Maybe<PublishStatus>;
  slug: Maybe<Scalars["String"]>;
  status: Maybe<ShowcaseStatus>;
  updatedAt: Maybe<Scalars["DateTime"]>;
}

export interface ShowcaseBrand {
  description: Scalars["String"];
  name: Scalars["String"];
}

export interface ShowcaseBrandInput {
  description: Scalars["String"];
  name: Scalars["String"];
}

export interface ShowcaseCommentsConnection {
  nodes: Array<CommentDto>;
  pageInfo: OffsetPageInfo;
  totalCount: Scalars["Int"];
}

export interface ShowcaseConnection {
  edges: Array<ShowcaseEdge>;
  pageInfo: PageInfo;
}

export interface ShowcaseCountAggregate {
  expectedSaleAt: Maybe<Scalars["Int"]>;
  expectedSaleEndAt: Maybe<Scalars["Int"]>;
  isFeatured: Maybe<Scalars["Int"]>;
  name: Maybe<Scalars["Int"]>;
  publishStatus: Maybe<Scalars["Int"]>;
  slug: Maybe<Scalars["Int"]>;
  status: Maybe<Scalars["Int"]>;
  updatedAt: Maybe<Scalars["Int"]>;
}

export interface ShowcaseCreateInputDto {
  brand: ShowcaseBrandInput;
  description: Scalars["String"];
  expectedQuantity: Maybe<ShowcasePriceInput>;
  expectedSaleAt: Maybe<Scalars["DateTime"]>;
  expectedSaleEndAt: Maybe<Scalars["DateTime"]>;
  expectedSalePrice: Maybe<ShowcasePriceInput>;
  highlightFeatures: Maybe<Array<ShowcaseHfCreateInputDto>>;
  id: Maybe<Scalars["String"]>;
  image: MediaInput;
  imageLists: Maybe<Array<ImageListCreateDto>>;
  inventory: Maybe<ShowcaseInventoryDtoInput>;
  isFeatured: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  publishStatus: Maybe<PublishStatus>;
  status: ShowcaseStatus;
  updates: Maybe<Array<PrjUpdateCreateDto>>;
}

export interface ShowcaseDeleteFilter {
  and: Maybe<Array<ShowcaseDeleteFilter>>;
  expectedSaleAt: Maybe<DateFieldComparison>;
  expectedSaleEndAt: Maybe<DateFieldComparison>;
  isFeatured: Maybe<BooleanFieldComparison>;
  name: Maybe<StringFieldComparison>;
  or: Maybe<Array<ShowcaseDeleteFilter>>;
  publishStatus: Maybe<PublishStatusFilterComparison>;
  slug: Maybe<StringFieldComparison>;
  status: Maybe<ShowcaseStatusFilterComparison>;
  updatedAt: Maybe<DateFieldComparison>;
}

export interface ShowcaseEdge {
  cursor: Scalars["ConnectionCursor"];
  node: Showcase;
}

export interface ShowcaseFilter {
  and: Maybe<Array<ShowcaseFilter>>;
  expectedSaleAt: Maybe<DateFieldComparison>;
  expectedSaleEndAt: Maybe<DateFieldComparison>;
  isFeatured: Maybe<BooleanFieldComparison>;
  name: Maybe<StringFieldComparison>;
  or: Maybe<Array<ShowcaseFilter>>;
  publishStatus: Maybe<PublishStatusFilterComparison>;
  slug: Maybe<StringFieldComparison>;
  status: Maybe<ShowcaseStatusFilterComparison>;
  updatedAt: Maybe<DateFieldComparison>;
}

export interface ShowcaseGaDto {
  viewCount: Scalars["Float"];
}

export interface ShowcaseHfCreateInputDto {
  description: Scalars["String"];
  id: Maybe<Scalars["String"]>;
  image: MediaInput;
  name: Scalars["String"];
}

export interface ShowcaseHfUpdateInputDto {
  description: Maybe<Scalars["String"]>;
  image: Maybe<MediaInput>;
  name: Maybe<Scalars["String"]>;
}

export interface ShowcaseHighlightFeature {
  description: Scalars["String"];
  id: Scalars["ID"];
  image: MediaDto;
  name: Scalars["String"];
}

export interface ShowcaseHighlightFeatureAggregateGroupBy {
  id: Maybe<Scalars["ID"]>;
  name: Maybe<Scalars["String"]>;
}

export interface ShowcaseHighlightFeatureCountAggregate {
  id: Maybe<Scalars["Int"]>;
  name: Maybe<Scalars["Int"]>;
}

export interface ShowcaseHighlightFeatureDeleteResponse {
  description: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["ID"]>;
  name: Maybe<Scalars["String"]>;
}

export interface ShowcaseHighlightFeatureEdge {
  cursor: Scalars["ConnectionCursor"];
  node: ShowcaseHighlightFeature;
}

export interface ShowcaseHighlightFeatureFilter {
  and: Maybe<Array<ShowcaseHighlightFeatureFilter>>;
  id: Maybe<IdFilterComparison>;
  name: Maybe<StringFieldComparison>;
  or: Maybe<Array<ShowcaseHighlightFeatureFilter>>;
}

export interface ShowcaseHighlightFeatureMaxAggregate {
  id: Maybe<Scalars["ID"]>;
  name: Maybe<Scalars["String"]>;
}

export interface ShowcaseHighlightFeatureMinAggregate {
  id: Maybe<Scalars["ID"]>;
  name: Maybe<Scalars["String"]>;
}

export interface ShowcaseHighlightFeatureSort {
  direction: SortDirection;
  field: ShowcaseHighlightFeatureSortFields;
  nulls: Maybe<SortNulls>;
}

export enum ShowcaseHighlightFeatureSortFields {
  Id = "id",
  Name = "name",
}

export interface ShowcaseInventoryDto {
  adCostRate: Scalars["Float"];
  capitalizationRate: Scalars["Float"];
  expectedGrowthRate: Scalars["Float"];
  operatingCostRate: Scalars["Float"];
  revolvingInterval: Scalars["Float"];
}

export interface ShowcaseInventoryDtoInput {
  adCostRate: Scalars["Float"];
  capitalizationRate: Scalars["Float"];
  expectedGrowthRate: Scalars["Float"];
  operatingCostRate: Scalars["Float"];
  revolvingInterval: Scalars["Float"];
}

export interface ShowcaseInvestorPackageDto {
  firstYearBenefit: Scalars["String"];
  fund: Scalars["String"];
  package: InvestmentPackageDto;
}

export interface ShowcaseInvestorStatDto {
  adCost: Scalars["String"];
  adCostRate: Scalars["Float"];
  campaignDuration: Scalars["Float"];
  capitalizationCost: Scalars["String"];
  capitalizationRate: Scalars["Float"];
  expectedProfit: Scalars["String"];
  firstYearRevenue: Scalars["String"];
  growthRate: Scalars["Float"];
  initialCapital: Scalars["String"];
  operatingCost: Scalars["String"];
  operatingCostRate: Scalars["Float"];
  packages: Array<ShowcaseInvestorPackageDto>;
  revolvingInterval: Scalars["Float"];
  revolvingPerDay: Scalars["Float"];
  totalRevenue: Scalars["String"];
}

export interface ShowcaseMaxAggregate {
  expectedSaleAt: Maybe<Scalars["DateTime"]>;
  expectedSaleEndAt: Maybe<Scalars["DateTime"]>;
  name: Maybe<Scalars["String"]>;
  publishStatus: Maybe<PublishStatus>;
  slug: Maybe<Scalars["String"]>;
  status: Maybe<ShowcaseStatus>;
  updatedAt: Maybe<Scalars["DateTime"]>;
}

export interface ShowcaseMinAggregate {
  expectedSaleAt: Maybe<Scalars["DateTime"]>;
  expectedSaleEndAt: Maybe<Scalars["DateTime"]>;
  name: Maybe<Scalars["String"]>;
  publishStatus: Maybe<PublishStatus>;
  slug: Maybe<Scalars["String"]>;
  status: Maybe<ShowcaseStatus>;
  updatedAt: Maybe<Scalars["DateTime"]>;
}

export interface ShowcasePrice {
  pioneer: Scalars["Float"];
  preorder: Scalars["Float"];
  promo: Scalars["Float"];
  regular: Scalars["Float"];
}

export interface ShowcasePriceInput {
  pioneer: Scalars["Float"];
  preorder: Scalars["Float"];
  promo: Scalars["Float"];
  regular: Scalars["Float"];
}

export interface ShowcaseSort {
  direction: SortDirection;
  field: ShowcaseSortFields;
  nulls: Maybe<SortNulls>;
}

export enum ShowcaseSortFields {
  ExpectedSaleAt = "expectedSaleAt",
  ExpectedSaleEndAt = "expectedSaleEndAt",
  IsFeatured = "isFeatured",
  Name = "name",
  PublishStatus = "publishStatus",
  Slug = "slug",
  Status = "status",
  UpdatedAt = "updatedAt",
}

export enum ShowcaseStatus {
  Coming = "COMING",
  Idea = "IDEA",
  Showcase = "SHOWCASE",
}

export interface ShowcaseStatusFilterComparison {
  eq: Maybe<ShowcaseStatus>;
  gt: Maybe<ShowcaseStatus>;
  gte: Maybe<ShowcaseStatus>;
  iLike: Maybe<ShowcaseStatus>;
  in: Maybe<Array<ShowcaseStatus>>;
  is: Maybe<Scalars["Boolean"]>;
  isNot: Maybe<Scalars["Boolean"]>;
  like: Maybe<ShowcaseStatus>;
  lt: Maybe<ShowcaseStatus>;
  lte: Maybe<ShowcaseStatus>;
  neq: Maybe<ShowcaseStatus>;
  notILike: Maybe<ShowcaseStatus>;
  notIn: Maybe<Array<ShowcaseStatus>>;
  notLike: Maybe<ShowcaseStatus>;
}

export interface ShowcaseUpdateInputDto {
  brand: Maybe<ShowcaseBrandInput>;
  description: Maybe<Scalars["String"]>;
  expectedQuantity: Maybe<ShowcasePriceInput>;
  expectedSaleAt: Maybe<Scalars["DateTime"]>;
  expectedSaleEndAt: Maybe<Scalars["DateTime"]>;
  expectedSalePrice: Maybe<ShowcasePriceInput>;
  highlightFeatures: Maybe<Array<ShowcaseHfCreateInputDto>>;
  id: Maybe<Scalars["String"]>;
  image: Maybe<MediaInput>;
  imageLists: Maybe<Array<ImageListCreateDto>>;
  inventory: Maybe<ShowcaseInventoryDtoInput>;
  isFeatured: Maybe<Scalars["Boolean"]>;
  name: Maybe<Scalars["String"]>;
  publishStatus: Maybe<PublishStatus>;
  status: Maybe<ShowcaseStatus>;
  updates: Maybe<Array<PrjUpdateCreateDto>>;
}

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export enum SortNulls {
  NullsFirst = "NULLS_FIRST",
  NullsLast = "NULLS_LAST",
}

export interface StringFieldComparison {
  eq: Maybe<Scalars["String"]>;
  gt: Maybe<Scalars["String"]>;
  gte: Maybe<Scalars["String"]>;
  iLike: Maybe<Scalars["String"]>;
  in: Maybe<Array<Scalars["String"]>>;
  is: Maybe<Scalars["Boolean"]>;
  isNot: Maybe<Scalars["Boolean"]>;
  like: Maybe<Scalars["String"]>;
  lt: Maybe<Scalars["String"]>;
  lte: Maybe<Scalars["String"]>;
  neq: Maybe<Scalars["String"]>;
  notILike: Maybe<Scalars["String"]>;
  notIn: Maybe<Array<Scalars["String"]>>;
  notLike: Maybe<Scalars["String"]>;
}

export interface SubmitInvestorInputDto {
  email: Scalars["String"];
  fund: Scalars["String"];
  job: Scalars["String"];
  method: Scalars["String"];
  phone: Scalars["String"];
  purpose: Scalars["String"];
}

export interface UpdateImageList {
  id: Maybe<Scalars["ID"]>;
}

export interface UpdateInvestmentPackageDto {
  benefitRate: Maybe<Scalars["Float"]>;
  count: Maybe<Scalars["Float"]>;
  displayName: Maybe<Scalars["String"]>;
  fundedRate: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface UpdateManyInvestmentPackageDtosInput {
  filter: InvestmentPackageDtoUpdateFilter;
  update: UpdateInvestmentPackageDto;
}

export interface UpdateManyMediaDtosInput {
  filter: MediaDtoUpdateFilter;
  update: UpdateMediaDto;
}

export interface UpdateManyResponse {
  updatedCount: Scalars["Int"];
}

export interface UpdateMediaDto {
  filename: Maybe<Scalars["String"]>;
  height: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["ID"]>;
  mimetype: Maybe<Scalars["String"]>;
  path: Maybe<Scalars["String"]>;
  preloadUrl: Maybe<Scalars["String"]>;
  type: Maybe<MediaType>;
  width: Maybe<Scalars["Float"]>;
}

export interface UpdateOneImageListInput {
  id: Scalars["ID"];
  update: UpdateImageList;
}

export interface UpdateOneInvestmentPackageDtoInput {
  id: Scalars["ID"];
  update: UpdateInvestmentPackageDto;
}

export interface UpdateOneMediaDtoInput {
  id: Scalars["ID"];
  update: UpdateMediaDto;
}

export interface UpdateOnePrjUpdateDtoInput {
  id: Scalars["ID"];
  update: UpdatePrjUpdateDto;
}

export interface UpdatePrjUpdateDto {
  content: Maybe<Scalars["String"]>;
  createdAt: Maybe<Scalars["DateTime"]>;
  id: Maybe<Scalars["ID"]>;
}

export interface User {
  approvalStatus: UserStatusEnum;
  email: Scalars["String"];
  name: Scalars["String"];
  photoURL: Scalars["String"];
  role: AuthRoleType;
  showcases: ShowcaseConnection;
  uid: Scalars["ID"];
}

export enum UserStatusEnum {
  ApprovedCreator = "APPROVED_CREATOR",
  ApprovedInvestor = "APPROVED_INVESTOR",
  PendingCreator = "PENDING_CREATOR",
  PendingInvestor = "PENDING_INVESTOR",
}

export type MediaFragmentFragment = {
  id: string;
  path: string;
  preloadUrl: string;
  width: number;
  height: number;
};

export type ShowcaseInvestorStatFragment = {
  investorStat:
    | {
        totalRevenue: string;
        firstYearRevenue: string;
        campaignDuration: number;
        growthRate: number;
        adCostRate: number;
        adCost: string;
        operatingCostRate: number;
        operatingCost: string;
        initialCapital: string;
        revolvingInterval: number;
        revolvingPerDay: number;
        packages: Array<{
          fund: string;
          firstYearBenefit: string;
          package: {
            id: string;
            displayName: string;
            fundedRate: number;
            benefitRate: number;
            count: number;
          };
        }>;
      }
    | undefined;
};

export type ShowcaseDetailFragmentFragment = {
  id: string;
  slug: string;
  name: string;
  status: ShowcaseStatus;
  description: string;
  expectedSaleAt: any | undefined;
  expectedSaleEndAt: any | undefined;
  publishStatus: PublishStatus;
  updatedAt: any;
  createdAt: any;
  author: { email: string; name: string };
  brand: { name: string; description: string };
  image: {
    id: string;
    path: string;
    preloadUrl: string;
    width: number;
    height: number;
  };
  expectedSalePrice:
    | { regular: number; pioneer: number; preorder: number; promo: number }
    | undefined;
  expectedQuantity:
    | { pioneer: number; promo: number; preorder: number; regular: number }
    | undefined;
  highlightFeatures: Array<{
    id: string;
    name: string;
    description: string;
    image: {
      id: string;
      path: string;
      preloadUrl: string;
      width: number;
      height: number;
    };
  }>;
  imageLists: Array<{
    id: string;
    images: Array<{
      id: string;
      path: string;
      preloadUrl: string;
      width: number;
      height: number;
    }>;
  }>;
};

export type ShowcaseQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type ShowcaseQuery = {
  showcase: {
    id: string;
    slug: string;
    name: string;
    status: ShowcaseStatus;
    description: string;
    expectedSaleAt: any | undefined;
    expectedSaleEndAt: any | undefined;
    publishStatus: PublishStatus;
    updatedAt: any;
    createdAt: any;
    author: { email: string; name: string };
    brand: { name: string; description: string };
    image: {
      id: string;
      path: string;
      preloadUrl: string;
      width: number;
      height: number;
    };
    expectedSalePrice:
      | { regular: number; pioneer: number; preorder: number; promo: number }
      | undefined;
    expectedQuantity:
      | { pioneer: number; promo: number; preorder: number; regular: number }
      | undefined;
    highlightFeatures: Array<{
      id: string;
      name: string;
      description: string;
      image: {
        id: string;
        path: string;
        preloadUrl: string;
        width: number;
        height: number;
      };
    }>;
    imageLists: Array<{
      id: string;
      images: Array<{
        id: string;
        path: string;
        preloadUrl: string;
        width: number;
        height: number;
      }>;
    }>;
    investorStat:
      | {
          totalRevenue: string;
          firstYearRevenue: string;
          campaignDuration: number;
          growthRate: number;
          adCostRate: number;
          adCost: string;
          operatingCostRate: number;
          operatingCost: string;
          initialCapital: string;
          revolvingInterval: number;
          revolvingPerDay: number;
          packages: Array<{
            fund: string;
            firstYearBenefit: string;
            package: {
              id: string;
              displayName: string;
              fundedRate: number;
              benefitRate: number;
              count: number;
            };
          }>;
        }
      | undefined;
  };
};

export type UpdateOneShowcaseMutationVariables = Exact<{
  slug: Scalars["String"];
  input: ShowcaseUpdateInputDto;
}>;

export type UpdateOneShowcaseMutation = { updateOneShowcase: boolean };

export const ShowcaseInvestorStatFragmentDoc = gql`
  fragment ShowcaseInvestorStat on Showcase {
    investorStat {
      totalRevenue
      firstYearRevenue
      campaignDuration
      growthRate
      adCostRate
      adCost
      operatingCostRate
      operatingCost
      initialCapital
      revolvingInterval
      revolvingPerDay
      packages {
        package {
          id
          displayName
          fundedRate
          benefitRate
          count
        }
        fund
        firstYearBenefit
      }
    }
  }
`;
export const MediaFragmentFragmentDoc = gql`
  fragment MediaFragment on MediaDto {
    id
    path
    preloadUrl
    width
    height
  }
`;
export const ShowcaseDetailFragmentFragmentDoc = gql`
  fragment ShowcaseDetailFragment on Showcase {
    id
    slug
    name
    author {
      email
      name
    }
    brand {
      name
      description
    }
    status
    image {
      ...MediaFragment
    }
    description
    expectedSalePrice {
      regular
      pioneer
      preorder
      promo
    }
    expectedQuantity {
      pioneer
      promo
      preorder
      regular
    }
    expectedSaleAt
    expectedSaleEndAt
    highlightFeatures {
      id
      name
      description
      image {
        ...MediaFragment
      }
    }
    imageLists {
      id
      images {
        ...MediaFragment
      }
    }
    publishStatus
    status
    updatedAt
    createdAt
  }
  ${MediaFragmentFragmentDoc}
`;
export const ShowcaseDocument = gql`
  query Showcase($slug: String!) {
    showcase(slug: $slug) {
      ...ShowcaseDetailFragment
      ...ShowcaseInvestorStat
    }
  }
  ${ShowcaseDetailFragmentFragmentDoc}
  ${ShowcaseInvestorStatFragmentDoc}
`;

/**
 * __useShowcaseQuery__
 *
 * To run a query within a React component, call `useShowcaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowcaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowcaseQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useShowcaseQuery(
  baseOptions: Apollo.QueryHookOptions<ShowcaseQuery, ShowcaseQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ShowcaseQuery, ShowcaseQueryVariables>(
    ShowcaseDocument,
    options
  );
}
export function useShowcaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ShowcaseQuery,
    ShowcaseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ShowcaseQuery, ShowcaseQueryVariables>(
    ShowcaseDocument,
    options
  );
}
export type ShowcaseQueryHookResult = ReturnType<typeof useShowcaseQuery>;
export type ShowcaseLazyQueryHookResult = ReturnType<
  typeof useShowcaseLazyQuery
>;
export type ShowcaseQueryResult = Apollo.QueryResult<
  ShowcaseQuery,
  ShowcaseQueryVariables
>;
export function refetchShowcaseQuery(variables: ShowcaseQueryVariables) {
  return { query: ShowcaseDocument, variables: variables };
}
export const UpdateOneShowcaseDocument = gql`
  mutation UpdateOneShowcase($slug: String!, $input: ShowcaseUpdateInputDto!) {
    updateOneShowcase(slug: $slug, input: $input)
  }
`;
export type UpdateOneShowcaseMutationFn = Apollo.MutationFunction<
  UpdateOneShowcaseMutation,
  UpdateOneShowcaseMutationVariables
>;

/**
 * __useUpdateOneShowcaseMutation__
 *
 * To run a mutation, you first call `useUpdateOneShowcaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneShowcaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneShowcaseMutation, { data, loading, error }] = useUpdateOneShowcaseMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOneShowcaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOneShowcaseMutation,
    UpdateOneShowcaseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateOneShowcaseMutation,
    UpdateOneShowcaseMutationVariables
  >(UpdateOneShowcaseDocument, options);
}
export type UpdateOneShowcaseMutationHookResult = ReturnType<
  typeof useUpdateOneShowcaseMutation
>;
export type UpdateOneShowcaseMutationResult =
  Apollo.MutationResult<UpdateOneShowcaseMutation>;
export type UpdateOneShowcaseMutationOptions = Apollo.BaseMutationOptions<
  UpdateOneShowcaseMutation,
  UpdateOneShowcaseMutationVariables
>;
