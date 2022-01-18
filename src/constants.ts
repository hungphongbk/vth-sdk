import { CommentRateEnum } from "./__graphql";

export enum SettingKeys {
  Banner = "common:banner",
  SiteInfo = "common:siteInfo",
}

export const SubmitInvestorConstants = {
  purposes: [
    "Xây dựng thương hiệu Việt",
    "Mở rộng ngành hàng mới",
    "Tìm kiếm lợi nhuận",
    "Có thương hiệu riêng cho mình",
    "Trở thành nhà đầu tư của Vaithuhay",
  ],
  methods: [
    "Hợp tác phát triển sản phẩm",
    "Hợp tác quảng cáo sản phẩm",
    "Đầu tư dự án",
  ],
  funds: [
    "Khoảng 10 triệu",
    "Khoảng 50 triệu",
    "Khoảng 100 triệu",
    "Khoảng 500 triệu",
    "Trên 1 tỷ",
    "Trên 10 tỷ",
  ],
};

export const CommentRateMaps: Record<
  CommentRateEnum,
  { label: string; color: string }
> = {
  [CommentRateEnum.CoTiemNang]: { label: "Có tiềm năng", color: "#FF9900" },
  [CommentRateEnum.DangTien]: { label: "Đáng tiền", color: "#FFD211" },
  [CommentRateEnum.SieuPham]: { label: "Siêu phẩm", color: "#FF0000" },
  [CommentRateEnum.Hay]: { label: "Ý tưởng hay", color: "#0FD07F" },
  [CommentRateEnum.CungDuoc]: { label: "Ý tưởng cũng được", color: "#0085FF" },
  [CommentRateEnum.XamXi]: { label: "Ý tưởng xàm xí", color: "#9643FF" },
};

export const Constants = { SettingKeys, SubmitInvestorConstants };

export const IMAGE_LIST_EDITOR = "ImageListEditor";
export const IMAGE_UPLOADER = "ImageUploader";
